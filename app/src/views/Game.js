import React, { useState, useEffect } from 'react';
import { Text } from 'react-native-elements';

import Layout from '../components/Layout';
import HostSelector from '../components/HostSelector';
import SentenceForm from '../components/SentenceForm';

import createClient from '../clients/request';

export default () => {
  const [host, setHost] = useState('192.168.43.21');
  const [port, setPort] = useState('3000');
  const [selected, setSelected] = useState(false);
  const [client, setClient] = useState(null);

  const [sentence, setSentence] = useState('');
  const [turns, setTurns] = useState('1');
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(false);

  const [game, setGame] = useState(null);

  useEffect(() => {
    if (selected) {
      const tempClient = createClient({ host, port });
      tempClient.get('/ping')
        .then(() => setClient(() => tempClient));
    } else {
      setClient(null);
    }
  }, [selected])

  useEffect(() => {
    if (play) {
      setLoading(true);
      client.get('play', { params: { text: sentence, turns }})
        .then(response => {
          setGame(response.data);
          setLoading(false);
          setPlay(false);
        });
    }
  }, [play])

  return (
    <Layout
      top={
        <HostSelector
          host={host}
          port={port}
          onHostChange={text => {
            setHost(text);
            setClient(null);
            setSelected(false);
          }}
          onPortChange={text => {
            setPort(text);
            setClient(null);
            setSelected(false);
          }}
          onValidate={() => {
            if (host && port) {
              setSelected(true);
            }
          }}
          clientOk={!!client}
        />
      }
      bottom={(
        <SentenceForm
          disabled={!client || loading}
          sentence={sentence}
          onChangeSentence={setSentence}
          turns={turns}
          onChangeTurns={setTurns}
          onPressPlay={() => {
            if (turns && sentence) {
              setPlay(true);
              setGame(null)
            }
          }}
        />
      )}
    >
      {!!game && <Text>{JSON.stringify(game, null, 2)}</Text>}
    </Layout>
  )
};
