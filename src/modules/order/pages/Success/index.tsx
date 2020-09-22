import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { ImageBackground, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import massasImg from '../../../assets/almondega.png';
import logoImg from '../../../assets/wheat.png';

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
      style={{ width: '100%', height: '100%', opacity: 0.7 }}
    >
      <Container>
        <Image
          source={logoImg}
          style={{
            width: '88%',
            height: '32%',
            position: 'absolute',
            top: 40,
          }}
        />
        <SuccessView>
          <Icon
            name="check-circle"
            size={80}
            color="#04d361"
            style={{ marginLeft: 110 }}
          />
          <Title> Compra concluída</Title>
          <Description>Obrigado por escolher Massas da Cecilia!</Description>
          <OkButton onPress={handleOkPressed}>
            <OkButtonText>Retornar ao início</OkButtonText>
          </OkButton>
        </SuccessView>
      </Container>
    </ImageBackground>
  );
};

export default Success;
