import React, { useState } from 'react';
import './placeship.css';

const GRID_SIZE = 8;
const SHIP_SIZE = 4; // Assume all ships occupy 4 cells
const initialShips = [
  { id: 'a', name: "Ship A", x: null, y: null },
  { id: 'b', name: "Ship B", x: null, y: null },
  { id: 'c', name: "Ship C", x: null, y: null },
  { id: 'd', name: "Ship D", x: null, y: null },
];

function PlaceShip() {
  const [grid, setGrid] = useState(
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => ({ shipOccupie: null }))
    )
  );
  const [ships, setShips] = useState(initialShips);
  const [draggingShip, setDraggingShip] = useState(null);
  const [isHorizontal, setIsHorizontal] = useState(true); // Universal isHorizontal

  // Handle drag start
  function handleDragStart(ship) {
    setDraggingShip(ship);
  }

  // Handle drag over grid
  function handleDragOver(e) {
    e.preventDefault();
  }

  // Check if the cells are free for placing the ship
  function canPlaceShip(x, y) {
    if (isHorizontal) {
      // Check if the ship can fit horizontally and if the cells are unoccupied
      if (y + SHIP_SIZE > GRID_SIZE) return false; // Out of bounds check
      for (let i = 0; i < SHIP_SIZE; i++) {
        if (grid[x][y + i].shipOccupie !== null) {
          return false; // The cell is already occupied
        }
      }
    } else {
      // Check if the ship can fit vertically and if the cells are unoccupied
      if (x + SHIP_SIZE > GRID_SIZE) return false; // Out of bounds check
      for (let i = 0; i < SHIP_SIZE; i++) {
        if (grid[x + i][y].shipOccupie !== null) {
          return false; // The cell is already occupied
        }
      }
    }
    return true; // All cells are free to place the ship
  }

  // Handle drop on grid
  function handleDrop(x, y) {
    if (draggingShip) {
      // Check if the ship can be placed
      if (!canPlaceShip(x, y)) {
        alert("Cannot place the ship here, cells are occupied!");
        return; // Prevent placing the ship
      }

      const updatedShips = ships.map(function (ship) {
        return ship.id === draggingShip.id ? { ...ship, x, y } : ship;
      });
      setShips(updatedShips);

      // Update the grid with ship occupying multiple cells
      const updatedGrid = grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (isHorizontal) {
            if (rowIndex === x && colIndex >= y && colIndex < y + SHIP_SIZE) {
              return { ...cell, shipOccupie: draggingShip.id };
            }
          } else {
            if (colIndex === y && rowIndex >= x && rowIndex < x + SHIP_SIZE) {
              return { ...cell, shipOccupie: draggingShip.id };
            }
          }
          return cell;
        })
      );
      setGrid(updatedGrid);

      // Reset dragging ship
      setDraggingShip(null);
    }
  }

  // Handle flipping ship orientation
  function handleFlip() {
    setIsHorizontal(!isHorizontal);
  }

  // Reset all ships back to dock
  function handleReset() {
    setShips(initialShips);
    setGrid(
      Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE }, () => ({ shipOccupie: null }))
      )
    );
  }

  // Render a grid cell
  function renderGridCell(x, y) {
    const { shipOccupie } = grid[x][y]; // Extract shipOccupie

    return (
      <div
        key={`${x}-${y}`}
        className="grid-cell"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(x, y)}
      >
        {/* Only display shipOccupie */}
        <div> {shipOccupie !== null ? shipOccupie : "null"}</div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Ship Dock and Grid</h1>

      {/* Flip button */}
      <button onClick={handleFlip}>Flip Ship</button>

      {/* Reset button */}
      <button onClick={handleReset}>Reset Ships</button>
      
      {/* Show current orientation */}
      <h2>{isHorizontal ? "Horizontal" : "Vertical"}</h2>

      {/* Dock for ships */}
      <div className="dock">
        <h2>Ship Dock</h2>
        {ships.map(function (ship) {
          return ship.x === null && (
            <div
              key={ship.id}
              className="ship"
              draggable
              onDragStart={() => handleDragStart(ship)}
            >
              {ship.name} ({isHorizontal ? "Horizontal" : "Vertical"})
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid">
        {Array.from({ length: GRID_SIZE }, function (_, x) {
          return Array.from({ length: GRID_SIZE }, function (_, y) {
            return renderGridCell(x, y);
          });
        })}
      </div>
    </div>
  );
}

export default PlaceShip;
