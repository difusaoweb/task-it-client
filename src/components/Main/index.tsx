import * as React from "react";

// import Form from './Form';
import { Tarefas } from "@/components/Tarefas";
import "@/components/Main/styles";

export const Main = () => {
  const [novaTarefa, setNovaTarefa] = React.useState("");
  const [tarefas, setTarefas] = React.useState<string[]>(
    JSON.parse(localStorage.getItem("tarefas") ?? "")
  );

  // state = {
  //   novaTarefa: '',
  //   tarefas: [],
  //   index: -1,
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    // const { tarefas, index } = state;
    // let { novaTarefa } = state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    if (index === -1) {
      setTarefas([...novasTarefas, novaTarefa]);
      setNovaTarefa("");
    } else {
      novasTarefas[index] = novaTarefa;

      setState({
        tarefas: [...novasTarefas],
        index: -1,
      });
    }
  };

  function HandleChange(e) {
    setState({
      novaTarefa: e.target.value,
    });
  }

  handleEdit = (_: any, index: number) => {
    // const { tarefas } = state;

    setState({
      index,
      novaTarefa: tarefas[index],
    });
  };

  handleDelete = (e, index) => {
    const { tarefas } = state;
    const novaTarefas = [...tarefas];
    novaTarefas.splice(index, 1);

    setState({
      tarefas: [...novaTarefas],
    });
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
