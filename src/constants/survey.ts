export interface ISurvey {
  id: string;
  op1: boolean;
  op2: boolean;
  title: string;
  owner: string;
  ownerId: string;
  op1Title: string;
  op2Title: string;
  amountOp1: number;
  amountOp2: number;
  amountVotes: number;
}
