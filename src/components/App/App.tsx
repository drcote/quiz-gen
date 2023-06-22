import { Link, Outlet, useNavigate } from "react-router-dom";
import style from "./App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setIdNewScreen } from "../../redux/screenSlice";
import { Tabs } from "@consta/uikit/Tabs";
import { Button } from "@consta/uikit/Button";
import { IconAdd } from "@consta/uikit/IconAdd";
import { setScreenId } from "../../redux/currentScreenSlice";
import { FieldGroup } from '@consta/uikit/FieldGroup';

export function App() {
  const dispatch = useDispatch<AppDispatch>();
  const screen = useSelector((state: RootState) => state.screen);
  const currentScreenId = useSelector(
    (state: RootState) => state.currentScreen.screenId
  );
  const navigate = useNavigate();

  const onAddNewScreen = () => {
    dispatch(setIdNewScreen(screen.length + 1));
  };

  console.log(`currentScreenId=${currentScreenId}`);
  return (
    <>
      <div className={style.nav}>
        {/* <ul>
          {screen.map((item) => (
            <li key={item.id}>
              <Link to={`createScreen/${item.id}`}>{item.id}</Link>
            </li>
          ))}
          <li>
            <button onClick={onAddNewScreen}>Новый</button>
          </li>
        </ul> */}
        <FieldGroup form="round" size="m">
          <Tabs
            items={screen}
            value={screen[currentScreenId - 1]}
            view="bordered"
            onChange={(e) => {
              navigate(`/createScreen/${e.value.id}`)
            }}
            getItemLabel={(item) => item.id}
          />
          <Button
            label="Добавить"
            iconRight={IconAdd}
            onlyIcon
            size="s"
            onClick={onAddNewScreen}
          />
        </FieldGroup>
      </div>
      <Outlet />
    </>
  );
}
