import React from "react";
import "./style.css";

interface Props {
  children: React.ReactNode;
}

export default function ListItem({ children }: Props) {
  return <li className="list-item">{children}</li>;
}
