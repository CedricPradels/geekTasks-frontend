import React, { useState } from "react";

import ContextsFilter from "../components/organisms/ContextsFilter";
import TasksDisplay from "../components/organisms/TasksDisplay";

import TitleBox from "../components/organisms/TitleBox";

import Default from "../components/templates/Default";

export default function Filter() {
  const [contexts, setContexts] = useState([]);
  return (
    <Default>
      <main style={{ display: "flex" }}>
        <aside>
          <TitleBox title="Filters list">
            <ContextsFilter setState={setContexts} />
          </TitleBox>
        </aside>
        <section>
          <TitleBox title="Result">
            <TasksDisplay contexts={contexts} />
          </TitleBox>
        </section>
      </main>
    </Default>
  );
}
