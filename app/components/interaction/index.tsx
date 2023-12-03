import Icons, { IconType } from "@assets/icons";
import styles from "./interaction.module.scss";

export type Props = {
  icon: IconType;
  text: string;
  className?: string;
  interactions?: number;
  isActive?: boolean;
  onClick?: () => void;
};

function Interaction({
  icon,
  text,
  interactions,
  className,
  onClick,
  isActive,
}: Props) {
  const Icon = Icons[icon];

  return (
    <div
      onClick={onClick}
      className={`${styles.interaction} ${
        isActive ? styles.active : ""
      } ${className}`}
    >
      <Icon />
      {text}
      {interactions !== undefined && (
        <span>
          {Intl.NumberFormat("en-us", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(interactions)}
        </span>
      )}
    </div>
  );
}

export default Interaction;
