import { IconType } from "@/app/assets/icons";
import Button from "@components/atoms/button";
import Input from "@components/atoms/input";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";
import styles from "./form.module.scss";

type Validations = Record<
  string,
  {
    inputs: string[];
    allowSubmit?: boolean;
    fn: (values: { [key: string]: string }) => boolean;
  }
>;

export type Props = {
  title: { text: string; position: "center" | "start" | "end" };
  confirmButton: { label: string; fn?: () => void };
  cancelButton?: { label: string; fn?: () => void };
  validations?: Validations;
  inputs: Record<
    string,
    {
      icon?: IconType;
      label: string;
      type?: string;
      isValid?: boolean;
    }
  >;
  render: (string | { condition: string | boolean; message: string })[];
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
  const [failedValidations, setFailedValidations] = useState<string[]>([]);
  const valid = Object.fromEntries(
    Object.entries(inputs).map((i) => [i[0], true]),
  );

  if (validations)
    for (const validation of failedValidations)
      for (const input of validations[validation].inputs)
        if (valid[input]) valid[input] = false;

  console.log(validations, failedValidations, valid);

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const data = new FormData(evt.currentTarget);
    const results: Record<string, boolean> = {};
    let isFormValid = true;

    if (validations) {
      for (const validation of Object.entries(validations)) {
        const values = Object.fromEntries(
          validation[1].inputs.map((i) => [i, (data.get(i) as string) || ""]),
        );

        const result = validation[1].fn(values);

        results[validation[0]] = result;

        if (!result && !validation[1].allowSubmit) isFormValid = false;
      }
      setFailedValidations(
        Object.entries(results)
          .filter((i) => !i[1])
          .map((i) => i[0]),
      );
    }

    if (isFormValid)
      onSubmit(Object.fromEntries(new FormData(evt.currentTarget).entries()));
    else onSubmit({});
  }

  return (
    <form
      role="form"
      className={styles.form}
      onSubmit={(evt) => handleSubmit(evt)}
    >
      <h1 style={{ textAlign: title.position }}>{title.text}</h1>
      <AnimatePresence>
        {render.map((i) => {
          if (typeof i === "string") {
            return (
              <Input
                key={i}
                name={i}
                {...inputs[i]}
                isValid={inputs[i].isValid && valid[i]}
              />
            );
          } else if (
            i.condition === false ||
            (typeof i.condition === "string" &&
              failedValidations.includes(i.condition))
          ) {
            return (
              <motion.p
                layout
                variants={{
                  hidden: { height: "0px", marginBlock: "-12px" },
                  visible: { height: "auto", marginBlock: 0 },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key={"message" + i.message}
                className={styles.message}
              >
                {i.message}
              </motion.p>
            );
          }
        })}
      </AnimatePresence>
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
