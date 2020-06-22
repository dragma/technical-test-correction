import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import Layout from '../components/Layout';
import HostSelector from '../components/HostSelector';
import SentenceForm from '../components/SentenceForm';
import Overview from '../components/Overview';

import createClient from '../clients/request';

export default () => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [selected, setSelected] = useState(false);
  const [client, setClient] = useState(null);
  const [connectionLoading, setConnexionLoading] = useState(false);

  const [sentence, setSentence] = useState('');
  const [turns, setTurns] = useState('1');
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(false);

  const [game, setGame] = useState(null);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem('host')
        .then((h) => {
          setHost(h);
          return h;
        }),
      AsyncStorage.getItem('port')
        .then((p) => {
          setPort(p);
          return p;
        }),
    ]).then(([h, p]) => {
      if (h && p) setSelected(true);
    });
  }, []);

  useEffect(() => {
    if (selected) {
      setConnexionLoading(true);
      const tempClient = createClient({ host, port });
      tempClient.get('/ping')
        .then(() => {
          setClient(() => tempClient);
          setConnexionLoading(false);
        })
        .catch(() => {
          console.log('Impossible connexion with server');
          setSelected(false);
          setConnexionLoading(false);
        });
    } else {
      setClient(null);
    }
  }, [selected]);

  useEffect(() => {
    if (play) {
      setLoading(true);
      client.get('/play', { params: { text: sentence, turns } })
        .then((response) => {
          setGame(response.data);
          setLoading(false);
          setPlay(false);
        })
        .catch(() => {
          console.log('Error during play');
          setLoading(false);
          setPlay(false);
        });
    }
  }, [play]);

  return (
    <Layout
      top={(
        <HostSelector
          host={host}
          port={port}
          onHostChange={(text) => {
            setHost(text);
            setClient(null);
            setSelected(false);
            AsyncStorage.setItem('host', text);
          }}
          onPortChange={(text) => {
            setPort(text);
            setClient(null);
            setSelected(false);
            AsyncStorage.setItem('port', text);
          }}
          onValidate={() => {
            if (host && port) {
              setSelected(true);
            }
          }}
          clientOk={!!client}
          loading={connectionLoading}
        />
      )}
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
              setGame(null);
            }
          }}
        />
      )}
    >
      <Overview
        game={game}
        loading={loading}
        serverUrl={client && client.defaults.baseURL}
      />
    </Layout>
  );
};
