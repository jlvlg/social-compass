import React from "react";
import styles from "./welcome.module.scss";

export type Props = {};

function Welcome({}: Props) {
  return (
    <p className={styles.container}>
      <em>Olá,</em>
      Para continuar navegando de forma segura, efetue o login.
    </p>
  );
}

export default Welcome;
