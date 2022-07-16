import React, { useState } from "react";
import { View, Text } from "react-native";
import auth from '@react-native-firebase/auth';
import { Input, Icon, Button } from "@rneui/themed";
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '437824743672-g9bq2idg5hki0sibdu01jhfl2l0ariei.apps.googleusercontent.com',
})

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

  const handleSigninWithGoogle = async () => {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
    
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      const { user } = await auth().signInWithCredential(googleCredential);
      
      onAddUser(user.uid, user.displayName, user.email, user.photoURL);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

    // Cadastra o usuário no firestore
    const onAddUser = async (uid: string, name: string | null, email: string | null, photoURL: string | null) => {
      try {
        // Verifica se o usuário já está cadastrado no firestore
        const { exists } = await firestore().collection('Users').doc(uid).get();

        if (exists) return;

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
            marginBottom: 16,
          }}
          onPress={handleSigninWithGoogle}
        />
      
        {/*
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
        */}

        <ButtonNavigation type="signin" />

      </View>
    </KeyboardAvoidingViewWrapper>
  );
}