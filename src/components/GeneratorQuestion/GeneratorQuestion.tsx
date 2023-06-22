import { TypeQuestion } from "../../dto";
import { CheckboxQuestion } from "..";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultQuestion, setDescription, setType } from "../../redux/questionSlice";
import { addQuestion } from "../../redux/screenSlice";
import { closeGeneratorQuestion } from "../../redux/currentScreenSlice";

export function GeneratorQuestion() {
  const dispatch = useDispatch<AppDispatch>();
  const description = useSelector(
    (state: RootState) => state.question.description
  );
  const type = useSelector((state: RootState) => state.question.type);
  const correctAnswer = useSelector(
    (state: RootState) => state.question.correctAnswer
  );
  const currentScreenId = useSelector(
    (state: RootState) => state.currentScreen.screenId
  );
  const questions = useSelector((state: RootState) => state.question);

  const onSaveQuestion = () => {
    if (
      type !== TypeQuestion.None &&
      description !== "" &&
      correctAnswer !== ""
    ) {
      dispatch(
        addQuestion({ screenId: currentScreenId, questions: questions })
      );
      dispatch(setDefaultQuestion());
      dispatch(closeGeneratorQuestion());
    }
  };

  let bodyQuestion = null;
  switch (type) {
    case TypeQuestion.Checkbox:
      bodyQuestion = <CheckboxQuestion />;
      break;
    default:
      bodyQuestion = null;
      break;
  }
  return (
    <div>
      <label htmlFor="description">Вопрос</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => dispatch(setDescription(e.target.value))}
      />
      <br />
      <select
        name=""
        id=""
        onChange={(e) => dispatch(setType(e.target.value))}
        value={type}
      >
        <option value={TypeQuestion.None}>{TypeQuestion.None}</option>
        <option value={TypeQuestion.Checkbox}>{TypeQuestion.Checkbox}</option>
        <option value={TypeQuestion.Input}>{TypeQuestion.Input}</option>
      </select>
      <br />
      {bodyQuestion}
      <br />
      <button onClick={onSaveQuestion}>Сохранить вопрос</button>
    </div>
  );
}
