import React from 'react';
import { CheckBox } from '@rneui/themed';

type Props = {
  title: string;
  option: boolean;
  disabled: boolean;
  onVote: () => void;
};

export function CheckBoxComp({ title, option, disabled, onVote }: Props) {
  return (
    <CheckBox
      center
      checked={option}
      title={title}
      onPress={onVote}
      disabled={disabled}
      wrapperStyle={{ marginBottom: -20 }}
    />
  );
}
