import { useReducer, createContext } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItem = state.items.find((item) => item.id === action.item.id);
    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    const updatedItem = { ...action.item, quantity: 1 };
    return { ...state, items: [...state.items, updatedItem] };
  }

  
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }

  const cartContext = {
    items: cart.items,
    addItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
