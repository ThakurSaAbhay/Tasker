import Toast from 'react-native-toast-message';

export const showToast = {
  error: (title, message) => {
    Toast.show({
      type: 'error',
      text1: title || 'Error',
      text2: message,
      position: 'bottom',
      visibilityTime: 4000,
    });
  },
  success: (title, message) => {
    Toast.show({
      type: 'success',
      text1: title || 'Success',
      text2: message,
      position: 'bottom',
      visibilityTime: 4000,
    });
  },
  info: (title, message) => {
    Toast.show({
      type: 'info',
      text1: title || 'Info',
      text2: message,
      position: 'bottom',
      visibilityTime: 4000,
    });
  }
};

export const TOAST_MESSAGES = {
  AUTH: {
    LOGIN_ERROR: 'Login Error',
    SIGNUP_ERROR: 'Signup Error',
    INVALID_CREDENTIALS: 'Invalid login credentials',
    SIGNUP_SUCCESS: 'Account created successfully',
    LOGIN_SUCCESS: 'Logged in successfully'
  },
  VALIDATION: {
    REQUIRED_FIELDS: 'Please fill in all required fields',
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_SHORT: 'Password must be at least 6 characters long'
  }
}; 