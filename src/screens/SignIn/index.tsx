import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import auth from '@react-native-firebase/auth';

import { ButtonSign } from '../../components/ButtonSign';
import { ButtonNavigation } from '../../components/ButtonNavigation';
import { KeyboardAvoidingViewWrapper } from '../../components/KeyboardAvoidingViewWrapper';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') {
        setErrorMessage('Verifique sua senha e tente novamente');
      } else if (err.code === 'auth/user-not-found') {
        setErrorMessage('Verifique seu e-mail e tente novamente');
      }
    }
  }

  return (
    <KeyboardAvoidingViewWrapper>
      <View
        style={{
          flex: 1,
          padding: 16,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Input
          label='Digite seu e-mail'
          placeholder='exemplo@exemplo.com'
          keyboardType="email-address"
          onChangeText={setEmail}
          leftIcon={
            <Icon
              size={24}
              name='email'
              color='#4F4F4F'
            />
          }
        />
        <Input
          label='Digite sua senha'
          placeholder="Sua senha"
          secureTextEntry={true}
          onChangeText={setPassword}
          errorMessage={errorMessage}
          errorStyle={{ color: '#FF4500'}}
          leftIcon={
            <Icon
              size={24}
              name='lock'
              color='#4F4F4F'
            />
          }
        />

        <ButtonSign
          type="signin"
          disabled={!email || !password}
          onPress={() => handleSignIn()}
        />

        <Text
          style={{
            fontSize: 14,
            color: '#4F4F4F',
            fontWeight: '600',
            marginVertical: 8,
          }}
        >
          ou
        </Text>

        <Button
          size="lg"
          title="Entrar com Google"
          icon={{
            name: 'google',
            type: 'font-awesome',
            color: '#FFFAFA',
          }}
          iconContainerStyle={{ marginRight: 10 }}
          buttonStyle={{
            backgroundColor: '#4285F4',
          }}
          containerStyle={{
            width: '100%',
          }}
        />

        <Button
          size="lg"
          title="Entrar com FaceBook"
          icon={{
            name: 'facebook',
            type: 'font-awesome',
            color: '#FFFAFA',
          }}
          iconContainerStyle={{ marginRight: 10 }}
          buttonStyle={{
            backgroundColor: '#4267B2',
          }}
          containerStyle={{
            width: '100%',
            marginVertical: 16,
          }}
        />

        <ButtonNavigation type="signin" />

      </View>
    </KeyboardAvoidingViewWrapper>
  );
}