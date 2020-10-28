import React, { useCallback, useRef, useState } from 'react';

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';

import { useDispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from '../../../../shared/components/Input';
import Button from '../../../../shared/components/Button';

import { useDeliveryLocalization } from '../../../../shared/hooks/deliveryLocalization';

import * as CartActions from '../../../../store/modules/cart/actions';

import {
  Container,
  Title,
  AddInformation,
  AddressText,
  IconLocation,
} from './styles';

interface SignInFormData {
  number: number;
  complement: string;
}

const LocationDetails: React.FC = ({ route }: any) => {
  const { userAddress } = route.params;
  const dispatch = useDispatch();
  const { setLocalization } = useDeliveryLocalization();

  const [numberAddress, setNumberAddress] = useState<string>();
  const [complementAddress, setComplementAddress] = useState<string>();

  const formRef = useRef<FormHandles>(null);
  const complementInputRef = useRef<TextInput>(null);

  const { reset } = useNavigation();

  const handleConfirmLocation = useCallback(
    async (data: SignInFormData) => {
      try {
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

        reset({ index: 0, routes: [{ name: 'DateTimeDelivery' }] });
      } catch (err) {
        Alert.alert(
          'Endereço de entrega!',
          'Ocorreu erro, o número é obrigatório.',
        );
      }
    },
    [
      complementAddress,
      dispatch,
      numberAddress,
      reset,
      setLocalization,
      userAddress,
    ],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
          style={{
            backgroundColor: '#FFF5e6',
            height: hp('3%'),
          }}
        >
          <Container>
            <View
              style={{
                backgroundColor: '#FD9E63',
                height: hp('10%'),
              }}
            />
            <View>
              <Title allowFontScaling={false}>Endereço de entrega</Title>
              {userAddress && (
                <>
                  <IconLocation name="map-pin" />
                  <AddressText>
                    {userAddress.street}, {numberAddress}, {complementAddress}{' '}
                    {userAddress.neighborhood} - {userAddress.city},{' '}
                    {userAddress.state}, {userAddress.cep}
                    {'\n'}
                  </AddressText>
                </>
              )}
            </View>

            <Form ref={formRef} onSubmit={handleConfirmLocation}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="phone-pad"
                name="number"
                icon=""
                placeholder="Número do logradouro"
                returnKeyType="next"
                onChangeText={(num: string) => setNumberAddress(num)}
                onSubmitEditing={() => {
                  complementInputRef.current?.focus;
                }}
              />

              <Input
                ref={complementInputRef}
                name="complement"
                icon=""
                autoCorrect={false}
                placeholder="Complemento"
                returnKeyType="send"
                onChangeText={(text: string) => setComplementAddress(text)}
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Confirme o Endereço
              </Button>
              <AddInformation allowFontScaling={false}>
                Taxa de Delivery: Mogi Mirim centro R$3,00, demais regiões R$
                5,00. Mogi Guaçu R$ 10,00. Outras regiões sob consulta. O valor
                final do pedido será confirmado por telefone.
              </AddInformation>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(LocationDetails);
