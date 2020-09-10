import Intl from 'intl';

import 'intl/locale-data/jsonp/pt.js';

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
