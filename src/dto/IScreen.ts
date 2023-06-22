import { IQuestion } from ".";

export interface IScreen {
  id: number;
  questions: IQuestion[];
}
