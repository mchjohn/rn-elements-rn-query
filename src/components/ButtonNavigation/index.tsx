import React from "react";
import { Button } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

import { PropsStack } from "src/routes/Models";

type Props = {
  type: 'signin' | 'signup';
}

export function ButtonNavigation({ type }: Props) {
  const { navigate } = useNavigation<PropsStack>();

  return (
    <Button
      size='lg'
      title={type === 'signin' ? 'Criar uma conta' : 'Fazer login'}
      onPress={() => navigate(type === 'signin' ? 'SignUp' : 'SignIn')}
      containerStyle={{
        width: '100%',
      }}
      buttonStyle={{
        backgroundColor: '#3A3A3A',
      }}
    />
  )
}