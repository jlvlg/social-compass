import Icons, { IconType } from "@assets/icons";
import { useToggle } from "@util/hooks";
import styles from "./interaction.module.scss";

export type Props = {
  icon: IconType;
  text: string;
  className?: string;
  interactions?: number;
  onClick?: () => void;
};

function Interaction({ icon, text, interactions, className, onClick }: Props) {
  const [active, toggleActive] = useToggle(false);
  const Icon = Icons[icon];

  function handleClick() {
    if (onClick) {
      toggleActive();
      onClick();
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`${styles.interaction} ${
        active ? styles.active : ""
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
