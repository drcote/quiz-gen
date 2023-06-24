import { createSlice } from "@reduxjs/toolkit";
import { IScreen } from "../dto";

const initialState: IScreen[] = [
  {
    id: 1,
    name: "",
    questions: [],
  },
];

const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setIdNewScreen: (state, action) => {
      state.push({ id: action.payload, questions: [], name: "" });
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
    removeQuestion: (state, action) => {
      const editableScreenIndex = state.findIndex(
        (item) => item.id === action.payload.currentScreenId
      );
      const editableQuestion = state[editableScreenIndex].questions.filter(
        (item) => item.guid !== action.payload.guid
      );
      state[editableScreenIndex].questions = editableQuestion;
    },
    removeScreens: (state) => {
      state = [
        {
          id: 0,
          questions: [],
          name: "",
        },
      ];
    },
  },
});

const { actions, reducer } = screenSlice;

export default reducer;

export const {
  setIdNewScreen,
  delCurrentScreen,
  addQuestion,
  removeQuestion,
  removeScreens,
} = actions;
