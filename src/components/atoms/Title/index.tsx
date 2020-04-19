import React from "react";
import "./style.css";

interface Props {
  children: React.ReactNode;
  level: number;
}

export default function Title({ children, level = 1 }: Props) {
  return <h1 className="title">{children}</h1>;
}
