"use client";

import Form from "@components/organisms/form";
import server from "@util/server";
import { useState } from "react";

export type Props = {};

function SignInPage({}: Props) {
  const [error, setError] = useState(false);

  async function signIn(username: string, password: string) {
    try {
      await server.signIn(username, password);
      setError(false);
    } catch (error: any) {
      setError(true);
    }
  }

  return (
    <Form
      title={{ text: "Login", position: "start" }}
      confirmButton={{ label: "Entrar" }}
      onSubmit={(data) => {
        if (Object.keys(data).length)
          signIn(data.username as string, data.password as string);
      }}
      inputs={{
        username: { label: "Usuário", icon: "user", isValid: !error },
        password: {
          label: "Senha",
          icon: "lock",
          type: "password",
          isValid: !error,
        },
      }}
      validations={{
        usernameMissing: {
          inputs: ["username"],
          fn: (values) => values.username.length > 0,
        },
        passwordMissing: {
          inputs: ["password"],
          fn: (values) => values.password.length > 0,
        },
      }}
      render={[
        "username",
        { condition: "usernameMissing", message: "Usuário é obrigatório" },
        "password",
        { condition: "passwordMissing", message: "Senha é obrigatória" },
        {
          condition: !error,
          message: "Usuário e/ou Senha inválidos. Por favor, tente novamente!",
        },
      ]}
    />
  );
}

export default SignInPage;
