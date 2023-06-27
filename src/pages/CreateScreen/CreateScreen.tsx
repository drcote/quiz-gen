import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  delCurrentScreen,
  removeScreens,
  setIdNewScreen,
} from "../../redux/screenSlice";
import {
  CheckboxTemplate,
  СonditionTemplate,
  GeneratorQuestion,
  InputTemplate,
  RangeTemplate,
} from "../../components";
import { setDefaultQuestion } from "../../redux/questionSlice";
import {
  closeGeneratorQuestion,
  openGeneratorQuestion,
  setScreenId,
} from "../../redux/currentScreenSlice";
import { TypeQuestion } from "../../dto";
import { Button } from "@consta/uikit/Button";
import { IconTrash } from "@consta/uikit/IconTrash";
import { Text } from "@consta/uikit/Text";
import style from "./CreateScreen.module.scss";
import { Layout } from "@consta/uikit/Layout";
import { FieldGroup } from "@consta/uikit/FieldGroup";
import { Tabs } from "@consta/uikit/Tabs";
import { IconAdd } from "@consta/uikit/IconAdd";
import { LOCAL_STORAGE_VALUE } from "../../env/const";
import { TypeModeComponent } from "../../dto/TypeModeComponent";

export function CreateScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? +params.id : 1;
  const dispatch = useDispatch<AppDispatch>();
  const screen = useSelector((state: RootState) =>
    state.screen.find((item) => item.id === id)
  );
  const currentScreenId = useSelector(
    (state: RootState) => state.currentScreen.screenId
  );
  const generatorQuestion = useSelector(
    (state: RootState) => state.currentScreen.generatorQuestion
  );
  const screens = useSelector((state: RootState) => state.screen);

  const onAddNewScreen = () => {
    dispatch(setIdNewScreen(screens.length + 1));
  };

  useEffect(() => {
    if (params.id) {
      if (+params.id !== currentScreenId) {
        dispatch(setDefaultQuestion());
        dispatch(setScreenId(+params.id));
        dispatch(closeGeneratorQuestion());
      }
    }
  }, [params]);

  const onDelScreen = () => {
    dispatch(delCurrentScreen(id));
    navigate(`/createScreen/${id - 1}`);
  };

  const onCreateQuestion = () => {
    if (generatorQuestion) {
      dispatch(closeGeneratorQuestion());
      dispatch(setDefaultQuestion());
    } else {
      dispatch(openGeneratorQuestion());
    }
  };

  const onSaveScreens = () => {
    localStorage.setItem(LOCAL_STORAGE_VALUE, JSON.stringify(screens));
    dispatch(removeScreens());
  };

  if (screen === undefined) {
    throw new Error("Нет такой страницы");
  }
  return (
    <div>
      <Layout>
        <FieldGroup form="round" size="m" style={{ width: "100%" }}>
          <Tabs
            items={screens}
            value={screens[currentScreenId - 1]}
            view="bordered"
            onChange={(e) => {
              navigate(`/createScreen/${e.value.id}`);
            }}
            getItemLabel={(item) => item.id}
          />
          <Button
            label="Добавить"
            iconRight={IconAdd}
            onlyIcon
            size="s"
            onClick={onAddNewScreen}
          />
        </FieldGroup>
        <Button
          label="Опубликовать страницы"
          style={{ marginLeft: "20px" }}
          onClick={onSaveScreens}
        />
      </Layout>
      <div style={{ marginTop: "20px" }}>
        <Layout>
          <Text size="2xl" view="brand">
            Страница №{screen?.id}
          </Text>
          {id > 1 ? (
            <Button
              onClick={onDelScreen}
              label="Удалить страницу"
              view="secondary"
              iconRight={IconTrash}
              onlyIcon
              iconSize="m"
              size="s"
              className={style.createScreen_delButton}
            />
          ) : (
            ""
          )}
        </Layout>
        {screen.questions.map((question) => {
          switch (question.type) {
            case TypeQuestion.Checkbox:
              return (
                <div key={question.guid}>
                  <CheckboxTemplate
                    {...question}
                    mode={TypeModeComponent.Dev}
                  />
                </div>
              );
            case TypeQuestion.Range:
              return (
                <div key={question.guid}>
                  <RangeTemplate {...question} mode={TypeModeComponent.Dev} />
                </div>
              );
            case TypeQuestion.Input:
              return (
                <div key={question.guid}>
                  <InputTemplate {...question} mode={TypeModeComponent.Dev} />
                </div>
              );

              case TypeQuestion.Сondition:
              return(
                <div key={question.guid}>
                  <СonditionTemplate {...question} mode={TypeModeComponent.Dev} />
                </div>
              )

            default:
              return <></>;
          }
        })}
        <Button
          onClick={onCreateQuestion}
          label={generatorQuestion ? "Очистить форму" : "Создать вопрос"}
          size="s"
          style={{ margin: "20px 0" }}
        />
        {generatorQuestion ? <GeneratorQuestion /> : null}
      </div>
    </div>
  );
}
