import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ListItem, CheckBox } from '@rneui/themed';

import { ISurvey } from "src/constants/survey";

type Props = {
  survey: ISurvey;
  setYes: (checked: boolean) => void;
  setNot: (checked: boolean) => void;
}

export function SurveyItem({ survey, setYes, setNot }: Props) {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const onChangeYes = () => {
    setYes(true);
    setChecked1(true);
  }
  const onChangeNot = () => {
    setNot(true);
    setChecked2(true);
  }

  return (
    <ListItem bottomDivider containerStyle={{ padding: 4 }}>
      <ListItem.Content>
        <ListItem.Title style={styles.text}>
          {survey.title}
        </ListItem.Title>
        <ListItem.Subtitle>De: {survey.owner}</ListItem.Subtitle>

        <CheckBox
          center
          title="Sim"
          checked={checked1}
          disabled={checked1 || checked2}
          onPress={onChangeYes}
          wrapperStyle={{ marginBottom: -20 }}
        />

        <CheckBox
          center
          title="Não"
          checked={checked2}
          disabled={checked2 || checked1}
          onPress={onChangeNot}
        />
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '700',
  }
})