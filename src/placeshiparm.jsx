import React, { useState } from 'react';
import './placeship.css';

const gridSize = 8;

function PlaceShip() {
  const [shipRotations, setShipRotations] = useState({
    destroyer: 'horizontal',
    submarine: 'horizontal',
    battlecruiser: 'horizontal',
    aircraftcarrier: 'horizontal',
  });

  // Store ship positions on the grid
  const [shipPositions, setShipPositions] = useState({});

  // Track which ship is being dragged
  const [draggedShip, setDraggedShip] = useState(null);

  // GRID CREATION
  const createGrid = () => {
    let board = [];
    for (let i = 1; i <= gridSize * gridSize; i++) {
      board.push(
        <div
          className="square"
          id={i}
          key={i}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, i)}
        >
          {/* Display ship if one is placed in this square */}
          {shipPositions[i] ? shipPositions[i] : `[${i}]`}
        </div>
      );
    }
    return <div id="placeship-grid">{board}</div>;
  };

  // SHIP CREATION ------------------------------------------------
  const createShip = (shipType, shipName) => {
    return (
      <div
        className={`${shipType} ${shipRotations[shipType]} dock-ship`}
        draggable
        onDragStart={(e) => handleDragStart(e, shipType, 4)} // All ships have size 4 for this example
      >
        <div className="ship-name">{shipName}</div>
        <button onClick={() => rotateShip(shipType)}>Rotate {shipName}</button>
      </div>
    );
  };

  const createDock = () => {
  return (
    <div id="dock">
      <div className="ship-container">
        {createShip('destroyer', 'Destroyer')}
      </div>
      <div className="ship-container">
        {createShip('submarine', 'Submarine')}
      </div>
      <div className="ship-container">
        {createShip('battlecruiser', 'Battlecruiser')}
      </div>
      <div className="ship-container">
        {createShip('aircraftcarrier', 'Aircraft Carrier')}
      </div>
    </div>
  );
};

  // HANDLE DRAG AND DROP ------------------------------------------

  const handleDragStart = (e, shipType, shipSize) => {
    setDraggedShip({ type: shipType, size: shipSize });
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow dropping
  };

  const handleDrop = (e, squareId) => {
    if (!draggedShip) return;

    const newShipPositions = { ...shipPositions };
    const { type, size } = draggedShip;
    const isHorizontal = shipRotations[type] === 'horizontal'; // Use the correct rotation state

    // Check for placement restrictions
    if (isHorizontal) {
      // Restrict horizontal placements on certain squares
      const invalidPositions = [6, 7, 8, 14, 15, 16, 22, 23, 24, 30, 31, 32, 38, 39, 40, 46, 47, 48, 54, 55, 56, 62, 63, 64];
      if (invalidPositions.includes(squareId)) {
        alert("Cannot place ship here!");
        return;
      }

      // Place ship horizontally
      for (let i = 0; i < size; i++) {
        newShipPositions[squareId + i] = `${type}`;
      }
    } else {
      // Restrict vertical placements on rows 41 to 64
      if (squareId >= 41) {
        alert("Cannot place ship here!");
        return;
      }

      // Place ship vertically
      for (let i = 0; i < size; i++) {
        const verticalPosition = squareId + i * gridSize; // Calculate vertical position
        if (verticalPosition <= gridSize * gridSize) { // Ensure within grid bounds
          newShipPositions[verticalPosition] = `${type}`;
        }
      }
    }

    setShipPositions(newShipPositions);
    setDraggedShip(null); // Clear the dragged ship
  };

  // ROTATE --------------------------------------------------------
  const rotateShip = (shipType) => {
    setShipRotations((prev) => ({
      ...prev,
      [shipType]: prev[shipType] === 'horizontal' ? 'vertical' : 'horizontal'
    }));
  };

  // RENDER --------------------------------------------------------
  return (
    <div id="placeship">
      <h1>Grid</h1>
      <div>{createGrid()}</div>
      <div>{createDock()}</div>
    </div>
  );
}

export default PlaceShip;