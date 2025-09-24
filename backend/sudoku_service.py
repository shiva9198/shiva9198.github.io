"""Sudoku image processing service

Provides `solve_image(image_bytes, model_loader, debug=False)` which returns
initial_grid, recognized_grid, solved_grid, timings, and artifact paths.

This module expects a pre-trained MNIST-compatible model loader callable that
accepts a (N,28,28) numpy array and returns predictions.
"""
import time
import os
from typing import Callable, Dict, Any, List, Tuple
import numpy as np
import cv2



def _save_artifact(img, name):
    d = '/tmp/sudoku_artifacts'
    os.makedirs(d, exist_ok=True)
    path = os.path.join(d, f"{int(time.time())}_{name}.png")
    cv2.imwrite(path, img)
    return path


def detect_and_warp(img_bgr: np.ndarray, debug=False) -> Tuple[np.ndarray, List[str]]:
    """Detect the largest quadrilateral and warp to square. Returns warped gray and artifact paths."""
    size = 900
    orig = img_bgr.copy()
    h, w = img_bgr.shape[:2]
    scale = size / max(h, w)
    img = cv2.resize(img_bgr, (int(w*scale), int(h*scale)))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5,5), 0)
    thresh = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                   cv2.THRESH_BINARY, 11, 2)
    thresh = cv2.bitwise_not(thresh)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)
    artifact_paths = []

    if debug:
        artifact_paths.append(_save_artifact(gray, 'gray'))
        artifact_paths.append(_save_artifact(thresh, 'thresh'))

    for cnt in contours:
        peri = cv2.arcLength(cnt, True)
        approx = cv2.approxPolyDP(cnt, 0.02*peri, True)
        if len(approx) == 4:
            pts = approx.reshape(4,2).astype(np.float32)
            s = pts.sum(axis=1)
            tl = pts[np.argmin(s)]
            br = pts[np.argmax(s)]
            diff = np.diff(pts, axis=1).reshape(4)
            tr = pts[np.argmin(diff)]
            bl = pts[np.argmax(diff)]
            src = np.array([tl,tr,br,bl], dtype=np.float32)
            dst = np.array([[0,0],[size-1,0],[size-1,size-1],[0,size-1]], dtype=np.float32)
            M = cv2.getPerspectiveTransform(src, dst)
            warp = cv2.warpPerspective(img, M, (size, size))
            warp_gray = cv2.cvtColor(warp, cv2.COLOR_BGR2GRAY)
            if debug:
                artifact_paths.append(_save_artifact(warp_gray, 'warped'))
            return warp_gray, artifact_paths

    # fallback: center-crop & resize
    s = min(img.shape[:2])
    cy, cx = img.shape[0]//2, img.shape[1]//2
    crop = img[cy-s//2:cy+s//2, cx-s//2:cx+s//2]
    warp = cv2.resize(crop, (size, size))
    warp_gray = cv2.cvtColor(warp, cv2.COLOR_BGR2GRAY)
    if debug:
        artifact_paths.append(_save_artifact(warp_gray, 'warped_fallback'))
    return warp_gray, artifact_paths


def split_cells(warp_gray: np.ndarray) -> List[np.ndarray]:
    size = warp_gray.shape[0]
    cell_h = size // 9
    cell_w = size // 9
    cells = []
    for r in range(9):
        for c in range(9):
            y1 = r*cell_h
            x1 = c*cell_w
            cell = warp_gray[y1:y1+cell_h, x1:x1+cell_w]
            cells.append(cell)
    return cells


def is_cell_empty(cell: np.ndarray) -> bool:
    """Check if a cell is likely empty using multiple strategies."""
    h, w = cell.shape[:2]
    
    # Strategy 1: Check overall brightness - empty cells should be mostly light
    mean_brightness = np.mean(cell)
    if mean_brightness > 200:  # Very bright, likely empty
        return True
    
    # Strategy 2: Remove border and check content
    m = max(2, min(h,w)//12)
    crop = cell[m:h-m, m:w-m]
    if crop.size == 0:
        crop = cell
    
    # Strategy 3: Adaptive threshold to separate foreground/background
    _, th = cv2.threshold(crop, 0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    
    # Invert if background is white (digits should be black)
    if np.mean(th) > 127:
        th = cv2.bitwise_not(th)
    
    # Strategy 4: Count black pixels (potential digit content)
    black_pixel_ratio = np.sum(th == 0) / th.size
    if black_pixel_ratio < 0.1:  # Less than 10% black pixels
        return True
    
    # Strategy 5: Find significant contours
    contours, _ = cv2.findContours(th, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        return True
    
    # Filter contours by area
    significant_contours = [cnt for cnt in contours if cv2.contourArea(cnt) > 30]
    
    if len(significant_contours) == 0:
        return True
    
    # Strategy 6: Check if the largest contour looks like a digit
    largest_area = max(cv2.contourArea(cnt) for cnt in significant_contours)
    total_area = crop.shape[0] * crop.shape[1]
    
    # Digit should occupy reasonable portion of cell but not be too small or too large
    area_ratio = largest_area / total_area
    if area_ratio < 0.02 or area_ratio > 0.8:  # Too small or too large
        return True
    
    # Strategy 7: Check bounding box aspect ratio of largest contour
    largest_contour = max(significant_contours, key=cv2.contourArea)
    x, y, w_rect, h_rect = cv2.boundingRect(largest_contour)
    aspect_ratio = w_rect / h_rect if h_rect > 0 else 0
    
    # Digits typically have reasonable aspect ratios
    if aspect_ratio < 0.2 or aspect_ratio > 3.0:  # Too thin/wide, likely noise
        return True
    
    return False


def preprocess_for_mnist(cell: np.ndarray) -> np.ndarray:
    # remove border
    h,w = cell.shape[:2]
    m = max(2, min(h,w)//12)
    crop = cell[m:h-m, m:w-m]
    if crop.size == 0:
        crop = cell
    # threshold
    _, th = cv2.threshold(crop, 0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    # invert if background is dark
    if np.mean(th) > 127:
        th = cv2.bitwise_not(th)
    # resize to 28x28
    out = cv2.resize(th, (28,28), interpolation=cv2.INTER_AREA)
    return out


def recognize_cells_tesseract(cells: List[np.ndarray], debug=False) -> Tuple[List[int], List[float]]:
    """Alternative recognition using Tesseract OCR instead of MNIST model."""
    try:
        import pytesseract
    except ImportError:
        raise ImportError("pytesseract not installed. Run: pip install pytesseract")
    
    preds = []
    confs = []
    empty_count = 0
    
    for i, cell in enumerate(cells):
        if is_cell_empty(cell):
            preds.append(0)  # Empty cell
            confs.append(1.0)  # High confidence for empty detection
            empty_count += 1
            if debug:
                cv2.imwrite(f"/tmp/sudoku_artifacts/tesseract_empty_{i}.png", cell)
        else:
            # Preprocess cell for Tesseract
            h, w = cell.shape[:2]
            m = max(2, min(h,w)//12)
            crop = cell[m:h-m, m:w-m]
            if crop.size == 0:
                crop = cell
            
            # Resize to reasonable size for OCR
            crop = cv2.resize(crop, (50, 50))
            
            # Binary threshold
            _, thresh = cv2.threshold(crop, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
            
            # Run Tesseract OCR
            config = "--psm 10 -c tessedit_char_whitelist=123456789"
            try:
                text = pytesseract.image_to_string(thresh, config=config).strip()
                if text.isdigit() and len(text) == 1 and '1' <= text <= '9':
                    preds.append(int(text))
                    confs.append(0.85)  # Reasonable confidence for OCR
                    if debug:
                        cv2.imwrite(f"/tmp/sudoku_artifacts/tesseract_digit_{i}_{text}.png", thresh)
                else:
                    preds.append(0)  # Couldn't recognize
                    confs.append(0.1)  # Low confidence
                    if debug:
                        cv2.imwrite(f"/tmp/sudoku_artifacts/tesseract_failed_{i}.png", thresh)
            except Exception:
                preds.append(0)  # OCR failed
                confs.append(0.1)  # Low confidence
                if debug:
                    cv2.imwrite(f"/tmp/sudoku_artifacts/tesseract_error_{i}.png", thresh)
    
    if debug:
        print(f"TESSERACT DEBUG: Found {empty_count} empty cells out of {len(cells)}")
        non_zero_count = sum(1 for p in preds if p != 0)
        print(f"TESSERACT DEBUG: Recognized {non_zero_count} digits")
    
    return preds, confs


def recognize_cells(cells: List[np.ndarray], model_predict: Callable[[np.ndarray], List[int]], debug=False) -> Tuple[List[int], List[float]]:
    preds = []
    confs = []
    non_empty_indices = []
    non_empty_cells = []
    empty_count = 0
    
    # First pass: identify empty cells
    for i, cell in enumerate(cells):
        if is_cell_empty(cell):
            preds.append(0)  # Empty cell
            confs.append(1.0)  # High confidence for empty detection
            empty_count += 1
            if debug:
                # Save debug image of detected empty cell
                cv2.imwrite(f"/tmp/sudoku_artifacts/empty_cell_{i}.png", cell)
        else:
            preds.append(-1)  # Placeholder for non-empty, will be filled by model
            confs.append(-1)  # Placeholder for confidence
            non_empty_indices.append(i)
            non_empty_cells.append(preprocess_for_mnist(cell))
            if debug:
                # Save debug image of detected non-empty cell
                cv2.imwrite(f"/tmp/sudoku_artifacts/nonempty_cell_{i}.png", cell)
    
    if debug:
        print(f"DEBUG: Found {empty_count} empty cells out of {len(cells)}")
        print(f"DEBUG: Non-empty cell indices: {non_empty_indices}")
    
    # Second pass: run MNIST model only on non-empty cells
    if non_empty_cells:
        imgs_array = np.stack(non_empty_cells, axis=0)
        model_preds = model_predict(imgs_array)
        
        # Handle model output (could be predictions only or (predictions, confidences))
        if isinstance(model_preds, tuple) and len(model_preds) == 2:
            digit_preds, digit_confs = model_preds
        else:
            digit_preds = model_preds
            digit_confs = [0.9] * len(digit_preds)  # Default confidence
        
        # Fill in the non-empty predictions
        for j, idx in enumerate(non_empty_indices):
            preds[idx] = digit_preds[j]
            confs[idx] = digit_confs[j]
    
    return preds, confs


def solve_image(image_bytes: bytes, model_predict: Callable[[np.ndarray], List[int]], debug=False, conf_threshold: float = 0.65) -> Dict[str, Any]:
    t0 = time.time()
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError('Invalid image')

    warp_gray, artifacts = detect_and_warp(img, debug=debug)
    cells = split_cells(warp_gray)
    
    # Use our improved recognize_cells function with empty cell detection
    preds, confs = recognize_cells(cells, model_predict, debug=debug)

    recognized_grid = []
    for i in range(9):
        recognized_grid.append(preds[i*9:(i+1)*9])

    # Build initial grid by treating recognized 0 as empty or low-confidence as empty
    initial_grid = [[0]*9 for _ in range(9)]
    for r in range(9):
        for c in range(9):
            v = recognized_grid[r][c]
            idx = r*9 + c
            low_conf = False
            if confs is not None:
                try:
                    if confs[idx] is None:
                        low_conf = False
                    else:
                        low_conf = float(confs[idx]) < float(conf_threshold)
                except Exception:
                    low_conf = False

            if v != 0 and not low_conf:
                initial_grid[r][c] = v

    solved_grid, solved = solve_sudoku(initial_grid)
    t1 = time.time()
    return {
        'initial_grid': initial_grid,
        'recognized_grid': recognized_grid,
        'solved_grid': solved_grid if solved else None,
        'solved': solved,
        'time_seconds': t1 - t0,
        'artifacts': artifacts
    }


def solve_image_tesseract(image_bytes: bytes, debug=False) -> Dict[str, Any]:
    """Solve Sudoku using Tesseract OCR instead of MNIST model."""
    t0 = time.time()
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError('Invalid image')

    warp_gray, artifacts = detect_and_warp(img, debug=debug)
    cells = split_cells(warp_gray)
    
    # Use Tesseract recognition
    preds, confs = recognize_cells_tesseract(cells, debug=debug)

    recognized_grid = []
    for i in range(9):
        recognized_grid.append(preds[i*9:(i+1)*9])

    # Build initial grid (Tesseract results are already filtered)
    initial_grid = [[0]*9 for _ in range(9)]
    for r in range(9):
        for c in range(9):
            v = recognized_grid[r][c]
            if v != 0:  # Trust Tesseract results
                initial_grid[r][c] = v

    solved_grid, solved = solve_sudoku(initial_grid)
    t1 = time.time()
    return {
        'initial_grid': initial_grid,
        'recognized_grid': recognized_grid,
        'solved_grid': solved_grid if solved else None,
        'solved': solved,
        'time_seconds': t1 - t0,
        'artifacts': artifacts
    }


def solve_image_with_thresholds(image_bytes: bytes, model_predict: Callable[[np.ndarray], List[int]], debug=False, thresholds=None, model_obj: Any = None) -> Dict[str, Any]:
    """Run recognition once, then try thresholds in order to find the lowest threshold that yields a solved puzzle.

    thresholds: iterable of floats, e.g. [0.8,0.85,0.9]
    Returns a dict with keys: chosen_threshold, result (same shape as solve_image output except time_seconds is per-attempt), attempts (list of per-threshold metadata).
    """
    if thresholds is None:
        thresholds = [0.8, 0.85, 0.9, 0.95]  # More aggressive thresholds

    # read & warp once
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError('Invalid image')

    warp_gray, artifacts = detect_and_warp(img, debug=debug)
    cells = split_cells(warp_gray)
    
    # Use our improved recognize_cells function with empty cell detection
    preds, confs = recognize_cells(cells, model_predict, debug=debug)

    # if confidences not provided from recognize_cells, try to compute them from model_obj (torch or sklearn)
    if confs is None and model_obj is not None:
        # This is a fallback - recognize_cells should provide confidences
        try:
            import torch
            if hasattr(model_obj, 'model') and isinstance(model_obj.model, torch.nn.Module):
                # Need to re-run model on non-empty cells only
                non_empty_cells = []
                non_empty_indices = []
                for i, cell in enumerate(cells):
                    if not is_cell_empty(cell):
                        non_empty_cells.append(preprocess_for_mnist(cell))
                        non_empty_indices.append(i)
                
                if non_empty_cells:
                    arr = np.stack(non_empty_cells, axis=0)
                    t = torch.from_numpy(arr.reshape(arr.shape[0],1,28,28).astype('float32')/255.0)
                    with torch.no_grad():
                        logits = model_obj.model(t)
                        probs = torch.nn.functional.softmax(logits, dim=1).cpu().numpy()
                        cell_confs = probs.max(axis=1).tolist()
                    
                    # Map back to full 81-cell array
                    confs = [1.0] * 81  # High confidence for empty cells
                    for j, idx in enumerate(non_empty_indices):
                        confs[idx] = cell_confs[j]
        except Exception:
            confs = None

    recognized_grid = []
    for i in range(9):
        recognized_grid.append(preds[i*9:(i+1)*9])

    attempts = []
    chosen = None
    chosen_result = None

    for th in thresholds:
        # build initial grid with threshold th
        initial_grid = [[0]*9 for _ in range(9)]
        for r in range(9):
            for c in range(9):
                v = recognized_grid[r][c]
                idx = r*9 + c
                low_conf = False
                if confs is not None:
                    try:
                        if confs[idx] is None:
                            low_conf = False
                        else:
                            low_conf = float(confs[idx]) < float(th)
                    except Exception:
                        low_conf = False

                if v != 0 and not low_conf:
                    initial_grid[r][c] = v

        solved_grid, solved = solve_sudoku(initial_grid)
        attempts.append({'threshold': th, 'initial_grid': initial_grid, 'solved': solved})
        if solved and chosen is None:
            chosen = th
            chosen_result = {
                'initial_grid': initial_grid,
                'recognized_grid': recognized_grid,
                'solved_grid': solved_grid,
                'solved': True,
                'artifacts': artifacts
            }
            break

    # if none solved, return result for highest threshold attempt
    if chosen_result is None:
        last = attempts[-1]
        chosen_result = {
            'initial_grid': last['initial_grid'],
            'recognized_grid': recognized_grid,
            'solved_grid': None,
            'solved': False,
            'artifacts': artifacts
        }

    return {
        'chosen_threshold': chosen,
        'result': chosen_result,
        'attempts': attempts
    }
