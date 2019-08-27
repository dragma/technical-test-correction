import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Icon } from 'react-native-elements';

import {
  SentenceFormContainer,
  SentenceFormInputContainer,
  SentenceFormButtonContainer,
} from './SentenceForm.style';

const SentenceForm = ({
  disabled, sentence, onChangeSentence, turns, onChangeTurns, onPressPlay,
}) => (
  <>
    <SentenceFormContainer>
      <SentenceFormInputContainer>
        <Input
          placeholder="Il était une fois..."
          editable={!disabled}
          value={sentence}
          onChangeText={onChangeSentence}
          label="Texte"
        />
      </SentenceFormInputContainer>
      <SentenceFormButtonContainer>
        <Input
          placeholder="1, 2, 3, etc."
          keyboardType="numeric"
          editable={!disabled}
          value={turns}
          onChangeText={onChangeTurns}
          label="Tours"
        />
      </SentenceFormButtonContainer>
      <SentenceFormButtonContainer>
        <Button
          disabled={disabled}
          icon={(
            <Icon
              name="send"
              size={15}
              color="white"
            />
          )}
          onPress={onPressPlay}
        />
      </SentenceFormButtonContainer>
    </SentenceFormContainer>
  </>
);

SentenceForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  sentence: PropTypes.string.isRequired,
  onChangeSentence: PropTypes.func.isRequired,
  turns: PropTypes.string.isRequired,
  onChangeTurns: PropTypes.func.isRequired,
  onPressPlay: PropTypes.func.isRequired,
};

export default SentenceForm;
