import styles from "./button.module.scss";

export type Props = {
  label: string;
  type: "primary" | "secondary";
  onClick: () => void;
  className?: string;
};

function Button({ label, type, onClick, className }: Props) {
  return (
    <button
      className={`${styles.button} ${styles[type]} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
