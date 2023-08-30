import { Spin } from "antd";
import React from "react";

export default function Loading({children, isLoading, delay=200}) {
  return (
    <Spin spinning={isLoading} delay={delay}>
      {children}
    </Spin>
  );
}
