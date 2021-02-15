import styled from 'styled-components/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Feather';
import { RectButton, FlatList } from 'react-native-gesture-handler';
import { Product } from '.';

export const Container = styled.View`
  flex: 1;
  background: #fff5e6;
`;

export const ChevronIcon = styled(Icon)`
  margin-right: 20px;
  color: #fff;
`;

export const Header = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
`;

export const StatusBarText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
  margin: 0 154px 10px;
  width: 74px;
`;

export const CartIcon = styled(Icon)`
  color: #fff;
`;

export const TrashButton = styled.TouchableOpacity`
  padding: 5px;
  margin-left: -96px;
`;
export const SelectionButton = styled.TouchableOpacity``;

export const SectionSeparator = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LineSeparator = styled.View`
  height: 40px;
  width: 100%;
  background-color: #dcdcdc;
`;

export const ItemSeparator = styled.View`
  border: 0.5px;
  border-color: #dcdcdc;
`;

export const ProductLabelText = styled.Text`
  flex-flow: row wrap;
  margin: 0px 10px 0;
  color: #3f3f3f;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  padding: 10px;
`;

export const DeliveryLabelView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const DeliveryInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Delivery = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const UserText = styled.Text`
  flex-flow: row wrap;
  /* margin: 10px 10px 0px; */
  color: #3f3f3f;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  padding-bottom: 10px;
  width: 350px;
`;

export const PhoneView = styled.View`
  margin: -24px;
`;

export const DeliveryDateTimeInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const LocalizationText = styled.Text`
  flex-flow: row wrap;
  margin: 2px 10px 0;
  color: #3f3f3f;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  padding: 10px;
  width: 300px;
`;

export const ProductText = styled.Text`
  flex-flow: row wrap;
  margin: 2px 10px 0;
  color: #3f3f3f;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  padding: 10px;
  width: 350px;
`;

export const DeliveryLabelText = styled.Text`
  margin-left: 22px;
  color: #ff9000;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
  padding: 10px;
`;

export const DeliveryTextInfo = styled.Text`
  flex-flow: row wrap;
  margin: 2px 10px;
  color: #3f3f3f;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  padding: 10px;
  width: 300px;
`;

export const AddRemoveButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
  background: #fd9e63;
  border-radius: 13px;
  margin: 14px -6px;
  justify-content: center;
  align-items: center;
`;

export const SignalText = styled.Text`
  color: #fff;
  font-size: 22px;
`;

export const ListProducts = styled(FlatList as new () => FlatList<Product>)`
  /* padding-bottom: 200px; */
`;

export const ProductItem = styled.View`
  background: #fff;
  border-radius: 8px;
  margin: 4px 8px 4px;

  width: ${wp('96%')}px;
`;

export const ProductItemView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const ProductDetailText = styled.Text`
  width: 376px;
  font-size: 16px;
  padding: 8px 10px 0;
  font-family: 'RobotoSlab-Regular';
  color: #3f3f3f;
`;

export const QuantityView = styled.View`
  flex-direction: row;
  width: 80px;
  margin-bottom: 10px;
`;

export const DeleteIcon = styled(Icon)`
  margin-left: 10px;
  color: #fd9e63;
`;

export const DeleteButton = styled(RectButton)``;

export const AddInformation = styled.Text`
  margin: 2px 72px;
  color: #666;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
`;
export const SubTotalView = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 100px;
`;

export const SubTotalLabel = styled.Text`
  font-size: 10px;
  font-family: 'RobotoSlab-Medium';
  color: #999;
`;

export const TotalText = styled.Text`
  font-size: 12px;
  margin-right: 2px;
  color: #3f3f3f;
`;

export const TextProdAmount = styled.Text`
  width: 100px;
  font-size: 14px;
  padding: 18px 28px;
`;

export const RemoveItemButton = styled(RectButton)``;

export const ButtonContainer = styled.View`
  margin: 8px;
`;

export const ButtonSelection = styled(RectButton)`
  background: #fd9e63;
  border-radius: 6px;
  margin-left: ${wp('10%')}px;
  width: ${wp('78%')}px;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #fff;
  font-size: 16px;
  padding: 2px;
  margin-left: ${wp('17%')}px;
  width: ${wp('60%')}px;
`;

export const ButtonTextValue = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #3f3f3f;
  font-size: 16px;
  margin-left: ${wp('24%')}px;
  width: ${wp('60%')}px;
  padding-bottom: 2px;
`;

export const PaymentMethod = styled.View`
  flex-direction: row;
`;

export const CheckBoxAgreement = styled.TouchableOpacity`
  margin: 8px;
`;

export const Checkbox = styled.Text`
  height: 22px;
  width: 22px;
  border-radius: 4px;
  border-width: 1px;
  border-color: #666360;
`;

export const TextPaymentMethod = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 11px;
`;

export const PaymentMethodDisclaimer = styled.Text`
  font-size: 10px;
  font-family: 'RobotoSlab-Medium';
  color: #999;
  margin: 0 32px 10px;
`;
