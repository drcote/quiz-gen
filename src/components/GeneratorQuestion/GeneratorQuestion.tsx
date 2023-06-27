import { TypeQuestion } from "../../dto";
import { CheckboxQuestion, СonditionQuestion, RangeQuestion } from "..";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setDefaultQuestion,
  setDescription,
  setParent,
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
import { Select } from "@consta/uikit/Select";
import { Root } from "react-dom/client";
import {
  addParentGroup,
  addParentItems,
} from "../../redux/parentQuestionSlice";

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

  const groupsParent = useSelector(
    (state: RootState) => state.parentQuestionSlice.groups
  );

  const itemsParent = useSelector(
    (state: RootState) => state.parentQuestionSlice.items
  );

  const onSaveQuestion = () => {
    if (description !== "") {
      dispatch(
        addQuestion({ screenId: currentScreenId, questions: questions })
      );
      if (type === TypeQuestion.Сondition) {
        if (Array.isArray(questions.options)) {
          dispatch(
            addParentGroup({
              questionGuid: questions.guid,
              questionLabel: questions.description,
            })
          );
          questions.options.map((option) => {
            dispatch(
              addParentItems({
                questionGuid: questions.guid,
                questionLabel: questions.description,
                optionGuid: option.guid,
                optionLabel: option.value,
              })
            );
          });
        }
      }
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

    case TypeQuestion.Сondition:
      bodyQuestion = <СonditionQuestion />;
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
            <Select
              items={itemsParent}
              groups={groupsParent}
              getItemLabel={(item) => item.label}
              getItemKey={(item) => item.guid}
              getItemGroupKey={(item) => item.groupGuid}
              getGroupLabel={(item) => item.label}
              getGroupKey={(item) => item.guid}
              value={
                itemsParent.find((item) => item.guid === questions.parentGuid)
                  ? itemsParent.find((item) => item.guid === questions.parentGuid)
                  : undefined
              }
              onChange={(item) => {
                dispatch(setParent(item.value?.guid));
              }}
              size="s"
              style={{ width: "300px", marginRight: "20px" }}
              placeholder="Родительский элемент"
            />
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
