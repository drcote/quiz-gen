import { Button } from "@consta/uikit/Button";
import { ResponsesEmptyBox } from "@consta/uikit/ResponsesEmptyBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TypeScreen } from "../../dto/TypeScreen";
import { setTotalPages, setTypeScreen } from "../../redux/currentScreenSlice";
import { LOCAL_STORAGE_VALUE } from "../../env/const";
import { IScreen } from "../../dto";
import { PageScreen } from "../PageScreen/PageScreen";
import { RootState } from "../../redux/store";
import { ReactElement, useEffect } from "react";

export function Screen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageId = useSelector((state: RootState) => state.currentScreen.pageId);

  const localStorageScreens = localStorage.getItem(LOCAL_STORAGE_VALUE);

  if (localStorageScreens) {
    const screens: IScreen[] = JSON.parse(localStorageScreens);
    const pages: ReactElement[] = [];
    screens.map((screen) => pages.push(<PageScreen {...screen} />));
    dispatch(setTotalPages(screens.length));
    return pages[pageId];
  }

  return (
    <>
      {" "}
      <ResponsesEmptyBox
        title="Здесь пока ничего нет"
        description="Создайте свой опрос"
        actions={
          <Button
            label="Перейти в конструктор"
            onClick={() => {
              navigate(`/createScreen/1`);
              dispatch(setTypeScreen(TypeScreen.Constructor));
            }}
          />
        }
      />
    </>
  );
}
