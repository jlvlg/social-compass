"use client";
import icons, { IconType } from "@assets/icons";
import React, { useEffect, useId, useRef, useState } from "react";
import styles from "./input.module.scss";

type Props = {
  icon?: IconType;
  label: string;
  name: string;
  type?: string;
  isValid?: boolean;
  mask?: Inputmask.Options;
};

function Input({ icon, label, name, isValid = true, type, mask }: Props) {
  const inputId = useId();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = icon ? icons[icon] : undefined;

  useEffect(() => {
    const Inputmask = require("inputmask");
    let instance: Inputmask.Instance | undefined;

    if (mask && inputRef.current)
      instance = Inputmask({ ...mask, jitMasking: true }).mask(
        inputRef.current,
      );

    return () => {
      if (instance) instance.remove();
    };
  }, [mask]);

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
