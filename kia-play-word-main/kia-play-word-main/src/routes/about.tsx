import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "활동 설명 · 키아쌤의 읽어봐요" },
      { name: "description", content: "음운 인식, 자소-음소 대응, 음절 조합 활동에 대한 자세한 설명과 부모 안내." },
    ],
  }),
  component: About,
});

const cards = [
  {
    title: "음운 인식",
    emoji: "👂",
    bg: "bg-mint/50",
    desc: "단어 안의 소리를 듣고 구별하는 힘입니다. 글자를 읽기 전에 말소리를 알아차리는 연습을 합니다.",
    example: "사과와 첫소리가 같은 단어를 찾아요.",
    parent: "정답보다 아이가 어떤 소리를 들었는지 관찰해 주세요.",
  },
  {
    title: "자소-음소 대응",
    emoji: "🔤",
    bg: "bg-sky/50",
    desc: "글자와 소리를 연결하는 능력입니다. 한글 자모를 보고 어떤 소리가 나는지 익힙니다.",
    example: "ㄱ을 보고 /그/ 소리와 연결해요.",
    parent: "비슷한 글자를 헷갈려하면 글자 모양과 소리를 함께 비교해 주세요.",
  },
  {
    title: "음절 조합",
    emoji: "🧩",
    bg: "bg-apricot/50",
    desc: "자음과 모음을 합쳐 하나의 음절로 읽는 연습입니다. CV, CVV, CVCV, CVC 구조를 단계적으로 연습합니다.",
    example: "ㄱ + ㅏ = 가",
    parent: "글자를 하나씩 읽은 뒤 천천히 합쳐서 읽도록 도와주세요.",
  },
];

function About() {
  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">활동 설명</h1>
        <p className="mt-4 text-center text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          각 활동은 난독증 아동의 읽기 기초 능력을 차근차근 키우기 위해 구성되어 있어요.
        </p>

        <div className="mt-10 grid gap-6">
          {cards.map((c) => (
            <article key={c.title} className={`card-soft p-7 sm:p-9 ${c.bg}`}>
              <div className="flex items-start gap-4">
                <div className="text-5xl">{c.emoji}</div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold">{c.title}</h2>
                  <p className="mt-2 text-base sm:text-lg">{c.desc}</p>
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-background border-2 border-foreground p-4">
                      <p className="text-xs font-bold uppercase text-muted-foreground">예시</p>
                      <p className="mt-1 text-lg">{c.example}</p>
                    </div>
                    <div className="rounded-2xl bg-cream/70 border-2 border-foreground p-4">
                      <p className="text-xs font-bold uppercase text-muted-foreground">부모 안내</p>
                      <p className="mt-1 text-lg">{c.parent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/practice" className="btn-pop bg-primary text-lg">연습 시작하기 →</Link>
          <Link to="/" className="btn-pop bg-cream text-lg">메인으로 돌아가기</Link>
        </div>
      </section>
    </Layout>
  );
}
