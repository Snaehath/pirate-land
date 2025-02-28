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
  playerId: string;
  wins: number;
  totalPlayed: number;
};

export type Island = {
  id: string;
  chance: string;
  creator: string;
  creatorPayed: boolean | null;
  invitee: string | null;
  inviteePayed: boolean | null;
  status: "CREATED" | "READY" | "STARTED" | "ENDED";
};

export type Message = {
  id: string;
  message: string;
  sender: string;
};

export type Scorecard = {
  creator: string;
  invitee: string;
  creator_score: string;
  invitee_score: string;
};

export type History = {
  id: string;
  opponent: string;
  status: "WON" | "LOST";
  island_id: string;
};
