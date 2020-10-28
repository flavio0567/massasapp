import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 34px 260px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #999;
  font-family: 'RobotoSlab-Medium';
  padding: 10px 40px;
  width: ${wp('88%')}px;
`;

export const Image = styled.Image`
  margin: 100px 0 100px;
  width: 200px;
  height: 30px;
`;

export const IconLocation = styled(Icon).attrs({
  size: 24,
})`
  color: #ff9000;
  padding: 10px 140px 10px;
`;

export const AddressText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #666;
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

export const AddInformation = styled.Text`
  position: absolute;
  top: ${hp('32%')}px;
  left: ${wp('4%')}px;
  color: #666;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
  width: ${wp('68%')}px;
`;
