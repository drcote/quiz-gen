export interface IParentQuestion {
  items: IParentQuestionItem[];
  groups: IParentQuestionGroup[];
}

export interface IParentQuestionItem {
  guid: string;
  label: string;
  groupGuid: string;
}

export interface IParentQuestionGroup {
  guid: string;
  label: string;
}
