import { TypeScreen } from "./TypeScreen";

export interface ICurrentScreen {
  screenId: number;
  generatorQuestion: boolean;
  typeScreen:TypeScreen;
  pageId: number;
  totalPages: number;
}
