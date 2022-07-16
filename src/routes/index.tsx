import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PublicNavigation } from './public.routes';
import { PrivateNavigation } from './private.routes';

import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const { user } = useAuth();
  
  function getNavigation() {
    if (!user.uid) {
      return <PublicNavigation />;
    }
    return <PrivateNavigation />;
  }

  return (
    <NavigationContainer>
      {getNavigation()}
    </NavigationContainer>
  );
}
