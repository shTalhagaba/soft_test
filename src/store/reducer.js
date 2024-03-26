import {ADD_TO_CART, REMOVE_FROM_CART,UPDATE_FROM_CART} from './constants';

const initialState = [];
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.data];
      case UPDATE_FROM_CART:
        return action.data;
    case REMOVE_FROM_CART:
      let result = state.filter(item => {
        return item.id != action.data;
      });
      return [...result];
    default:
      return state;
  }
};
