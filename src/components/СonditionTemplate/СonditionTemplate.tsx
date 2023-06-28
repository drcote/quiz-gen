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
import { Badge } from "@consta/uikit/Badge";

interface IChoiceTemplate extends IQuestion {
  mode: TypeModeComponent;
}

export function СonditionTemplate(props: IChoiceTemplate) {
  const { description, options, guid, mode, parentGuid } = props;
  const dispatch = useDispatch<AppDispatch>();

  const currentScreenId = useSelector(
    (state: RootState) => state.currentScreen.screenId
  );

  const value = useSelector(
    (state: RootState) =>
      state.answersSlice.find((item) => item.guidQuestion === guid)?.value
  );

  const parent = useSelector((state: RootState) =>
    state.parentQuestionSlice.items.find((item) => item.guid === parentGuid)
  );
  const parentGroup = useSelector((state: RootState) =>
    state.parentQuestionSlice.groups.find(
      (item) => item.guid === parent?.groupGuid
    )
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
            dispatch(
              setAnswer({
                guidQuestion: guid,
                value: { value: e.value.value, guid: e.value.guid },
              })
            );
          }}
          name={`choice_${guid}`}
          value={value as IOptionList}
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
          {parent && parentGroup ? (
            <Badge
              status="warning"
              size="xs"
              label={`${parentGroup.label} | ${parent.label}`}
              style={{ marginRight: "20px" }}
            />
          ) : null}
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
