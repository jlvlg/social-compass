"use client";

import Welcome from "@components/atoms/welcome";
import Form from "@components/organisms/form";
import { actions, useDispatch } from "@store";
import server from "@util/server";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../layout.module.scss";

export type Props = {};

function RegisterPage({}: Props) {
  const [uniqueFailed, setUniqueFailed] = useState({
    username: false,
    email: false,
  });
  const dispatch = useDispatch();
  const router = useRouter();

  async function register(data: Record<string, string>) {
    const bd = data.birthdate;
    const formatted = {
      ...data,
      birthdate: `${bd.slice(6, 10)}-${bd.slice(3, 5)}-${bd.slice(0, 2)}`,
    };
    const newUniqueFailed = { username: false, email: false };

    try {
      dispatch(actions.user.setUser(await server.register(formatted)));
      router.push("/");
    } catch (error: any) {
      switch (error.status) {
        case 500:
          if (error.message.includes("username"))
            newUniqueFailed.username = true;
          else if (error.message.includes("email"))
            newUniqueFailed.email = true;
          break;
      }
    }
    setUniqueFailed(newUniqueFailed);
  }

  return (
    <>
      <Welcome message="Por favor, registre-se para continuar." />
      <Form
        title={{ text: "Cadastro", position: "start" }}
        confirmButton={{ label: "Registrar-se" }}
        onSubmit={(data) => {
          if (Object.keys(data).length)
            register(data as Record<string, string>);
        }}
        inputs={{
          name: { label: "Nome", icon: "user" },
          username: {
            label: "Usuário",
            icon: "fingerprint",
            isValid: !uniqueFailed.username,
          },
          birthdate: {
            label: "Nascimento",
            icon: "calendar",
            mask: {
              mask: "*{2}/*{2}/*{4}",
              definitions: { "*": { validator: "[0-9]" } },
            },
          },
          email: {
            label: "Email",
            icon: "at",
            type: "email",
            isValid: !uniqueFailed.email,
          },
          password: {
            label: "Senha",
            icon: "lock",
            type: "password",
          },
          confirmPassword: {
            label: "Confirmar Senha",
            icon: "shield",
            type: "password",
          },
        }}
        validations={{
          nameMax: {
            inputs: ["name"],
            fn: (values) => values.name.length <= 255,
          },
          usernameMax: {
            inputs: ["username"],
            fn: (values) => values.username.length <= 255,
          },
          emailRegex: {
            inputs: ["email"],
            fn: (values) => /^.*@.*\..*$/.test(values.email),
          },
          emailMax: {
            inputs: ["email"],
            fn: (values) => values.email.length <= 255,
          },
          passwordLength: {
            inputs: ["password"],
            fn: (values) =>
              values.password.length >= 6 && values.password.length <= 50,
          },
          matchingPasswords: {
            inputs: ["password", "confirmPassword"],
            fn: (values) => values.password === values.confirmPassword,
          },
          required: {
            inputs: [
              "name",
              "username",
              "birthdate",
              "email",
              "password",
              "confirmPassword",
            ],
            fn: (values) =>
              Object.entries(values).every((i) => i[1].length > 0),
          },
        }}
        render={[
          "name",
          {
            condition: "nameMax",
            message: "Nome deve ser menor que 255 caracteres",
          },
          "username",
          {
            condition: "usernameMax",
            message: "Usuário deve ser menor que 255 caracteres",
          },
          { condition: !uniqueFailed.username, message: "Usuário já existe" },
          "birthdate",
          "email",
          {
            condition: "emailRegex",
            message: "Email deve conter @ e .domínio",
          },
          {
            condition: "emailMax",
            message: "Email deve ser menor que 255 caracteres",
          },
          { condition: !uniqueFailed.email, message: "Email já cadastrado" },
          "password",
          {
            condition: "passwordLength",
            message: "Senha deve conter entre 6 e 50 caracteres",
          },
          "confirmPassword",
          {
            condition: "matchingPasswords",
            message: "Senha e Confirmar Senha devem ser iguais",
          },
          {
            condition: "required",
            message: "Todos os campos são obrigatórios",
          },
        ]}
      />
      <p className={styles.link}>
        Já possui uma conta? <Link href="/signin">Faça Login</Link>
      </p>
    </>
  );
}

export default RegisterPage;
