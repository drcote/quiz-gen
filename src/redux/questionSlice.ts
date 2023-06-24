import { createSlice } from "@reduxjs/toolkit";
import { IOptionRange, IQuestion, TypeQuestion, ViewRange } from "../dto";
import { v4 as uuid } from "uuid";

const initialState: IQuestion = {
  guid: "",
  type: TypeQuestion.None,
  description: "",
  options: null,
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
      switch (action.payload) {
        case TypeQuestion.Checkbox:
          state.options = [];
          break;
        case TypeQuestion.Range:
          state.options = {
            valueFrom: 0,
            view: ViewRange.Default,
            step: 1,
            min: 0,
            max: 10,
          };
          break;

        default:
          break;
      }
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setCorrectAnswer: (state, action) => {
      state.correctAnswer = action.payload;
    },
    setOptionListValue: (state, action) => {
      if (Array.isArray(state.options)) {
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
    delOptionList: (state, action) => {
      if (Array.isArray(state.options)) {
        return {
          ...state,
          options: state.options.filter((item) => item.guid !== action.payload),
        };
      }
    },
    setDefaultQuestion: (state) => {
      state.description = "";
      state.options = null;
      state.type = TypeQuestion.None;
      state.correctAnswer = "";
      state.guid = uuid();
    },
    setDefaultOptionList: (state) => {
      if (Array.isArray(state.options)) {
        state.options?.push({ value: "", guid: uuid() });
      }
    },
    setOptionRangeView: (state, action) => {
      (state.options as IOptionRange).view = action.payload;
    },
    setOptionRangeStep: (state, action) => {
      (state.options as IOptionRange).step = action.payload;
    },
    setOptionRangeMin: (state, action) => {
      (state.options as IOptionRange).min = action.payload;
    },
    setOptionRangeMax: (state, action) => {
      (state.options as IOptionRange).max = action.payload;
    },
    setOptionRangeValueFrom: (state, action) => {
      (state.options as IOptionRange).valueFrom = action.payload;
    },
    setOptionRangeValueTo: (state, action) => {
      (state.options as IOptionRange).valueTo = action.payload;
    },
  },
});

const { actions, reducer } = questionSlice;

export default reducer;

export const {
  delOptionList,
  setDescription,
  setOptionListValue,
  setType,
  setGuid,
  setDefaultOptionList,
  setDefaultQuestion,
  setCorrectAnswer,
  setOptionRangeView,
  setOptionRangeMax,
  setOptionRangeMin,
  setOptionRangeStep,
  setOptionRangeValueFrom,
  setOptionRangeValueTo,
} = actions;
