import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { ArrowLeft, Check } from "lucide-react";
import { generateQuestions, getTypeMeta, type Question } from "@/lib/practice-data";
import { loadSelection, saveResult } from "@/lib/practice-store";

export const Route = createFileRoute("/practice_/play")({
  head: () => ({
    meta: [{ title: "연습 중 · 키아쌤의 읽어봐요" }],
  }),
  component: PlayPage,
});

function PlayPage() {
  const navigate = useNavigate();
  const [sel] = useState(() => loadSelection());
  const questions = useMemo<Question[]>(() => generateQuestions(sel.type, sel.count), [sel]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [scored, setScored] = useState(false);

  const q = questions[idx];
  const typeMeta = getTypeMeta(sel.type);
  const progress = ((idx + (picked ? 1 : 0)) / questions.length) * 100;

  useEffect(() => {
    // ensure session exists
    if (!questions.length) navigate({ to: "/practice" });
  }, [questions.length, navigate]);

  const onPick = (choice: string) => {
    if (picked) return;
    setPicked(choice);
    if (!scored && choice === q.answer) {
      setCorrectCount((c) => c + 1);
      setScored(true);
    } else {
      setScored(true);
    }
  };

  const onRetry = () => {
    setPicked(null);
  };

  const onNext = () => {
    if (idx + 1 >= questions.length) {
      saveResult({
        correct: correctCount,
        total: questions.length,
        type: sel.type,
        level: sel.level,
      });
      navigate({ to: "/practice/result" });
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
    setScored(false);
  };

  if (!q) return null;

  const isCorrect = picked === q.answer;

  return (
    <Layout>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Link to="/practice" className="btn-pop bg-background text-sm inline-flex items-center gap-1">
            <ArrowLeft size={18} /> 되돌아가기
          </Link>
          <div className="text-right">
            <p className="text-sm text-muted-foreground font-bold">{typeMeta.emoji} {typeMeta.title}</p>
            <p className="text-lg font-bold">{idx + 1} / {questions.length}</p>
          </div>
        </div>

        <div className="mt-4 h-4 rounded-full bg-muted border-2 border-foreground overflow-hidden">
          <div
            className="h-full bg-mint transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question card */}
        <div className="card-soft mt-8 p-7 sm:p-10 bg-cream/50">
          <span className="inline-block px-3 py-1 rounded-full bg-background border-2 border-foreground text-sm font-bold">
            오늘의 문제
          </span>
          <h2 className="mt-4 text-xl sm:text-2xl font-bold">{q.prompt}</h2>
          <div className="mt-6 rounded-3xl bg-background border-2 border-foreground p-8 text-center">
            <p className="text-5xl sm:text-6xl font-bold">{q.stimulus}</p>
          </div>

          {/* Choices */}
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {q.choices.map((c) => {
              const isPicked = picked === c;
              const showAnswer = picked && c === q.answer;
              const wrongPick = isPicked && c !== q.answer;
              return (
                <button
                  key={c}
                  onClick={() => onPick(c)}
                  disabled={!!picked}
                  aria-pressed={isPicked}
                  className={`relative btn-pop text-2xl py-5 ${
                    showAnswer ? "bg-mint" : wrongPick ? "bg-apricot" : isPicked ? "bg-sky" : "bg-background"
                  } disabled:opacity-100`}
                >
                  {c}
                  {(isPicked || showAnswer) && (
                    <span className="chip-check">
                      <Check size={16} strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {picked && (
            <div
              className={`mt-6 p-5 rounded-3xl border-2 border-foreground text-lg font-bold text-center ${
                isCorrect ? "bg-mint" : "bg-cream"
              }`}
            >
              {isCorrect
                ? "정답이에요! 🌟 잘했어요."
                : "다시 한 번 볼까요? 🍀 천천히 소리를 합쳐 봐요."}
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={onNext}
              disabled={!picked}
              className="btn-pop bg-primary text-lg disabled:opacity-50"
            >
              {idx + 1 >= questions.length ? "결과 보기 →" : "다음 문제 →"}
            </button>
            <button onClick={onRetry} disabled={!picked || isCorrect} className="btn-pop bg-background text-lg disabled:opacity-50">
              다시 보기
            </button>
            <Link to="/practice" className="btn-pop bg-cream text-lg">
              연습 선택으로 돌아가기
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
