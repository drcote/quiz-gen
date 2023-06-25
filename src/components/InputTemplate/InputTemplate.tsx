import React from "react";
import { IQuestion } from "../../dto";
import { Card } from "@consta/uikit/Card";
import { Layout } from "@consta/uikit/Layout";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import { IconClose } from "@consta/uikit/IconClose";
import { useDispatch, useSelector } from "react-redux";
import { removeQuestion } from "../../redux/screenSlice";
import { RootState } from "../../redux/store";
import { TextField } from "@consta/uikit/TextField";
import { TypeModeComponent } from "../../dto/TypeModeComponent";
import { setAnswer } from "../../redux/answersSlice";

interface IInputTemplate extends IQuestion {
  mode: TypeModeComponent;
}

export function InputTemplate(props: IInputTemplate) {
  const { description, guid, mode } = props;
  const dispatch = useDispatch();
  const currentScreenId = useSelector(
    (state: RootState) => state.currentScreen.screenId
  );
  const value = useSelector(
    (state: RootState) =>
      state.answersSlice.find((item) => item.guidQuestion === guid)?.value
  );

  if (mode === TypeModeComponent.Prod) {
    return (
      <Layout style={{ margin: "20px 0 0 20px" }}>
        <Text
          view="linkMinor"
          size="xl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
          }}
          weight="bold"
        >
          {description}
        </Text>
        <TextField
          size="s"
          value={value ? value as string : ""}
          onChange={(e) =>
            dispatch(setAnswer({ guidQuestion: guid, value: e.value }))
          }
        />
      </Layout>
    );
  }
  return (
    <Card verticalSpace="xs" horizontalSpace="xs" style={{ margin: "10px 0" }}>
      <Layout>
        <Layout flex={1}>
          <Text
            view="linkMinor"
            size="xl"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
            }}
            weight="bold"
          >
            {description}
          </Text>
          <TextField size="s" />
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
    </Card>
  );
}
