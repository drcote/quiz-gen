import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { delCurrentScreen } from "../../redux/screenSlice";
import { CheckboxTemplate, GeneratorQuestion } from "../../components";
import { setDefaultQuestion } from "../../redux/questionSlice";
import {
  closeGeneratorQuestion,
  setScreenId,
  toggleGenerationQuestion,
} from "../../redux/currentScreenSlice";
import { TypeQuestion } from "../../dto";
import { Button } from "@consta/uikit/Button";
import { IconTrash } from "@consta/uikit/IconTrash";
import { Text } from "@consta/uikit/Text";
import style from "./CreateScreen.module.scss";
import { Layout } from '@consta/uikit/Layout';

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

  console.log(JSON.stringify(screen));

  useEffect(() => {
    console.log(`params.id=${params.id} currentScreenId=${currentScreenId}`);
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
    dispatch(toggleGenerationQuestion());
  };

  if (screen === undefined) {
    throw new Error("Нет такой страницы");
  }
  return (
    <div className={style.createScreen}>
      <Layout>
        <Text size="2xl">Страница №{screen?.id}</Text>
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
      <br />
      {screen.questions.map((question) => {
        switch (question.type) {
          case TypeQuestion.Checkbox:
            return (
              <div key={question.guid}>
                <CheckboxTemplate {...question} />
                <br />
              </div>
            );

          default:
            return <></>;
        }
      })}
      <Button onClick={onCreateQuestion} label="Создать вопрос" size="s" />
      {generatorQuestion ? <GeneratorQuestion /> : null}
      <br />
    </div>
  );
}
