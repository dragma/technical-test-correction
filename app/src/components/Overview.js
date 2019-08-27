import React from 'react';
import { Text } from 'react-native-elements';

import Turn from './Turn';

const defaultStyle = { textAlign: 'center' };
const sentenceStyle = {
  ...defaultStyle,
  fontStyle: 'italic',
  fontWeight: 'bold',
};

export default ({ game, serverUrl }) => !!game && (
  <>
    <Text style={sentenceStyle}>
      {`"${game.sentence}"`}
    </Text>
    <Text style={defaultStyle}>
      devient
    </Text>
    <Text style={sentenceStyle}>
      {`"${game.final_sentence}"`}
    </Text>
    <Text style={defaultStyle}>
      {`Note globale : ${Math.ceil(game.final_note * 200) / 10}/20`}
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
