import React from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export function KeyboardAvoidingViewWrapper({ children }: Props) {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        marginTop: 100,
      }}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
