"use server";

import { Main } from "@/components/Main";

export default function HomePage() {
  return (
    <div className="main">
      <h1>Lista de tarefas</h1>
      <Main />
    </div>
  );
}
