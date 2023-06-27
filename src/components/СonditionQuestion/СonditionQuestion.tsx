import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  delOptionList,
  setDefaultOptionList,
  setCorrectAnswer,
  setOptionListValue,
} from "../../redux/questionSlice";
import { IOptionList } from "../../dto";
import { Button } from "@consta/uikit/Button";
import { TextField } from "@consta/uikit/TextField";
import { Checkbox } from "@consta/uikit/Checkbox";
import { Layout } from "@consta/uikit/Layout";

export function СonditionQuestion() {
  const dispatch = useDispatch<AppDispatch>();
  const options = useSelector(
    (state: RootState) => state.question.options as IOptionList[]
  );
  const correctAnswer = useSelector(
    (state: RootState) => state.question.correctAnswer
  );

  return (
    <Layout direction="column">
      {options?.map((item) => (
        <ChoiceGroup
          key={item.guid}
          guid={item.guid}
          value={item.value}
          checked={item.guid === correctAnswer}
          onDelEl={() => dispatch(delOptionList(item.guid))}
          onChangeValue={(value) =>
            dispatch(setOptionListValue({ guid: item.guid, value: value }))
          }
          onChangeStatus={() => dispatch(setCorrectAnswer(item.guid))}
        />
      ))}
      <br />
      <Layout>
        <Button
          onClick={() => dispatch(setDefaultOptionList())}
          label="Добавить ответ"
          size="s"
        />
      </Layout>
    </Layout>
  );
}

interface IChoiceGroup {
  value: string;
  checked: boolean;
  guid: string;
  onDelEl: () => void;
  onChangeValue: (value: string) => void;
  onChangeStatus: () => void;
}

function ChoiceGroup(props: IChoiceGroup) {
  const { value, checked, guid, onDelEl, onChangeValue, onChangeStatus } =
    props;
  return (
    <Layout style={{ marginTop: "20px" }}>
      <TextField
        type="text"
        id={guid}
        value={value}
        onChange={(e) => onChangeValue(e.value ? e.value : "")}
        style={{ marginRight: "10px" }}
        size="s"
      />
      <Checkbox
        checked={checked}
        onChange={onChangeStatus}
        style={{ marginRight: "10px" }}
      />
      <Button onClick={onDelEl} label="Удалить" size="s" />
    </Layout>
  );
}
