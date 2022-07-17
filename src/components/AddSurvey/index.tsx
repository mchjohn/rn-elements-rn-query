import React, { useMemo, useState } from "react";
import auth from '@react-native-firebase/auth';
import { Dialog, Input, Button } from "@rneui/themed";
import firestore from '@react-native-firebase/firestore';

import { useToast } from '../../hooks/useToast';

type Props = {
  isVisible: boolean;
  closeModal: () => void;
}

export function AddSurvey({ isVisible, closeModal }: Props) {
  const [survey, setSurvey] = useState('');
  const [op1Title, setOp1Title] = useState('');
  const [op2Title, setOp2Title] = useState('');

  const { showToast } = useToast();
  
  let minCharacters = 0;
  let maxCharacters = 300;

  // Contador de caracteres digitados
  const characters = useMemo(() => {
    return `${minCharacters += survey.length}/${maxCharacters -= survey.length}`
  }, [survey]);

  const resetForm = () => {
    setSurvey('');
    closeModal();
  }

  /*
    Verifica se o usuário tem um name, caso tenha retorna-o
    caso não tenha, retorna uma parte do email
  */ 
  const renderName = () => {
    const displayName = auth().currentUser?.displayName;
    const email = auth().currentUser?.email;

    const formattedEmail = `${email?.slice(0, email?.indexOf('@'))}`;
    return displayName ? displayName : formattedEmail;
  }

  // Cadastra uma pergunta
  const onAddSurvey = async () => {
    try {
      firestore().collection('Surveys').add(
        {
          op1: false,
          op2: false,
          amountOp1: 0,
          amountOp2: 0,
          title: survey,
          amountVotes: 0,
          op1Title: op1Title,
          op2Title: op2Title,
          owner: renderName(),
          ownerId: auth().currentUser?.uid,
          createdAt: firestore.FieldValue.serverTimestamp(),
        }
      );

      showToast('success', 'Pergunta adicionada com sucesso 👍');

      resetForm();
    } catch (error) {
      showToast('error', 'Ops... Algo deu errado, tente novamente');
    }
  }

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={resetForm}
      overlayStyle={{ width: '90%' }}
    >
      <Dialog.Title title="Pergunte o que quiser aqui."/>

      <Input
        multiline
        maxLength={300}
        onChangeText={setSurvey}
        errorMessage={characters}
        label='Faça sua pergunta *'
        placeholder='Ex: Vasco ou Flamengo?'
        errorStyle={{ color: '#4F4F4F', marginBottom: 22 }}
      />

      <Input
        multiline
        maxLength={100}
        label='Opção 1 *'
        placeholder='Ex: Vasco? *'
        onChangeText={setOp1Title}
      />

      <Input
        multiline
        maxLength={100}
        label='Opção 2 *'
        placeholder='Ex: Flamengo? *'
        onChangeText={setOp2Title}
      />

      <Button
        title='Adicionar Pergunta'
        disabled={survey.length < 2 || !op1Title || !op2Title}
        onPress={onAddSurvey}
        containerStyle={{
          marginTop: 16,
        }}
      />
    </Dialog>
  );
}