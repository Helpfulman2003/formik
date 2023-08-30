import React from "react";
import { WrapperInputStyle } from "./style";

export default function InputForm(props) {
  const { placeholder, value, handleFunction, id, style, name, ...rest } =
    props;

  return (
    <div>
      <WrapperInputStyle
        style={style}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleFunction}
        name={name}
        {...rest}
      />
    </div>
  );
}
