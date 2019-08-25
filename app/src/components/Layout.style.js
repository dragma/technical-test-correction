import styled from 'styled-components';

export const LayoutContainer = styled.KeyboardAvoidingView.attrs({ behavior: 'padding' })`
  flex: 1;
  width: 100%;
  flex-direction: column;
`;

export const LayoutTop = styled.View`
  height: 70px;
  width: 100%;
  justify-content: center;
  padding: 10px;
`;

export const LayoutBottom = styled.View`
  height: 100px;
  width: 100%;
  justify-content: center;
  padding: 10px;
`;

export const LayoutMiddle = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding: 10px;

  margin-bottom: 10px;
  border-bottom-color: grey;
  border-bottom-width: 1px;

  margin-top: 10px;
  border-top-color: grey;
  border-top-width: 1px;

  border-style: solid;
`;
