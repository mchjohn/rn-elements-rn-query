import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input, Icon } from "@rneui/themed";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { ButtonSign } from '../../components/ButtonSign';
import { ButtonNavigation } from '../../components/ButtonNavigation';
import { KeyboardAvoidingViewWrapper } from "../../components/KeyboardAvoidingViewWrapper";

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Cadastra o usuário no firestore
  const onAddUser = async (uid: string, name: string | null, email: string | null, photoURL: string | null) => {
    try {
      await firestore().collection('Users').doc(uid).set(
        {
          name,
          email,
          photoURL,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      console.log('Usuário cadastrado com sucesso');
    } catch (error) {
      console.log(error);
    }
  }

  // Cria uma conta com email e senha
  const handleCreateUserAccount = async () => {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);

      onAddUser(user.uid, user.displayName, user.email, user.photoURL);
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('Esse e-mail já está em uso');
      } else if (err.code === 'auth/weak-password') {
        setErrorMessage('A senha deve ter no mínimo 6 caracteres');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMessage('Digite um e-mail válido');
      }
    }
  }

  return (
    <KeyboardAvoidingViewWrapper>
    <View style={{
      flex: 1,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
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
        placeholder="Password"
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
        type="signup"
        disabled={!email || !password}
        onPress={handleCreateUserAccount}
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

      <ButtonNavigation type="signup" />
    </View>
    </KeyboardAvoidingViewWrapper>
  )
}