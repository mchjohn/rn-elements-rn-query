import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { IUser } from '../constants/user';

import { PublicNavigation } from './public.routes';
import { PrivateNavigation } from './private.routes';


export function Navigation() {
  const [user, setUser] = useState<IUser | null | FirebaseAuthTypes.User>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return subscriber;
  }, []);

  function getNavigation() {
    if (!user) {
      return <PublicNavigation />;
    }
    return <PrivateNavigation />;
  }

  return <NavigationContainer>{getNavigation()}</NavigationContainer>;
}
