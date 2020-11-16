import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { ImageBackground, Image, ActivityIndicator, View } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../../shared/hooks/auth';

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

interface AuthState {
  mobile: string | null;
  password: string | null;
}

const Porch: React.FC = () => {
  const { reset, navigate } = useNavigation();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadStorageData(): Promise<void> {
      const [mobile, password] = await AsyncStorage.multiGet([
        '@Massas:mobile',
        '@Massas:password',
      ]);
      setLoading(false);

      if (mobile[1] && password[1]) {
        await signIn({
          mobile: mobile[1],
          password: password[1],
        });

        reset({ index: 0, routes: [{ name: 'Home' }] });
      }
    }

    loadStorageData();
  }, [reset, signIn]);

  return (
    <Container accessible>
      {loading ? (
        <View
          style={{
            flex: 1,
            marginTop: 300,
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#999" />
        </View>
      ) : (
        <ImageBackground
          source={massasImg}
          style={{ width: wp('100%'), height: hp('100%') }}
        >
          <Image
            source={logoImg}
            style={{
              width: wp('100%'),
              height: hp('50%'),
              position: 'absolute',
              top: 40,
            }}
          />

          <ButtonContainer>
            <ButtonSelection
              accessibilityTraits="button"
              accessibilityLabel="Login"
              onPress={() => {
                navigate('SignIn');
              }}
            >
              <ButtonText allowFontScaling={false} accessibilityLabel="Entrar">
                Entrar
              </ButtonText>
            </ButtonSelection>

            <ButtonSelection
              onPress={() => {
                navigate('SignUp');
              }}
            >
              <ButtonText
                allowFontScaling={false}
                accessibilityLabel="Cadastrar"
              >
                Cadastrar
              </ButtonText>
            </ButtonSelection>
          </ButtonContainer>

          <GuestSelection
            accessibilityTraits="button"
            accessibilityLabel="Navegar ao início"
            onPress={() => {
              navigate('Home');
            }}
          >
            <Icon name="log-in" size={20} color="#FD9E63" />
            <GuestText allowFontScaling={false}>
              Continuar como visitante
            </GuestText>
          </GuestSelection>
        </ImageBackground>
      )}
    </Container>
  );
};

export default Porch;
