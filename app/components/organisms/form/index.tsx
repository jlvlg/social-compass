import React from "react";
import styles from "./form.module.scss";
import Button from "@components/atoms/button";

export type Props = {
  title: { text: string; position: "center" | "start" | "end" };
  confirmButton?: string;
  cancelButton?: string;
};

function Form({
  children,
  title,
  confirmButton,
  cancelButton,
}: React.PropsWithChildren<Props>) {
  return (
    <form
      className={styles.form}
      onSubmit={(evt) => {
        evt.preventDefault();
      }}
    >
      <h1>{title.text}</h1>
      {children}
      {cancelButton && <Button type="secondary" label={cancelButton} />}
      {confirmButton && <Button type="primary" label={confirmButton} />}
    </form>
  );
}

export default Form;
