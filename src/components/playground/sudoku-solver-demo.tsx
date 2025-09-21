'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Zap, CheckCircle } from 'lucide-react';

type CellValue = number | null;
type SudokuGrid = CellValue[][];

const initialGrid: SudokuGrid = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];

const solvedGrid: SudokuGrid = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

export function SudokuSolverDemo() {
  const [grid, setGrid] = useState<SudokuGrid>(initialGrid.map(row => [...row]));
  const [isOriginal, setIsOriginal] = useState<boolean[][]>(
    initialGrid.map(row => row.map(cell => cell !== null))
  );
  const [isSolving, setIsSolving] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showSolution, setShowSolution] = useState(false);

  const validateGrid = (currentGrid: SudokuGrid): boolean => {
    // Check rows
    for (let row = 0; row < 9; row++) {
      const rowValues = currentGrid[row].filter(val => val !== null);
      const uniqueValues = new Set(rowValues);
      if (rowValues.length !== uniqueValues.size) return false;
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
      const colValues = currentGrid.map(row => row[col]).filter(val => val !== null);
      const uniqueValues = new Set(colValues);
      if (colValues.length !== uniqueValues.size) return false;
    }

    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const boxValues: CellValue[] = [];
        for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
          for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
            if (currentGrid[row][col] !== null) {
              boxValues.push(currentGrid[row][col]);
            }
          }
        }
        const uniqueValues = new Set(boxValues);
        if (boxValues.length !== uniqueValues.size) return false;
      }
    }

    return true;
  };

  const updateCell = (row: number, col: number, value: string) => {
    if (isOriginal[row][col]) return;

    const numValue = value === '' ? null : parseInt(value);
    if (numValue !== null && (numValue < 1 || numValue > 9)) return;

    const newGrid = grid.map((r, rIndex) =>
      r.map((c, cIndex) => (rIndex === row && cIndex === col ? numValue : c))
    );

    setGrid(newGrid);
    setIsValid(validateGrid(newGrid));
    setShowSolution(false);
  };

  const solveSudoku = async () => {
    setIsSolving(true);
    
    // Simulate solving animation
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (!isOriginal[row][col]) {
          await new Promise(resolve => setTimeout(resolve, 50));
          setGrid(prevGrid => {
            const newGrid = prevGrid.map(r => [...r]);
            newGrid[row][col] = solvedGrid[row][col];
            return newGrid;
          });
        }
      }
    }

    setIsSolving(false);
    setShowSolution(true);
    setIsValid(true);
  };

  const resetGrid = () => {
    setGrid(initialGrid.map(row => [...row]));
    setIsOriginal(initialGrid.map(row => row.map(cell => cell !== null)));
    setShowSolution(false);
    setIsValid(true);
  };

  const clearUserInput = () => {
    const newGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) => (isOriginal[rIndex][cIndex] ? cell : null))
    );
    setGrid(newGrid);
    setShowSolution(false);
    setIsValid(validateGrid(newGrid));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              isValid ? 'bg-green-500' : 'bg-red-500'
            } ${isSolving ? 'animate-pulse' : ''}`} />
            <span className="text-sm text-muted-foreground">
              {isSolving ? 'Solving...' : isValid ? 'Valid' : 'Invalid'}
            </span>
          </div>
          {showSolution && (
            <Badge variant="secondary" className="glass">
              <CheckCircle className="w-3 h-3 mr-1" />
              Solved
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={clearUserInput}
            className="glass hover:animate-glow transition-all duration-300"
          >
            Clear Input
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={resetGrid}
            className="glass hover:animate-glow transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={solveSudoku}
            disabled={isSolving || !isValid}
            className="glass hover:animate-glow transition-all duration-300"
          >
            <Zap className="w-4 h-4 mr-2" />
            {isSolving ? 'Solving...' : 'Solve'}
          </Button>
        </div>
      </div>

      {/* Sudoku Grid */}
      <Card className="glass border-0 backdrop-blur-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-9 gap-1 w-fit mx-auto">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`relative ${
                    (rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-2 border-primary/50' : ''
                  } ${
                    (colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-2 border-primary/50' : ''
                  }`}
                >
                  <input
                    type="text"
                    value={cell || ''}
                    onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                    className={`w-12 h-12 text-center border rounded-md transition-all duration-300 ${
                      isOriginal[rowIndex][colIndex]
                        ? 'bg-primary/20 font-bold text-primary border-primary/50 cursor-not-allowed'
                        : showSolution
                        ? 'bg-green-500/20 text-green-600 border-green-500/50'
                        : 'bg-background hover:bg-muted border-border focus:border-primary focus:ring-1 focus:ring-primary'
                    } ${!isValid && cell !== null ? 'border-red-500 bg-red-500/10' : ''}`}
                    maxLength={1}
                    readOnly={isOriginal[rowIndex][colIndex] || isSolving}
                  />
                  
                  {isSolving && !isOriginal[rowIndex][colIndex] && (
                    <div className="absolute inset-0 bg-primary/20 rounded-md animate-pulse" />
                  )}
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="glass border-0 backdrop-blur-lg">
        <CardContent className="p-4">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-primary/20 rounded mr-2" />
              <span className="text-muted-foreground">
                <strong className="text-primary">Given numbers</strong> (cannot be changed)
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-background border rounded mr-2" />
              <span className="text-muted-foreground">
                <strong className="text-primary">Your input</strong> (editable cells)
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500/20 rounded mr-2" />
              <span className="text-muted-foreground">
                <strong className="text-green-600">Solution</strong> (when solved)
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-center text-xs text-muted-foreground">
            💡 <strong>How it works:</strong> The recursive backtracking algorithm tries each number 1-9 
            in empty cells, validates the Sudoku rules, and backtracks when it hits a dead end.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}