import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Badge } from 'react-native-elements';
import { View, StatusBar, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
  quantity: number;
  unit: string;
}

const ProductDetails: React.FC = ({
  navigation,
  route,
  cartSize,
  addToCartRequest,
  updateQuantityRequest,
}: any) => {
  const { navigate } = navigation;
  const [userToken, setUserToken] = useState<string | null>();
  const [product, setProduct] = useState<Product>();

  const { code, caller } = route.params;

  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    async function getProducName(): Promise<void> {
      const token = await AsyncStorage.getItem('@Massas:token');

      setUserToken(token);
    }

    getProducName();
  }, []);

  useEffect(() => {
    if (product?.name === undefined) {
      api
        .get(`products/code/${code}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          if (product?.product_family === 1) {
            response.data.product.quantity = 0.25;
            setProduct(response.data.product);
          } else {
            response.data.product.quantity = 1;
            setProduct(response.data.product);
          }
        });
    }

    if (product?.product_family === 1) {
      setQuantity(0.25);
    } else {
      setQuantity(1);
    }
  }, [code, userToken, product]);

  function increment(prd: Product): void {
    if (product?.product_family === 1) {
      updateQuantityRequest(prd.id, quantity + 0.25);
      setQuantity(quantity + 0.25);
    } else {
      updateQuantityRequest(prd.id, quantity + 1);
      setQuantity(quantity + 1);
    }
  }

  function decrement(prd: Product): void {
    if (quantity === 0) return;

    if (product?.product_family === 1) {
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

    addToCartRequest(id, quantity);

    navigate('Order');
  }

  return (
    <Container>
      <View
        style={{
          backgroundColor: '#FD9E63',
          height: Platform.OS === 'ios' ? 80 : 40,
        }}
      >
        <Header>
          {product?.name ? (
            <SelectionButton
              onPress={() => {
                navigate(caller);
              }}
            >
              <ChevronIcon name="chevron-left" size={22} />
            </SelectionButton>
          ) : (
            <SelectionButton
              onPress={() => {
                navigate('Menu');
              }}
            >
              <ChevronIcon name="chevron-left" size={22} />
            </SelectionButton>
          )}
          <StatusBar
            // translucent
            backgroundColor="#FD9E63"
            barStyle="light-content"
          />
          <StartusBarText>Adicionar item ao pedido</StartusBarText>
          <SelectionButton
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
      <View>
        <ProductText>{product?.name}</ProductText>
        <QuantityView>
          <ProductLabelText>Quantidade:</ProductLabelText>
          <AddRemoveButton
            onPress={() => {
              decrement(product);
            }}
          >
            <MinusText>-</MinusText>
          </AddRemoveButton>
          {product?.product_family === 1 ? (
            <TextProdAmount>{quantity.toFixed(3)}</TextProdAmount>
          ) : (
            <TextProdAmount style={{ marginRight: -34 }}>
              {quantity}
            </TextProdAmount>
          )}
          <AddRemoveButton
            onPress={() => {
              increment(product);
            }}
          >
            <PlusText>+</PlusText>
          </AddRemoveButton>
          {product?.product_family === 1 ? (
            <TextProdAmount>{product?.unit}</TextProdAmount>
          ) : null}
        </QuantityView>

        <ProductPriceView>
          <ProductLabelText>Preço unidade/Kg</ProductLabelText>
          <ProductText style={{ marginLeft: 34 }}>
            {formatPrice(product?.sales_price)}
          </ProductText>
        </ProductPriceView>

        <LineSeparator />

        <AddInformation>
          Informações adicionais sobre o produto, quando necessário, podem ser
          solicitadas.
        </AddInformation>
        <AddInformation>
          O valor abaixo pode variar de acordo com o peso final do produto na
          embalagem.
        </AddInformation>
      </View>

      <ButtonContainer>
        <ButtonSelection onPress={() => handleAddProduct(product?.id)}>
          <ButtonText>Confirmar</ButtonText>
          <ButtonText>
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
