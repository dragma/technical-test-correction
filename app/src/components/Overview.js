import React from'react';

import Turn from './Turn';

export default ({ game }) => !!game && (
  <>
    {game.turns.map((turn, key) => (
      <Turn
        key={turn._id}
        position={key + 1}
        {...turn}
      />
    ))}
  </>
);
