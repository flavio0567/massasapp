import React, { useEffect, useState, useCallback } from 'react';

import { Badge } from 'react-native-elements';
import { View, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import ImgLogo from '../../../assets/logo_massas.png';

import api from '../../../../shared/service/api';

import {
  Container,
  Header,
  SelectionButton,
  CartIcon,
  StartusBarText,
  ProductList,
  FamilyProductText,
  ProductImage,
  ProductContainer,
} from './styles';

export interface Product {
  id: string;
  name: string;
  product_family: number;
  avatar_url: any;
  // avatar_url: HTMLImageElement;
}

const Order: React.FC = ({ cartSize }: any) => {
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);

  const [familyProducts, setFamilyProducts] = useState<Product[]>([]);

  const productFamily = useCallback(async () => {
    setLoading(true);
    await api.get('products/family').then((response) => {
      const { product } = response.data;

      setFamilyProducts(product);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    productFamily();
  }, [productFamily]);

  const navigateToMenu = useCallback(
    (product_family: number, name: string) => {
      navigate('Menu', { product_family, name });
    },
    [navigate],
  );

  return (
    <Container>
      <View
        style={{
          backgroundColor: '#FD9E63',
          height: Platform.OS === 'ios' && Platform.Version >= 13 ? 80 : 60,
        }}
      >
        <Header>
          <StartusBarText>Cardápio</StartusBarText>
          <SelectionButton onPress={() => navigate('Cart', { caller: 'Menu' })}>
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
            <CartIcon name="shopping-cart" size={24} />
          </SelectionButton>
        </Header>
      </View>
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
        <ProductList
          data={familyProducts}
          numColumns={2}
          keyExtractor={(item) => `key${item.id}`}
          renderItem={({ item: familyProduct }) => (
            <ProductContainer
              onPress={() =>
                navigateToMenu(familyProduct.product_family, familyProduct.name)
              }
            >
              {familyProduct.avatar_url ? (
                <ProductImage source={{ uri: `${familyProduct.avatar_url}` }} />
              ) : (
                <ProductImage source={ImgLogo} />
              )}
              <FamilyProductText>{familyProduct.name}</FamilyProductText>
            </ProductContainer>
          )}
        />
      )}
    </Container>
  );
};

export default connect((state: any) => ({
  cartSize: state.cart.length,
}))(Order);
