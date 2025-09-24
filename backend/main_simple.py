from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sudoku_solver import solve_sudoku

app = FastAPI()


class SudokuRequest(BaseModel):
    puzzle: list


class SudokuResponse(BaseModel):
    solution: list
    is_valid: bool


@app.get('/')
def health():
    return {'message': 'Simple Sudoku solver running'}


@app.post('/api/sudoku-solver', response_model=SudokuResponse)
def solve(req: SudokuRequest):
    try:
        solved, ok = solve_sudoku(req.puzzle)
        return SudokuResponse(solution=solved, is_valid=ok)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
