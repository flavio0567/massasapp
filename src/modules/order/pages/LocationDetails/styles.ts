import styled from 'styled-components/native';
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
  margin: 44px 10px 20px;
`;

export const AddressView = styled.View`
  border-radius: 5px;
  background: #ffb85f;
  padding: 8px 10px 20px;
  height: 294px;
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
  padding: 10px;
  font-size: 14px;
  line-height: 24px;
  height: 40px;
  width: 140px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;

export const AddressText = styled.Text`
  padding: 10px;
  font-size: 16px;
  line-height: 30px;
  height: 44px;
  font-family: 'RobotoSlab-Regular';
  color: #3f3f3f;
`;

export const AddressNumberInput = styled.TextInput`
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  width: 184px;
  height: 34px;
  color: #3f3f3f;
  border-radius: 5px;
  background: #fdfbe7;
`;

export const AddressComplementInput = styled.TextInput`
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  width: 184px;
  height: 38px;
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
  margin: 320px 12px;
  width: 332px;
`;

export const ConfirmText = styled.Text`
  flex: 1;
  margin: 10px;

  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
`;
