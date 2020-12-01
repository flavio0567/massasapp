import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}
export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 8px;
  background: transparent;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #9a948c;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #fd9e63;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #666360;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 8px;
`;
