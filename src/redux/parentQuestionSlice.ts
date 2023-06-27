import { createSlice } from "@reduxjs/toolkit";
import { IParentQuestion } from "../dto/IParentQuestion";

const initialState: IParentQuestion = {
  items: [],
  groups: [],
};

const parentQuestionSlice = createSlice({
  name: "parentQuestion",
  initialState,
  reducers: {
    addParentGroup: (state, action) => {
      const groupId = state.groups.findIndex(
        (item) => item.guid === action.payload.questionGuid
      );
      if (groupId > -1) {
        state.groups[groupId] = {
          label: action.payload.questionLabel,
          guid: action.payload.questionGuid,
        };
      } else {
        state.groups.push({
          guid: action.payload.questionGuid,
          label: action.payload.questionLabel,
        });
      }
    },
    addParentItems: (state, action) => {
      const itemId = state.items.findIndex(
        (item) => item.guid === action.payload.optionGuid
      );
      if (itemId > -1) {
        state.items[itemId] = {
          groupGuid: action.payload.questionGuid,
          guid: action.payload.optionGuid,
          label: action.payload.optionLabel,
        };
      } else {
        state.items.push({
          groupGuid: action.payload.questionGuid,
          guid: action.payload.optionGuid,
          label: action.payload.optionLabel,
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.guid !== action.payload.optionGuid
      );
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter(
        (item) => item.guid !== action.payload.questionGuid
      );
    },
  },
});

const { actions, reducer } = parentQuestionSlice;

export default reducer;

export const { addParentGroup, addParentItems, removeGroup, removeItem } =
  actions;
