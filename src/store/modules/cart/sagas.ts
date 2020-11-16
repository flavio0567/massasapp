import { Alert } from 'react-native';
import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import api from '../../../shared/service/api';

import { addToCartSuccess, updateQuantitySuccess } from './actions';

function* addToCart({ id, quantity, packing }: any): SagaIterator {
  const productExists = yield select((state) =>
    state.cart.find((p: any) => p.id === id),
  );

  const stock = yield call(api.get, `/products/${id}`);

  const stockAmount = stock.data.amount;

  const currentQuantity = productExists
    ? productExists.quantity + quantity
    : quantity;

  if (currentQuantity > stockAmount) {
    Alert.alert(
      'Não foi possível adicionar ao carrinho',
      'Quantidade solicitada do produto não disponível.',
    );
    return;
  }

  if (productExists) {
    yield put(updateQuantitySuccess(id, quantity));
  } else {
    const response = yield call(api.get, `products/${id}`);

    const data = {
      ...response.data,
      sales_price: Number(response.data.sales_price),
      quantity,
      packing,
    };
    yield put(addToCartSuccess(data));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* updateQuantity({ id, quantity }: any) {
  if (quantity <= 0) return;

  const stock = yield call(api.get, `products/${id}`);
  const stockAmount = stock.data.amount;

  if (quantity > stockAmount) {
    quantity -= 1;
    Alert.alert(
      'Não foi possível adicionar ao carrinho',
      'Quantidade solicitada do produto não disponível.',
    );
  }

  yield put(updateQuantitySuccess(id, quantity));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_QUANTITY_REQUEST', updateQuantity),
]);
