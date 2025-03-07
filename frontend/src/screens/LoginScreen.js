import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { ThemedText } from '../../components/ThemedText';
import { showToast, TOAST_MESSAGES } from '../utils/toastConfig';
import LottieView from 'lottie-react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    if (!valid) return;

    try {
      setLoading(true);
      await login(email, password);
      showToast.success(TOAST_MESSAGES.AUTH.LOGIN_SUCCESS);
    } catch (error) {
      showToast.error(
        TOAST_MESSAGES.AUTH.LOGIN_ERROR,
        error.response?.data?.error || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Login</ThemedText>
      <LottieView
        source={require('../../assets/animations/to-do.json')}
        autoPlay
        loop
        style={{ width: 400, height: 400, alignSelf: 'center' }}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        autoCapitalize="none"
        theme={{ colors: { primary: '#bf8704' } , borderRadius:10}}
  
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
        theme={{ colors: { primary: '#bf8704' }}}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <Button 
        mode="contained" 
        onPress={handleLogin}
        loading={loading}
        style={styles.button}
        buttonColor='#bf8704'
      >
        Login
      </Button>
      <Button 
        mode="text" 
        onPress={() => navigation.navigate('Signup')}
      >
        Don't have an account? Sign up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
  title: {
    color:'#bf8704',
    textAlign: 'center',
  },
  input: {
    marginTop: 12,
  },
  button: {
    marginTop: 20,
    marginBottom: 12,
    color:'#ffe136'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
