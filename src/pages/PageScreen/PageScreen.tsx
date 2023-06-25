import { Layout } from "@consta/uikit/Layout";
import { IScreen, TypeQuestion } from "../../dto";
import {
  CheckboxTemplate,
  ChoiceTemplate,
  InputTemplate,
  RangeTemplate,
} from "../../components";
import { TypeModeComponent } from "../../dto/TypeModeComponent";
import { Button } from "@consta/uikit/Button";
import { IconBackward } from "@consta/icons/IconBackward";
import { IconForward } from "@consta/icons/IconForward";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { nextPage, prevPage } from "../../redux/currentScreenSlice";
import { Text } from "@consta/uikit/Text";

export function PageScreen(props: IScreen) {
  const { questions } = props;
  const totalPages = useSelector(
    (state: RootState) => state.currentScreen.totalPages
  );
  const pageId = useSelector((state: RootState) => state.currentScreen.pageId);
  const dispatch = useDispatch();
  return (
    <Layout direction="column">
      <Layout style={{ margin: "0 0 30px 20px" }}>
        <Text size="3xl" view="brand">
          {pageId + 1} / {totalPages}
        </Text>
      </Layout>
      {questions.map((question) => {
        switch (question.type) {
          case TypeQuestion.Checkbox:
            return (
              <div key={question.guid}>
                <CheckboxTemplate {...question} mode={TypeModeComponent.Prod} />
              </div>
            );

          case TypeQuestion.Range:
            return (
              <div key={question.guid}>
                <RangeTemplate {...question} mode={TypeModeComponent.Prod} />
              </div>
            );

          case TypeQuestion.Input:
            return (
              <div key={question.guid}>
                <InputTemplate {...question} mode={TypeModeComponent.Prod} />
              </div>
            );

          case TypeQuestion.Choice:
            return (
              <div key={question.guid}>
                <ChoiceTemplate {...question} mode={TypeModeComponent.Prod} />
              </div>
            );

          default:
            return <></>;
        }
      })}
      <Layout style={{ marginTop: "20px" }}>
        {pageId !== 0 ? (
          <Button
            label="Назад"
            size="m"
            iconLeft={IconBackward}
            style={{ marginRight: "20px" }}
            onClick={() => dispatch(prevPage())}
          />
        ) : null}
        {totalPages - 1 !== pageId ? (
          <Button
            label="Вперед"
            size="m"
            iconRight={IconForward}
            onClick={() => dispatch(nextPage())}
          />
        ) : (
          <Button label="Готово" size="m" />
        )}
      </Layout>
    </Layout>
  );
}
