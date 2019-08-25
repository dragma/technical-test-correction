import React from 'react';
import { SentenceFormContainer, SentenceFormInputContainer, SentenceFormButtonContainer, SentenceFormTurnsContainer, ButtonTheme } from './SentenceForm.style';
import { ThemeProvider, Input, Button, Icon, Text } from 'react-native-elements';

export default ({ disabled, sentence, onChangeSentence, turns, onChangeTurns, onPressPlay }) => (
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
          icon={
            <Icon
              name="send"
              size={15}
              color="white"
            />
          }
          onPress={onPressPlay}
        />
      </SentenceFormButtonContainer>
    </SentenceFormContainer>
  </>
)
