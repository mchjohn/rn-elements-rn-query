import React from 'react';
import { Input, Icon } from '@rneui/themed';
import { TextInputProps } from 'react-native';

import { colors } from '../../styles';

type Props = TextInputProps;

export function InputEmail({ ...rest }: Props) {
  return (
    <Input
      label="Digite seu e-mail"
      placeholder="exemplo@exemplo.com"
      keyboardType="email-address"
      leftIcon={<Icon size={24} name="email" color={colors.gray400} />}
      labelStyle={{ color: colors.gray300 }}
      inputStyle={{ color: colors.gray400 }}
      autoCapitalize="none"
      autoCorrect={false}
      {...rest}
    />
  );
}
