import produce from 'immer';
import { enableES5 } from 'immer';

enableES5();

type ReducerProps = {
  reducer: string;
};

interface StateProp {
  // eslint-disable-next-line @typescript-eslint/ban-types
  order: Object;

  quantity(quantity: any): any;
  id: string;
  type: string;
  payload: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  product: Object;
}

export default function cart(state = [], action: StateProp): ReducerProps[] {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, (draft) => {
        const { product } = action;

        draft.push(product);
      });
    case '@cart/ADD_ADDRESS':
      return produce(state, (draft) => {
        draft.push({
          ...action.order,
          deliveryAddress,
        });
      });
    case '@cart/ADD_DATE_TIME':
      return produce(state, (draft) => {
        draft.push({
          ...action.order,
          deliveryDateTime,
        });
      });
    case '@cart/REMOVE':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/REMOVE_ALL':
      return produce(state, (draft) => {
        draft.forEach((p) => {
          draft.splice(p);
        });
      });
    case '@cart/UPDATE_QUANTITY_SUCCESS': {
      return produce(state, (draft) => {
        const productIndex = draft.findIndex(
          (p: { id: string }) => p.id === action.id,
        );

        if (productIndex >= 0) {
          draft[productIndex].quantity = Number(action.quantity);
        }
      });
    }
    default:
      return state;
  }
}
