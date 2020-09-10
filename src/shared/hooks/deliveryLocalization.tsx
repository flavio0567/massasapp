import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface DeliveryLocalizationState {
  deliveryLocalization: DeliveryLocalizationContext;
}

export interface DeliveryLocalizationContext {
  cep: string | number;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  numberAddress: number;
  complementAddress: string;
}

interface DeliveryLocalizationContextData {
  deliveryLocalization: DeliveryLocalizationContext;
  setLocalization(delivery: DeliveryLocalizationContext): void;
}

const DeliveryLocalizationContext = createContext<
  DeliveryLocalizationContextData
>({} as DeliveryLocalizationContextData);

const DeliveryLocalizationProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<DeliveryLocalizationState>(() => {
    const delivery = AsyncStorage.getItem('@Massas:deliveryLocalization');

    if (delivery) {
      return { deliveryLocalization: delivery };
    }

    return {} as DeliveryLocalizationState;
  });

  const setLocalization = useCallback(async () => {
    const delivery = await AsyncStorage.getItem('@Massas:deliveryLocalization');

    if (!delivery) {
      setData({} as DeliveryLocalizationState);

      return;
    }

    setData(JSON.parse(delivery));
  }, []);

  return (
    <DeliveryLocalizationContext.Provider
      value={{
        deliveryLocalization: data,
        setLocalization,
      }}
    >
      {children}
    </DeliveryLocalizationContext.Provider>
  );
};

function useDeliveryLocalization(): DeliveryLocalizationContextData {
  const context = useContext(DeliveryLocalizationContext);

  if (!context) {
    throw new Error(
      'useDeliveryLocalization must be uses within an DeliveryLocalizationProvider',
    );
  }

  return context;
}

export { DeliveryLocalizationProvider, useDeliveryLocalization };
