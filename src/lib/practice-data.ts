export type PracticeType = "phoneme" | "grapheme" | "syllable";

export const PRACTICE_TYPES: { id: PracticeType; title: string; desc: string; emoji: string }[] = [
  { id: "phoneme", title: "음운 인식", desc: "소리를 듣고 구별하는 연습", emoji: "👂" },
  { id: "grapheme", title: "자소-음소 대응", desc: "글자와 소리를 연결하는 연습", emoji: "🔤" },
  { id: "syllable", title: "음절 조합", desc: "자음과 모음을 합쳐 읽는 연습", emoji: "🧩" },
];

export const LEVELS = [
  { id: 1, name: "1단계 새싹", emoji: "🌱" },
  { id: 2, name: "2단계 잎새", emoji: "🍃" },
  { id: 3, name: "3단계 꽃봉오리", emoji: "🌷" },
  { id: 4, name: "4단계 꽃피움", emoji: "🌸" },
  { id: 5, name: "5단계 열매", emoji: "🍓" },
];

export const COUNTS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

export type Question = {
  prompt: string;
  stimulus: string;
  choices: string[];
  answer: string;
};

const phonemeBank: Question[] = [
  { prompt: "첫소리가 같은 단어를 고르세요.", stimulus: "🍎 사과", choices: ["수박", "나무", "고양이", "바다"], answer: "수박" },
  { prompt: "첫소리가 같은 단어를 고르세요.", stimulus: "🍌 바나나", choices: ["바지", "사과", "나비", "고기"], answer: "바지" },
  { prompt: "첫소리가 같은 단어를 고르세요.", stimulus: "🐶 강아지", choices: ["가방", "토끼", "오리", "비누"], answer: "가방" },
  { prompt: "끝소리가 같은 단어를 고르세요.", stimulus: "🌙 달", choices: ["별", "물", "산", "꽃"], answer: "물" },
  { prompt: "첫소리가 같은 단어를 고르세요.", stimulus: "🐰 토끼", choices: ["토마토", "사자", "기린", "오이"], answer: "토마토" },
];

const graphemeBank: Question[] = [
  { prompt: "다음 글자의 소리를 고르세요.", stimulus: "ㄱ", choices: ["그", "나", "마", "라"], answer: "그" },
  { prompt: "다음 글자의 소리를 고르세요.", stimulus: "ㅁ", choices: ["마", "나", "가", "라"], answer: "마" },
  { prompt: "다음 글자의 소리를 고르세요.", stimulus: "ㄴ", choices: ["느", "므", "그", "르"], answer: "느" },
  { prompt: "다음 글자의 소리를 고르세요.", stimulus: "ㅅ", choices: ["스", "츠", "트", "크"], answer: "스" },
  { prompt: "다음 모음의 소리를 고르세요.", stimulus: "ㅏ", choices: ["아", "이", "우", "오"], answer: "아" },
];

const syllableBank: Question[] = [
  { prompt: "두 글자를 합치면?", stimulus: "ㄱ + ㅏ = ?", choices: ["가", "나", "다", "마"], answer: "가" },
  { prompt: "두 글자를 합치면?", stimulus: "ㄴ + ㅏ = ?", choices: ["가", "나", "다", "마"], answer: "나" },
  { prompt: "두 글자를 합치면?", stimulus: "ㄷ + ㅏ = ?", choices: ["다", "가", "바", "사"], answer: "다" },
  { prompt: "두 글자를 합치면?", stimulus: "ㅁ + ㅗ = ?", choices: ["모", "보", "고", "노"], answer: "모" },
  { prompt: "두 글자를 합치면?", stimulus: "ㅂ + ㅣ = ?", choices: ["비", "미", "디", "리"], answer: "비" },
  { prompt: "두 글자를 합치면?", stimulus: "ㅅ + ㅜ = ?", choices: ["수", "주", "구", "누"], answer: "수" },
];

export function getBank(type: PracticeType): Question[] {
  if (type === "phoneme") return phonemeBank;
  if (type === "grapheme") return graphemeBank;
  return syllableBank;
}

export function generateQuestions(type: PracticeType, count: number): Question[] {
  const bank = getBank(type);
  const out: Question[] = [];
  for (let i = 0; i < count; i++) {
    const q = bank[i % bank.length];
    // shuffle choices a bit
    const choices = [...q.choices].sort(() => Math.random() - 0.5);
    out.push({ ...q, choices });
  }
  return out;
}

export function getTypeMeta(id: PracticeType) {
  return PRACTICE_TYPES.find((t) => t.id === id)!;
}
export function getLevelMeta(id: number) {
  return LEVELS.find((l) => l.id === id) ?? LEVELS[0];
}
