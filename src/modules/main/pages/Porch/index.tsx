import React, { useEffect } from 'react';
import { ImageBackground, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

import massasImg from '../../../assets/massa_artesanal.png';
import logoImg from '../../../assets/logo_massas.png';

import {
  Container,
  ButtonContainer,
  ButtonSelection,
  ButtonText,
  GuestSelection,
  GuestText,
  Icon,
} from './styles';

const Porch: React.FC = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    // const majorVersionIOS = parseInt(Platform.Version, 10);
    if (Platform.Version <= 13) {
      console.tron.log('Work around a change in behavior');
    } else {
      console.tron.log('lower then ');
    }
  }, []);

  return (
    <Container>
      <ImageBackground
        source={massasImg}
        style={{ width: '100%', height: '100%' }}
      >
        <Image
          source={logoImg}
          style={{
            width: '100%',
            height: '50%',
            position: 'absolute',
            top: 40,
          }}
        />

        <ButtonContainer>
          <ButtonSelection
            onPress={() => {
              navigate('SignIn');
            }}
          >
            <ButtonText>Entrar</ButtonText>
          </ButtonSelection>

          <ButtonSelection
            onPress={() => {
              navigate('SignUp');
            }}
          >
            <ButtonText>Cadastrar</ButtonText>
          </ButtonSelection>
        </ButtonContainer>

        <GuestSelection
          onPress={() => {
            navigate('Home');
          }}
        >
          <Icon name="log-in" size={20} color="#FD9E63" />
          <GuestText>Continuar como visitante</GuestText>
        </GuestSelection>
      </ImageBackground>
    </Container>
  );
};

export default Porch;
