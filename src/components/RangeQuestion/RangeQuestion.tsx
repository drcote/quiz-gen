import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/Layout";
import { TextField } from "@consta/uikit/TextField";
import { ChoiceGroup } from "@consta/uikit/ChoiceGroup";
import { IOptionRange, ViewRange } from "../../dto";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setOptionRangeMax,
  setOptionRangeMin,
  setOptionRangeStep,
  setOptionRangeValueFrom,
  setOptionRangeValueTo,
  setOptionRangeView,
} from "../../redux/questionSlice";

export function RangeQuestion() {
  const dispatch = useDispatch();
  const options: IOptionRange = useSelector(
    (state: RootState) => state.question.options as IOptionRange
  );
  return (
    <Layout direction="column" style={{ margin: "20px 0" }}>
      <Layout style={{ marginTop: "20px" }}>
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
          }}
        >
          Внешний вид линии
        </Text>
        <ChoiceGroup
          name="views"
          items={Object.values(ViewRange)}
          getItemLabel={(item: string) => item}
          size="s"
          value={options.view !== null ? options.view : ViewRange.Default}
          onChange={(e) => dispatch(setOptionRangeView(e.value))}
        />
      </Layout>
      <Layout style={{ marginTop: "20px" }}>
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
          }}
        >
          Шаг
        </Text>
        <TextField
          type="number"
          style={{ width: "50px" }}
          value={options.step ? String(options.step) : "1"}
          onChange={(e) => dispatch(setOptionRangeStep(e.value))}
        />
      </Layout>
      <Layout style={{ marginTop: "20px" }}>
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
          }}
        >
          Минимальное значение
        </Text>
        <TextField type="number" style={{ width: "50px" }} value={options.min?String(options.min):"0"} onChange={(e) => dispatch(setOptionRangeMin(e.value))} />
      </Layout>
      <Layout style={{ marginTop: "20px" }}>
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
          }}
        >
          Максимальное значение
        </Text>
        <TextField type="number" style={{ width: "50px" }} value={options.max?String(options.max):"10"} onChange={(e) => dispatch(setOptionRangeMax(e.value))} />
      </Layout>
      <Layout style={{ marginTop: "20px" }}>
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
          }}
        >
          Значение по умолчанию с
        </Text>
        <TextField type="number" style={{ width: "50px" }} value={options.valueFrom?String(options.valueFrom):"0"} onChange={(e) => dispatch(setOptionRangeValueFrom(e.value))}/>
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 20px",
          }}
        >
          по
        </Text>
        <TextField type="number" style={{ width: "50px" }} value={options.valueTo?String(options.valueTo):""} onChange={(e) => dispatch(setOptionRangeValueTo(e.value))}/>
      </Layout>
    </Layout>
  );
}
