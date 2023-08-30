import React from "react";
import { WrapperLabelText, WrapperTextPrice, WrapperTextValue } from "./style";
import { Checkbox, Rate } from "antd";

export default function NavbarComponent() {
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options?.map((option, index) => {
          return <WrapperTextValue key={index}>{option}</WrapperTextValue>;
        });

      case "checkbox":
        return options?.map((option, index) => {
          return (
            <>
              <Checkbox key={index} value={option.value}>
                {option.label}
              </Checkbox>
              <br />
            </>
          );
        });

      case "star":
        return options?.map((option, index) => {
          return (
            <div>
              <Rate
                style={{ fontSize: "12px" }}
                key={index}
                allowHalf
                defaultValue={option}
              />
              <span>từ {option} sao</span>
              <br />
            </div>
          );
        });

      case "price":
        return options?.map((option, index) => {
          return <WrapperTextPrice key={index}>{option}</WrapperTextPrice>;
        });
      default:
        return <></>;
    }
  };
  return (
    <div>
      <WrapperLabelText>Label</WrapperLabelText>
      {renderContent("text", ["Tu lanh", "TV", "May giat"])}
      {renderContent("checkbox", [
        { value: "a", label: "A" },
        { value: "B", label: "B" },
      ])}
      {renderContent("star", [3, 4, 5])}
      {renderContent("price", ["duoi 40000", "tren 50000"])}
    </div>
  );
}
