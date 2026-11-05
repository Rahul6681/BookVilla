import React, { createContext, useState, useEffect } from 'react';
import { DEMO_USER, MOCK_ORDERS } from '../data/mockBooks';

export const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'bookvilla_auth_user';
const ORDERS_STORAGE_KEY = 'bookvilla_user_orders';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : MOCK_ORDERS;
    } catch {
      return MOCK_ORDERS;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to persist auth user:', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to persist user orders:', e);
    }
  }, [orders]);

  const login = (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }
    const loggedInUser = {
      ...DEMO_USER,
      email: email.trim(),
      fullName: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
    setUser(loggedInUser);
    return loggedInUser;
  };

  const signup = ({ fullName, email, password }) => {
    if (!fullName || !email || !password) {
      throw new Error('All fields are required.');
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      membershipTier: 'BookVilla Rasika Patron',
      joinDate: new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(new Date()),
      phone: '+91 98765 43210',
      address: 'Flat 101, Gulmohar Enclave, MG Road, New Delhi 110001',
      wishlist: []
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleWishlist = (bookId) => {
    if (!user) return false;
    const currentWishlist = user.wishlist || [];
    const isWishlisted = currentWishlist.includes(bookId);
    const updated = isWishlisted
      ? currentWishlist.filter(id => id !== bookId)
      : [...currentWishlist, bookId];

    setUser(prev => ({ ...prev, wishlist: updated }));
    return !isWishlisted;
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  const addOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    orders,
    login,
    signup,
    logout,
    toggleWishlist,
    updateProfile,
    addOrder
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
