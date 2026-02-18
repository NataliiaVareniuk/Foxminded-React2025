import { useReducer } from "react";
import { CartContext } from "@/context/CartContext";
import { ACTION_TYPES } from "./ActionTypes";

const initialState = {};

function cartReducer(currentState, action) {
  const prodId = action.payload;
  let newState;

  switch (action.type) {
    
    case ACTION_TYPES.ADD:
      newState = {
        ...currentState,
        [prodId]: (currentState[prodId] ?? 0) + 1,
      };
      break;

    case ACTION_TYPES.REMOVE:
      newState = {
        ...currentState,
        [prodId]: (currentState[prodId] ?? 0) - 1,
      };
      if (newState[prodId] <= 0) delete newState[prodId];
      break;

    case ACTION_TYPES.DELETE:
      newState = { ...currentState };
      delete newState[prodId];
      break;

      case ACTION_TYPES.CLEAR_CART:
      newState = initialState;
    
      break;

    default:
      newState = currentState;
      break;
  }
    if (Object.keys(newState).length === 0) {
    newState = initialState;
  }
  return newState;
}

function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{cartState, dispatch}}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
