import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

import { colors } from '../../styles';

export function FloatButton({ ...rest }) {
  return (
    <Pressable style={styles.button} {...rest}>
      <Text style={styles.label}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.blue,

    borderRadius: 25,
    bottom: 0,
    height: 50,
    justifyContent: 'center',
    marginBottom: 32,

    marginRight: 16,
    position: 'absolute',
    right: 0,
    width: 50,
  },
  label: {
    color: colors.white,
    fontSize: 42,
    fontWeight: '600',
    lineHeight: 50,
  },
});
