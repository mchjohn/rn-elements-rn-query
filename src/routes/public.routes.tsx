import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

import { PropsNavigationStack } from './Models';

import { colors } from '../styles';

const { Navigator, Screen } = createNativeStackNavigator<PropsNavigationStack>();

export function PublicNavigation() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        contentStyle: { backgroundColor: colors.white },
      }}
    >
      <Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    </Navigator>
  );
}
