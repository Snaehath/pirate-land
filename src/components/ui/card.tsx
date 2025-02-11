import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...properties }, reference) => (
  <div
    ref={reference}
    className={cn(
      "rounded-base shadow-shadow border-2 border-border bg-main text-mtext",
      className,
    )}
    {...properties}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...properties }, reference) => (
  <div
    ref={reference}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...properties}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...properties }, reference) => (
  <div
    ref={reference}
    className={cn(
      "text-xl leading-none font-heading tracking-tight",
      className,
    )}
    {...properties}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...properties }, reference) => (
  <div
    ref={reference}
    className={cn("text-sm text-mtext font-base !mt-3", className)}
    {...properties}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...properties }, reference) => (
  <div
    ref={reference}
    className={cn("p-6 pt-0", className)}
    {...properties}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...properties }, reference) => (
  <div
    ref={reference}
    className={cn("flex items-center p-6 pt-0", className)}
    {...properties}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
