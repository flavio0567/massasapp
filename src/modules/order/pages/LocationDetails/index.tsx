import React, { useCallback, useState } from 'react';

import { View, StatusBar, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as Yup from 'yup';

import { useDeliveryLocalization } from '../../../../shared/hooks/deliveryLocalization';

import * as CartActions from '../../../../store/modules/cart/actions';

import {
  StartusBarText,
  Container,
  SelectionButton,
  Header,
  ChevronIcon,
  Content,
  AddressNumberInput,
  AddressComplementInput,
  AddressView,
  AddressText,
  AddressLabelText,
  IconLocation,
  AddressDetailView,
  ConfirmButton,
  ConfirmText,
  AddInformation,
} from './styles';

export interface Address {
  cep: string | number;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
}

const LocationDetails: React.FC = ({ route }: any) => {
  const { userAddress } = route.params;
  const { navigate, goBack } = useNavigation();

  const [numberAddress, setNumberAddress] = useState<string>();
  const [complementAddress, setComplementAddress] = useState<string>();

  const dispatch = useDispatch();

  const { setLocalization } = useDeliveryLocalization();

  const handleConfirmLocation = useCallback(async () => {
    if (!numberAddress) {
      Alert.alert(
        'Endereço de entrega',
        'Ocorreu erro, o número é obrigatório.',
      );
      return;
    }

    const item = { ...userAddress };
    item.numberAddress = numberAddress;
    item.complementAddress = complementAddress;
    const deliveryAddress = item;

    dispatch({
      type: '@order/ADD_ADDRESS',
      deliveryAddress,
    });

    await AsyncStorage.removeItem('@Massas:deliveryLocalization');

    AsyncStorage.setItem(
      '@Massas:deliveryLocalization',
      JSON.stringify(deliveryAddress),
    );

    await AsyncStorage.getItem('@Massas:deliveryLocalization');

    setLocalization(deliveryAddress);

    navigate('DateTimeDelivery');
  }, [
    numberAddress,
    userAddress,
    dispatch,
    navigate,
    complementAddress,
    setLocalization,
  ]);

  return (
    <Container>
      <View
        style={{
          backgroundColor: '#FD9E63',
          height: Platform.OS === 'ios' ? 80 : 40,
        }}
      >
        <Header>
          <SelectionButton onPress={() => goBack()}>
            <ChevronIcon name="chevron-left" size={22} />
          </SelectionButton>
          <StatusBar backgroundColor="#FD9E63" barStyle="light-content" />
          <StartusBarText>Endereço de entrega</StartusBarText>
        </Header>
        <Content>
          {userAddress && (
            <AddressView>
              <IconLocation name="map-pin" />
              <AddressText>{userAddress.street}, </AddressText>
              <AddressText>
                {userAddress.neighborhood} - {userAddress.cep}
              </AddressText>
              <AddressText>
                {userAddress.city} - {userAddress.state}
              </AddressText>
              <AddressDetailView>
                <AddressLabelText>Número: </AddressLabelText>
                <AddressNumberInput
                  onChangeText={(num: string) => setNumberAddress(num)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  autoFocus
                >
                  {numberAddress}
                </AddressNumberInput>
              </AddressDetailView>

              <AddressDetailView>
                <AddressLabelText>Complemento: </AddressLabelText>
                <AddressComplementInput
                  onChangeText={(text: string) => setComplementAddress(text)}
                  returnKeyType="go"
                  autoCorrect={false}
                >
                  {complementAddress}
                </AddressComplementInput>
              </AddressDetailView>
            </AddressView>
          )}
          <ConfirmButton onPress={() => handleConfirmLocation(numberAddress)}>
            <ConfirmText>Confirme o Endereço</ConfirmText>
          </ConfirmButton>
          <AddInformation>
            Taxa de Delivery: Mogi Mirim centro R$3,00, demais regiões R$ 5,00.
            Mogi Guaçu R$ 10,00. Outras regiões sob consulta. O valor final do
            pedido será confirmado por telefone.
          </AddInformation>
        </Content>
      </View>
    </Container>
  );
};

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(LocationDetails);
