import React, { useEffect, useRef, useState } from "react";
import styles from "./form.module.scss";
import Button from "@components/atoms/button";
import Input from "@components/molecules/input";
import { IconType } from "@assets/icons";

export type Props = {
  title: { text: string; position: "center" | "start" | "end" };
  confirmButton?: { label: string; fn: () => void };
  cancelButton?: { label: string; fn: () => void };
  inputs: {
    id: any;
    label: string;
    icon?: IconType;
    name: string;
    validation?: { delay: number | "submit"; fn: (value: string) => boolean };
  }[];
  onSubmit: (data: { [name: string]: FormDataEntryValue }) => void;
};

function Form({ title, confirmButton, cancelButton, inputs, onSubmit }: Props) {
  const refs = useRef<({ validate: () => void } | null)[]>([]);
  const [valid, setValid] = useState(true);

  const mappedValidations = inputs.map((input) =>
    input.validation
      ? {
          ...input.validation,
          fn: (value: string) => {
            const result = input.validation!.fn(value);
            setValid(result);
            return result;
          },
        }
      : undefined,
  );

  return (
    <form
      className={styles.form}
      onSubmit={(evt) => {
        evt.preventDefault();
        for (const ref of refs.current) {
          if (ref) ref.validate();
        }
        if (valid) {
          onSubmit(
            Object.fromEntries(new FormData(evt.currentTarget).entries()),
          );
        }
      }}
    >
      <h1>{title.text}</h1>
      {inputs.map((input, index) => (
        <Input
          ref={(ref) => (refs.current[index] = ref)}
          key={input.id}
          {...input}
          validation={mappedValidations[index]}
        />
      ))}
      {cancelButton && (
        <Button
          type="secondary"
          label={cancelButton.label}
          onClick={cancelButton.fn}
        />
      )}
      {confirmButton && (
        <Button
          type="primary"
          label={confirmButton.label}
          onClick={confirmButton.fn}
        />
      )}
    </form>
  );
}

export default Form;
