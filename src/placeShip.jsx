import React, { useState } from 'react';
import './placeship.css';

const gridSize = 8;

function PlaceShip() {
  const [destroyerRotate, setDestroyerRotate] = useState('horizontal');
  const [submarineRotate, setSubmarineRotate] = useState('horizontal');
  const [battlecruiserRotate, setBattlecruiserRotate] = useState('horizontal');
  const [aircraftcarrierRotate, setAircraftcarrierRotate] = useState('horizontal');

  // Store ship positions on the grid ๑
  const [shipPositions, setShipPositions] = useState({});

  // Track which ship is being dragged ๑
  const [draggedShip, setDraggedShip] = useState(null);

  
  //GRID CREATION
  const createGrid = () => {
    let board = [];
    for (let i = 1; i <= gridSize * gridSize; i++) {
      board.push(
        //Change the variable here ๑
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
        //๑
      );
    }
    return <div id="placeship-grid">{board}</div>;
  };

  //change all dock function to handle dragdrop
  const createDock = () => {
    return (
      <div id="dock">
        {createDestroyer()}
        {createSubmarine()}
        {createBattlecruiser()}
        {createAircraftcarrier()}
      </div>
    );
  };

  //SHIP CREATION------------------------------------------------
  //change all the createShip function to handle dragdrop @
  const createDestroyer = () => {
    return (
      <div
        className={`Destroyer ${destroyerRotate}`}
        draggable
        onDragStart={(e) => handleDragStart(e, 'destroyer', 4)} // Pass 'destroyer' as ship type and size 4
      >
        Destroyer
        <button onClick={() => rotateShip('destroyer')}>Rotate Destroyer</button>
      </div>
    );
  };

  const createSubmarine = () => {
    return (
      <div
        className={`Submarine ${submarineRotate}`}
        draggable
        onDragStart={(e) => handleDragStart(e, 'submarine', 4)}
      >
        Submarine
        <button onClick={() => rotateShip('submarine')}>Rotate Submarine</button>
      </div>
    );
  };

  const createBattlecruiser = () => {
    return (
      <div
        className={`Battlecruiser ${battlecruiserRotate}`}
        draggable
        onDragStart={(e) => handleDragStart(e, 'battlecruiser', 4)}
      >
        Battlecruiser
        <button onClick={() => rotateShip('battlecruiser')}>Rotate Battlecruiser</button>
      </div>
    );
  };

  const createAircraftcarrier = () => {
    return (
      <div
        className={`Aircraftcarrier ${aircraftcarrierRotate}`}
        draggable
        onDragStart={(e) => handleDragStart(e, 'aircraftcarrier', 4)}
      >
        Aircraftcarrier
        <button onClick={() => rotateShip('aircraftcarrier')}>Rotate Aircraft Carrier</button>
      </div>
    );
  };

  // HANDLE DRAG AND DROP

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

    // For simplicity, we'll assume horizontal placement for now
    for (let i = 0; i < size; i++) {
      newShipPositions[squareId + i] = `${type}`;
    }

    setShipPositions(newShipPositions);
    setDraggedShip(null); // Clear the dragged ship
  };

  //ROTATE
  const rotateShip = (shipType) => {
    switch (shipType) {
      case 'destroyer':
        setDestroyerRotate((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'));
        break;
      case 'submarine':
        setSubmarineRotate((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'));
        break;
      case 'battlecruiser':
        setBattlecruiserRotate((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'));
        break;
      case 'aircraftcarrier':
        setAircraftcarrierRotate((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'));
        break;
      default:
        break;
    }
  };

  //RENDER
  return (
    <div id="placeship">
      <h1>Grid</h1>
      <div>{createGrid()}</div>
      <div>{createDock()}</div>
    </div>
  );
}

export default PlaceShip;
