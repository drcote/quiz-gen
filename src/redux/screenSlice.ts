import { createSlice } from "@reduxjs/toolkit";
import { IScreen } from "../dto";

const initialState: IScreen[] = [
  {
    id: 1,
    questions: [],
  },
];

const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setIdNewScreen: (state, action) => {
      state.push({ id: action.payload, questions: [] });
    },
    delCurrentScreen: (state, action) => {
      return state
        .filter((item) => item.id !== action.payload)
        .map((item) =>
          item.id > action.payload ? { ...item, id: item.id - 1 } : item
        );
    },
    addQuestion: (state, action) => {
      const updateScreenIndex = state.findIndex(
        (item) => item.id === action.payload.screenId
      );
      state[updateScreenIndex].questions?.push(action.payload.questions);
    },
  },
});

const { actions, reducer } = screenSlice;

export default reducer;

export const { setIdNewScreen, delCurrentScreen, addQuestion } = actions;
