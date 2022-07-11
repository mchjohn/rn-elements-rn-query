export interface ISurvey {
  id: string;
  owner: string;
  title: string;
  VoteYes: boolean;
  VoteNot: boolean;
  amountYes: number;
  amountNot: number;
  amountVotes: number;
}