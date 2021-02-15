import React, { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';

import NestedListView, { NestedRow } from 'react-native-nested-listview';
import {
  View,
  StatusBar,
  Modal,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import { useAuth } from '../../../../shared/hooks/auth';

import api from '../../../../shared/service/api';

import {
  Container,
  Header,
  SelectionButton,
  ChevronIcon,
  StatusBarText,
  LineSeparator,
  ProductLabelText,
  ProductText,
  OrderDetail,
  OrderItem,
  ListOrders,
  ModalOrderItemDetail,
  ModalOrderDetail,
  ModalOrderDetailText,
  OpenButton,
  CreateAccountButtonText,
  IconLogIn,
} from './styles';

export interface OrdersDetail {
  id: string;
  order_id: string;
  product_id: string;
  sales_price: string;
  unit: string;
  amount: number;
  quantity: string;
  product_name: string;
  packing: string;
}

export interface Order {
  id: string;
  delivery_mobile: number;
  delivery_date: Date;
  delivery_name: string;
  delivery_time: string;
  delivery_address1: string;
  delivery_address2: string;
  delivery_city: string;
  delivery_state: string;
  delivery_zip_code: string;
  order_total: number;
  is_delivered: number;
  is_order_delivering: number;
  ordersdetail: OrdersDetail;
  payment_method: string;
  created_at: string;
  updated_at: string;
}
[];

const More: React.FC = () => {
  const { user } = useAuth();
  const { goBack, reset } = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [token, setToken] = useState<string | null>();
  const [orders, setOrders] = useState<Order>();
  const [selectedOrder, setSelectedOrder] = useState<Order>();
  const [delivery_mobile, setDelivery_mobile] = useState<number>();

  useEffect(() => {
    async function getToken(): Promise<void> {
      const userToken = await AsyncStorage.getItem('@Massas:token');
      setToken(userToken);
    }
    const { mobile } = user;
    setDelivery_mobile(mobile);
    getToken();
  }, [user]);

  useEffect(() => {
    if (token) {
      api.get(`orders/mobile/${delivery_mobile}`).then((response) => {
        setOrders(response.data.order);
      });
    }
  }, [delivery_mobile, token, user]);

  const mountOrderSelected = useCallback(
    (index) => {
      setModalVisible(true);
      setSelectedOrder(orders[index]);
    },
    [orders],
  );

  return (
    <Container>
      <View
        style={{
          backgroundColor: '#FD9E63',
          height: hp('10%'),
        }}
      >
        <Header>
          <SelectionButton onPress={() => goBack()}>
            <ChevronIcon name="chevron-left" size={22} />
          </SelectionButton>

          <StatusBar backgroundColor="#FD9E63" barStyle="light-content" />
          <StatusBarText allowFontScaling={false}>Mais</StatusBarText>
        </Header>
      </View>
      <LineSeparator>
        <ProductLabelText
          allowFontScaling={false}
          accessibilityLabel="Detalhes do pedido"
        >
          Dados da conta
        </ProductLabelText>
      </LineSeparator>
      {token ? (
        <>
          <ProductText
            allowFontScaling={false}
            accessibilityLabel="Nome do usuário"
          >
            Nome: {user.name}
          </ProductText>
          <ProductText
            allowFontScaling={false}
            accessibilityLabel="Nome do usuário"
          >
            Celular: {user.mobile}
          </ProductText>
        </>
      ) : (
        <>
          <TouchableOpacity
            accessibilityComponentType="button"
            onPress={() => {
              reset({
                routes: [{ name: 'SignUp' }],
                index: 0,
              });
            }}
            style={{ flexDirection: 'row', marginLeft: 20 }}
          >
            <IconLogIn name="log-in" size={20} color="#FD9E63" />
            <CreateAccountButtonText
              allowFontScaling={false}
              accessibilityLabel="Criar sua conta"
            >
              Criar sua conta
            </CreateAccountButtonText>
          </TouchableOpacity>
        </>
      )}
      <LineSeparator>
        <ProductLabelText
          allowFontScaling={false}
          accessibilityLabel="Detalhes do pedido"
        >
          Seus pedidos
        </ProductLabelText>
      </LineSeparator>
      {!user && (
        <>
          <ProductLabelText
            allowFontScaling={false}
            accessibilityLabel="Você não tem nenhum pedido"
          >
            Você não tem nenhum pedido!
          </ProductLabelText>
        </>
      )}
      <ListOrders
        data={orders}
        keyExtractor={(item: Order) => String(item.id)}
        renderItem={({ item, index }) => (
          <OrderItem>
            <OrderDetail>
              <View>
                <ProductText>
                  {' '}
                  {format(new Date(item.delivery_date), 'dd/MM/yyyy')}
                  {' - '}
                  {item.delivery_time}
                </ProductText>
              </View>

              {item.is_delivered ? (
                <ProductText
                  allowFontScaling={false}
                  accessibilityLabel="Atendido"
                  style={{ color: '#6baa8a', width: 95 }}
                >
                  Atendido
                </ProductText>
              ) : (
                <ProductText
                  allowFontScaling={false}
                  accessibilityLabel="Em atendimento"
                  style={{ color: '#ff9000', width: 95 }}
                >
                  Em atendimento
                </ProductText>
              )}

              <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Detalhes do pedido fechado!');
                }}
              >
                <View
                  style={{
                    marginTop: 206,
                    marginLeft: 20,
                    marginRight: 20,
                    height: 300,
                    backgroundColor: '#fff5e6',
                    borderRadius: 20,
                    shadowOpacity: 0.45,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowRadius: 3.84,
                    elevation: 5,
                    alignItems: 'center',
                  }}
                >
                  <View style={{ marginTop: 10 }}>
                    {selectedOrder && (
                      <>
                        {selectedOrder.is_order_delivering ? (
                          <ProductText
                            allowFontScaling={false}
                            accessibilityLabel="Dados da entrega/retirada"
                          >
                            Entrega: {selectedOrder.delivery_address1}
                            {' - '}
                            {selectedOrder.delivery_address2}
                            {' - '}
                            {selectedOrder.delivery_city}
                            {' - '}
                            {selectedOrder.delivery_zip_code}
                            {' - '}
                            {selectedOrder.delivery_state}
                          </ProductText>
                        ) : (
                          <ProductText
                            allowFontScaling={false}
                            accessibilityLabel="Retirar na loja"
                          >
                            Retirar na loja{' '}
                          </ProductText>
                        )}
                        <NestedListView
                          data={selectedOrder.ordersdetail}
                          getChildrenName={(node) => String(node.id)}
                          onNodePressed={(node) =>
                            console.log(node.product_name)
                          }
                          renderNode={(node, level) => (
                            <ModalOrderDetail level={level}>
                              <ModalOrderItemDetail>
                                <NestedRow>
                                  <ModalOrderDetailText
                                    allowFontScaling={false}
                                    accessibilityLabel="unidade/Kilograma"
                                  >
                                    {node.product_name} - {node.quantity}{' '}
                                    {node.unit === 'UN' ? 'un.' : 'Kg'}
                                  </ModalOrderDetailText>
                                </NestedRow>
                              </ModalOrderItemDetail>
                            </ModalOrderDetail>
                          )}
                        />
                      </>
                    )}

                    <OpenButton
                      style={{
                        marginLeft: 8,
                        marginTop: 5,
                        marginBottom: 8,
                        backgroundColor: '#FD9E63',
                        borderRadius: 20,
                        padding: 5,
                        elevation: 2,
                      }}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        accessibilityLabel="Fechar"
                        style={{
                          color: 'white',
                          fontSize: 12,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginBottom: 5,
                        }}
                      >
                        Fechar
                      </Text>
                    </OpenButton>
                  </View>
                </View>
              </Modal>
              <OpenButton
                style={{ backgroundColor: '#FD9E63', fontSize: 2 }}
                onPress={() => {
                  mountOrderSelected(index);
                }}
              >
                <ProductText
                  allowFontScaling={false}
                  accessibilityLabel="Detalhes"
                  style={{ color: 'white', fontWeight: 'bold' }}
                >
                  Detalhes
                </ProductText>
              </OpenButton>
            </OrderDetail>
          </OrderItem>
        )}
      />
    </Container>
  );
};

export default More;
