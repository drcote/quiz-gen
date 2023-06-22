import React from "react";
import { IQuestion } from "../../dto";

export function CheckboxTemplate(props: IQuestion) {
  const { description, options } = props;
  return (
    <div>
      <h1>{description}</h1>
      {options?.map((item) => (
        <div key={item.guid}>
          <input type="checkbox" id={item.guid} />
          <label htmlFor={item.guid}>{item.value}</label>
        </div>
      ))}
    </div>
  );
}
