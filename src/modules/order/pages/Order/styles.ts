import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Product } from '.';

export const Container = styled.View`
  flex: 1;
  background: #fff5e6;
`;

export const Header = styled.SafeAreaView`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const SelectionButton = styled.TouchableOpacity`
  padding: 5px;
  margin-top: 4px;
`;

export const ChevronIcon = styled(Icon)`
  margin-left: 10px;
  color: #fff;
`;

export const CartIcon = styled(Icon)`
  margin-right: 20px;
  color: #fff;
  z-index: -1;
`;

export const StartusBarText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
  /* width: 100px; */
  /* margin: 0 150px 10px; */
`;

export const ProductList = styled(FlatList as new () => FlatList<Product>)`
  padding: 12px 8px;
`;

export const ProductContainer = styled(RectButton)`
  width: 168px;
  height: 164px;
  background: #ffcc50;
  margin: 6px;
  border-radius: 6px;
  border: 0.5px solid #ffcc50;
`;

export const ProductImage = styled.Image`
  width: 160px;
  height: 118px;
`;

export const FamilyProductText = styled.Text`
  color: #666;
  font-size: 16px;
  width: 152px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  margin: 0 10px;
`;
