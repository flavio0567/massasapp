import React from 'react';

import { AuthProvider } from './auth';
import { DeliveryDateTimeProvider } from './deliveryDateTime';
import { DeliveryLocalizationProvider } from './deliveryLocalization';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <DeliveryLocalizationProvider>
      <DeliveryDateTimeProvider>{children}</DeliveryDateTimeProvider>
    </DeliveryLocalizationProvider>
  </AuthProvider>
);

export default AppProvider;
