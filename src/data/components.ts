import { ClassNameValue } from "tailwind-merge";

// custom
import { Avatar, TypographyVariant } from "@/lib/types";

// Variant:HTML Tag mapping for custom typography component
export const TYPOGRAPHY_PARENT: {
  [_key in TypographyVariant]: keyof React.JSX.IntrinsicElements;
} = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  blockquote: "blockquote",
  inlinecode: "code",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
};

// Variant:Tailwind classname mapping for custom typography component
export const TYPOGRAPHY_CLASS_NAME: {
  [_key in TypographyVariant]: ClassNameValue;
} = {
  h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-semibold tracking-tight",
  p: "leading-7",
  blockquote: "border-l-2 pl-6 italic",
  inlinecode: "rounded bg-muted p-1 font-mono text-sm font-semibold",
  lead: "text-xl text-muted-foreground",
  large: "text-md font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
};

export const AVATARS: Avatar[] = [
  {
    img: "/avatars/boy-mammoth.png",
    alt: "Boy mammoth kid",
  },
  {
    img: "/avatars/girl-mammoth.png",
    alt: "Girl mammoth kid",
  },
  {
    img: "/avatars/rainbow-mammoth.png",
    alt: "Rainbow mammoth kid",
  },
  {
    img: "/avatars/white-boy.png",
    alt: "White boy pirate kid",
  },
  {
    img: "/avatars/white-girl.png",
    alt: "White girl pirate kid",
  },
  {
    img: "/avatars/black-boy.png",
    alt: "Black boy pirate kid",
  },
  {
    img: "/avatars/black-girl.png",
    alt: "Black girl pirate kid",
  },
];

export const AVATARS_ICONS: Avatar[] = [
  {
    img: "/avatars/boy-mammoth-icon.png",
    alt: "Boy mammoth icon",
  },
  {
    img: "/avatars/girl-mammoth-icon.png",
    alt: "Girl mammoth icon",
  },
  {
    img: "/avatars/rainbow-mammoth-icon.png",
    alt: "Rainbow mammoth icon",
  },
  {
    img: "/avatars/white-boy-icon.png",
    alt: "White boy pirate kid icon",
  },
  {
    img: "/avatars/white-girl-icon.png",
    alt: "White girl pirate kid icon",
  },
  {
    img: "/avatars/black-boy-icon.png",
    alt: "Black boy pirate kid icon",
  },
  {
    img: "/avatars/black-girl-icon.png",
    alt: "Black girl pirate kid icon",
  },
];

export const LEADERBOARD_ICONS: Avatar[] = [
  {
    img: "/avatars/boy-mammoth-icon.png",
    alt: "Boy mammoth",
  },
  {
    img: "/avatars/girl-mammoth-icon.png",
    alt: "Girl mammoth",
  },
  {
    img: "/avatars/rainbow-mammoth-icon.png",
    alt: "Rainbow mammoth",
  },
  {
    img: "/avatars/white-boy-icon.png",
    alt: "White boy pirate kid",
  },
  {
    img: "/avatars/white-girl-icon.png",
    alt: "White girl pirate kid",
  },
  {
    img: "/avatars/black-boy-icon.png",
    alt: "Black boy pirate kid",
  },
  {
    img: "/avatars/black-girl-icon.png",
    alt: "Black girl pirate kid",
  },
];

export const GRID = Array.from({length: 70}).fill(Date.now()) as number[];
