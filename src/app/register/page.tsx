"use client";
import './global.css';
import { api } from "../../services/api";
import Image from 'next/image';
import DifusaoWebImage from '@/assets/difusao.jpg';
import { useState } from "react";
import { LayoutComponents } from "@/components/LayoutComponents";

export default function Register () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")

    const handleSaveUser = async (e:any) => {
      e.preventDefault();
      const data = {
        email,
        password,
        name
      };

      const response = await api.post("/create", data);
      console.log(response.data);
    };

  return (
    <LayoutComponents>
      <form onSubmit={handleSaveUser} className="login-form">
        <span className="login-form-title">Criar Conta</span>
        <span className="login-form-title">
          <Image src={DifusaoWebImage} width={90} alt="Difusao web" />
        </span>

        <div className="wrap-input">
          <input
            className={name !== "" ? "has-val input" : "input"}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Name"></span>
        </div>
        <div className="wrap-input">
          <input
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="E-mail"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span className="focus-input" data-placeholder="Password"></span>
        </div>

        <div className="container-login-form-btn">
          <button type="submit" className="login-form-btn">Cadastrar</button>
        </div>

        <div className="text-center">
          <span className="txt1">Não possui conta? </span>
          <a className="txt2" href="/login">
            Acessar conta com Email e Senha.
          </a>
        </div>
      </form>
    </LayoutComponents>
  )
}
