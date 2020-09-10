import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 60px 160px;
`;

export const SectionSeparator = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LineSeparator = styled.View`
  height: 2px;
  width: 140px;
  margin: 0 10px 80px 10px;
  border: 1px;
  border-color: #999;
`;

export const TextSeparator = styled.Text`
  margin-bottom: 80px;
  color: #999;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #999;
  font-family: 'RobotoSlab-Medium';
  padding: 40px;
`;

export const Image = styled.Image`
  margin: 100px 0 100px;
  width: 200px;
  height: 30px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  top: 20px;
  margin: 10px;
`;

ForgotPasswordButton.displayName = 'ForgotPasswordButton';

export const GuestText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #fd9e63;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fd9e63;
  border-top-width: 1px;
  border-color: #312e38;
  padding: 10px 0 ${10 + getBottomSpace()}px;

  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const CreateAccountButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 10px;
`;

export const ReturnButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  top: 20px;
  margin: 10px;
`;

export const ReturnButtonText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #fd9e63;
`;
