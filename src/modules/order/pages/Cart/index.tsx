import React, { useCallback, useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';

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
  PaymentMethod,
  CheckBoxAgreement,
  Checkbox,
  TextPaymentMethod,
  PaymentMethodDisclaimer,
  AddInformation,
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
  packing: string;
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
  const [isCreditCard, setIsCreditCard] = useState<boolean>(false);
  const [isCash, setIsCash] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>();

  const [loading, setLoading] = useState(false);

  const { deliveryLocalization } = useDeliveryLocalization();

  const { deliveryDateTime } = useDeliveryDateTime();

  let deliveryDate;

  const delivery = isValid(parseISO(deliveryDateTime.deliveryDate));

  useEffect(() => {
    async function getToken(): Promise<void> {
      const userToken = await AsyncStorage.getItem('@Massas:token');

      setToken(userToken);
    }

    getToken();
  }, []);

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
    if (product?.product_family === 1) {
      updateQuantityRequest(product.id, product.quantity + 0.5);
    } else if (product?.product_family === 3) {
      updateQuantityRequest(product.id, product.quantity + 0.25);
    } else {
      updateQuantityRequest(product.id, product.quantity + 1);
    }
  }

  function decrement(product: Product): void {
    if (product?.product_family === 1) {
      updateQuantityRequest(product.id, product.quantity - 0.5);
    } else if (product?.product_family === 3) {
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
          },
        ],
        { cancelable: false },
      );
    }
  }

  const handleCreateOrder = useCallback(async () => {
    setLoading(true);
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
        product_name: item.name,
        packing: item.packing,
      };
    });

    const orderTotalNum = parseFloat(order_total);

    let payment_method;

    if (isCash) {
      payment_method = 2;
    } else {
      payment_method = 1;
    }

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
      payment_method,
    };

    try {
      await api.post('orders/create', data);

      removeAllCart();
    } catch (err) {
      Alert.alert(
        'Erro ao finalizar o pedido!',
        `Não foi possível finalizar o seu pedido, tente novamente.${err}`,
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
    isCash,
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

        <PaymentMethod>
          <DeliveryLabelText
            allowFontScaling={false}
            accessibilityLabel="Forno"
          >
            Forma de pagamento:
          </DeliveryLabelText>
          <CheckBoxAgreement
            accessibilityTraits="button"
            onPress={() => {
              setIsCash(!isCash);
              setIsCreditCard(!isCreditCard);
            }}
          >
            <Checkbox accessibilityTraits="selected">
              {isCash ? (
                <Icon name="check" size={20} color="#FF9000" />
              ) : (
                <Icon name="check" size={20} color="#fff5e6" />
              )}
            </Checkbox>
          </CheckBoxAgreement>
          <TextPaymentMethod
            allowFontScaling={false}
            accessibilityLabel="Cartao"
          >
            Cartão
          </TextPaymentMethod>
          <CheckBoxAgreement
            accessibilityTraits="button"
            onPress={() => {
              setIsCash(!isCash);
              setIsCreditCard(!isCreditCard);
            }}
          >
            <Checkbox accessibilityTraits="selected">
              {isCreditCard ? (
                <Icon name="check" size={20} color="#FF9000" />
              ) : (
                <Icon name="check" size={20} color="#fff5e6" />
              )}
            </Checkbox>
          </CheckBoxAgreement>
          <TextPaymentMethod
            allowFontScaling={false}
            accessibilityLabel="Dinheiro"
          >
            Dinheiro
          </TextPaymentMethod>
        </PaymentMethod>
        <PaymentMethodDisclaimer
          allowFontScaling={false}
          accessibilityLabel="O pagamento será realizado na retirada/entrega"
        >
          O pagamento será realizado na retirada/entrega
        </PaymentMethodDisclaimer>

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

        <PaymentMethodDisclaimer
          style={{ paddingLeft: 30, width: 310 }}
          allowFontScaling={false}
          accessibilityLabel="Valor estimado do pedido. O valor final será calculado de acordo com o
          peso final dos produtos na embalagem"
        >
          Valor estimado do pedido. O valor final será calculado de acordo com o
          peso final dos produtos na embalagem
        </PaymentMethodDisclaimer>

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
    (product: {
      sales_price: number;
      amount: number;
      quantity: number;
      packing: string;
    }) => ({
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
