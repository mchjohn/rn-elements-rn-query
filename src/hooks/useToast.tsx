import React from 'react';
import Toast, { BaseToast, ErrorToast, BaseToastProps } from 'react-native-toast-message';

type ToastProps = 'success' | 'error';

/** Hook utilizado para exibir toast com mensagem de erro ou sucesso. */
export function useToast() {
  function toastStyle(color: string) {
    return {
      borderColor: color,
    };
  }

  const toastTextStyle = {
    color: '#3A3A3A',
    fontSize: 16,
  };

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast {...props} style={toastStyle('#10994e')} text1Style={toastTextStyle} />
    ),

    error: (props: BaseToastProps) => (
      <ErrorToast {...props} style={toastStyle('#e83f5b')} text1Style={toastTextStyle} />
    ),
  };

  function showToast(type: ToastProps, message: string) {
    Toast.show({
      type,
      text1: message,
    });
  }

  return {
    showToast,
    toastConfig,
  };
}
