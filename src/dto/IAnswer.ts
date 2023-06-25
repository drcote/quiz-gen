import { IOptionList } from "./IQuestion";

export interface IAnswer {
  guidQuestion: string;
  value:string | IOptionList[];
}
