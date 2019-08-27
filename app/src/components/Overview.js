import React from'react';
import { Text } from 'react-native-elements';

import Turn from './Turn';

export default ({ game, serverUrl }) => !!game && (
  <>
    <Text style={{
      textAlign: 'center',
      fontStyle: 'italic',
      fontWeight: 'bold',
    }}>
      "{game.sentence}"
    </Text>
    <Text style={{
      textAlign: 'center',
    }}>
      devient
    </Text>
    <Text style={{
      textAlign: 'center',
      fontStyle: 'italic',
      fontWeight: 'bold',
    }}>
      "{game.final_sentence}"
    </Text>
    <Text style={{
      textAlign: 'center',
    }}>
      Note globale : {Math.ceil(game.final_note * 200) / 10}/20
    </Text>
    {game.turns.map((turn, key) => (
      <Turn
        key={turn._id}
        position={key + 1}
        serverUrl={serverUrl}
        {...turn}
      />
    ))}
  </>
);
