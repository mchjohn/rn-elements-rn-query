import React, { useMemo, useState } from "react";
import { Dialog, Input, Button } from "@rneui/themed";
import firestore from '@react-native-firebase/firestore';

type Props = {
  isVisible: boolean;
  closeModal: () => void;
}

export function AddSurvey({ isVisible, closeModal }: Props) {
  const [owner, setOwner] = useState('');
  const [survey, setSurvey] = useState('');
  
  let minCharacters = 0;
  let maxCharacters = 500;

  const characters = useMemo(() => {
    return `${minCharacters += survey.length}/${maxCharacters -= survey.length}`
  }, [survey]);

  const resetForm = () => {
    setSurvey('');
    closeModal();
  }

  const onAddSurvey = async () => {
    // Envia o survey;
    try {
      firestore().collection('Surveys').add(
        {
          owner: owner,
          title: survey,
          amountYes: 0,
          amountNot: 0,
          amountVotes: 0,
          voteYes: false,
          voteNot: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        }
      );

      console.log('Adicionado com sucesso');

      resetForm();
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={resetForm}
    >
      <Dialog.Title title="Pergunte o que quiser aqui."/>

      <Input
        label='Seu nome *'
        placeholder='Ex: John'
        onChangeText={setOwner}
      />

      <Input
        multiline
        label='Faça sua pergunta *'
        errorStyle={{ color: '#4F4F4F' }}
        placeholder='Ex: Vasco ou Flamengo?'
        errorMessage={characters}
        onChangeText={setSurvey}
      />

      <Button
        title='Adicionar Pergunta'
        disabled={survey.length < 10 || !owner}
        onPress={onAddSurvey}
        containerStyle={{
          marginTop: 16,
        }}
      />
    </Dialog>
  );
}