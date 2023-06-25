import { TypeQuestion } from "../../dto";
import { CheckboxQuestion, ChoiceQuestion, RangeQuestion } from "..";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setDefaultQuestion,
  setDescription,
  setType,
} from "../../redux/questionSlice";
import { addQuestion } from "../../redux/screenSlice";
import { closeGeneratorQuestion } from "../../redux/currentScreenSlice";
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/Layout";
import { Button } from "@consta/uikit/Button";
import { TextField } from "@consta/uikit/TextField";
import { ChoiceGroup } from "@consta/uikit/ChoiceGroup";

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
    if (description !== "") {
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

    case TypeQuestion.Range:
      bodyQuestion = <RangeQuestion />;
      break;

    case TypeQuestion.Choice:
      bodyQuestion = <ChoiceQuestion />;
      break;

    default:
      bodyQuestion = null;
      break;
  }
  return (
    <Layout>
      <Layout flex={1}>
        <Card verticalSpace="l" horizontalSpace="l" form="round">
          <Layout style={{ marginBottom: "20px" }}>
            <Text
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "20px",
              }}
            >
              Заголовок вопроса
            </Text>
            <TextField
              type="text"
              id="description"
              value={description}
              onChange={(e) => dispatch(setDescription(e.value))}
              size="s"
            />
          </Layout>
          <ChoiceGroup
            items={Object.values(TypeQuestion)}
            onChange={(item) => dispatch(setType(item.value))}
            value={type}
            getItemLabel={(item: string) => item}
            multiple={false}
            name="ChoiceType"
            size="s"
          />
          {bodyQuestion}
          <Layout></Layout>
          {type !== TypeQuestion.None ? (
            <Button
              onClick={onSaveQuestion}
              label="Сохранить вопрос"
              style={{ marginTop: "20px" }}
              size="s"
            />
          ) : null}
        </Card>
      </Layout>
      <Layout flex={1}></Layout>
    </Layout>
  );
}
