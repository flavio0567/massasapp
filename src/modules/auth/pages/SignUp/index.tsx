import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

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
import Input from '../../../../shared/components/Input';
import api from '../../../../shared/service/api';

import getValidationErrors from '../../../../shared/utils/getValidationErrors';

import {
  Container,
  Title,
  Icon,
  TextOptional,
  RegisterButton,
  ReturnButton,
  ReturnButtonText,
  // CheckBoxAgreement,
  // Checkbox,
  // Agreement,
  // TextAgreement,
  // InputAgreement,
} from './styles';

interface SignInFormData {
  name: string;
  mobile: string;
  password: string;
  passwordConfirm: string;
  email?: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { navigate } = useNavigation();

  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);
  const mobileInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (user: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          mobile: Yup.string().required('Número do celular obrigatório.'),
          password: Yup.string().min(6, 'Senha no mínimo 6 dígitos.'),
          email: Yup.string().email('Formato do e-mail invalido.'),
          password_confirmation: Yup.string().required(
            'Confirmação da senha obrigatória.',
          ),
        });

        await schema.validate(user, {
          abortEarly: false,
        });

        await api.post('users', user);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você será redirecionado ao login.',
        );

        navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        if (!err.errors[0]) {
          err.errors[0] = '';
        }
        if (!err.errors[1]) {
          err.errors[1] = '';
        }
        if (!err.errors[2]) {
          err.errors[2] = '';
        }
        if (!err.errors[3]) {
          err.errors[3] = '';
        }

        Alert.alert(
          'Cadastro incompleto',
          `Ao realizar seu cadastro informe seus dados corretamente: ${err.errors[0]} ${err.errors[1]} ${err.errors[2]} ${err.errors[3]}`,
        );
      }
    },
    [navigate],
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
            backgroundColor: '#faf3e9',
          }}
        >
          <Container>
            <View accessible>
              <Title
                allowFontScaling={false}
                accessibilityLabel="Faça o seu cadastro"
              >
                Faça o seu cadastro
              </Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCorrect={false}
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  mobileInputRef.current?.focus;
                }}
              />

              <Input
                ref={mobileInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="phone-pad"
                name="mobile"
                icon="phone"
                placeholder="Número do celular com DDD"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus;
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha com 6 dígitos"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmInputRef.current?.focus;
                }}
              />

              <Input
                ref={passwordConfirmInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirme a senha"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus;
                }}
              />

              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <TextOptional
                allowFontScaling={false}
                accessibilityLabel="E-mail opcional"
              >
                E-mail Opcional
              </TextOptional>

              {/* <Agreement>
                <CheckBoxAgreement
                  accessibilityTraits="button"
                  onPress={() => {
                    checked ? setChecked(false) : setChecked(true);
                  }}
                >
                  <Checkbox accessibilityTraits="selected">
                    {checked ? (
                      <Icon name="check" size={14} color="#666360" />
                    ) : (
                      <Icon name="check" size={14} color="#F0F0F0F0" />
                    )}
                  </Checkbox>
                </CheckBoxAgreement>
                <TextAgreement
                  allowFontScaling={false}
                  accessibilityLabel="Sim, concordo em receber mensagem de texto e/ou email sobre
                  futuros eventos, ofertas e promoções"
                >
                  Sim, concordo em receber mensagem de texto e/ou email sobre
                  futuros eventos, ofertas e promoções.
                </TextAgreement>
              </Agreement> */}

              <RegisterButton
                accessibilityLabel="Cadastrar"
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastrar
              </RegisterButton>

              <ReturnButton
                accessibilityComponentType="button"
                onPress={() => {
                  navigate('Porch');
                }}
              >
                <Icon
                  name="arrow-left"
                  size={20}
                  color="#FD9E63"
                  style={{ marginLeft: 60 }}
                />
                <ReturnButtonText
                  allowFontScaling={false}
                  accessibilityLabel="Retornar ao início"
                >
                  Retornar ao início
                </ReturnButtonText>
              </ReturnButton>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
