import React, { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext(null);

const CART_STORAGE_KEY = 'bookvilla_cart_state';

const initialState = {
  items: [],
  couponCode: '',
  discountPercent: 0,
  notification: null
};

const VALID_COUPONS = {
  'BOOKVILLA15': 15,
  'DESIREADER': 10,
  'DIWALI20': 20
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT_CART': {
      return {
        ...state,
        ...action.payload
      };
    }

    case 'ADD_ITEM': {
      const { book, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === book.id);

      let newItems;
      if (existingIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            originalPrice: book.originalPrice,
            coverImage: book.coverImage,
            format: book.format,
            quantity
          }
        ];
      }

      return {
        ...state,
        items: newItems,
        notification: `Added "${book.title}" to your BookVilla cart.`
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== id)
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        notification: itemToRemove ? `Removed "${itemToRemove.title}" from your cart.` : null
      };
    }

    case 'APPLY_COUPON': {
      const code = action.payload.trim().toUpperCase();
      if (VALID_COUPONS[code]) {
        return {
          ...state,
          couponCode: code,
          discountPercent: VALID_COUPONS[code],
          notification: `Coupon "${code}" applied! ${VALID_COUPONS[code]}% discount added.`
        };
      } else {
        return {
          ...state,
          notification: `Invalid coupon code. Try BOOKVILLA15.`
        };
      }
    }

    case 'REMOVE_COUPON': {
      return {
        ...state,
        couponCode: '',
        discountPercent: 0,
        notification: 'Coupon code removed.'
      };
    }

    case 'CLEAR_CART': {
      return {
        ...initialState
      };
    }

    case 'CLEAR_NOTIFICATION': {
      return {
        ...state,
        notification: null
      };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({
        items: state.items,
        couponCode: state.couponCode,
        discountPercent: state.discountPercent
      }));
    } catch (e) {
      console.error('Failed to persist cart:', e);
    }
  }, [state.items, state.couponCode, state.discountPercent]);

  // Auto-dismiss notification toast
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [state.notification]);

  // Derived financial calculations in INR
  const subtotal = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const discountAmount = Math.round((subtotal * state.discountPercent) / 100);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount > 0 ? Math.round(taxableAmount * 0.05) : 0; // 5% GST on books & handling
  const shipping = subtotal === 0 || subtotal >= 499 ? 0 : 49; // Free delivery above ₹499
  const grandTotal = taxableAmount + tax + shipping;

  const addItem = (book, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { book, quantity } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const applyCoupon = (code) => {
    dispatch({ type: 'APPLY_COUPON', payload: code });
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const clearNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };

  const value = {
    items: state.items,
    totalItems,
    couponCode: state.couponCode,
    discountPercent: state.discountPercent,
    notification: state.notification,
    subtotal,
    discountAmount,
    tax,
    shipping,
    grandTotal,
    addItem,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    clearCart,
    clearNotification
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
