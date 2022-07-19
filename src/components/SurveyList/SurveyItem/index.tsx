import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, CheckBox } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';

import { ISurvey } from '../../../constants/survey';

import { colors, fontSize } from '../../../styles';

type Props = {
  survey: ISurvey;
};

export function SurveyItem({ survey }: Props) {
  // Computa o voto
  const onVote = (vote: 'op1' | 'op2') => {
    let updatedData = {};

    if (vote === 'op1') {
      updatedData = {
        op1: true,
        amountOp1: survey.amountOp1 + 1,
        amountVotes: survey.amountVotes + 1,
      };
    } else {
      updatedData = {
        op2: true,
        amountOp2: survey.amountOp2 + 1,
        amountVotes: survey.amountVotes + 1,
      };
    }

    // Atualiza a collection no firestore
    firestore().collection('Surveys').doc(survey.id).update(updatedData);
  };

  return (
    <ListItem
      bottomDivider
      containerStyle={{ paddingTop: 8, paddingBottom: 0, paddingHorizontal: 0 }}
    >
      <ListItem.Content>
        <ListItem.Title style={styles.text}>{survey.title}</ListItem.Title>
        <ListItem.Subtitle>De: {survey.owner}</ListItem.Subtitle>
        <ListItem.Subtitle>
          Opção 1: {survey.amountOp1} votos / Opção 2: {survey.amountOp2} votos / Total:{' '}
          {survey.amountVotes} votos
        </ListItem.Subtitle>

        <CheckBox
          center
          title={survey.op1Title}
          onPress={() => onVote('op1')}
          checked={survey.op1}
          disabled={survey.op1 || survey.op2}
          wrapperStyle={{ marginBottom: -20 }}
        />

        <CheckBox
          center
          title={survey.op2Title}
          onPress={() => onVote('op2')}
          checked={survey.op2}
          disabled={survey.op2 || survey.op1}
        />
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: fontSize.large,
    fontWeight: '700',
  },
});
