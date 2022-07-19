import React from 'react';
import { Input, Icon } from '@rneui/themed';
import { TextInputProps } from 'react-native';

import { colors } from '../../styles';

type Props = TextInputProps & {
  errorMessage: string;
};

export function InputPassword({ errorMessage, ...rest }: Props) {
  return (
    <Input
      autoCorrect={false}
      autoCapitalize="none"
      label="Digite sua senha"
      secureTextEntry={true}
      placeholder="Sua senha"
      errorMessage={errorMessage}
      errorStyle={{ color: colors.error }}
      labelStyle={{ color: colors.gray300 }}
      inputStyle={{ color: colors.gray400 }}
      leftIcon={<Icon size={24} name="lock" color={colors.gray400} />}
      {...rest}
    />
  );
}
