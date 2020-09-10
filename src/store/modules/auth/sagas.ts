import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../shared/service/api';

import { signInSuccess, signFailure } from './actions';

interface Credentials {
  mobile: string;
  password: string;
}

export function* signIn(credential: Credentials): Promise<any> {
  try {
    const response = yield call(api.get, `users`);

    const { token, user } = response.data[0];

    if (!user) {
      Alert.alert('Erro no lon', 'Usuário não encontrado, tente novamente.');
      return;
    }

    yield put(signInSuccess(token, user));
  } catch (err) {
    Alert.alert('Authtentication failure', 'Logon failure, try again');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
