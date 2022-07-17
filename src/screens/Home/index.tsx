import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { ISurvey } from '../../constants/survey';

import { Header } from '../../components/Header';
import { SurveyList } from '../../components/SurveyList';
import { AddSurvey } from '../../components/AddSurvey';
import { SkeletonView } from '../../components/Skeleton';
import { FloatButton } from '../../components/FloatButton';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [surveys, setSurveys] = useState<ISurvey[]>([]);

  // Busca as perguntas no firestore
  useEffect(() => {
    let subscribe = () => {};

    try {
      subscribe = firestore()
      .collection('Surveys')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
        return {
          // Devido o ID não estar no mesmo nível dos dados
          // faz um spread para espalhar os dadas no mesmo nível do ID
          id: doc.id,
          ...doc.data(),
        }
      }) as ISurvey[];

      setSurveys(data);
    });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

    // Function de limpeza
    // para deixar de ouvir as alterações com querySnapshot
    return () => subscribe();
  }, []);

  return !isLoading ? (
    <View style={styles.header}>
      <Header />
  
      <SurveyList surveys={surveys} />

      <FloatButton onPress={() => setModalVisible(true)} />

      <AddSurvey
        isVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </View>
  ) : <SkeletonView />
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFAFA',
  },
})