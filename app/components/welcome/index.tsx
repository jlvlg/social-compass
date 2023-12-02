import styles from "./welcome.module.scss";

export type Props = { message: string };

function Welcome({ message }: Props) {
  return (
    <p className={styles.container}>
      <em>Olá,</em>
      {message}
    </p>
  );
}

export default Welcome;
