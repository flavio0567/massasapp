import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

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

export const StartusBarText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
`;

export const CartIcon = styled(Icon)`
  margin-right: 20px;
  color: #fff;
`;

export const QuantityView = styled.View`
  flex-direction: row;
  width: 80px;
  margin-bottom: 20px;
`;

export const AddRemoveButton = styled(RectButton)`
  width: 26px;
  height: 26px;
  background: #fd9e63;
  border-radius: 13px;
  margin: 14px -6px;
  justify-content: center;
  align-items: center;
`;

export const MinusText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const PlusText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const TextProdAmount = styled.Text`
  font-size: 16px;
  padding: 16px 16px;
  margin-left: 10px;
  width: 90px;
`;

export const ProductPriceView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProductLabelText = styled.Text`
  margin: 18px 20px;
  color: #ff9000;
  font-size: 14px;
  width: 130px;
  font-family: 'RobotoSlab-Regular';
`;

export const ProductText = styled.Text`
  margin: 20px 0 20px 20px;
  color: #666;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
`;

export const SelectionButton = styled.TouchableOpacity`
  padding: 5px;
`;

export const AddInformation = styled.Text`
  margin: 12px;
  color: #666;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
`;

export const Agreement = styled.View`
  flex-direction: row;

  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ButtonSelection = styled(RectButton)`
  width: 80%;
  height: 50px;
  background: #fd9e63;
  border-radius: 6px;
  margin: 10px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #fff;
  font-size: 16px;
  margin-right: 10px;
`;

export const LineSeparator = styled.View`
  width: 100%;
  border: 20px;
  border-color: #dcdcdc;
`;
