import { SVGAttributes } from "react";

export interface svgProps extends SVGAttributes<SVGElement> {
  color?: string;
  className?: string;
}
