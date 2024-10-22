import React, { useState , useRef } from 'react';
import './placeship.css';
import Square from './square.jsx';

const gridSize = 8;

function PlaceShip() {
  const [destroyerRotate, setDestroyerRotate] = useState('horizontal');
  const [submarineRotate, setSubmarineRotate] = useState('horizontal');
  const [battlecruiserRotate, setBattlecruiserRotate] = useState('horizontal');
  const [aircraftcarrierRotate, setAircraftcarrierRotate] = useState('horizontal');
  //const dockRef = useRef(null); //in case we want to fix the ship inside the dock 
  const [activeShip, setActiveShip] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const boardRef = useRef(null);


  //GRID CREATION
  const createGrid = () => {
    let board = [];
    for (let i = 1; i <= gridSize * gridSize; i++) {
      board.push(
        <Square id={i} empty={'empty'} ship={null} hit={'no-hit'} />
      );
    }
    return <div id="placeship-grid">{board}</div>;
  };

  const createDock = () => {
    let Dock = [];
    Dock.push(createDestroyer());
    Dock.push(createSubmarine());
    Dock.push(createBattlecruiser());
    Dock.push(createAircraftcarrier());

    return <div id="dock">{Dock}</div>;
  };

  //SHIP CREATION------------------------------------------------
  const createDestroyer = () => {
    let ship = [];
    for (let i = 1; i <= 1; i++) {
      ship.push(
        <div className="Destroyer-shipsquare" key={i}>
          [{i}] Destroyer
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
          [{i}] Submarine
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
          [{i}] Battlecruiser
        </div>
      );
    }
    return (
      <div className={`Ship Battlecruiser ${battlecruiserRotate}`}
      onMouseMove={(e) => moveShip(e)}
      onMouseDown={(e) => grabShip(e)}
      onMouseUp={(e) => dropShip(e)}>
        <button onClick={() => rotateShip('battlecruiser')}>Rotate Battlecruiser</button>
      </div>
    );
  };

  const createAircraftcarrier = () => {
    let ship = [];
    for (let i = 1; i <= 1; i++) {
      ship.push(
        <div className="Aircraftcarrier-shipsquare" key={i}>
          [{i}] Aircraftcarrier
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
      setActiveShip(ship);
      ship.style.position = "absolute";
      ship.style.zIndex = "1000";
      
    document.addEventListener('mousemove', moveShip);
    document.addEventListener('mouseup', dropShip);

  }
}

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
    }
  }

  const dropShip = (e) =>{
    if (activeShip) {
      setActiveShip(null); 

      window.removeEventListener('mousemove', moveShip);
      window.removeEventListener('mouseup', dropShip);
      //window.removeEventListener('mousedown', dropShip);
    }
    e.preventDefault();
  }

  

  return (
    <div id="placeship">
      <h1>Grid</h1>
      <div ref={boardRef} >{createGrid()}</div>
      <div>
        {createDock()}</div>
    </div>
  );
}

export default PlaceShip;
