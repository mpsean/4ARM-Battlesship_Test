// id = number

// ---if ship present
// empty = no
// ship = shiptype
// hit = boolean

import './square.css';

export default function square({ id, empty, ship, hit }) {
  const className = ["square",
    id,
    empty,
    ship,
    hit].filter(Boolean).join(' ');


  return (
    <div className={className} key={id}>
      [{id}]
    </div>
  );
}