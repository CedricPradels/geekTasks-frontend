import React from "react";
import "./style.css";

import Title from "../../atoms/Title";

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function TitleBox({ title, children }: Props) {
  return (
    <div className="title-box">
      <Title level={2}>{title}</Title>
      {children}
    </div>
  );
}
