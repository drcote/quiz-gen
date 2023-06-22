import { createSlice } from "@reduxjs/toolkit";
import { ICurrentScreen } from "../dto";

const initialState: ICurrentScreen = {
  screenId: 0,
  generatorQuestion: false,
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
  },
});

const { actions, reducer } = currentScreenSlice;

export default reducer;

export const {
  closeGeneratorQuestion,
  openGeneratorQuestion,
  toggleGenerationQuestion,
  setScreenId,
} = actions;
