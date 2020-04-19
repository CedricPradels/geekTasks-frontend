import React from "react";
import "./style.css";

interface Props {
  children: React.ReactNode;
}

export default function Default({ children }: Props) {
  return <div className="default">{children}</div>;
}
