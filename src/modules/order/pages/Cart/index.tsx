/* eslint-disable import/no-duplicates */
import React, { useCallback, useState } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { View, StatusBar, Platform, Alert } from 'react-native';
import { ptBR } from 'date-fns/locale';
import { format, parseISO, isValid } from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../../../shared/service/api';
import { useAuth } from '../../../../shared/hooks/auth';
import { formatPrice } from '../../../../util/format';
import { useDeliveryLocalization } from '../../../../shared/hooks/deliveryLocalization';
import { useDeliveryDateTime } from '../../../../shared/hooks/deliveryDateTime';

import * as CartActions from '../../../../store/modules/cart/actions';

import {
  Container,
  Header,
  Content,
  LineSeparator,
  Delivery,
  SelectionButton,
  ChevronIcon,
  StatusBarText,
  ProductText,
  PhoneView,
  UserText,
  ProductLabelText,
  ButtonContainer,
  ButtonSelection,
  DeleteIcon,
  ButtonText,
  ButtonTextValue,
  QuantityView,
  PlusText,
  MinusText,
  AddRemoveButton,
  ListProducts,
  ProductDetailText,
  ProductItem,
  TotalText,
  SubTotalLabel,
  TextProdAmount,
  SubTotalView,
  RemoveItemButton,
  DeliveryLabelText,
  ItemSeparator,
  DeliveryInfo,
  DeliveryDateTimeInfo,
  DeliveryTextInfo,
  DeliveryLabelView,
} from './styles';

interface CartProps {
  cart: string;
  cartSize: string;
  order_total: string;
}

export interface Product {
  id: string;
  code: number;
  name: string;
  sales_price: number;
  quantity: number;
  subTotal: number;
  amount: number;
  unit: string;
}

const Cart: React.FC = ({
  navigation,
  cart,
  removeFromCart,
  updateQuantityRequest,
  order_total,
  removeAllCart,
}: any) => {
  const { reset, navigate } = navigation;
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const { deliveryLocalization } = useDeliveryLocalization();

  const { deliveryDateTime } = useDeliveryDateTime();

  let deliveryDate;

  const delivery = isValid(parseISO(deliveryDateTime.deliveryDate));

  if (delivery) {
    deliveryDate = format(
      parseISO(deliveryDateTime.deliveryDate),
      'eeee, d, MMMM',
      {
        locale: ptBR,
      },
    );
  } else {
    deliveryDateTime.deliveryDate = new Date('');
  }

  if (
    deliveryDate ===
    format(new Date(), 'eeee, d, MMMM', {
      locale: ptBR,
    })
  ) {
    deliveryDate = 'Hoje';
  }

  function increment(product: Product): void {
    updateQuantityRequest(product.id, product.quantity + 1);
  }

  function decrement(product: Product): void {
    updateQuantityRequest(product.id, product.quantity - 1);
  }

  function handleRemoveFromCart(id: string): void {
    removeFromCart(id);
  }

  function handleEmptyCart(): void {
    if (cart.length > 0) {
      Alert.alert(
        'Limpar o carrinho',
        'Esta opção esvazia o carrinho de compras, confirma?',
        [
          { text: 'Sim', onPress: () => removeAllCart() },
          {
            text: 'Não',
            onPress: () => console.tron.log('canceled by the customer:', user),
          },
        ],
        { cancelable: false },
      );
    }
  }

  const handleCreateOrder = useCallback(async () => {
    if (cart.length === 0) {
      Alert.alert(
        'Erro ao finalizar o pedido!',
        'Não existe nenhum produto no seu carrinho de compras. Para incluir produtos, retorne ao Cardápio.',
      );
      return;
    }

    let isOrderDelivering = 0;

    if (Object.keys(deliveryLocalization).length > 0) {
      isOrderDelivering = 1;

      if (!deliveryLocalization.neighborhood) {
        deliveryLocalization.neighborhood = '';
      }

      if (!deliveryLocalization.complementAddress) {
        deliveryLocalization.complementAddress = '';
      }
    }

    const orderDetail = cart.map((item: Product) => {
      return {
        id: item.id,
        sales_price: Number(item.sales_price),
        unit: item.unit,
        amount: item.amount,
        quantity: item.quantity,
      };
    });

    const orderTotalNum = parseFloat(order_total);

    const data = {
      name: user.name,
      mobile: String(user.mobile)
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .replace('-', ''),
      order_total: orderTotalNum,
      orderDetail,
      isOrderDelivering,
      deliveryDateTime,
      deliveryLocalization,
    };

    try {
      await api.post('orders/create', data);

      removeAllCart();
    } catch {
      Alert.alert(
        'Erro ao finalizar o pedido!',
        'Não foi possível finalizar o seu pedido, tente novamente.',
      );
    }
    setLoading(false);

    reset({
      routes: [{ name: 'Success' }],
      index: 0,
    });
  }, [
    reset,
    cart,
    user,
    deliveryDateTime,
    deliveryLocalization,
    order_total,
    removeAllCart,
  ]);

  return (
    <Container>
      <View
        style={{
          backgroundColor: '#FD9E63',
          height: Platform.OS === 'ios' ? 80 : 40,
        }}
      >
        <Header>
          <StatusBarText>Pedido</StatusBarText>

          <SelectionButton onPress={handleEmptyCart}>
            <ChevronIcon name="trash-2" size={22} />
          </SelectionButton>
        </Header>
      </View>

      <Content>
        <LineSeparator>
          <ProductLabelText>Detalhes do pedido</ProductLabelText>
        </LineSeparator>

        {user?.name ? (
          <Delivery>
            <UserText>
              <Icon name="user" color="#ff9000" />{' '}
              <DeliveryLabelText>Nome: </DeliveryLabelText>
              {'    '}
              {user.name} {'\n'}
            </UserText>
            <PhoneView>
              <UserText>
                <Icon name="phone" color="#ff9000" />{' '}
                <DeliveryLabelText>Celular: </DeliveryLabelText>
                {'  '}
                {user.mobile}
              </UserText>
              <SelectionButton onPress={() => navigate('DateTimeDelivery')}>
                <Icon
                  name="edit-2"
                  size={16}
                  style={{
                    color: '#ff9000',
                    left: 338,
                    top: -48,
                    width: 18,
                  }}
                />
              </SelectionButton>
            </PhoneView>
          </Delivery>
        ) : null}
        <ItemSeparator />

        {deliveryLocalization?.street ? (
          <>
            <DeliveryLabelView>
              <DeliveryLabelText>Delivery</DeliveryLabelText>
              <SelectionButton onPress={() => navigate('Main')}>
                <Icon name="edit-2" size={16} style={{ color: '#ff9000' }} />
              </SelectionButton>
            </DeliveryLabelView>
            <ItemSeparator />
          </>
        ) : (
          <>
            <DeliveryLabelView>
              <DeliveryLabelText>Retirar na loja</DeliveryLabelText>
              <SelectionButton onPress={() => navigate('Location')}>
                <Icon name="edit-2" size={16} style={{ color: '#ff9000' }} />
              </SelectionButton>
            </DeliveryLabelView>
            <ItemSeparator />
          </>
        )}

        <DeliveryInfo>
          {deliveryLocalization?.street ? (
            <>
              <ProductText>
                <Icon name="map-pin" /> {deliveryLocalization.street},{' '}
                {deliveryLocalization.numberAddress}{' '}
                {deliveryLocalization.complementAddress
                  ? deliveryLocalization.complementAddress
                  : null}{' '}
                {deliveryLocalization.neighborhood}
              </ProductText>
              <SelectionButton onPress={() => navigate('Location')}>
                <Icon name="edit-2" size={16} style={{ color: '#ff9000' }} />
              </SelectionButton>
            </>
          ) : (
            <>
              <ProductText>
                <Icon name="map-pin" /> Avenida Prof. Adib Chaib, 2926
              </ProductText>
            </>
          )}
        </DeliveryInfo>
        <ItemSeparator />

        <DeliveryDateTimeInfo>
          {deliveryDate ? (
            <>
              <DeliveryTextInfo>
                {deliveryDate} às {deliveryDateTime?.deliveryTime}h
              </DeliveryTextInfo>
              <SelectionButton onPress={() => navigate('DateTimeDelivery')}>
                <Icon name="edit-2" size={16} style={{ color: '#ff9000' }} />
              </SelectionButton>
            </>
          ) : null}
        </DeliveryDateTimeInfo>

        <ItemSeparator />

        <ButtonContainer>
          <ButtonSelection onPress={handleCreateOrder}>
            <ButtonText>Encerrar o pedido</ButtonText>
            <ButtonTextValue>{formatPrice(order_total)}</ButtonTextValue>
          </ButtonSelection>
        </ButtonContainer>

        <LineSeparator>
          <ProductLabelText>Itens do pedido</ProductLabelText>
        </LineSeparator>

        <ListProducts
          contentInset={{ top: 0, bottom: 30, left: 0, right: 0 }}
          style={{ paddingLeft: 10 }}
          data={cart}
          keyExtractor={(item: Product) => String(item.code)}
          renderItem={({ item: product }) => (
            <ProductItem key={product.code}>
              <ProductDetailText>{product.name} </ProductDetailText>
              <QuantityView>
                <AddRemoveButton
                  onPress={() => {
                    decrement(product);
                  }}
                >
                  <MinusText>-</MinusText>
                </AddRemoveButton>

                <TextProdAmount>{product.quantity}</TextProdAmount>
                <AddRemoveButton
                  onPress={() => {
                    increment(product);
                  }}
                >
                  <PlusText>+</PlusText>
                </AddRemoveButton>
              </QuantityView>
              <SubTotalView>
                <SubTotalLabel>Sub-total</SubTotalLabel>
                <TotalText>{product.subTotal}</TotalText>
              </SubTotalView>
              <RemoveItemButton
                onPress={() => handleRemoveFromCart(product.id)}
              >
                <DeleteIcon name="trash-2" size={18} />
              </RemoveItemButton>
            </ProductItem>
          )}
        />
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: any): CartProps => ({
  cart: state.cart.map(
    (product: { sales_price: number; amount: number; quantity: number }) => ({
      ...product,
      subTotal: formatPrice(product.sales_price * product.quantity),
    }),
  ),
  order_total: state.cart.reduce(
    (
      order_total: number,
      product: { sales_price: number; quantity: number },
    ) => {
      return order_total + product.sales_price * product.quantity;
    },
    0,
  ),
  cartSize: state.cart.length,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
