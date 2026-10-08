import { tr, type Dictionary } from "./tr";
import { en } from "./en";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
export type { Dictionary };
