import { Address } from '../../../modules/order/pages/LocationDetails/index';

interface Product {
  id: string;
  code: number;
  name: string;
  sales_price: number;
  unit: string;
  amount: number;
  sub_total: number;
  quantity: number;
}

interface AddRequestProductProps {
  type: string;
  id: string;
}

interface AddSuccessProductProps {
  type: string;
  product: Product;
}

interface RemoveProductProps {
  type: string;
  id: string;
}

interface UpdateProductQuantityProps {
  type: string;
  id: string;
  quantity: number;
}

interface AddAddressProps {
  type: string;
  deliveryAddress: Address;
}

interface AddDateTimeProps {
  type: string;
  deliveryDateTime: string;
}

export function addToCartRequest(id: string): AddRequestProductProps {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSuccess(product: Product): AddSuccessProductProps {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

export function addAddressToCart(deliveryAddress: Address): AddAddressProps {
  return {
    type: '@cart/ADD_ADDRESS',
    deliveryAddress,
  };
}

export function addDateTimeToCart(deliveryDateTime: string): AddDateTimeProps {
  return {
    type: '@cart/ADD_DATE_TIME',
    deliveryDateTime,
  };
}

export function removeFromCart(id: string): RemoveProductProps {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

export function removeAllCart(): any {
  return {
    type: '@cart/REMOVE_ALL',
  };
}

export function updateQuantityRequest(
  id: string,
  quantity: number,
): UpdateProductQuantityProps {
  return {
    type: '@cart/UPDATE_QUANTITY_REQUEST',
    id,
    quantity,
  };
}

export function updateQuantitySuccess(
  id: string,
  quantity: number,
): UpdateProductQuantityProps {
  return {
    type: '@cart/UPDATE_QUANTITY_SUCCESS',
    id,
    quantity,
  };
}

export function addToCartFailure(): any {
  return {
    type: '@cart/ADD_FAILURE',
  };
}
