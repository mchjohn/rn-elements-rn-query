import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { useAuth } from "../../contexts/AuthContext";

import { SmallText } from '../../components/SmallText';
import { ButtonSign } from '../../components/ButtonSign';
import { InputEmail } from '../../components/InputEmail';
import { SocialButton } from '../../components/SocialButton';
import { InputPassword } from '../../components/InputPassword';
import { ButtonNavigation } from '../../components/ButtonNavigation';
import { KeyboardAvoidingViewWrapper } from '../../components/KeyboardAvoidingViewWrapper';

import { colors, fontSize } from "../../styles";

export function SignIn() {
  const { signInWithEmail, signInWithGoogle, errorMessage } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingViewWrapper>
      <View style={styles.container}>
        <InputEmail onChangeText={setEmail} />
        <InputPassword onChangeText={setPassword} errorMessage={errorMessage} />

        <ButtonSign
          type="signin"
          disabled={!email || !password}
          onPress={() => signInWithEmail(email, password)}
        />

        <SmallText text="ou" />

        <SocialButton onPress={signInWithGoogle} />

        <ButtonNavigation type="signin" />
      </View>
    </KeyboardAvoidingViewWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
  },
  text: {
    fontWeight: '600',
    marginVertical: 8,
    color: colors.gray300,
    fontSize: fontSize.small,
  },
});