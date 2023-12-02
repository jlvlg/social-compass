import React from "react";
import styles from "./card.module.scss";

export type Props = { className?: string };

function Card({ children, className }: React.PropsWithChildren<Props>) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}

export default Card;
