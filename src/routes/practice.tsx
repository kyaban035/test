import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PRACTICE_TYPES, LEVELS, COUNTS, getTypeMeta, getLevelMeta, type PracticeType } from "@/lib/practice-data";
import { defaultSelection, loadSelection, saveSelection } from "@/lib/practice-store";
import { Check } from "lucide-react";
import { VerticalSlider } from "@/components/VerticalSlider";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "연습 선택 · 키아쌤의 읽어봐요" },
      { name: "description", content: "연습 유형, 난이도, 문제 수를 선택하고 한글 파닉스 미니게임을 시작해요." },
    ],
  }),
  component: PracticeSelect,
});

function SelectableCard({
  selected,
  onClick,
  children,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative text-left card-soft p-5 transition-all w-full ${
        selected ? "ring-4 ring-primary border-foreground bg-mint/70" : "bg-background hover:bg-muted"
      } ${className}`}
    >
      {selected && (
        <span className="chip-check">
          <Check size={16} strokeWidth={3} />
        </span>
      )}
      {children}
    </button>
  );
}

function PracticeSelect() {
  const navigate = useNavigate();
  const [sel, setSel] = useState(defaultSelection);

  useEffect(() => {
    setSel(loadSelection());
  }, []);

  const update = (patch: Partial<typeof sel>) => setSel((s) => ({ ...s, ...patch }));

  const start = () => {
    saveSelection(sel);
    navigate({ to: "/practice/play" });
  };

  const typeMeta = getTypeMeta(sel.type);
  const levelMeta = getLevelMeta(sel.level);

  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-center">오늘의 읽기 미션을 골라요</h1>
        <p className="mt-3 text-center text-base sm:text-lg text-muted-foreground">
          연습할 활동, 난이도, 문제 수를 선택해 주세요.
        </p>

        {/* Type */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="inline-flex h-8 w-8 rounded-full bg-apricot border-2 border-foreground items-center justify-center text-sm">1</span>
            연습 유형 선택
          </h2>
          <div className="mt-4 grid sm:grid-cols-3 gap-4">
            {PRACTICE_TYPES.map((t) => (
              <SelectableCard
                key={t.id}
                selected={sel.type === t.id}
                onClick={() => update({ type: t.id as PracticeType })}
              >
                <div className="text-4xl">{t.emoji}</div>
                <h3 className="mt-2 text-xl font-bold">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </SelectableCard>
            ))}
          </div>
        </div>

        {/* Level */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="inline-flex h-8 w-8 rounded-full bg-apricot border-2 border-foreground items-center justify-center text-sm">2</span>
            난이도 선택
          </h2>
          <p className="mt-2 text-sm text-muted-foreground text-center sm:text-left">위/아래로 드래그해서 난이도를 골라요.</p>
          <div className="mt-4 flex justify-center">
            <VerticalSlider
              ariaLabel="난이도"
              accent="bg-mint"
              value={sel.level}
              onChange={(v) => update({ level: v })}
              options={LEVELS.map((l) => ({ value: l.id, label: `${l.emoji} ${l.name}` }))}
            />
          </div>
        </div>

        {/* Count */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="inline-flex h-8 w-8 rounded-full bg-apricot border-2 border-foreground items-center justify-center text-sm">3</span>
            문제 수 선택
          </h2>
          <p className="mt-2 text-sm text-muted-foreground text-center sm:text-left">위/아래로 드래그해서 문제 수를 골라요.</p>
          <div className="mt-4 flex justify-center">
            <VerticalSlider
              ariaLabel="문제 수"
              accent="bg-sky"
              value={sel.count}
              onChange={(v) => update({ count: v })}
              options={COUNTS.map((c) => ({ value: c, label: `${c}문제` }))}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="card-soft mt-10 p-6 sm:p-8 bg-cream/60">
          <h3 className="text-xl font-bold">선택한 내용</h3>
          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-background border-2 border-foreground p-4">
              <p className="text-xs uppercase text-muted-foreground font-bold">연습 유형</p>
              <p className="text-lg mt-1">{typeMeta.emoji} {typeMeta.title}</p>
            </div>
            <div className="rounded-2xl bg-background border-2 border-foreground p-4">
              <p className="text-xs uppercase text-muted-foreground font-bold">난이도</p>
              <p className="text-lg mt-1">{levelMeta.emoji} {levelMeta.name}</p>
            </div>
            <div className="rounded-2xl bg-background border-2 border-foreground p-4">
              <p className="text-xs uppercase text-muted-foreground font-bold">문제 수</p>
              <p className="text-lg mt-1">✏️ {sel.count}문제</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={start} className="btn-pop bg-primary text-lg">연습 시작하기 →</button>
          <Link to="/about" className="btn-pop bg-cream text-lg">활동 설명 보기</Link>
          <Link to="/" className="btn-pop bg-background text-lg">되돌아가기</Link>
        </div>
      </section>
    </Layout>
  );
}
