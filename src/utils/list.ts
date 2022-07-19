export interface SurveyProps {
  id: string;
  owner: string;
  survey: string;
  op_yes: string;
  op_no: string;
}

const list: SurveyProps[] = [
  {
    id: '1',
    owner: 'Lucas Silva',
    survey: 'Flip ou HeelFlip?',
    op_yes: 'Sim',
    op_no: 'Não',
  },
  {
    id: '2',
    owner: 'Marcos John',
    survey: 'Lula ou Bolsonaro?',
    op_yes: 'Sim',
    op_no: 'Não',
  },
  {
    id: '3',
    owner: 'Jorge Lucas',
    survey: 'Flamengo ou Vasco?',
    op_yes: 'Sim',
    op_no: 'Não',
  },
  {
    id: '4',
    owner: 'João',
    survey: 'Pipa ou Bola?',
    op_yes: 'Sim',
    op_no: 'Não',
  },
  {
    id: '5',
    owner: 'Debora',
    survey: 'Salgado ou Doce?',
    op_yes: 'Sim',
    op_no: 'Não',
  },
  {
    id: '6',
    owner: 'Cris',
    survey: 'Skate ou Surf?',
    op_yes: 'Sim',
    op_no: 'Não',
  },
  {
    id: '7',
    owner: 'Jorge',
    survey: 'Coca ou Pepsi?',
    op_yes: 'Sim',
    op_no: 'Não',
  },
  {
    id: '8',
    owner: 'Alan',
    survey: 'Flutter ou React Native?',
    op_yes: 'Sim',
    op_no: 'Não',
  },
];

export { list };
