import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components";
import { CreateScreen, ErrorPage, Screen } from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Theme, presetGpnDefault } from "@consta/uikit/Theme";
import { ResponsesNothingFound } from "@consta/uikit/ResponsesNothingFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "createScreen/:id",
        element: <CreateScreen />,
        errorElement: <ResponsesNothingFound />,
      },
      {
        path: "screen",
        element: <Screen />,
        errorElement: <ResponsesNothingFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Theme preset={presetGpnDefault}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Theme>
  </React.StrictMode>
);


