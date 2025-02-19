import { PropsWithChildren } from "react";
import { ClassNameValue } from "tailwind-merge";

// custom
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const ToolTip: React.FC<ToolTipProps> = ({
  children,
  content,
  className,
  side,
  align,
  hideOnMobile,
}) =>
  hideOnMobile ? (
    children
  ) : (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          align={align}
          side={side}
          className={cn("text-justify font-pirate-kids", className)}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

export default ToolTip;

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ToolTipProps extends PropsWithChildren {
  content: string;
  className?: ClassNameValue;
  side?: "bottom" | "top" | "right" | "left";
  align?: "center" | "end" | "start";
  hideOnMobile?: boolean;
}
