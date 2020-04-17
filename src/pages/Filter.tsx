import React, { useState } from "react";

import ContextsFilter from "../components/ContextsFilter";
import TasksDisplay from "../components/TasksDisplay";

export default function Filter() {
  const [contexts, setContexts] = useState([]);
  return (
    <main style={{ display: "flex" }}>
      <aside>
        <ContextsFilter setState={setContexts} />
      </aside>
      <section>
        <TasksDisplay contexts={contexts} />
      </section>
    </main>
  );
}
