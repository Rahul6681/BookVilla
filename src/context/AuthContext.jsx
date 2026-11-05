import React, { createContext, useState, useEffect } from 'react';
import { DEMO_USER, MOCK_ORDERS } from '../data/mockBooks';
import { api } from '../services/api';

export const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'bookvilla_auth_user';
const TOKEN_STORAGE_KEY = 'bookvilla_auth_token';
const ORDERS_STORAGE_KEY = 'bookvilla_user_orders';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

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

  // Sync token with localStorage
  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to persist token:', e);
    }
  }, [token]);

  // Sync user with localStorage
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

  // Sync orders with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to persist user orders:', e);
    }
  }, [orders]);

  // Re-verify session with MongoDB backend
  useEffect(() => {
    async function verifySession() {
      if (token) {
        try {
          const profile = await api.getProfile();
          if (profile) {
            setUser(profile);
          }
        } catch {
          // Keep current profile if network blip
        }
      }
    }
    verifySession();
  }, [token]);

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    try {
      const authData = await api.login({ email, password });
      setUser(authData.user);
      setToken(authData.token);
      return authData.user;
    } catch (err) {
      // Fallback for offline demo verification if server unreachable
      if (email.toLowerCase() === 'rahul.pandit@bookvilla.in' && password === 'BookVilla2026!') {
        setUser(DEMO_USER);
        return DEMO_USER;
      }
      throw err;
    }
  };

  const signup = async ({ fullName, email, password, phone, address, pincode, city, state }) => {
    if (!fullName || !email || !password) {
      throw new Error('All fields are required.');
    }

    const authData = await api.register({
      fullName,
      email,
      password,
      phone,
      address,
      pincode,
      city,
      state
    });

    setUser(authData.user);
    setToken(authData.token);
    return authData.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch (e) {
      console.error('Logout storage clear error:', e);
    }
  };

  const toggleWishlist = async (bookId) => {
    if (!user) return false;

    const currentWishlist = user.wishlist || [];
    const isWishlisted = currentWishlist.includes(bookId);
    const updated = isWishlisted
      ? currentWishlist.filter(id => id !== bookId)
      : [...currentWishlist, bookId];

    setUser(prev => ({ ...prev, wishlist: updated }));

    try {
      if (token) {
        await api.toggleWishlist(bookId);
      }
    } catch (e) {
      console.warn('Wishlist sync with MongoDB failed:', e.message);
    }

    return !isWishlisted;
  };

  const updateProfile = async (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
    try {
      if (token) {
        const updated = await api.updateProfile(updatedFields);
        setUser(updated);
      }
    } catch (e) {
      console.warn('Profile sync with MongoDB failed:', e.message);
    }
  };

  const addOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const value = {
    user,
    token,
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
