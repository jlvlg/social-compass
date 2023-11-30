"use client";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Icon from "@components/atoms/icon";
import { IconType } from "@assets/icons";
import styles from "./input.module.scss";

type Props = {
  icon?: IconType;
  validation?: { delay: number | "submit"; fn: (value: string) => boolean };
  label: string;
  name: string;
};

const Input = forwardRef<{ validate: () => void }, Props>(function Input(
  { validation, icon, label, name }: Props,
  ref,
) {
  const inputId = useId();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [valid, setValid] = useState<boolean>();
  const [validatable, setValidatable] = useState(false);

  useImperativeHandle(ref, () => ({
    validate,
  }));

  const validate = useCallback(() => {
    if (validation) setValid(validation.fn(value));
  }, [validation, value]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (validation && validatable) {
      if (typeof validation.delay === "number")
        timer = setTimeout(validate, validation.delay);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [validatable, validate, validation, value]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    setValidatable(true);
  }

  return (
    <p
      className={`${styles.container} ${valid === false ? styles.invalid : ""}`}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        id={inputId}
        name={name}
        value={value}
        type="text"
        onSubmit={validate}
        onChange={(event) => onChange(event)}
      />
      <label style={{ opacity: value ? 0 : 1 }} htmlFor={inputId}>
        {label}
      </label>
      <Icon icon={icon} />
    </p>
  );
});

export default Input;
