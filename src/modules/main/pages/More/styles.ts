import styled from 'styled-components/native';

import { FlatList } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Order from '.';

export const Container = styled.View`
  flex: 1;
  background: #fff5e6;
`;

export const StatusBarText = styled.Text`
  font-size: 18px;
  margin-right: 200px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
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
  margin-top: 4px;
`;

export const LineSeparator = styled.View`
  height: 40px;
  width: 100%;
  background-color: #dcdcdc;
`;

export const ProductLabelText = styled.Text`
  flex-flow: row wrap;
  margin: 0px 10px 0;
  color: #3f3f3f;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  padding: 10px;
`;

export const ProductText = styled.Text`
  margin: 2px 10px 0;
  color: #3f3f3f;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
`;

export const ListOrders = styled(FlatList as new () => FlatList<typeof Order>)`
  padding-bottom: 20px;

  margin-top: 4px;
`;

export const OrderItem = styled.View`
  background: #fff;
  border-radius: 8px;
  margin: 2px 28px 4px;
  padding: 4px;
  width: ${wp('84%')}px;
  height: ${hp('6%')}px;
`;

export const OrderDetail = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const OrderDetailText = styled.Text`
  width: 176px;
  font-size: 16px;
  padding: 8px 10px 0;
  font-family: 'RobotoSlab-Regular';
  color: #3f3f3f;
`;

export const OpenButton = styled.TouchableHighlight`
  border-radius: 20px;
  width: 70px;
  padding-bottom: 2px;
  margin: 4px;
`;

export const ModalOrderDetail = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const ModalOrderItemDetail = styled.View`
  background: #fff;
  border-radius: 8px;
  margin: 4px;
  padding: 6px;
  width: ${wp('84%')}px;
  height: 60px;
`;

export const ModalOrderDetailText = styled.Text`
  width: 300px;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
  color: #3f3f3f;
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
  color: #fd9e63;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  padding: 5px 0 5px;
`;

export const IconLogIn = styled(FeatherIcon)`
  margin-right: 10px;
  padding-top: 5px;
`;
