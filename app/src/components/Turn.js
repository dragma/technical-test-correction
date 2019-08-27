import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Icon } from 'react-native-elements';
import { Audio } from 'expo-av';

import { TurnContainer, TurnPlayContainer } from './Turn.style';

const extractVoice = (voice) => {
  const [lang] = voice.split('_');
  let name = voice.split('_')[1].split('V3')[0];
  if (name.indexOf('Voice') !== -1) {
    [name] = name.split('Voice');
  }
  return `${name} (${lang})`;
};

const Turn = ({
  _id, sentence, position, voice, note, serverUrl,
}) => {
  const [playSound, setPlaySound] = useState(false);
  const [loading, setLoading] = useState(false);

  const play = async () => {
    setLoading(true);
    const soundObject = new Audio.Sound();
    soundObject.setOnPlaybackStatusUpdate(({ positionMillis, durationMillis }) => {
      if (positionMillis && positionMillis === durationMillis) {
        setTimeout(() => {
          soundObject.stopAsync()
            .then(() => {
              setLoading(false);
              setPlaySound(false);
            });
        }, 500);
      }
    });
    const source = {
      uri: `${serverUrl}/sound?turnId=${_id}`,
    };
    await soundObject.loadAsync(source);
    await soundObject.playAsync();
  };

  useEffect(() => {
    if (playSound) {
      play();
    }
  }, [playSound]);

  const noteStyle = { fontSize: 11 };
  const sentenceStyle = { fontSize: 13, marginTop: 10 };

  return (
    <TurnContainer>
      <Text h1>
        {`Tour n°${position}`}
      </Text>
      <Text h2>
        {`Voix : ${extractVoice(voice)}`}
      </Text>
      <Text style={noteStyle}>
        {`Note : ${Math.ceil(note * 200) / 10}/20`}
      </Text>
      <Text style={sentenceStyle}>
        {`> ${sentence}`}
      </Text>
      <TurnPlayContainer>
        <Button
          icon={(
            <Icon
              name="play-circle-outline"
              size={15}
              color="#4388D6"
            />
          )}
          loading={loading}
          loadingProps={{ size: 12 }}
          onPress={() => setPlaySound(true)}
          type="clear"
        />
      </TurnPlayContainer>
    </TurnContainer>
  );
};

Turn.propTypes = {
  _id: PropTypes.string.isRequired,
  sentence: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  voice: PropTypes.string.isRequired,
  note: PropTypes.number.isRequired,
  serverUrl: PropTypes.string.isRequired,
};

export default Turn;
