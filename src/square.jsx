// id = number

// ---if ship present
// empty = no
// ship = shiptype
// hit = boolean

import './square.css';

export default function square({ id, ship}) {
  const className = ["square",
    id,
    ship,
    ].filter(Boolean).join(' ');


  return (
    <div className={className} key={id}>
      [{id}]
    </div>
  );
}