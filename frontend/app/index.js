import React from 'react';
import { AuthProvider } from '../src/context/AuthContext';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from '../src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </AuthProvider>
  );
} 