import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";

import { cn } from "@/lib/utils";
import {
  TYPOGRAPHY_CLASS_NAME,
  TYPOGRAPHY_PARENT,
} from "@/data/components";
import { TypographyVariant } from "@/lib/types";

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "p",
  animationDisabled = false,
  className,
}) => {
  // local variables
  const Parent = TYPOGRAPHY_PARENT[variant];
  const defaultClassName = TYPOGRAPHY_CLASS_NAME[variant];

  return (
    <Parent
      key={children?.toString()}
      className={cn(
        defaultClassName,
        !animationDisabled && "animate-fade-in",
        className
      )}
    >
      {children}
    </Parent>
  );
};

export default Typography;

// eslint-disable-next-line unicorn/prevent-abbreviations
interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  className?: ClassNameValue;
  animationDisabled?: boolean;
}
