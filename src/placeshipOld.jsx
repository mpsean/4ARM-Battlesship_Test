import React, { useState, useEffect } from 'react';
import './placeship.css';
import Square from './square.jsx';

const gridSize = 8;
const squareSize = 80; //in px

function PlaceShip() {

  const [grid, setGrid] = useState(Array(gridSize).fill(null));

  //GRID INITIAL CREATION
  const createGrid = () => {
    let board = [];
    for (let i = 1; i <= gridSize * gridSize; i++) {
      board.push(
        <Square id={i} key={i} ship={null}/>
      );
    }
    return setGrid(board);
    
    //<div id="placeship-grid">{board}</div>;
  };

  useEffect(() => {
    createGrid();
  }, []);

  const [destroyerRotate, setDestroyerRotate] = useState('horizontal');
  const [submarineRotate, setSubmarineRotate] = useState('horizontal');
  const [battlecruiserRotate, setBattlecruiserRotate] = useState('horizontal');
  const [aircraftcarrierRotate, setAircraftcarrierRotate] = useState('horizontal');

  //activeShip == draggedShip
  const [activeShip, setActiveShip] = useState(null);
  const [currentGridSquareId, setCurrentGridSquareId] = useState();

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const createDock = () => {
    let Dock = [];
    Dock.push(createTest());
    Dock.push(createDestroyer());
    Dock.push(createSubmarine());
    Dock.push(createBattlecruiser());
    Dock.push(createAircraftcarrier());

    return <div id="dock">{Dock}</div>;
  };

  //SHIP CREATION------------------------------------------------
  const createTest = () => (
    <div
      className={`Ship Destroyer ${destroyerRotate}`}
      onMouseMove={(e) => moveShip(e)}
      onMouseDown={(e) => grabShip(e)}
      onMouseUp={(e) => dropShip(e)}
    >
    </div>
  );



  const createDestroyer = () => {
    let ship = [];
    for (let i = 1; i <= 1; i++) {
      ship.push(
        <div className="Destroyer-shipsquare" key={i}>
          HOLD HERE TO MOVE 
        </div>
      );
    }
    return (
      <div className={`Ship Destroyer ${destroyerRotate}`} 
      onMouseMove={(e) => moveShip(e)}
      onMouseDown={(e) => grabShip(e)}
      onMouseUp={(e) => dropShip(e)}>
        {ship}
        <button onClick={() => rotateShip('destroyer')}>Rotate Destroyer</button>
      </div>
    );
  };

  const createSubmarine = () => {
    let ship = [];
    for (let i = 1; i <= 1; i++) {
      ship.push(
        <div className="Submarine-shipsquare" key={i}>
          HOLD HERE TO MOVE 
        </div>
      );
    }
    return (
      <div className={`Ship Submarine ${submarineRotate}`}      
      onMouseMove={(e) => moveShip(e)}
      onMouseDown={(e) => grabShip(e)}
      onMouseUp={(e) => dropShip(e)}>
        {ship}
        <button onClick={() => rotateShip('submarine')}>Rotate Submarine</button>
      </div>
    );
  };

  const createBattlecruiser = () => {
    let ship = [];
    for (let i = 1; i <= 1; i++) {
      ship.push(
        <div className="Battlecruiser-shipsquare" key={i}>
          HOLD HERE TO MOVE 
        </div>
      );
    }
    return (
      <div className={`Ship Battlecruiser ${battlecruiserRotate}`}
      onMouseMove={(e) => moveShip(e)}
      onMouseDown={(e) => grabShip(e)}
      onMouseUp={(e) => dropShip(e)}>
        {ship}
        <button onClick={() => rotateShip('battlecruiser')}>Rotate Battlecruiser</button>
      </div>
    );
  };

  const createAircraftcarrier = () => {
    let ship = [];
    for (let i = 1; i <= 1; i++) {
      ship.push(
        <div className="Aircraftcarrier-shipsquare" key={i}>
          HOLD HERE TO MOVE 
        </div>
      );
    }
    return (
      <div className={`Ship Aircraftcarrier ${aircraftcarrierRotate}`} 
      onMouseMove={(e) => moveShip(e)}
      onMouseDown={(e) => grabShip(e)}
      onMouseUp={(e) => dropShip(e)}>
        {ship}
        <button onClick={() => rotateShip('aircraftcarrier')}>Rotate Aircraft Carrier</button>
      </div>
    );
  };

  //ROTATE---------------------------------------------------------
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

  // HANDLE DRAG AND DROP ------------------------------------------
  const grabShip = (e) =>{
    //const ship = e.target;
    const ship = e.target.closest('.Ship');
    if (ship) {
      const rect = ship.getBoundingClientRect();
      setOffsetX(e.clientX - rect.left);
      setOffsetY(e.clientY - rect.top);
      ship.style.position = "absolute";
      ship.style.zIndex = "1000";
      console.log("grab"+ship);

    document.addEventListener('mousemove', moveShip);
    document.addEventListener('mouseup', dropShip);
    setActiveShip(ship);
  }
}
useEffect(() => {
  console.log('Active Ship changed:', activeShip);
}, [activeShip]);

  const moveShip = (e) =>{
    if (activeShip) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      activeShip.style.position = "absolute";
      activeShip.style.left = `${x}px`;
      activeShip.style.top = `${y}px`; 

      //click again to drop
      //document.addEventListener('mousedown', dropShip);
      document.addEventListener('mouseup', dropShip);

      logHoveredGridSquare(e); //debug
    }
  }
  // const handleDragOver = (e) => {
  //   e.preventDefault(); // Prevent default to allow dropping
  // };

  const dropShip = (e) =>{
    
    if (activeShip !== null && activeShip !== e) {
      //const rect = e.target.getBoundingClientRect(); // Get the drop target
      //const gridSquareId = e.target.getAttribute("id"); // Assuming grid squares have IDs
      const gridSquareId = logHoveredGridSquare(e); // 

      console.log("drop at"+gridSquareId);

      if (gridSquareId) {
        const updatedGrid = [...grid];
  
        // Move item to the new grid square
        if (gridSquareId !== 1) {
          updatedGrid[gridSquareId] = updatedGrid[activeShip]; // Set ship in new location
          console.log("SWAP"+gridSquareId+"+"+activeShip);
          updatedGrid[activeShip] = null; // Remove ship from old location
        } else {
        alert("Cannot place the ship here, cells are occupied!");
      }
      setGrid(updatedGrid);
      setActiveShip(null); // Reset dragged item
      window.removeEventListener('mousemove', moveShip);
      window.removeEventListener('mouseup', dropShip);
    
    }
      //window.removeEventListener('mousedown', dropShip);
    e.preventDefault();
  }
}

  //GOAT tool for creating transparent element before snap
  const logHoveredGridSquare = (e) => {
    const gridLeft = document.getElementById('placeship-grid').getBoundingClientRect().left;
    const gridTop = document.getElementById('placeship-grid').getBoundingClientRect().top;

    // Calculate the relative position to the grid
    const relativeX = e.clientX - gridLeft;
    const relativeY = e.clientY - gridTop;

    // Calculate the grid square index
    const gridColumn = Math.floor(relativeX / squareSize);
    const gridRow = Math.floor(relativeY / squareSize);

    // Check if the mouse is within the grid bounds
    if (gridColumn >= 0 && gridColumn < gridSize && gridRow >= 0 && gridRow < gridSize) {
      const gridSquareId = gridRow * gridSize + gridColumn + 1; // Grid square ID calculation
      console.log(`Hovering over grid square ID: ${gridSquareId}`);
      return gridSquareId;

    }
  };


  return (
    <div id="placeship">
      <h1>Grid</h1>

      <div id="placeship-grid">
      {grid}

      </div>

      <div>
        {createDock()}</div>
    </div>
  );
}

export default PlaceShip;
