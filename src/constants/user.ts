import { ISurvey } from './survey';

export interface IUser {
  uid: string;
  email: string;
  surveys?: ISurvey[];
  amountSurvey?: number;
  displayName: string | null;
  photoURL: string | null;
}
