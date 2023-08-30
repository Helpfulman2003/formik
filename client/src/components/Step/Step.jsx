import { Steps } from "antd";
import React from "react";

export default function Step({ current = 0, items = [] }) {
  return <Steps current={current} items={items} />;
}
