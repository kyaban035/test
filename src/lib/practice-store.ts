import type { PracticeType } from "./practice-data";

export type Selection = {
  type: PracticeType;
  level: number;
  count: number;
};

export type Result = {
  correct: number;
  total: number;
  type: PracticeType;
  level: number;
};

const SEL_KEY = "kia_selection";
const RES_KEY = "kia_result";

export const defaultSelection: Selection = { type: "phoneme", level: 1, count: 10 };

export function loadSelection(): Selection {
  if (typeof window === "undefined") return defaultSelection;
  try {
    const raw = sessionStorage.getItem(SEL_KEY);
    if (!raw) return defaultSelection;
    return { ...defaultSelection, ...JSON.parse(raw) };
  } catch {
    return defaultSelection;
  }
}

export function saveSelection(s: Selection) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SEL_KEY, JSON.stringify(s));
}

export function saveResult(r: Result) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(RES_KEY, JSON.stringify(r));
}

export function loadResult(): Result | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(RES_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
