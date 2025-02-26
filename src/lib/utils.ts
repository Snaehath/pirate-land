import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => 
  twMerge(clsx(inputs));

export const GREGORIAN_OFFSET = 122_192_928_000_000_000;

export const getTimeInt = (uuid_string: string) => {
  const uuid_array = uuid_string.split("-");
  const time_string = [uuid_array[2].slice(1), uuid_array[1], uuid_array[0]].join("");
  return Number.parseInt(time_string, 16);
};

export const getDateObject = (uuid_string: string) => {
  const int_time = getTimeInt(uuid_string) - GREGORIAN_OFFSET;
  const int_millisec = Math.floor(int_time / 10_000);
  return new Date(int_millisec);
};

