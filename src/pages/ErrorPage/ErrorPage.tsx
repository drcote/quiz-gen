import React from "react";
import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error:any = useRouteError();
  return (
    <>
      <div>ErrorPage</div>
      <p>{error.statusText || error.message}</p>
    </>
  );
}
