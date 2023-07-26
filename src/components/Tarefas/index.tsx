"use client";
import * as React from "react";
import { FaEdit, FaWindowClose } from "react-icons/fa";

import "@/components/Tarefas/styles.css";

interface TarefasPropsTypes {
  tarefas: string[];
  handleEdit: (_: any, index: number) => void;
  handleDelete: (index : number) => void;
}

export const Tarefas = ({
  tarefas,
  handleEdit,
  handleDelete,
}: TarefasPropsTypes) => {
  return (
    <ul className="tarefas">
      {tarefas.map((tarefa, index) => (
        <li key={tarefa}>
          {tarefa}
          <span>
            <FaEdit
              className="edit"
              onClick={(e: any) => handleEdit(e, index)}
            />

            <FaWindowClose
              onClick={(e) => handleDelete(index)}
              className="delete"
            />
          </span>
        </li>
      ))}
    </ul>
  );
};
