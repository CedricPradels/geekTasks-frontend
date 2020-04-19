import React from "react";

import "./style.css";

interface Props {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({ onClick, children, type = "button" }: Props) {
  return (
    <button className="button" type={type} onClick={onClick}>
      {children}
    </button>
  );
}
