import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { ImageBackground, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import massasImg from '../../../assets/almondega.png';
import logoMassasImg from '../../../assets/logo_massas.png';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
  SuccessView,
} from './styles';

const Success: React.FC = () => {
  const { reset } = useNavigation();

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Home' }],
      index: 0,
    });
  }, [reset]);

  return (
    <ImageBackground
      source={massasImg}
      style={{ width: '100%', height: '100%', opacity: 0.86 }}
    >
      <Container>
        <SuccessView>
          <Icon
            name="check-circle"
            size={78}
            color="#04d361"
            style={{ marginLeft: 110 }}
          />
          <Title allowFontScaling={false}> Compra concluída</Title>
          <Description allowFontScaling={false}>
            Obrigado por escolher
          </Description>
          <Image
            source={logoMassasImg}
            style={{
              width: wp('34%'),
              height: hp('34%'),
              position: 'absolute',
              top: 148,
              left: 84,
            }}
          />
          <OkButton onPress={handleOkPressed}>
            <OkButtonText allowFontScaling={false}>
              Retornar ao início
            </OkButtonText>
          </OkButton>
        </SuccessView>
      </Container>
    </ImageBackground>
  );
};

export default Success;
