import React, { useState, useCallback, useRef } from 'react';
import Controls from './components/controls';
import produce from 'immer';
import './App.css';

const neighborLocations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

function App() {

  const [grid, setGrid] = useState();
  const [cols, setCols] = useState();
  const [rows, setRows] = useState();
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1000)

  const generateEmptyGrid = (numRows, numCols) => {
    const grid = Array.from({ length: numRows }).map(() => Array.from({ length: numCols }).fill(0))
    setRows(numRows);
    setCols(numCols);
    setGrid(grid);
  }

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid(grid => {
      return produce(grid, gridCopy => {
        for (let i = 0; i < rows; i++) {
          console.log('$$$$$', grid[i]);
          for (let k = 0; k < cols; k++) {
            let neighbors = 0;
            neighborLocations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < rows && newK >= 0 && newK < cols) {
                neighbors += grid[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (grid[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, speed);
  }, [grid]);



  return (
    <div className="App">
      <h1>Welcome to Conway's way of life</h1>
      <Controls setGrid={generateEmptyGrid} />
      <br/>
      <button onClick={() => {
        setRunning(!running);
        if (!running) {
          runningRef.current = true;
          runSimulation();
        }
      }}>
        {running ? "stop" : "start"}
      </button>
      <br/>
      {!grid && <p>Select a grid please</p>}
      {grid && <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 20px)`
        }}>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "#61dafb" : undefined,
                border: "solid 1px #61dafb"
              }}
            />
          ))
        )}
      </div>}
      <footer style={{marginTop: '2em', marginBottom: '1em'}}>
        <small>Created by Juan Carrera, © {new Date().getFullYear()}</small>
      </footer>
    </div>
  );
}

export default App;
