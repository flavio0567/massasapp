import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { FlatList, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Product } from '.';

export const Container = styled.View`
  flex: 1;
  background: #fff5e6;
`;

export const Header = styled.SafeAreaView`
  flex-direction: row;
`;

export const SelectionButton = styled.TouchableOpacity`
  padding: 5px;
  margin-top: 2px;
  margin-left: -64px;
`;

export const CartIcon = styled(Icon)`
  margin-right: 20px;
  color: #fff;
  /* z-index: -1; */
`;

export const StartusBarText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;

  width: 82px;

  margin-left: ${Platform.OS === 'ios' && Platform.Version >= 13 ? 142 : 140}px;
  margin-right: ${Platform.OS === 'ios' && Platform.Version >= 13
    ? 162
    : 112}px;
`;

export const ProductList = styled(FlatList as new () => FlatList<Product>)`
  padding: 10px 8px;
`;

export const ProductContainer = styled(RectButton)`
  width: 190px;
  flex-grow: 4;
  flex-shrink: 2;
  height: 164px;
  background: #ffcc50;
  margin: 4px;
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
  margin: 0 6px;
`;
