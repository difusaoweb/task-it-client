"use client"

import {Form} from '@/components/Form';
import { Tarefas } from "@/components/Tarefas";
import "@/components/Main/styles.css";
import { useEffect, useState } from 'react';
import React from 'react';

export const Main = () => {
  const [novaTarefa, setNovaTarefa] = useState("");
  const [index, setIndex] = useState (-1);
  const [tarefas, setTarefas] = useState<string[]>([]);

  useEffect(() => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas') || ''); 
    if (tarefas) {
        setTarefas(tarefas);
    }
}, []) 

useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}, [tarefas])
 
  function handleSubmit (e: any) {
    e.preventDefault();
    let newNovaTarefa = novaTarefa.trim()

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    if (index !== -1) {
      setTarefas(state => {
        const newState = [...state]; 
        newState[index] = newNovaTarefa; 
        return newState;
      });

      setIndex(-1)
    } else {
      setTarefas(state => [...state,novaTarefa])
      setNovaTarefa("");  
    }
  };

  function handleChange(novaTarefa: string) {
      setNovaTarefa(novaTarefa);
  }

  function handleEdit (e: any, index: number) {
      setNovaTarefa(tarefas[index]);
      setIndex(index);
  
  };

  function handleDelete(index: number) {
    setTarefas(state => {
      const newState = [...state]; 
      newState.splice(index, 1); 
      return newState;
    })
}

  React.useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  return (
    <>
       <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        novaTarefa={novaTarefa}
  /> 
      <Tarefas
        tarefas={tarefas}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};