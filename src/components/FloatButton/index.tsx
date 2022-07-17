import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

import { colors } from '../../styles';

export function FloatButton({ ...rest }) {
  return (
    <Pressable
      style={styles.button}
      {...rest}
      >
      <Text style={styles.label}>+</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,

    right: 0,
    bottom: 0,
    borderRadius: 25,
    marginRight: 16,
    marginBottom: 32,

    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  label: {
    fontSize: 42,
    lineHeight: 50,
    fontWeight: "600",
    color: colors.white,
  }
})