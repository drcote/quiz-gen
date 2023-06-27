import { configureStore } from "@reduxjs/toolkit";
import screen from "./screenSlice";
import question from "./questionSlice";
import currentScreen from "./currentScreenSlice";
import answersSlice from "./answersSlice";
import parentQuestionSlice from "./parentQuestionSlice";

const store = configureStore({
  reducer: { screen, question, currentScreen, answersSlice, parentQuestionSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
