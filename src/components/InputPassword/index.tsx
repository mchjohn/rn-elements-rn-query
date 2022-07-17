import React from "react";
import { Input, Icon } from "@rneui/themed";
import { TextInputProps } from "react-native";

import { colors } from "../../styles";

type Props = TextInputProps & {
  errorMessage: string;
};

export function InputPassword({ errorMessage, ...rest }: Props) {
  return (
    <Input
      label='Digite sua senha'
      placeholder="Sua senha"
      secureTextEntry={true}
      errorMessage={errorMessage}
      errorStyle={{ color: '#FF4500'}}
      leftIcon={
        <Icon
          size={24}
          name='lock'
          color={colors.gray400}
        />
      }
      labelStyle={{ color: colors.gray300 }}
      inputStyle={{ color: colors.gray400 }}
      autoCapitalize='none'
      autoCorrect={false}
      {...rest}
    />
  );
}