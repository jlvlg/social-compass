import getIcon, { IconType } from "@assets/icons";
import styles from "./interaction.module.scss";

export type Props = {
  icon: IconType;
  text: string;
  className?: string;
  interactions?: number;
};

function Interaction({ icon, text, interactions, className }: Props) {
  const Icon = getIcon(icon);
  return (
    <div className={`${styles.interaction} ${className}`}>
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
