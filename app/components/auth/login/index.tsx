"use client";

import Form from "@components/form";
import Welcome from "@components/welcome";
import { actions, useDispatch } from "@store";
import server from "@util/server";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../layout.module.scss";

export type Props = { onSwitch: () => void };

function Login({ onSwitch }: Props) {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  async function signIn(username: string, password: string) {
    try {
      const abort = new AbortController();
      const res = await server.signIn(username, password, abort.signal);
      dispatch(actions.user.setUser({ ...res.user, token: res.token }));
      dispatch(actions.user.saveUser());
      setError(false);
      router.push("/");
    } catch (error: any) {
      setError(true);
    }
  }

  return (
    <>
      <Welcome message="Para continuar navegando de forma segura, efetue o login." />
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
          usernameMax: {
            inputs: ["username"],
            fn: (values) => values.username.length <= 255,
          },
          passwordLength: {
            inputs: ["password"],
            fn: (values) =>
              values.password.length >= 6 && values.password.length <= 50,
          },
        }}
        render={[
          "username",
          { condition: "usernameMissing", message: "Usuário é obrigatório" },
          {
            condition: "usernameMax",
            message: "Usuário deve ter menos que 255 caracteres",
          },
          "password",
          {
            condition: "passwordLength",
            message: "Senha deve ter entre 6 e 50 caracteres",
          },
          {
            condition: !error,
            message:
              "Usuário e/ou Senha inválidos. Por favor, tente novamente!",
          },
        ]}
      />
      <p className={styles.link}>
        Novo por aqui? <button onClick={onSwitch}>Registre-se</button>
      </p>
    </>
  );
}

export default Login;
