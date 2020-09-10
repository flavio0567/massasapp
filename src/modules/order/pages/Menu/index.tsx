import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, StatusBar, Platform } from 'react-native';
import { Badge } from 'react-native-elements';
import bannerImg from '../../../assets/caneloni.png';
import ProductRender from '../../../components/ProductsRender';

import api from '../../../../shared/service/api';

import {
  Container,
  BannerView,
  BannerText,
  BannerImage,
  Header,
  SelectionButton,
  ChevronIcon,
  CartIcon,
  ProductList,
} from './styles';

export interface Product {
  id: string;
  name: string;
  sales_price: number;
  product_family: number;
  sub_category: number;
}

interface RootState {
  cart: Product;
}

interface ProductRenderProps {
  data: Product[];
}

const Menu: React.FC = ({ navigation, route, cartSize }: any) => {
  const { product_family, name } = route.params;
  const { navigate, goBack } = navigation;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('products/category', {
        params: {
          product_family,
        },
      })
      .then((response) => {
        const { product } = response.data;
        setProducts(product);
      });
    setLoading(false);
  }, [product_family]);

  return (
    <Container>
      <View
        style={{
          backgroundColor: '#FD9E63',
          height: Platform.OS === 'ios' ? 80 : 40,
        }}
      >
        <Header>
          <SelectionButton onPress={() => goBack()}>
            <ChevronIcon name="chevron-left" size={22} />
          </SelectionButton>

          <StatusBar
            // translucent
            backgroundColor="#FD9E63"
            barStyle="light-content"
          />

          <SelectionButton onPress={() => navigate('Cart', { caller: 'Menu' })}>
            <View>
              <Badge
                status="error"
                value={cartSize.length}
                containerStyle={{
                  position: 'absolute',
                  top: -8,
                  right: 8,
                  opacity: 0.8,
                }}
              />
              <CartIcon name="shopping-cart" size={22} />
            </View>
          </SelectionButton>
        </Header>
      </View>
      <BannerView>
        <BannerImage source={bannerImg} />
        <BannerText>{name}</BannerText>
      </BannerView>
      <ProductList
        data={products}
        keyExtractor={(item: Product) => String(item.id)}
        renderItem={({ item }) => <ProductRender data={item} />}
      />
    </Container>
  );
};
export default connect((state: RootState) => ({
  cartSize: state.cart,
}))(Menu);
