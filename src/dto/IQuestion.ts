import { TypeQuestion, ViewRange } from ".";

export interface IQuestion {
  guid: string;
  description: string;
  type: TypeQuestion;
  options: IOptionList[] | IOptionRange | null;
  correctAnswer: string;
}

export interface IOptionList {
  guid: string;
  value: string;
}

export interface IOptionRange {
  step: number | null;
  valueFrom: number;
  view: ViewRange;
  min?: number | null;
  max?: number | null;
  valueTo?: number;
}
