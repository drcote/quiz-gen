import { TypeQuestion } from ".";

export interface IQuestion {
  guid: string;
  description: string;
  type: TypeQuestion;
  options: IOptionQuestion[] | null;
  correctAnswer: string;
}

export interface IOptionQuestion {
  guid: string;
  value: string;
}
