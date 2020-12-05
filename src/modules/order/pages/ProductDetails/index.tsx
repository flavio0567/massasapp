import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Badge } from 'react-native-elements';
import { View, StatusBar, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';

import { formatPrice } from '../../../../util/format';

import * as CartActions from '../../../../store/modules/cart/actions';

import api from '../../../../shared/service/api';

import {
  Container,
  Header,
  ChevronIcon,
  StartusBarText,
  CartIcon,
  QuantityView,
  AddRemoveButton,
  MinusText,
  TextProdAmount,
  PlusText,
  ProductPriceView,
  ProductLabelText,
  ProductText,
  Agreement,
  CheckBoxAgreement,
  TextAgreement,
  Checkbox,
  SelectionButton,
  LineSeparator,
  AddInformation,
  ButtonContainer,
  ButtonSelection,
  ButtonText,
} from './styles';

interface Product {
  id: any;
  code: number;
  name: string;
  sales_price: any;
  amount: number;
  product_family: number;
  category: number;
  sub_category: number;
  quantity: number;
  unit: string;
  exception: number;
}

const ProductDetails: React.FC = ({
  navigation,
  route,
  cartSize,
  addToCartRequest,
  updateQuantityRequest,
}: any) => {
  const { navigate } = navigation;
  const { code, caller } = route.params;
  const [userToken, setUserToken] = useState<string | null>();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(0);
  const [isCheckedOven, setIsCheckedOven] = useState<boolean>(true);
  const [isCheckedMicrowave, setIsCheckedMicrowave] = useState<boolean>(false);
  const [packing, setPacking] = useState<string>('Forno');

  useEffect(() => {
    async function getToken(): Promise<void> {
      const token = await AsyncStorage.getItem('@Massas:token');

      setUserToken(token);
    }

    getToken();
  }, []);

  useEffect(() => {
    if (product?.name === undefined) {
      api
        .get(`products/code/${code}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          if (product?.product_family === 1 || product?.product_family === 3) {
            response.data.product.quantity = 0.25;
            setProduct(response.data.product);
          } else {
            response.data.product.quantity = 1;
            setProduct(response.data.product);
          }
        });
    }

    if (product?.product_family === 1 || product?.product_family === 3) {
      setQuantity(0.25);
    } else {
      setQuantity(1);
    }
  }, [code, userToken, product]);

  function increment(prd: Product): void {
    if (product?.product_family === 1 || product?.product_family === 3) {
      updateQuantityRequest(prd.id, quantity + 0.25);
      setQuantity(quantity + 0.25);
    } else {
      updateQuantityRequest(prd.id, quantity + 1);
      setQuantity(quantity + 1);
    }
  }

  function decrement(prd: Product): void {
    if (quantity === 0) return;

    if (product?.product_family === 1 || product?.product_family === 3) {
      updateQuantityRequest(prd.id, quantity - 0.25);
      setQuantity(quantity - 0.25);
    } else {
      updateQuantityRequest(prd.id, quantity - 1);
      setQuantity(quantity - 1);
    }
  }

  function handleAddProduct(id: string): void {
    if (quantity === 0) {
      Alert.alert(
        'Erro ao incluir o produto no carrinho',
        'Toque no botão + para selecionar a quantidade desejada.',
      );
      return;
    }

    if (
      product?.product_family === 1 &&
      product.category === 6 &&
      product.sub_category !== 1
    ) {
      addToCartRequest(id, quantity, packing);
    } else {
      addToCartRequest(id, quantity, '');
    }

    navigate('Order');
  }

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
          {product?.name ? (
            <SelectionButton
              accessibilityTraits="button"
              accessibilityLabel="Retornar"
              onPress={() => {
                navigate(caller);
              }}
            >
              <ChevronIcon name="chevron-left" size={22} />
            </SelectionButton>
          ) : (
            <SelectionButton
              accessibilityTraits="button"
              accessibilityLabel="Navegar ao Menu"
              onPress={() => {
                navigate('Menu');
              }}
            >
              <ChevronIcon name="chevron-left" size={22} />
            </SelectionButton>
          )}
          <StatusBar backgroundColor="#FD9E63" barStyle="light-content" />
          <StartusBarText
            allowFontScaling={false}
            accessibilityTraits="button"
            accessibilityLabel="Adicionar item ao pedido"
          >
            Adicionar item ao pedido
          </StartusBarText>
          <SelectionButton
            accessibilityTraits="button"
            accessibilityLabel="Navegar ao carrinho de compras"
            onPress={() => navigate('Cart', { caller: 'ProductDetails' })}
          >
            <Badge
              status="error"
              value={cartSize}
              containerStyle={{
                position: 'absolute',
                top: -4,
                right: 12,
                opacity: 0.8,
              }}
            />
            <CartIcon name="shopping-cart" size={22} />
          </SelectionButton>
        </Header>
      </View>
      <ScrollView>
        <ProductText allowFontScaling={false} accessibilityLabel="Produto">
          {product?.name}
        </ProductText>
        <QuantityView>
          <ProductLabelText
            allowFontScaling={false}
            accessibilityLabel="Quantidade"
          >
            Quantidade:
          </ProductLabelText>
          <AddRemoveButton
            onPress={() => {
              decrement(product);
            }}
          >
            <MinusText allowFontScaling={false} accessibilityLabel="Diminuir">
              -
            </MinusText>
          </AddRemoveButton>
          {product?.product_family === 1 || product?.product_family === 3 ? (
            <TextProdAmount allowFontScaling={false}>
              {quantity.toFixed(3)}
            </TextProdAmount>
          ) : (
            <TextProdAmount
              allowFontScaling={false}
              style={{ marginRight: -34 }}
            >
              {quantity}
            </TextProdAmount>
          )}
          <AddRemoveButton
            onPress={() => {
              increment(product);
            }}
          >
            <PlusText allowFontScaling={false} accessibilityLabel="Incrementar">
              +
            </PlusText>
          </AddRemoveButton>
          {product?.product_family === 1 || product?.product_family === 3 ? (
            <TextProdAmount
              allowFontScaling={false}
              accessibilityLabel="Produto"
            >
              {product?.unit}
            </TextProdAmount>
          ) : null}
        </QuantityView>

        <ProductPriceView>
          <ProductLabelText
            allowFontScaling={false}
            accessibilityLabel="Preço por unidade ou kilograma"
          >
            Preço unidade/Kg
          </ProductLabelText>
          <ProductText style={{ marginLeft: 34 }} accessibilityLabel="Preço">
            {formatPrice(product?.sales_price)}
          </ProductText>
        </ProductPriceView>

        {product?.product_family === 1 &&
          product.category === 6 &&
          product.sub_category !== 1 && (
            <Agreement>
              <CheckBoxAgreement
                accessibilityTraits="button"
                onPress={() => {
                  setIsCheckedOven(!isCheckedOven);
                  setIsCheckedMicrowave(!isCheckedMicrowave);
                  setPacking('Forno');
                }}
              >
                <Checkbox accessibilityTraits="selected">
                  {isCheckedOven ? (
                    <Icon name="check" size={20} color="#FF9000" />
                  ) : (
                    <Icon name="check" size={20} color="#F0F0F0F0" />
                  )}
                </Checkbox>
              </CheckBoxAgreement>
              <TextAgreement
                allowFontScaling={false}
                accessibilityLabel="Forno"
              >
                Forno
              </TextAgreement>
              <CheckBoxAgreement
                accessibilityTraits="button"
                onPress={() => {
                  setIsCheckedOven(!isCheckedOven);
                  setIsCheckedMicrowave(!isCheckedMicrowave);
                  setPacking('Micro-ondas');
                }}
              >
                <Checkbox accessibilityTraits="selected">
                  {isCheckedMicrowave ? (
                    <Icon name="check" size={20} color="#FF9000" />
                  ) : (
                    <Icon name="check" size={20} color="#F0F0F0F0" />
                  )}
                </Checkbox>
              </CheckBoxAgreement>
              <TextAgreement
                allowFontScaling={false}
                accessibilityLabel="Micro-ondas"
              >
                Microondas
              </TextAgreement>
            </Agreement>
          )}

        <LineSeparator />

        {product?.exception ? (
          <AddInformation
            allowFontScaling={false}
            accessibilityLabel="Produto disponível apenas aos finais de semana e/ou feriados."
            style={{ color: 'red' }}
          >
            Produto disponível apenas aos finais de semana e/ou feriados.
          </AddInformation>
        ) : null}

        <AddInformation
          allowFontScaling={false}
          accessibilityLabel="Informações adicionais sobre o produto, quando necessário, podem ser
          solicitadas"
        >
          Informações adicionais sobre o produto, quando necessário, podem ser
          solicitadas.
        </AddInformation>
        <AddInformation
          allowFontScaling={false}
          accessibilityLabel="O valor abaixo pode variar de acordo com o peso final do produto na
          embalagem"
        >
          O valor abaixo pode variar de acordo com o peso final do produto na
          embalagem.
        </AddInformation>
      </ScrollView>

      <ButtonContainer>
        <ButtonSelection onPress={() => handleAddProduct(product?.id)}>
          <ButtonText allowFontScaling={false} accessibilityLabel="Confirmar">
            Confirmar
          </ButtonText>
          <ButtonText allowFontScaling={false} accessibilityLabel="Preço total">
            {formatPrice(product?.sales_price * quantity)}
          </ButtonText>
        </ButtonSelection>
      </ButtonContainer>
    </Container>
  );
};

const mapStateToProps = (state: any): any => ({
  cartSize: state.cart.length,
});

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
