import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const StartusBarText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
`;

export const Container = styled.View`
  flex: 1;
  background: #fff5e6;
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

export const CartIcon = styled(Icon)`
  margin-right: 20px;
  color: #fff;
  z-index: -1;
`;

export const NavigationButton = styled.TouchableOpacity`
  margin-right: 15px;
`;

export const SelectionButton = styled.TouchableOpacity`
  padding: 5px;
  margin-top: 4px;
`;

export const SectionSeparator = styled.TouchableOpacity`
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;

export const LineSeparator = styled.View`
  height: 1px;
  width: 390px;
  margin: 0 10px 10px 10px;
  border: 0.3px;
  opacity: 0.2;
  border-color: #999;
`;

export const ProductText = styled.Text`
  flex-flow: row wrap;
  margin: 20px 20px 0;
  color: #666;
  max-width: 300px;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;

export const ComplementText = styled.Text`
  margin: 10px 20px 10px;
  color: #666;
  font-size: 13px;
  font-family: 'RobotoSlab-Regular';
`;

export const SearchBox = styled.View`
  background: #fff;
  padding: 0 10px 10px;
  align-content: center;
`;

export const InputSearch = styled.TextInput`
  padding: 2px 28px 0px;
  font-size: 18px;
  line-height: 30px;
  font-family: 'RobotoSlab-Regular';
  width: 500px;
  max-height: 64px;
  color: #fd9e63;
`;

export const IconSearch = styled(Icon).attrs({
  size: 18,
  color: '#FD9E63',
})`
  position: absolute;
  top: 4px;
  padding: 10px;
`;
