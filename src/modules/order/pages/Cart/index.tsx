import React, { useCallback, useState } from 'react';
import { bindActionCreators } from 'redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
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
  TrashButton,
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
  SignalText,
  AddRemoveButton,
  ListProducts,
  ProductDetailText,
  ProductItem,
  ProductItemView,
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
  LocalizationText,
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
  product_family: number;
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

  const [loading, setLoading] = useState(false);

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
    if (product?.product_family === 1 || product?.product_family === 3) {
      updateQuantityRequest(product.id, product.quantity + 0.25);
    } else {
      updateQuantityRequest(product.id, product.quantity + 1);
    }
  }

  function decrement(product: Product): void {
    if (product?.product_family === 1 || product?.product_family === 3) {
      updateQuantityRequest(product.id, product.quantity - 0.25);
    } else {
      updateQuantityRequest(product.id, product.quantity - 1);
    }
  }

  function handleRemoveFromCart(id: string): void {
    Alert.alert(
      'Retirar produto do carrinho',
      'Esta opção retira este produto do carrinho de compras, confirma?',
      [
        { text: 'Sim', onPress: () => removeFromCart(id) },
        {
          text: 'Não',
          onPress: () => console.log('item deleted by customer:', id),
        },
      ],
      { cancelable: false },
    );
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
        accessible
        style={{
          backgroundColor: '#FD9E63',
          height: hp('10%'),
        }}
      >
        <Header>
          <StatusBarText allowFontScaling={false}>Pedido</StatusBarText>

          <TrashButton
            onPress={handleEmptyCart}
            accessibilityLabel="Limpar carrinho"
            accessibilityTraits="button"
          >
            <ChevronIcon name="trash-2" size={22} />
          </TrashButton>
        </Header>
      </View>

      <Content>
        <LineSeparator>
          <ProductLabelText
            allowFontScaling={false}
            accessibilityLabel="Detalhes do pedido"
          >
            Detalhes do pedido
          </ProductLabelText>
        </LineSeparator>

        {user?.name && (
          <Delivery>
            <UserText allowFontScaling={false}>
              <Icon name="user" color="#ff9000" />{' '}
              <DeliveryLabelText
                allowFontScaling={false}
                accessibilityLabel="Nome"
              >
                Nome:{' '}
              </DeliveryLabelText>
              {'    '}
              {user.name} {'\n'}
            </UserText>
            <PhoneView>
              <UserText allowFontScaling={false}>
                <Icon name="phone" color="#ff9000" />{' '}
                <DeliveryLabelText
                  allowFontScaling={false}
                  accessibilityLabel="Celular"
                >
                  Celular:{' '}
                </DeliveryLabelText>
                {'  '}
                {user.mobile}
              </UserText>
            </PhoneView>
            <SelectionButton
              onPress={() => navigate('DateTimeDelivery')}
              accessibilityTraits="button"
              accessibilityLabel="Editar"
            >
              <Icon
                name="edit-2"
                size={16}
                style={{
                  color: '#ff9000',
                  marginLeft: 10,
                  bottom: 5,
                  paddingBottom: 5,
                }}
              />
            </SelectionButton>
          </Delivery>
        )}
        <ItemSeparator />

        {deliveryLocalization?.street ? (
          <>
            <DeliveryLabelView>
              <DeliveryLabelText
                allowFontScaling={false}
                accessibilityLabel="Delivery"
              >
                Delivery
              </DeliveryLabelText>
              <SelectionButton
                onPress={() => navigate('Main')}
                accessibilityTraits="button"
                accessibilityLabel="Editar"
              >
                <Icon
                  name="edit-2"
                  size={16}
                  style={{ color: '#ff9000', top: 4 }}
                />
              </SelectionButton>
            </DeliveryLabelView>
            <ItemSeparator />
          </>
        ) : (
          <>
            <DeliveryLabelView>
              <DeliveryLabelText
                allowFontScaling={false}
                accessibilityLabel="Retirar na loja"
              >
                Retirar na loja
              </DeliveryLabelText>
              <SelectionButton
                onPress={() => navigate('Location')}
                accessibilityTraits="button"
                accessibilityLabel="Editar"
              >
                <Icon
                  name="edit-2"
                  size={16}
                  style={{ color: '#ff9000', top: 4 }}
                />
              </SelectionButton>
            </DeliveryLabelView>
            <ItemSeparator />
          </>
        )}

        <DeliveryInfo>
          {deliveryLocalization?.street ? (
            <>
              <LocalizationText
                allowFontScaling={false}
                accessibilityLabel="Editar"
              >
                <Icon name="map-pin" /> {deliveryLocalization.street},{' '}
                {deliveryLocalization.numberAddress}
                {' - '}
                {deliveryLocalization.complementAddress
                  ? deliveryLocalization.complementAddress
                  : null}{' '}
                {deliveryLocalization.neighborhood}
              </LocalizationText>
              <SelectionButton
                onPress={() => navigate('Location')}
                accessibilityTraits="button"
              >
                <Icon name="edit-2" size={16} style={{ color: '#ff9000' }} />
              </SelectionButton>
            </>
          ) : (
            <>
              <ProductText
                allowFontScaling={false}
                accessibilityLabel="Endereço da Massas da Cecilia"
              >
                <Icon name="map-pin" /> Avenida Prof. Adib Chaib, 2926 - Mogi
                Mirim
              </ProductText>
            </>
          )}
        </DeliveryInfo>
        <ItemSeparator />

        <DeliveryDateTimeInfo>
          {deliveryDate ? (
            <>
              <DeliveryTextInfo allowFontScaling={false}>
                {deliveryDate} às {deliveryDateTime?.deliveryTime}h
              </DeliveryTextInfo>
              <SelectionButton
                onPress={() => navigate('DateTimeDelivery')}
                accessibilityTraits="button"
                accessibilityLabel="Editar"
              >
                <Icon
                  name="edit-2"
                  size={16}
                  style={{ color: '#ff9000', marginRight: wp('3%') }}
                />
              </SelectionButton>
            </>
          ) : null}
        </DeliveryDateTimeInfo>

        <ItemSeparator />

        <ButtonContainer>
          <ButtonSelection onPress={handleCreateOrder}>
            <ButtonText
              allowFontScaling={false}
              accessibilityLabel="Encerrar o pedido"
              accessibilityTraits="button"
            >
              Encerrar o pedido
            </ButtonText>
            <ButtonTextValue
              allowFontScaling={false}
              accessibilityLabel="Valor do pedido"
            >
              {formatPrice(order_total)}
            </ButtonTextValue>
          </ButtonSelection>
        </ButtonContainer>

        <LineSeparator>
          <ProductLabelText
            allowFontScaling={false}
            accessibilityLabel="Itens do pedido"
          >
            Itens do pedido
          </ProductLabelText>
        </LineSeparator>

        <ListProducts
          data={cart}
          keyExtractor={(item: Product) => String(item.code)}
          renderItem={({ item: product }) => (
            <ProductItem key={product.code}>
              <View>
                <ProductDetailText allowFontScaling={false}>
                  {product.name}{' '}
                </ProductDetailText>
              </View>
              <ProductItemView>
                <QuantityView>
                  <AddRemoveButton
                    onPress={() => {
                      decrement(product);
                    }}
                  >
                    <SignalText
                      allowFontScaling={false}
                      accessibilityLabel="Diminuir"
                      accessibilityTraits="button"
                    >
                      -
                    </SignalText>
                  </AddRemoveButton>

                  {product?.product_family === 1 ||
                  product?.product_family === 3 ? (
                    <TextProdAmount allowFontScaling={false}>
                      {product.quantity.toFixed(3)}
                    </TextProdAmount>
                  ) : (
                    <TextProdAmount
                      allowFontScaling={false}
                      style={{ marginRight: -12, marginLeft: 20 }}
                    >
                      {product.quantity}
                    </TextProdAmount>
                  )}

                  <AddRemoveButton
                    onPress={() => {
                      increment(product);
                    }}
                  >
                    <SignalText
                      allowFontScaling={false}
                      accessibilityLabel="Acrescentar"
                      accessibilityTraits="button"
                    >
                      +
                    </SignalText>
                  </AddRemoveButton>
                  <TextProdAmount allowFontScaling={false}>
                    {product.unit}
                  </TextProdAmount>
                </QuantityView>
                <SubTotalView>
                  <SubTotalLabel
                    allowFontScaling={false}
                    accessibilityLabel="Sub-total"
                  >
                    Sub-total
                  </SubTotalLabel>
                  <TotalText
                    allowFontScaling={false}
                    accessibilityLabel="Sub-total"
                  >
                    {product.subTotal}
                  </TotalText>
                </SubTotalView>
                <RemoveItemButton
                  onPress={() => handleRemoveFromCart(product.id)}
                >
                  <DeleteIcon
                    name="trash-2"
                    size={18}
                    accessibilityTraits="button"
                  />
                </RemoveItemButton>
              </ProductItemView>
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
