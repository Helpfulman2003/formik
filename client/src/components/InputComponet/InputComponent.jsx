import React from "react";
import { Input } from "antd";

export default function InputComponent(props) {
  const { prefix, placeholder, enterButton, onSearch } = props;
  const { Search } = Input;
  return (
    <Search
      prefix={prefix}
      placeholder={placeholder}
      enterButton={enterButton}
      onSearch={onSearch}
    />
  );
}
