export type LanguageCode = "en" | "zh" | "ru" | "ar" | "ta" | "hi";

export type Language = {
  name: string;
  code: LanguageCode;
};

export type User = {
  id: string;
  name: string;
  avatar: number;
};

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "inlinecode"
  | "lead"
  | "large"
  | "small"
  | "muted";

export type Avatar = {
  img: string;
  alt: string;
};

export type LeaderBoard = {
  playerID: string;
  won: number;
  total: number;
};
