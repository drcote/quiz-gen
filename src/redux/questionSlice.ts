import { createSlice } from "@reduxjs/toolkit";
import { IQuestion, TypeQuestion } from "../dto";
import { v4 as uuid } from "uuid";

const initialState: IQuestion = {
  guid: "",
  type: TypeQuestion.None,
  description: "",
  options: [],
  correctAnswer: "",
};
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setGuid: (state, action) => {
      state.guid = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setCorrectAnswer: (state, action) => {
      state.correctAnswer = action.payload;
    },
    setOptionValue: (state, action) => {
      if (state.options) {
        return {
          ...state,
          options: state.options.map((item) =>
            item.guid === action.payload.guid
              ? { ...item, value: action.payload.value }
              : item
          ),
        };
      }
    },
    delOption: (state, action) => {
      if (state.options) {
        return {
          ...state,
          options: state.options.filter((item) => item.guid !== action.payload),
        };
      }
    },
    setDefaultQuestion: (state) => {
      state.description = "";
      state.options = [];
      state.type = TypeQuestion.None;
      state.correctAnswer = "";
      state.guid = uuid();
    },
    setDefaultOption: (state) => {
      state.options?.push({ value: "", guid: uuid() });
    },
  },
});

const { actions, reducer } = questionSlice;

export default reducer;

export const {
  delOption,
  setDescription,
  setOptionValue,
  setType,
  setGuid,
  setDefaultOption,
  setDefaultQuestion,
  setCorrectAnswer,
} = actions;
