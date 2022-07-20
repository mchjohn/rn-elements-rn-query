import React from 'react';
import { ListItem } from '@rneui/themed';
import * as Progress from 'react-native-progress';
import { Text, StyleSheet, Dimensions } from 'react-native';

import { colors, fontSize } from '../../styles';

const width = Dimensions.get('screen').width;

type Props = {
  amountOp: number;
  amountVotes: number;
  progressValue: number;
};

export function ProgressBar({ amountOp, amountVotes, progressValue }: Props) {
  const percentageValue = (progressValue * 100).toFixed(2);

  return (
    <>
      <Progress.Bar
        height={30}
        borderRadius={2}
        width={width - 64}
        progress={progressValue}
        style={styles.progressTop}
      >
        <Text style={styles.textPercent}>{percentageValue}%</Text>
      </Progress.Bar>

      <ListItem.Subtitle style={styles.TextVotesLabel}>
        {amountOp} de {amountVotes} votos
      </ListItem.Subtitle>
    </>
  );
}

const styles = StyleSheet.create({
  TextVotesLabel: {
    marginLeft: 16,
  },
  progressTop: {
    marginLeft: 16,
    marginTop: 8,
  },
  textPercent: {
    color: colors.black,
    fontSize: fontSize.large,
    fontWeight: '700',
    lineHeight: 30,
    marginLeft: '50%',
    position: 'absolute',
  },
});
