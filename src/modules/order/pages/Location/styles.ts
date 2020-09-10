import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #fff5e6;
`;

export const StatusBarText = styled.Text`
  font-size: 18px;
  flex: 1;
  margin: 0 58px 0px;

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

export const Content = styled.View``;

export const SearchBox = styled.View`
  background: #ffd18d;
  padding-left: 10px;
  border-radius: 8px;
  margin: 64px;
`;

export const InputSearch = styled.TextInput`
  padding: 10px 32px 10px;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  width: 200px;
  color: #3f3f3f;
  background: #ffd18d;
`;

export const IconSearch = styled(Icon).attrs({
  size: 18,
  color: '#808080',
})`
  position: absolute;
  padding: 10px;
`;

export const CleanSearch = styled.TouchableOpacity``;

export const IconClose = styled(Icon).attrs({
  size: 18,
  color: '#808080',
})`
  position: absolute;
  top: -40px;
  right: 0;
  padding: 12px;
`;

export const ConfirmButton = styled(RectButton)`
  position: absolute;
  top: 60px;
  height: 46px;
  background: #fd9e63;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 100px 24px;
  width: 332px;
`;

export const ConfirmText = styled.Text`
  font-size: 18px;
  flex: 1;
  margin: 10px 70px 10px;

  font-family: 'RobotoSlab-Regular';
  color: #fff;
`;

export const TextInfo = styled.Text`
  left: 78px;
  top: -60px;
  bottom: 0;
  right: 0;
  color: #9a948c;
`;
