import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  delOption,
  setDefaultOption,
  setCorrectAnswer,
  setOptionValue,
} from "../../redux/questionSlice";

export function CheckboxQuestion() {
  const dispatch = useDispatch<AppDispatch>();
  const options = useSelector((state: RootState) => state.question.options);
  const correctAnswer = useSelector(
    (state: RootState) => state.question.correctAnswer
  );

  return (
    <div>
      {options?.map((item) => (
        <CheckboxGroup
          key={item.guid}
          value={item.value}
          checked={item.guid === correctAnswer}
          onDelEl={() => dispatch(delOption(item.guid))}
          onChangeValue={(value) => dispatch(setOptionValue({guid:item.guid, value:value}))}
          onChangeStatus={()=>dispatch(setCorrectAnswer(item.guid))}
        />
      ))}
      <br />
      <button onClick={() => dispatch(setDefaultOption())}>
        Добавить ответ
      </button>
    </div>
  );
}

interface ICheckboxGroup {
  value: string;
  checked: boolean;
  onDelEl: () => void;
  onChangeValue: (value: string) => void;
  onChangeStatus: () => void;
}

function CheckboxGroup(props: ICheckboxGroup) {
  const { value, checked, onDelEl, onChangeValue, onChangeStatus } =
    props;
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />
      <input
        type="checkbox"
        checked={checked}
        onChange={onChangeStatus}
      />
      <button onClick={onDelEl}>Удалить</button>
      <br />
    </>
  );
}
