import React from "react";
import styles from "./error-message.module.scss";

export type Props = {};

function ErrorMessage({ children }: React.PropsWithChildren<Props>) {
  return <p className={styles.message}>{children}</p>;
}

export default ErrorMessage;
