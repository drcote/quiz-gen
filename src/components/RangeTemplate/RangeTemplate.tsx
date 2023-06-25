import { Button } from "@consta/uikit/Button";
import { Card } from "@consta/uikit/Card";
import { Layout } from "@consta/uikit/Layout";
import { IOptionRange, IQuestion, ViewRange } from "../../dto";
import { Text } from "@consta/uikit/Text";
import { IconClose } from "@consta/uikit/IconClose";
import { useDispatch, useSelector } from "react-redux";
import { removeQuestion } from "../../redux/screenSlice";
import { RootState } from "../../redux/store";
import { Slider } from "@consta/uikit/Slider";
import { PropView } from "@consta/uikit/__internal__/src/components/Slider/helper";
import { TypeModeComponent } from "../../dto/TypeModeComponent";
import { setAnswer } from "../../redux/answersSlice";

interface IRangeTemplate extends IQuestion {
  mode: TypeModeComponent;
}

export function RangeTemplate(props: IRangeTemplate) {
  const { description, guid, options, mode } = props;
  const currentScreenId = useSelector(
    (state: RootState) => state.currentScreen.screenId
  );
  const dispatch = useDispatch();
  const optionsSlider: IOptionRange = options
    ? (options as IOptionRange)
    : { valueFrom: 0, view: ViewRange.Default, step: 1, min: 0, max: 10 };

  const value = useSelector(
    (state: RootState) =>
      state.answersSlice.find((item) => item.guidQuestion === guid)?.value
  );

  let view: PropView = "default";
  switch (optionsSlider.view) {
    case ViewRange.Default:
      view = "default";
      break;
    case ViewRange.Division:
      view = "division";
      break;
    default:
      view = "default";
      break;
  }

  if (mode === TypeModeComponent.Prod) {
    return (
      <div style={{ margin: "20px 0 0 20px" }}>
        <Text view="linkMinor" size="xl" weight="bold">
          {description}
        </Text>
        <div style={{ maxWidth: "400px" }}>
          <Slider
            label={`Значение ${value}`}
            onChange={(e) => {
              dispatch(setAnswer({ guidQuestion: guid, value: e.value }));
            }}
            value={value ? +value : 0}
            step={optionsSlider.step ? optionsSlider.step : 1}
            view={view}
            withTooltip
            min={optionsSlider.min ? optionsSlider.min : undefined}
            max={optionsSlider.max ? optionsSlider.max : undefined}
          />
        </div>
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
      <div style={{ maxWidth: "400px" }}>
        <Slider
          label={`Значение ${value}`}
          onChange={() => {}}
          value={0}
          step={optionsSlider.step ? optionsSlider.step : 1}
          view={view}
          withTooltip
          min={optionsSlider.min ? optionsSlider.min : undefined}
          max={optionsSlider.max ? optionsSlider.max : undefined}
        />
      </div>
    </Card>
  );
}
