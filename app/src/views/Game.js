import React, { useState, useEffect } from 'react';
import { Text } from 'react-native-elements';

import Layout from '../components/Layout';
import HostSelector from '../components/HostSelector';
import createClient from '../clients/request';

export default () => {
  const [host, setHost] = useState('192.168.43.21');
  const [port, setPort] = useState('3000');
  const [selected, setSelected] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (selected) {
      const tempClient = createClient({ host, port });
      tempClient.get('/ping')
        .then(() => setClient(() => tempClient));
    } else {
      setClient(null);
    }
  }, [selected])

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
      bottom={null}
    >
      {null}
    </Layout>
  )
};
