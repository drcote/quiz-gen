import { createSlice } from "@reduxjs/toolkit";
import { ICurrentScreen } from "../dto";
import { TypeScreen } from "../dto/TypeScreen";

const initialState: ICurrentScreen = {
  screenId: 0,
  generatorQuestion: false,
  typeScreen: TypeScreen.Test,
  pageId: 0,
  totalPages: 0,
};

const currentScreenSlice = createSlice({
  name: "currentScreen",
  initialState,
  reducers: {
    openGeneratorQuestion: (state) => {
      state.generatorQuestion = true;
    },
    closeGeneratorQuestion: (state) => {
      state.generatorQuestion = false;
    },
    toggleGenerationQuestion: (state) => {
      state.generatorQuestion = !state.generatorQuestion;
    },
    setScreenId: (state, action) => {
      state.screenId = action.payload;
    },
    setTypeScreen: (state, action) => {
      state.typeScreen = action.payload;
    },
    nextPage: (state) => {
      state.pageId = state.pageId + 1;
    },
    prevPage: (state) => {
      if (state.pageId !== 0) {
        state.pageId = state.pageId - 1;
      }
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

const { actions, reducer } = currentScreenSlice;

export default reducer;

export const {
  closeGeneratorQuestion,
  openGeneratorQuestion,
  toggleGenerationQuestion,
  setScreenId,
  setTypeScreen,
  nextPage,
  prevPage,
  setTotalPages,
} = actions;
