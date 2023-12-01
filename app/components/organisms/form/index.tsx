import { IconType } from "@/app/assets/icons";
import Button from "@components/atoms/button";
import ErrorMessage from "@components/atoms/error-message";
import Input from "@components/atoms/input";
import { FormEvent } from "react";
import { useImmer } from "use-immer";
import styles from "./form.module.scss";

export type Props = {
  title: { text: string; position: "center" | "start" | "end" };
  confirmButton: { label: string; fn?: () => void };
  cancelButton?: { label: string; fn?: () => void };
  validations?: {
    inputs: string[];
    fn: (values: { [key: string]: string }) => boolean;
  }[];
  inputs: Record<
    string,
    {
      icon?: IconType;
      label: string;
      type?: string;
    }
  >;
  render: (string | { name: string; message: string })[];
  onSubmit: (data: { [name: string]: FormDataEntryValue }) => void;
};

function Form({
  title,
  confirmButton,
  cancelButton,
  onSubmit,
  validations,
  inputs,
  render,
}: React.PropsWithChildren<Props>) {
  const [valid, setValid] = useImmer(
    Object.fromEntries(Object.keys(inputs).map((i) => [i, true])),
  );

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const data = new FormData(evt.currentTarget);
    let isFormValid = true;

    if (validations)
      for (const validation of validations) {
        const values = Object.fromEntries(
          validation.inputs.map((i) => [i, (data.get(i) as string) || ""]),
        );
        const result = validation.fn(values);
        if (!result) {
          isFormValid = false;
          setValid((draft: any) => {
            for (const input of validation.inputs) {
              draft[input] = result;
            }
          });
        }
      }

    if (isFormValid) {
      onSubmit(Object.fromEntries(new FormData(evt.currentTarget).entries()));
    } else onSubmit({});
  }

  return (
    <form
      role="form"
      className={styles.form}
      onSubmit={(evt) => handleSubmit(evt)}
    >
      <h1 style={{ textAlign: title.position }}>{title.text}</h1>
      {render.map((i) => {
        if (typeof i === "string") {
          return <Input key={i} name={i} {...inputs[i]} isValid={valid[i]} />;
        } else if (!valid[i.name]) {
          return (
            <ErrorMessage key={"message" + i.name}>{i.message}</ErrorMessage>
          );
        }
      })}
      {cancelButton && (
        <Button
          type="secondary"
          label={cancelButton.label}
          onClick={cancelButton.fn || (() => {})}
        />
      )}
      {confirmButton && (
        <Button
          type="primary"
          label={confirmButton.label}
          onClick={confirmButton.fn || (() => {})}
        />
      )}
    </form>
  );
}

export default Form;
