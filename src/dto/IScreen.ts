import { IQuestion } from ".";

export interface IScreen {
  id: number;
  name: string;
  questions: IQuestion[];
}
