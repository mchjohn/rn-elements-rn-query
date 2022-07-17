import React from "react";
import { Button } from "@rneui/themed";

import { colors } from "../../styles";

type Props = {
  type: 'signin' | 'signup';
  disabled: boolean;
  onPress: () => void;
}

export function ButtonSign({ type, disabled, onPress }: Props) {
  return (
    <Button
      size='lg'
      color='primary'
      onPress={onPress}
      disabled={disabled}
      title={type === 'signin' ? 'Entrar' : 'Criar conta'}
      containerStyle={{
        width: '100%',
        marginTop: 8,
      }}
      buttonStyle={{ backgroundColor: colors.blue }}
    />
  );
}