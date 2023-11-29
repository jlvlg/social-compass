import React from "react";
import getIcon, { IconType } from "@assets/icons";

export type Props = {
  icon?: IconType;
  className?: string;
  style?: React.CSSProperties;
};

function Icon({ icon = "article", className, style }: Props) {
  const IconSVG = getIcon(icon);

  return <IconSVG className={className} style={style} />;
}

export default Icon;
