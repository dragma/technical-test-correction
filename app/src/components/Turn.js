import React from 'react';
import { Text, Card } from 'react-native-elements';

const extractVoice = (voice) => {
  const [lang] = voice.split('_');
  let name = voice.split('_')[1].split('V3')[0];
  if (name.indexOf('Voice') !== -1) {
    name = name.split('Voice')[0]
  }
  return `${name} (${lang})`;
};

export default ({ sentence, position, voice, note }) => (
  <Card>
    <Text h1>Tour n°{position}</Text>
    <Text h2>Voix : {extractVoice(voice)}</Text>
    <Text style={{ fontSize: 11 }}>Note : {Math.ceil(note * 200)  / 10}/20</Text>
    <Text style={{ fontSize: 13, marginTop: 10 }}>> {sentence}</Text>
  </Card>
);
