import React, { useState } from "react";
import { FlatList } from "react-native";

import { ISurvey } from "src/constants/survey";
import { SurveyItem } from "./SurveyItem";

type Props = {
  surveys: ISurvey[];
}

export function SurveyList({ surveys }: Props) {
  const [yes, setYes] = useState(false);
  const [not, setNot] = useState(false);

  const keyExtractor = (item: ISurvey) => item.id

  console.log('Sim: ', yes, 'Não: ', not);

  return (
    <FlatList
      data={surveys}
      keyExtractor={keyExtractor}
      renderItem={({ item }) =>
        <SurveyItem
          survey={item}
          setYes={setYes}
          setNot={setNot}
        />
      }
      contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
    />
  );
}