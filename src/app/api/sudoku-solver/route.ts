import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { puzzle } = await request.json();

    if (!puzzle || !Array.isArray(puzzle) || puzzle.length !== 9) {
      return NextResponse.json(
        { error: 'Invalid puzzle format. Expected 9x9 grid.' },
        { status: 400 }
      );
    }

    // Deep copy the puzzle
    const solution = puzzle.map(row => [...row]);
    let steps = 0;

    // Sudoku solver using recursive backtracking
    function isValid(board: number[][], row: number, col: number, num: number): boolean {
      // Check row
      for (let j = 0; j < 9; j++) {
        if (board[row][j] === num) return false;
      }

      // Check column
      for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
      }

      // Check 3x3 box
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (board[i][j] === num) return false;
        }
      }

      return true;
    }

    function solve(board: number[][]): boolean {
      steps++;
      
      // Prevent infinite loops
      if (steps > 100000) return false;

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValid(board, i, j, num)) {
                board[i][j] = num;
                if (solve(board)) return true;
                board[i][j] = 0; // Backtrack
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    // Validate input puzzle
    function isValidPuzzle(board: number[][]): boolean {
      for (let i = 0; i < 9; i++) {
        if (!Array.isArray(board[i]) || board[i].length !== 9) return false;
        for (let j = 0; j < 9; j++) {
          const val = board[i][j];
          if (typeof val !== 'number' || val < 0 || val > 9) return false;
          if (val !== 0) {
            // Check if the existing number is valid
            board[i][j] = 0; // Temporarily remove
            if (!isValid(board, i, j, val)) {
              board[i][j] = val; // Restore
              return false;
            }
            board[i][j] = val; // Restore
          }
        }
      }
      return true;
    }

    if (!isValidPuzzle(solution)) {
      return NextResponse.json({
        solution: puzzle,
        is_valid: false,
        steps: 0,
        error: 'Invalid puzzle: contains conflicting numbers'
      });
    }

    const startTime = Date.now();
    const solved = solve(solution);
    const endTime = Date.now();

    return NextResponse.json({
      solution,
      is_valid: solved,
      steps,
      solving_time_ms: endTime - startTime,
      algorithm: 'Recursive Backtracking'
    });

  } catch (error) {
    console.error('Sudoku solver error:', error);
    return NextResponse.json(
      { error: 'Failed to solve puzzle' },
      { status: 500 }
    );
  }
}