import React from 'react';
import { FlatList } from 'react-native';

import { ISurvey } from 'src/constants/survey';

import { SurveyItem } from './SurveyItem';

type Props = {
  surveys: ISurvey[];
};

export function SurveyList({ surveys }: Props) {
  const keyExtractor = (item: ISurvey) => item.id;

  return (
    <FlatList
      data={surveys}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => <SurveyItem survey={item} />}
      contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
    />
  );
}
