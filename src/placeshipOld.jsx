import React, { useState } from 'react';
import './placeship.css';
import Square from './square.jsx';

const gridSize = 8;

function PlaceShip() {
  const [destroyerRotate, setDestroyerRotate] = useState('horizontal');
  const [submarineRotate, setSubmarineRotate] = useState('horizontal');
  const [battlecruiserRotate, setBattlecruiserRotate] = useState('horizontal');
  const [aircraftcarrierRotate, setAircraftcarrierRotate] = useState('horizontal');

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
    for (let i = 1; i <= 4; i++) {
      ship.push(
        <div className="Destroyer-shipsquare" key={i}>
          [{i}] Destroyer
        </div>
      );
    }
    return (
      <div className={`Destroyer ${destroyerRotate}`} draggable>
        {ship}
        <button onClick={() => rotateShip('destroyer')}>Rotate Destroyer</button>
      </div>
    );
  };

  const createSubmarine = () => {
    let ship = [];
    for (let i = 1; i <= 4; i++) {
      ship.push(
        <div className="Submarine-shipsquare" key={i}>
          [{i}] Submarine
        </div>
      );
    }
    return (
      <div className={`Submarine ${submarineRotate}`} draggable>
        {ship}
        <button onClick={() => rotateShip('submarine')}>Rotate Submarine</button>
      </div>
    );
  };

  const createBattlecruiser = () => {
    let ship = [];
    for (let i = 1; i <= 4; i++) {
      ship.push(
        <div className="Battlecruiser-shipsquare" key={i}>
          [{i}] Battlecruiser
        </div>
      );
    }
    return (
      <div className={`Battlecruiser ${battlecruiserRotate}`} draggable>
        {ship}
        <button onClick={() => rotateShip('battlecruiser')}>Rotate Battlecruiser</button>
      </div>
    );
  };

  const createAircraftcarrier = () => {
    let ship = [];
    for (let i = 1; i <= 4; i++) {
      ship.push(
        <div className="Aircraftcarrier-shipsquare" key={i}>
          [{i}] Aircraftcarrier
        </div>
      );
    }
    return (
      <div className={`Aircraftcarrier ${aircraftcarrierRotate}`} draggable>
        {ship}
        <button onClick={() => rotateShip('aircraftcarrier')}>Rotate Aircraft Carrier</button>
      </div>
    );
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

  return (
    <div id="placeship">
      <h1>Grid</h1>
      <div>{createGrid()}</div>
      <div>{createDock()}</div>
    </div>
  );
}

export default PlaceShip;
