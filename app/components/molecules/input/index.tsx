"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import Icon from "@components/atoms/icon";
import { IconType } from "@assets/icons";
import styles from "./input.module.scss";

type Props = {
  type: React.HTMLInputTypeAttribute;
  icon?: IconType;
  validation?: { delay: number | "submit"; fn: (value: string) => boolean };
  placeholder: string;
};

function Input({ type, validation, icon, placeholder }: Props) {
  const inputId = useId();
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const [valid, setValid] = useState<boolean>();

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (validation) {
      if (typeof validation.delay === "number")
        timer = setTimeout(
          () => setValid(validation.fn(value)),
          validation.delay,
        );
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [validation, value]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <p
      className={`${styles.container} ${valid === false ? styles.invalid : ""}`}
      onClick={() => ref.current?.focus()}
    >
      <input
        ref={ref}
        id={inputId}
        value={value}
        type={type}
        onChange={(event) => onChange(event)}
      />
      <label style={{ opacity: value ? 0 : 1 }} htmlFor={inputId}>
        {placeholder}
      </label>
      <Icon icon={icon} />
    </p>
  );
}

export default Input;
