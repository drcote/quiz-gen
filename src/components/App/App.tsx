import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Tabs } from "@consta/uikit/Tabs";
import { TypeScreen } from "../../dto/TypeScreen";
import { setTypeScreen } from "../../redux/currentScreenSlice";

export function App() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const currentType = useSelector(
    (state: RootState) => state.currentScreen.typeScreen
  );

  useEffect(() => {
    switch (currentType) {
      case TypeScreen.Constructor:
        navigate(`/createScreen/1`);
        break;
      case TypeScreen.Test:
        navigate(`/screen`);
        break;

      default:
        navigate(`/screen`);
        break;
    }
  }, [currentType]);

  return (
    <>
      <Tabs
        items={Object.values(TypeScreen)}
        value={currentType}
        onChange={(e) => {
          dispatch(setTypeScreen(e.value));
        }}
        getItemLabel={(item: string) => item}
        style={{ width: "200px", marginBottom: "30px" }}
      />
      <Outlet />
    </>
  );
}
