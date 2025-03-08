import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform, Alert } from 'react-native';
import { ToastAndroid } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL='https://tasker-pi-teal.vercel.app/'

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const login = async (email, password) => {
    if (!validateEmail(email)) {
      showToast('Invalid email format');
      return false;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters');
      return false;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}auth/login`, {
        email,
        password,
      });
      
      const { user, token } = response.data;
      await AsyncStorage.setItem('token', token);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error.response);
      if (error.response && error.response.status === 400) {
        showToast('Please check the email or password');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    if (!validateEmail(email)) {
      showToast('Invalid email format');
      return false;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters');
      return false;
    }

    try {
      setLoading(true);
      
      const response = await axios.post(`${API_URL}auth/signup`, {
        name,
        email,
        password,
      });
      const { user, token } = response.data;
      await AsyncStorage.setItem('token', token);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Signup error:', error.message);
      if (error.response && error.response.status === 400) {
        showToast('Invalid inputs');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: async () => {
            try {
              await AsyncStorage.removeItem('token');
              setUser(null);
            } catch (error) {
              console.error('Logout error:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
