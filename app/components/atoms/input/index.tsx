"use client";
import getIcon, { IconType } from "@assets/icons";
import React, { useId, useRef, useState } from "react";
import styles from "./input.module.scss";

type Props = {
  icon?: IconType;
  label: string;
  name: string;
  type?: string;
  isValid?: boolean;
};

function Input({ icon, label, name, isValid = true, type }: Props) {
  const inputId = useId();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = icon ? getIcon(icon) : undefined;

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <p
      className={`${styles.container} ${isValid ? "" : styles.invalid}`}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        id={inputId}
        name={name}
        value={value}
        type={type}
        onChange={(event) => onChange(event)}
      />
      <label style={{ opacity: value ? 0 : 1 }} htmlFor={inputId}>
        {label}
      </label>
      {Icon && <Icon />}
    </p>
  );
}

export default Input;
