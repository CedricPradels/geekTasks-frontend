import React from "react";
import "./style.css";

interface Props {
  children: React.ReactNode;
}

export default function List({ children }: Props) {
  return <ul className="list">{children}</ul>;
}
