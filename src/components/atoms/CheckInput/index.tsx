import React from "react";
import "./style.css";

interface Props {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  checked: boolean;
}

export default function CheckInput({ onClick, checked }: Props) {
  return (
    <div className="check-input" onClick={onClick}>
      {checked && <div className="check-input-checked" />}
    </div>
  );
}
