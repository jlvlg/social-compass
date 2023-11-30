import styles from "./button.module.scss";

export type Props = {
  label: string;
  type: "primary" | "secondary";
  onClick: () => void;
};

function Button({ label, type, onClick }: Props) {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
