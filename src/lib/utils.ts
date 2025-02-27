import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import confetti, { Options } from "canvas-confetti";

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

export const playAudio = (source: string, volume?: number) => {
  const audio = new Audio(source);
  audio.volume = volume ?? 0.3;
  audio.play();
};

const count = 420;
const defaults = {
  origin: { y: 0.7 }
};

const fire = (particleRatio: number, options: Options) => {
  confetti(Object.assign({}, defaults, options, {
    particleCount: Math.floor(count * particleRatio)
  }));
};

export const celeberate = () => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

