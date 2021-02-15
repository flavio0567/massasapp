import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import FeatherIcon from 'react-native-vector-icons/Feather';

export const TitleView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 34px;
  color: #fff;
  font-family: 'RobotoSlab-Medium';
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  width: 270px;
  color: #fff;
  padding: 20px;
  font-family: 'RobotoSlab-Medium';
`;

export const ButtonContainer = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 10px 0 ${60 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
`;

export const ButtonSelection = styled(RectButton)`
  width: 80%;
  height: 50px;
  background: #fd9e63;
  border-radius: 6px;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #fff;
  font-size: 18px;
`;

export const GuestSelection = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 10px 0 ${10 + getBottomSpace()}px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const GuestText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #fd9e63;
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 8px;
`;
