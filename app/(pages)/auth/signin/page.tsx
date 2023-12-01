"use client";

import Welcome from "@components/atoms/welcome";
import Form from "@components/organisms/form";
import server from "@util/server";
import styles from "./page.module.scss";

export type Props = {};

function SignInPage({}: Props) {
  return (
    <div className={styles.container}>
      <Welcome />
      <Form
        title={{ text: "Login", position: "start" }}
        confirmButton={{ label: "Entrar" }}
        onSubmit={(data) => {
          if (data)
            server.signIn(data.username as string, data.password as string);
        }}
        inputs={{
          username: { label: "Usuário", icon: "user" },
          password: { label: "Senha", icon: "lock", type: "password" },
        }}
        render={[
          "username",
          "password",
          {
            name: "username",
            message:
              "Usuário e/ou Senha inválidos. Por favor, tente novamente!",
          },
        ]}
      />
    </div>
  );
}

export default SignInPage;
