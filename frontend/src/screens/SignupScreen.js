import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { ThemedText } from '../../components/ThemedText';
import { showToast, TOAST_MESSAGES } from '../utils/toastConfig';
import LottieView from 'lottie-react-native';


export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signup } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    let valid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');

    if (!name) {
      setNameError('Name is required');
      valid = false;
    }

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
      await signup(name, email, password);
      showToast.success(TOAST_MESSAGES.AUTH.SIGNUP_SUCCESS);
    } catch (error) {
      showToast.error(
        TOAST_MESSAGES.AUTH.SIGNUP_ERROR,
        error.response?.data?.error || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Sign Up</ThemedText>
      <LottieView
        source={require('../../assets/animations/sign-up.json')}
        autoPlay
        loop
        style={{ width: 400, height: 400, alignSelf: 'center' }}
      />
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
        theme={{ colors: { primary: '#bf8704' }}}
        />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        autoCapitalize="none"
        theme={{ colors: { primary: '#bf8704' }}}
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
        onPress={handleSignup}
        loading={loading}
        style={styles.button}
        buttonColor='#bf8704'
      >
        Sign Up
      </Button>
      <Button 
        mode="text" 
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor:'#fff',
  },
  title: {
    color:'#bf8704',
    textAlign: 'center',
  },
  input: {
    color:'#bf8704',
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    fontSize: 12,
  },
});
