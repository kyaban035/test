import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Star } from "lucide-react";
import { getLevelMeta, getTypeMeta } from "@/lib/practice-data";
import { loadResult, type Result } from "@/lib/practice-store";

export const Route = createFileRoute("/practice_/result")({
  head: () => ({ meta: [{ title: "결과 · 키아쌤의 읽어봐요" }] }),
  component: ResultPage,
});

function starsFor(rate: number) {
  if (rate >= 0.8) return 5;
  if (rate >= 0.6) return 4;
  if (rate >= 0.4) return 3;
  return 2;
}

function ResultPage() {
  const navigate = useNavigate();
  const [res, setRes] = useState<Result | null>(null);

  useEffect(() => {
    const r = loadResult();
    if (!r) navigate({ to: "/practice" });
    else setRes(r);
  }, [navigate]);

  if (!res) return null;

  const rate = res.correct / res.total;
  const stars = starsFor(rate);
  const typeMeta = getTypeMeta(res.type);
  const levelMeta = getLevelMeta(res.level);
  const encouragement =
    rate >= 0.8
      ? "소리를 잘 듣고 끝까지 해냈어요!"
      : rate >= 0.4
        ? "꾸준히 연습한 모습이 멋져요! 한 번 더 도전해 봐요."
        : "다음에는 비슷한 글자를 더 천천히 비교해 봐요.";

  return (
    <Layout>
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-center">오늘의 읽기 미션 완료! 🎉</h1>

        <div className="card-soft mt-8 p-8 sm:p-10 bg-mint/40 text-center">
          <p className="text-base text-muted-foreground font-bold">맞힌 개수</p>
          <p className="mt-2 text-6xl sm:text-7xl font-bold">
            {res.correct}<span className="text-3xl text-muted-foreground"> / {res.total}</span>
          </p>

          <div className="mt-6 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={40}
                className={i < stars ? "fill-cream stroke-foreground" : "fill-muted stroke-muted-foreground"}
                strokeWidth={2}
              />
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-left">
            <div className="rounded-2xl bg-background border-2 border-foreground p-4">
              <p className="text-xs uppercase font-bold text-muted-foreground">연습 활동</p>
              <p className="mt-1 text-lg">{typeMeta.emoji} {typeMeta.title}</p>
            </div>
            <div className="rounded-2xl bg-background border-2 border-foreground p-4">
              <p className="text-xs uppercase font-bold text-muted-foreground">난이도</p>
              <p className="mt-1 text-lg">{levelMeta.emoji} {levelMeta.name}</p>
            </div>
            <div className="rounded-2xl bg-background border-2 border-foreground p-4">
              <p className="text-xs uppercase font-bold text-muted-foreground">문제 수</p>
              <p className="mt-1 text-lg">✏️ {res.total}문제</p>
            </div>
          </div>

          <p className="mt-6 text-lg font-bold">🌈 {encouragement}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/practice/play" className="btn-pop bg-primary text-lg">같은 미션 다시 하기</Link>
          <Link to="/practice" className="btn-pop bg-cream text-lg">다른 연습 고르기</Link>
          <Link to="/" className="btn-pop bg-background text-lg">메인으로 돌아가기</Link>
        </div>
      </section>
    </Layout>
  );
}
