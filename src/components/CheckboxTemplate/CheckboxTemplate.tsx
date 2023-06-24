import React from "react";
import { IOptionList, IQuestion } from "../../dto";
import { useDispatch, useSelector } from "react-redux";
import { CheckboxGroup } from "@consta/uikit/CheckboxGroup";
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/Layout";
import { Button } from "@consta/uikit/Button";
import { IconClose } from "@consta/uikit/IconClose";
import { AppDispatch, RootState } from "../../redux/store";
import { removeQuestion } from "../../redux/screenSlice";
import { TypeModeComponent } from "../../dto/TypeModeComponent";

interface ICheckboxTemplate extends IQuestion {
  mode: TypeModeComponent;
}

export function CheckboxTemplate(props: ICheckboxTemplate) {
  const { description, options, guid, mode } = props;
  const dispatch = useDispatch<AppDispatch>();

  const currentScreenId = useSelector(
    (state: RootState) => state.currentScreen.screenId
  );

  if (mode === TypeModeComponent.Prod) {
    return (
      <Layout direction="column">
        <Text view="linkMinor" size="xl" weight="bold">
          {description}
        </Text>
        <CheckboxGroup
          items={options as IOptionList[]}
          getItemLabel={(item) => item.value}
          onChange={() => {}}
        />
      </Layout>
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
      <CheckboxGroup
        items={options as IOptionList[]}
        getItemLabel={(item) => item.value}
        onChange={() => {}}
      />
    </Card>
  );
}
