import React from "react";
import Icons from "@assets/icons";
import variables from "@styles/variables.module.scss";

type Props = {
  icon?: keyof typeof Icons | React.FC<React.SVGAttributes<SVGElement>>;
  sizing?:
    | "xxxxs"
    | "xxxs"
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "xxxl"
    | "xxxxl";
  color?: string;
};

function Icon({ icon = "article", sizing = "md", color = "black" }: Props) {
  const IconSVG = typeof icon === "string" ? Icons[icon] : icon;

  return (
    <IconSVG
      style={{
        blockSize: variables[sizing],
        inlineSize: variables[sizing],
        color,
      }}
    />
  );
}

export default Icon;
