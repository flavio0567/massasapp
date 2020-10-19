import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 30px;
  color: #fd9e63;
  width: 194px;
  font-family: 'RobotoSlab-Medium';
  margin: 0 54px;
  padding-left: 20px;
`;

export const Description = styled.Text`
  margin: 6px 22px;
  padding-left: 34px;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #fd9e63;
  width: 250px;
`;

export const OkButton = styled(RectButton)`
  background: #fd9e63;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  margin: 24px 24px 10px;
  padding: 12px;
`;

export const OkButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;

export const SuccessView = styled.View`
  border-radius: 10px;
  background: #fff;
  padding: 8px 10px 20px;
`;
