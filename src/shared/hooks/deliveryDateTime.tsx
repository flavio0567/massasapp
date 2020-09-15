import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface DeliveryDateTimeState {
  deliveryDateTime: DeliveryDateTimeContext;
}

interface DeliveryDateTimeContext {
  deliveryDate: Date;
  deliveryTime: string;
}

interface DeliveryDateTimeContextData {
  deliveryDateTime: DeliveryDateTimeContext;
  setDateTime(delivery: DeliveryDateTimeContext): void;
}

const DeliveryDateTimeContext = createContext<DeliveryDateTimeContextData>(
  {} as DeliveryDateTimeContextData,
);

const DeliveryDateTimeProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    const delivery = AsyncStorage.getItem('@Massas:deliveryDateTime');

    if (delivery) {
      return { deliveryDateTime: delivery };
    }

    return {} as DeliveryDateTimeState;
  });

  const setDateTime = useCallback(async () => {
    const delivery = await AsyncStorage.getItem('@Massas:deliveryDateTime');

    if (!delivery) {
      const deliveryDateTime = {
        deliveryDate: new Date(''),
        deliveryTime: '',
      };

      setData(deliveryDateTime);

      return;
    }

    setData(JSON.parse(delivery));
  }, []);

  return (
    <DeliveryDateTimeContext.Provider
      value={{
        deliveryDateTime: data,
        setDateTime,
      }}
    >
      {children}
    </DeliveryDateTimeContext.Provider>
  );
};

function useDeliveryDateTime(): DeliveryDateTimeContextData {
  const context = useContext(DeliveryDateTimeContext);

  if (!context) {
    throw new Error(
      'useDeliveryDateTime must be uses within an DeliveryDateTimeProvider',
    );
  }

  return context;
}

export { DeliveryDateTimeProvider, useDeliveryDateTime };
