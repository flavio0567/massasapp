import React, { useCallback, useRef } from 'react';

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import fbImg from '../../../assets/fb_logo.png';
import Input from '../../../../shared/components/Input';
import Button from '../../../../shared/components/Button';

import { useAuth } from '../../../../shared/hooks/auth';
import getValidationErrors from '../../../../shared/utils/getValidationErrors';

import {
  Container,
  Title,
  ForgotPasswordButton,
  CreateAccountButton,
  CreateAccountButtonText,
  GuestText,
  Icon,
  ReturnButton,
  ReturnButtonText,
  // SectionSeparator,
  // LineSeparator,
  // TextSeparator,
} from './styles';

interface SignInFormData {
  mobile: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { navigate, reset } = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          mobile: Yup.string().required('Número do celular obrigatório'),
          password: Yup.string().required('Senha obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          mobile: data.mobile,
          password: data.password,
        });

        reset({ index: 0, routes: [{ name: 'Home' }] });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          console.log(errors);

          formRef.current?.setErrors(errors);

          if (!err.errors[0]) {
            err.errors[0] = '';
          }
          if (!err.errors[1]) {
            err.errors[1] = '';
          }

          Alert.alert(
            'Login não concluído',
            `Não foi possível autenticar no app, confira suas credenciais: ${err.errors[0]} ${err.errors[1]}`,
          );

          return;
        }
        console.log('erro ao voltar do 404:', err);
        Alert.alert(
          'Login não concluído',
          'Não encontramos seu cadastro, cheque suas credenciais.',
        );
      }
    },
    [signIn, reset],
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
        >
          <Container>
            <View>
              <Title allowFontScaling={false}>Faça seu login</Title>
            </View>

            {/* <Image source={fbImg} />
            <SectionSeparator>
              <LineSeparator />
              <TextSeparator>ou</TextSeparator>
              <LineSeparator />
            </SectionSeparator> */}

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="phone-pad"
                name="mobile"
                icon="phone"
                placeholder="Número do celular"
                returnKeyType="next"
                autoFocus
                // onSubmitEditing={() => {
                //   passwordInputRef.current?.focus;
                // }}
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
            {/*
            <ForgotPasswordButton
              onPress={() => {
                console.tron.log('ForgotPassword');
              }}
            >
              <GuestText>Esqueci minha senha</GuestText>
            </ForgotPasswordButton> */}
            <ReturnButton
              onPress={() => {
                navigate('Porch');
              }}
            >
              <Icon name="arrow-left" size={20} color="#FD9E63" />
              <ReturnButtonText allowFontScaling={false}>
                Retornar ao início
              </ReturnButtonText>
            </ReturnButton>

            <CreateAccountButton
              onPress={() => {
                navigate('SignUp');
              }}
            >
              <Icon name="log-in" size={20} color="#fff" />
              <CreateAccountButtonText allowFontScaling={false}>
                Criar uma conta
              </CreateAccountButtonText>
            </CreateAccountButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
