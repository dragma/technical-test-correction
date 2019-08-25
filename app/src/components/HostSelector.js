import React from 'react';
import { Input, Button, Icon, Text } from 'react-native-elements';
import {
  IpSelectorContainer,
  IpSelectorHost,
  IpSelectorPort,
  IpSelectorSubmit
} from './HostSelector.style';

export default ({ clientOk, host, port, onHostChange, onPortChange, onValidate }) => (
  <IpSelectorContainer>
    <Text>http://</Text>
    <IpSelectorHost>
      <Input
        label="host"
        placeholder="192.168.0.10"
        value={host}
        onChangeText={onHostChange}
      />
    </IpSelectorHost>
    <Text>:</Text>
    <IpSelectorPort>
      <Input
        label="port"
        placeholder="Port"
        value={port}
        onChangeText={onPortChange}
      />
    </IpSelectorPort>
    <IpSelectorSubmit>
      {!clientOk && (
        <Button
          icon={
            <Icon
              name="check-circle"
              size={15}
              color="white"
            />
          }
          onPress={onValidate}
        />
      )}
      {clientOk && (
        <Button
          type="outline"
          buttonStyle={{
            backgroundColor: '#00ce00',
            borderColor: '#00ce00',
          }}
          icon={
            <Icon
              name="check-circle"
              size={15}
              color="white"
            />
          }
        />
      )}
    </IpSelectorSubmit>
  </IpSelectorContainer>
)
