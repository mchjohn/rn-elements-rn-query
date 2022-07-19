import React from 'react';
import Toast from 'react-native-toast-message';

import { Navigation } from './src/routes';

import { useToast } from './src/hooks/useToast';

import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  const { toastConfig } = useToast();

  return (
    <AuthProvider>
      <Navigation />
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}
