import * as React from "react";

// import Form from './Form';
import { Tarefas } from "@/components/Tarefas";
import "@/components/Main/styles";

export const Main = () => {
  const [novaTarefa, setNovaTarefa] = React.useState("");
  const [index, setIndex] = React.useState (-1);
  const [tarefas, setTarefas] = React.useState<string[]>(
    JSON.parse(localStorage.getItem("tarefas") ?? "")
  );

 function handleSubmit (e: any,index: number) {
    e.preventDefault();
    let newNovaTarefa = novaTarefa.trim()

    if (tarefas.indexOf(novaTarefa) !== -1) return;
      setNovaTarefa("");  
      setTarefas(state => [...state,novaTarefa])
  };

  function HandleChange(e: any) {
      setNovaTarefa(e.target.value);
  }

  function handleEdit (e: any, index: number) {
      setNovaTarefa(tarefas[index]);
      setIndex(index);
  
  };

  function  handleDelete (index: number) {
    setTarefas(state => state.splice(index, 1));
    };

  React.useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  return (
    <>
      {/* <Form
        handleSubmit={handleSubmit}
        HandleChange={HandleChange}
        novaTarefa={novaTarefa}
  /> */}
      <Tarefas
        tarefas={tarefas}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};
