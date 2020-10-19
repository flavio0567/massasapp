import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #fff5e6;
`;

export const StartusBarText = styled.Text`
  font-size: 18px;
  flex: 1;
  margin: 0 78px 10px;

  font-family: 'RobotoSlab-Regular';
  color: #fff;
`;

export const BannerView = styled.View`
  height: 100px;
`;

export const BannerText = styled.Text`
  font-size: 24px;
  font-family: 'RobotoSlab-Regular';
  color: #fd9e63;

  margin: -40px 40px 30px;
`;

export const BannerImage = styled.Image`
  width: 100%;
  height: 60px;
  border-radius: 5px;
  opacity: 0.3;
`;

export const ChevronIcon = styled(Icon)`
  margin-left: 10px;
  color: #fff;
`;

export const Header = styled.SafeAreaView`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const SelectionButton = styled.TouchableOpacity`
  padding: 5px;
`;

export const Content = styled.View`
  margin: 34px 10px 20px;
`;

export const AddressView = styled.View`
  border-radius: 5px;
  background: #ffb85f;
  padding: 8px 10px 20px;
  height: ${hp('46%')}px;
`;

export const IconLocation = styled(Icon).attrs({
  size: 24,
  color: '#fff',
})`
  padding: 10px 160px 10px;
`;

export const AddressDetailView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
`;

export const AddressLabelText = styled.Text`
  padding-top: 10px;
  font-size: 14px;
  line-height: 24px;
  height: ${hp('5%')}px;
  width: ${wp('34%')}px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;

export const AddressText = styled.Text`
  padding-top: 10px;
  font-size: 16px;
  line-height: 30px;
  height: 44px;
  font-family: 'RobotoSlab-Regular';
  color: #3f3f3f;
`;

export const AddressNumberInput = styled.TextInput`
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  width: ${wp('54%')}px;
  height: ${hp('6%')}px;
  color: #3f3f3f;
  border-radius: 5px;
  background: #fdfbe7;
`;

export const AddressComplementInput = styled.TextInput`
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  width: ${wp('54%')}px;
  height: ${hp('6%')}px;
  color: #3f3f3f;
  border-radius: 5px;
  background: #fdfbe7;
`;

export const ConfirmButton = styled(RectButton)`
  position: absolute;
  height: 46px;
  background: #fd9e63;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: ${hp('50%')}px ${wp('16%')}px;
  width: ${wp('64%')}px;
`;

export const ConfirmText = styled.Text`
  flex: 1;
  margin: 10px;

  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
`;

export const AddInformation = styled.Text`
  margin: ${hp('14%')}px ${wp('16%')}px;
  color: #666;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
  width: ${wp('68%')}px;
`;
