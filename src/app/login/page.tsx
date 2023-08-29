"use client";
import { use, useState } from 'react';
import Image from 'next/image'

import './global.css'
import DifusaoWebImage from '@/assets/difusao.jpg'
import { LayoutComponents } from '@/components/LayoutComponents';
import { axiosAPI } from "@/services/api";
import { url } from 'inspector';
import { useRouter } from 'next/navigation';
import { setToken } from '@/services/CookieService';

export default function LoginPage () {
   const router = useRouter() 

  const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    
    async function postAccess(e:any) {
       try {
         e.preventDefault();
         const {data} = await axiosAPI.post('/accesses', {
          email,
          password})
         const {hash} = data.token
         setToken({token: hash})


          router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
    
    return (
      <LayoutComponents>
                <form className="login-form" onSubmit={postAccess}>
                    <span className="login-form-title">Bem Vindo!</span>
                    <span className="login-form-title">
                    <Image src={DifusaoWebImage}
                    width= {90}
                    alt="Difusao web" />
                    </span>

                    <div className="wrap-input">
                     <input
                     className={email !== "" ? "has-val input" : "input"}
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                    />
                    
                     <span className="focus-input" data-placeholder="Email"></span>
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
              <button className="login-form-btn" type="submit">Login</button>
            </div>

            <div className="text-center">
              <span className="txt1">Não possui conta? </span>
              <a className="txt2" href="./register">
                Criar conta
              </a>
            </div>
          </form>
          </LayoutComponents>
  );
};