import { createSlice } from "@reduxjs/toolkit";
import { IAnswer } from "../dto/IAnswer";

const initialState: IAnswer[] = [];

const answersSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const answerId = state.findIndex(
        (item) => item.guidQuestion === action.payload.guidQuestion
      );
      if (answerId > -1) {
        state[answerId] = { ...state[answerId], value: action.payload.value };
      } else {
        state.push({
          guidQuestion: action.payload.guidQuestion,
          value: action.payload.value,
        });
      }
    },
  },
});

const { actions, reducer } = answersSlice;

export default reducer;

export const { setAnswer } = actions;
