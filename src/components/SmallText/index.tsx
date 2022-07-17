import React from 'react';
import { Text } from 'react-native';

import { colors } from '../../styles';

type Props = {
  text: string;
}

export function SmallText({ text }: Props) {
  return (
    <Text
      style={{
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 8,
        color: colors.gray300,
      }}
    >
      {text}
    </Text>
  );
}