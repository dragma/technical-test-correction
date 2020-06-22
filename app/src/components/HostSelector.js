import React from 'react';
import PropTypes from 'prop-types';
import {
  Input, Button, Icon, Text,
} from 'react-native-elements';
import {
  IpSelectorContainer,
  IpSelectorHost,
  IpSelectorPort,
  IpSelectorSubmit,
} from './HostSelector.style';

const altButtonStyle = {
  backgroundColor: '#00ce00',
  borderColor: '#00ce00',
};

const HostSelector = ({
  loading, clientOk, host, port, onHostChange, onPortChange, onValidate,
}) => (
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
        icon={(
          <Icon
            name="check-circle"
            size={15}
            color="white"
          />
        )}
        onPress={onValidate}
        loading={loading}
        loadingProps={{ size: 12 }}
      />
      )}
      {clientOk && (
      <Button
        type="outline"
        buttonStyle={altButtonStyle}
        icon={(
          <Icon
            name="check-circle"
            size={15}
            color="white"
          />
        )}
      />
      )}
    </IpSelectorSubmit>
  </IpSelectorContainer>
);

HostSelector.propTypes = {
  loading: PropTypes.bool.isRequired,
  clientOk: PropTypes.bool.isRequired,
  host: PropTypes.string,
  port: PropTypes.string,
  onHostChange: PropTypes.func.isRequired,
  onPortChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
};

HostSelector.defaultProps = {
  host: '',
  port: '',
};

export default HostSelector;
