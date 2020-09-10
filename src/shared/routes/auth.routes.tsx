import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Feather';

import Porch from '../../modules/main/pages/Porch';
import SignUp from '../../modules/auth/pages/SignUp';
import SignIn from '../../modules/auth/pages/SignIn';

import Location from '../../modules/order/pages/Location';
import LocationDetails from '../../modules/order/pages/LocationDetails';
import DateTimeDelivery from '../../modules/order/pages/DateTimeDelivery';
import Menu from '../../modules/order/pages/Menu';
import Products from '../../modules/order/pages/Products';
import ProductDetails from '../../modules/order/pages/ProductDetails';
import Order from '../../modules/order/pages/Order';
import Cart from '../../modules/order/pages/Cart';
import Success from '../../modules/order/pages/Success';
import Main from '../../modules/main/pages/Main';

const Auth = createStackNavigator();

const Tab = createBottomTabNavigator();

const AuthRoutes: React.FC = () => {
  const AuthStackScreen = useCallback(() => {
    return (
      <Auth.Navigator>
        <Auth.Screen
          name="Porch"
          component={Porch}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'SignIn',
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Cadastrar',
            headerShown: false,
          }}
        />
      </Auth.Navigator>
    );
  }, []);

  const MainStackScreen = useCallback(() => {
    return (
      <Auth.Navigator>
        <Auth.Screen
          name="Order"
          component={Order}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="Menu"
          component={Menu}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="Products"
          component={Products}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="Success"
          component={Success}
          options={{
            headerShown: false,
          }}
        />
      </Auth.Navigator>
    );
  }, []);

  const DeliveryStackScreen = useCallback(() => {
    return (
      <Auth.Navigator>
        <Auth.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="Location"
          component={Location}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="LocationDetails"
          component={LocationDetails}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="DateTimeDelivery"
          component={DateTimeDelivery}
          options={{
            headerShown: false,
          }}
        />
      </Auth.Navigator>
    );
  }, []);

  const CartStackScreen = useCallback(() => {
    return (
      <Auth.Navigator>
        <Auth.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
          }}
        />
        <Auth.Screen
          name="Success"
          component={Success}
          options={{
            headerShown: false,
          }}
        />
      </Auth.Navigator>
    );
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ff9000',
        inactiveTintColor: '#fcd0ba',
        style: {
          backgroundColor: '#fff5e6',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="AuthStack"
        component={AuthStackScreen}
        options={{
          tabBarLabel: 'Criar conta',
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={22} style={{ padding: 8 }} />
          ),
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="DeliveryStack"
        component={DeliveryStackScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={22} style={{ padding: 8 }} />
          ),
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="MainStack"
        component={MainStackScreen}
        options={{
          tabBarLabel: 'Cardápio',
          tabBarIcon: ({ color }) => (
            <Icon
              name="book-open"
              color={color}
              size={22}
              style={{ padding: 8 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStackScreen}
        options={{
          tabBarLabel: 'Pedido',
          tabBarIcon: ({ color }) => (
            <Icon
              name="shopping-cart"
              color={color}
              size={22}
              style={{ padding: 8 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthRoutes;
