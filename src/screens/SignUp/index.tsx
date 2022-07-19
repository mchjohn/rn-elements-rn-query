import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { View, StyleSheet } from 'react-native';

import { saveUserInFirestore } from '../../utils/saveUserInFirestore';

import { SmallText } from '../../components/SmallText';
import { ButtonSign } from '../../components/ButtonSign';
import { InputEmail } from '../../components/InputEmail';
import { ButtonNavigation } from '../../components/ButtonNavigation';
import { KeyboardAvoidingViewWrapper } from '../../components/KeyboardAvoidingViewWrapper';

import { colors } from '../../styles';
import { InputPassword } from '../../components/InputPassword/index';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Cria conta com email e senha
  const handleCreateUserAccount = async () => {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);

      saveUserInFirestore({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email!,
        photoURL: user.photoURL,
      });
    } catch (err: any) { // eslint-disable-line
      if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('Esse e-mail já está em uso');
      } else if (err.code === 'auth/weak-password') {
        setErrorMessage('A senha deve ter no mínimo 6 caracteres');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMessage('Digite um e-mail válido');
      }
    }
  };

  return (
    <KeyboardAvoidingViewWrapper>
      <View style={styles.container}>
        <InputEmail onChangeText={setEmail} />
        <InputPassword onChangeText={setPassword} errorMessage={errorMessage} />

        <ButtonSign
          type="signup"
          disabled={!email || !password}
          onPress={handleCreateUserAccount}
        />

        <SmallText text="ou" />

        <ButtonNavigation type="signup" />
      </View>
    </KeyboardAvoidingViewWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});
