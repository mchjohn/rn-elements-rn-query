import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';

import { ISurvey } from '../../../constants/survey';

import { ProgressBar } from '../../ProgressBar';
import { CheckBoxComp } from '../../CheckBoxComp';

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

  // Calcula o valor para progressBar
  const progressValue1 = () => {
    if (survey.amountVotes > 0) {
      const percentageOp1 = survey.amountOp1 / survey.amountVotes;

      return percentageOp1;
    } else {
      return 0;
    }
  };

  // Calcula o valor para progressBar
  const progressValue2 = () => {
    if (survey.amountVotes > 0) {
      const percentageOp2 = survey.amountOp2 / survey.amountVotes;

      return percentageOp2;
    } else {
      return 0;
    }
  };

  return (
    <ListItem
      bottomDivider
      containerStyle={{ paddingTop: 8, paddingBottom: 16, paddingHorizontal: 0 }}
    >
      <ListItem.Content>
        <ListItem.Title style={styles.text}>{survey.title}</ListItem.Title>
        <ListItem.Subtitle>De: {survey.owner}</ListItem.Subtitle>

        <CheckBoxComp
          title={survey.op1Title}
          option={survey.op1}
          disabled={survey.op1 || survey.op2}
          onVote={() => onVote('op1')}
        />
        <ProgressBar
          amountOp={survey.amountOp1}
          progressValue={progressValue1()}
          amountVotes={survey.amountVotes}
        />

        <CheckBoxComp
          title={survey.op2Title}
          option={survey.op2}
          disabled={survey.op2 || survey.op1}
          onVote={() => onVote('op2')}
        />
        <ProgressBar
          amountOp={survey.amountOp2}
          progressValue={progressValue2()}
          amountVotes={survey.amountVotes}
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
