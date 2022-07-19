import React from 'react';
import { Button } from '@rneui/themed';

import { colors } from '../../styles';

type Props = {
  onPress: () => void;
};

export function SocialButton({ onPress }: Props) {
  return (
    <Button
      size="lg"
      title="Entrar com Google"
      icon={{
        name: 'google',
        type: 'font-awesome',
        color: colors.white,
      }}
      iconContainerStyle={{ marginRight: 10 }}
      // eslint-disable-next-line react-native/no-color-literals
      buttonStyle={{
        backgroundColor: '#4285F4',
      }}
      containerStyle={{
        width: '100%',
        marginBottom: 16,
      }}
      onPress={onPress}
    />
  );
}
