import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';

import Turn from './Turn';

const defaultStyle = { textAlign: 'center' };
const sentenceStyle = {
  ...defaultStyle,
  fontStyle: 'italic',
  fontWeight: 'bold',
};

const Overview = ({ game, loading, serverUrl }) => {
  if (game) {
    return (
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
  }

  if (loading) {
    return (<ActivityIndicator />);
  }

  return null;
};

Overview.propTypes = {
  game: PropTypes.shape({
    final_note: PropTypes.number.isRequired,
    sentence: PropTypes.string.isRequired,
    final_sentence: PropTypes.string.isRequired,
    turns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  serverUrl: PropTypes.string,
};

Overview.defaultProps = {
  game: [],
  serverUrl: '',
};

export default Overview;
