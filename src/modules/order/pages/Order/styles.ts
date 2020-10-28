import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Product } from '.';

export const Container = styled.View`
  flex: 1;
  background: #fff5e6;
`;

export const Header = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-around;
`;

export const SelectionButton = styled.TouchableOpacity`
  padding: 5px;
  margin-top: 2px;
  margin-left: -64px;
`;

export const CartIcon = styled(Icon)`
  margin-right: 20px;
  color: #fff;
  z-index: -1;
`;

export const StartusBarText = styled.Text`
  justify-content: center;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;

  width: ${wp('50%')}px;
  margin-left: ${hp('16%')}px;
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
  width: 100%;
  height: 64%;
`;

export const FamilyProductText = styled.Text`
  color: #666;
  font-size: ${wp('4.8%')}px;
  width: ${wp('50%')}px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  margin: ${hp('1%')}px 6px;
`;
