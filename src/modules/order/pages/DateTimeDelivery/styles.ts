import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';

interface HourProps {
  available: boolean;
  selected: boolean;
}
interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: #fff5e6;
`;

export const Header = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StartusBarText = styled.Text`
  font-size: 18px;
  flex: 1;
  margin: 0 64px 10px;

  font-family: 'RobotoSlab-Regular';
  color: #fff;
`;

export const DeliveryInfo = styled.View`
  margin: 12px 12px 0;
`;

export const ProductText = styled.Text`
  flex-flow: row wrap;
  margin: 10px 10px 0;
  color: #3f3f3f;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  padding: 10px;
`;

export const SelectionButton = styled.TouchableOpacity`
  padding: 5px;
`;

export const DeliveryUserView = styled.View`
  border-radius: 5px;
  background: #f3d5ad;
`;

export const DeliveryUserInputView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* margin: 10px; */
`;

export const DeliveryUserLabelText = styled.Text`
  font-size: 12px;
  margin-left: 10px;
  color: #3f3f3f;
  font-family: 'RobotoSlab-Regular';
`;

export const DeliveryUserInput = styled.TextInput`
  padding: 10px;
  margin-right: 30px;
  margin-bottom: 10px;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #3f3f3f;
  border-radius: 5px;
  background: #efb661;
  width: 220px;
`;

export const DeliveryMobileInput = styled(TextInputMask)`
  padding: 10px;
  margin-right: 30px;
  margin-bottom: 10px;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #3f3f3f;
  border-radius: 5px;
  background: #efb661;
  width: 220px;
`;

export const ContentDateTime = styled.ScrollView``;

export const ChevronIcon = styled(Icon)`
  margin-left: 10px;
  color: #fff;
`;

export const SelectButton = styled.TouchableOpacity`
  padding: 5px;
  top: -5px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #fd9e63;
  font-size: 22px;
  margin: 0 26px;
  padding: 26px;
`;

export const OpenDataPickerButton = styled(RectButton)`
  height: 46px;
  background: #fd9e63;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 12px 14px;
`;

export const OpenDataPickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #232129;
`;

export const DateTimeSection = styled.View``;

export const ConfirmButton = styled(RectButton)`
  /* position: absolute;
  top: 140px; */
  height: 46px;
  background: #fd9e63;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
  width: 340px;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const LabelText = styled.Text`
  font-size: 18px;
  color: #be6a14;
  font-family: 'RobotoSlab-Medium';
  margin: 0 64px 12px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: ${(props) => (props.selected ? '#ff9000' : '#efc06e')};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;
