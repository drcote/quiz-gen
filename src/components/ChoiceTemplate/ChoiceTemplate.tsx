import { IOptionList, IQuestion } from "../../dto";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/Layout";
import { Button } from "@consta/uikit/Button";
import { IconClose } from "@consta/uikit/IconClose";
import { AppDispatch, RootState } from "../../redux/store";
import { removeQuestion } from "../../redux/screenSlice";
import { TypeModeComponent } from "../../dto/TypeModeComponent";
import { setAnswer } from "../../redux/answersSlice";
import { ChoiceGroup } from "@consta/uikit/ChoiceGroup";

interface IChoiceTemplate extends IQuestion {
  mode: TypeModeComponent;
}

export function ChoiceTemplate(props: IChoiceTemplate) {
  const { description, options, guid, mode } = props;
  const dispatch = useDispatch<AppDispatch>();

  const currentScreenId = useSelector(
    (state: RootState) => state.currentScreen.screenId
  );

  const value = useSelector(
    (state: RootState) =>
      state.answersSlice.find((item) => item.guidQuestion === guid)?.value
  );

  if (mode === TypeModeComponent.Prod) {
    return (
      <div style={{ margin: "20px 0 0 20px" }}>
        <Text view="linkMinor" size="xl" weight="bold">
          {description}
        </Text>
        <ChoiceGroup
          items={options as IOptionList[]}
          getItemLabel={(item) => item.value}
          onChange={(e) => {
            dispatch(setAnswer({ guidQuestion: guid, value: e.value.value }));
          }}
          name={`choice_${guid}`}
          value={{ guid: "", value: value ? value as string : "" }}
          multiple={false}
          view="primary"
        />
      </div>
    );
  }

  return (
    <Card verticalSpace="xs" horizontalSpace="xs" style={{ margin: "10px 0" }}>
      <Layout>
        <Layout flex={1}>
          <Text view="linkMinor" size="xl" weight="bold">
            {description}
          </Text>
        </Layout>
        <Layout fixed horizontalAlign="right">
          <Button
            label="Удалить"
            view="clear"
            iconLeft={IconClose}
            onlyIcon
            size="s"
            onClick={() => dispatch(removeQuestion({ guid, currentScreenId }))}
          />
        </Layout>
      </Layout>
      <ChoiceGroup
        items={options as IOptionList[]}
        getItemLabel={(item) => item.value}
        onChange={() => {}}
        name={`choice_${guid}`}
      />
    </Card>
  );
}
