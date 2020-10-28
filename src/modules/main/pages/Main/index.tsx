import React, { useCallback } from 'react';
import { ImageBackground, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import massasImg from '../../../assets/massas_wood_background.png';
import logoImg from '../../../assets/wheat.png';
import { useDeliveryDateTime } from '../../../../shared/hooks/deliveryDateTime';
import {
  useDeliveryLocalization,
  DeliveryLocalizationContext,
} from '../../../../shared/hooks/deliveryLocalization';

import {
  ButtonContainer,
  ButtonSelection,
  ButtonText,
  Title,
  SubTitle,
  TitleView,
} from './styles';

const Main: React.FC = () => {
  const { navigate } = useNavigation();

  const { setDateTime } = useDeliveryDateTime();
  const { setLocalization } = useDeliveryLocalization();

  const handlePickup = useCallback(async () => {
    await AsyncStorage.removeItem('@Massas:deliveryDateTime');
    await AsyncStorage.removeItem('@Massas:deliveryLocalization');

    const deliveryDateTime = {
      deliveryDate: new Date(''),
      deliveryTime: '',
    };

    setDateTime(deliveryDateTime);

    const deliveryLocalization = {} as DeliveryLocalizationContext;

    setLocalization(deliveryLocalization);

    navigate('DateTimeDelivery');
  }, [setLocalization, setDateTime, navigate]);

  return (
    <ImageBackground
      source={massasImg}
      style={{ width: '100%', height: '100%' }}
    >
      <Image
        source={logoImg}
        style={{
          width: '100%',
          height: '40%',
          position: 'absolute',
          top: 40,
        }}
      />

      <TitleView>
        <Title allowFontScaling={false}>Crie seu pedido</Title>
        <SubTitle allowFontScaling={false}>
          Escolha uma das opções de entrega abaixo
        </SubTitle>
      </TitleView>

      <ButtonContainer>
        <ButtonSelection onPress={handlePickup}>
          <ButtonText allowFontScaling={false}>Retirar na Loja</ButtonText>
        </ButtonSelection>

        <ButtonSelection
          onPress={() => {
            navigate('Location');
          }}
        >
          <ButtonText allowFontScaling={false}>Delivery</ButtonText>
        </ButtonSelection>
      </ButtonContainer>
    </ImageBackground>
  );
};

export default Main;
