import React, { useCallback, useState } from 'react';
import { View, StatusBar, Alert, ActivityIndicator } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import api from '../../../../shared/service/api';

import {
  StatusBarText,
  Container,
  SelectionButton,
  Header,
  ChevronIcon,
  Content,
  SearchBox,
  InputSearch,
  IconSearch,
  CleanSearch,
  IconClose,
  ConfirmButton,
  ConfirmText,
  TextInfo,
} from './styles';

interface Address {
  cep: string | number;
  city: string;
  neighborhood: string;
  state: string;
  street: string;
}

const Location: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const [loading, setLoading] = useState(false);

  const [userCep, setUserCep] = useState<string>();

  const handleSearch = useCallback(async () => {
    setLoading(true);
    await api
      .get<Address>('address', {
        params: { userCep },
      })
      .then((response) => {
        navigate('LocationDetails', { userAddress: response.data });
      })
      .catch(() => {
        67;

        Alert.alert('CEP não encontrado, tente novamente.');
      });
    setLoading(false);
  }, [navigate, userCep]);

  return (
    <Container>
      <View
        style={{
          backgroundColor: '#FD9E63',
          height: hp('10%'),
        }}
      >
        <Header>
          <SelectionButton onPress={() => goBack()}>
            <ChevronIcon name="chevron-left" size={22} />
          </SelectionButton>
          <StatusBar backgroundColor="#FD9E63" barStyle="light-content" />
          <StatusBarText>Endereço de entrega</StatusBarText>
        </Header>
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
          <Content>
            <SearchBox>
              <InputSearch
                autoCorrect={false}
                textContentType="none"
                value={userCep}
                placeholder="99999-999"
                onChangeText={setUserCep}
                keyboardType="numeric"
                autoFocus
                type="custom"
                options={{
                  mask: '99999-999',
                }}
              />
              <IconSearch name="search" />
              <CleanSearch accessible onPress={() => setUserCep('')}>
                <IconClose name="x-circle" />
              </CleanSearch>
            </SearchBox>
            <TextInfo>Informe todos os números do CEP</TextInfo>
            <ConfirmButton onPress={handleSearch}>
              <ConfirmText>Buscar</ConfirmText>
            </ConfirmButton>
          </Content>
        )}
      </View>
    </Container>
  );
};

export default Location;
