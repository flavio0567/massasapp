import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import logoImg from '../../assets/logo_massas.png';

import {
  Container,
  SectionSeparator,
  LineSeparator,
  ProductText,
  NavigationButton,
  ProductImg,
} from './styles';

interface Product {
  id: string;
  name: string;
  sales_price: number;
  product_family: number;
  sub_category: number;
  avatar_url: HTMLImageElement;
  code: number;
}

const ProductRender: React.FC = ({ data }: any) => {
  const { navigate } = useNavigation();

  const navigateToProducts = useCallback(
    (product_family: number, category: number, code: number) => {
      navigate('Products', { product_family, category, code });
    },
    [navigate],
  );

  return (
    <Container>
      <SectionSeparator
        onPress={() => {
          navigateToProducts(data.product_family, data.category, data.code);
        }}
      >
        {data.avatar_url ? (
          <ProductImg source={{ uri: data.avatar_url }} />
        ) : (
          <ProductImg source={logoImg} />
        )}

        <View>
          <ProductText>{data.name}</ProductText>
        </View>

        <NavigationButton
          onPress={() => {
            navigateToProducts(data.product_family, data.category, data.code);
          }}
        >
          <Icon name="chevron-right" size={22} color="#666" />
        </NavigationButton>
      </SectionSeparator>
      <LineSeparator />
    </Container>
  );
};
export default ProductRender;
