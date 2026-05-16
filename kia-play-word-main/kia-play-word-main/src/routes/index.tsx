import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "홈 · 키아쌤의 읽어봐요 미니게임월드" },
      { name: "description", content: "난독증 아동을 위한 한글 파닉스 미니게임 — 음운 인식, 자소-음소 대응, 음절 조합을 연습해요." },
    ],
  }),
  component: Home,
});

const features = [
  { title: "음운 인식", desc: "단어 안의 소리를 듣고 구별하는 연습이에요.", emoji: "👂", bg: "bg-mint" },
  { title: "자소-음소 대응", desc: "글자와 소리를 연결하는 연습이에요.", emoji: "🔤", bg: "bg-sky" },
  { title: "음절 조합", desc: "자음과 모음을 합쳐 음절을 만드는 연습이에요.", emoji: "🧩", bg: "bg-apricot" },
];

const steps = [
  { n: 1, title: "연습 선택", desc: "음운 인식, 자소-음소 대응, 음절 조합 중 하나를 골라요.", emoji: "📚" },
  { n: 2, title: "난이도 선택", desc: "1단계 새싹부터 5단계 열매까지 선택해요.", emoji: "🌱" },
  { n: 3, title: "문제 수 선택", desc: "5문제부터 50문제까지 5의 배수로 선택해요.", emoji: "✏️" },
  { n: 4, title: "미니게임 시작", desc: "문제를 풀고 정답 피드백과 결과를 확인해요.", emoji: "🎮" },
];

function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-cream border-2 border-foreground text-sm font-bold">
              🐥 한글 파닉스 미니게임
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              키아쌤의 <br className="hidden sm:block" />
              <span className="bg-mint px-2 rounded-2xl">읽어봐요</span> 미니게임월드
            </h1>
            <p className="mt-5 text-lg sm:text-xl font-bold">
              난독증 아동을 위한 한글 파닉스 미니게임 연습
            </p>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">
              소리를 듣고, 글자를 보고, 음절을 조합하며 읽기의 기초를 차근차근 연습해요.
            </p>
            <p className="mt-2 text-base sm:text-lg text-muted-foreground">
              음운 인식, 자소-음소 대응, 음절 조합을 아이의 수준에 맞게 선택하고 짧은 미니게임처럼 반복 연습할 수 있어요.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/practice" className="btn-pop bg-primary text-primary-foreground text-lg">
                연습 시작하기 →
              </Link>
              <Link to="/about" className="btn-pop bg-cream text-lg">
                활동 설명 보기
              </Link>
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            <div className="absolute -top-6 -left-4 text-5xl">⭐</div>
            <div className="absolute -bottom-4 -right-2 text-5xl">☁️</div>
            <div className="absolute top-1/2 -right-6 text-4xl">📖</div>
            <div className="card-soft p-8 sm:p-10 bg-cream/60">
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                오늘의 읽기 미션
              </p>
              <div className="mt-4 rounded-3xl bg-background border-2 border-foreground p-8 text-center shadow-soft">
                <div className="text-6xl sm:text-7xl font-bold">ㄱ + ㅏ = ?</div>
                <p className="mt-4 text-lg text-muted-foreground">소리를 합쳐 볼까요?</p>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {["가", "나", "다", "마"].map((c, i) => (
                  <div
                    key={c}
                    className={`relative text-center py-3 rounded-2xl border-2 border-foreground text-2xl font-bold ${i === 0 ? "bg-mint" : "bg-background"}`}
                  >
                    {c}
                    {i === 0 && <span className="chip-check">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">무엇을 연습하나요?</h2>
        <p className="text-center text-muted-foreground mt-2">아이의 읽기 기초를 세 가지 영역으로 나눠 연습해요.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className={`card-soft p-7 ${f.bg}/50`}>
              <div className="text-5xl">{f.emoji}</div>
              <h3 className="mt-3 text-2xl font-bold">{f.title}</h3>
              <p className="mt-2 text-base">{f.desc}</p>
              <Link to="/about" className="btn-pop inline-block mt-5 bg-background text-base">
                자세히 보기
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">어떻게 사용하나요?</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="card-soft p-6 bg-background relative">
              <span className="absolute -top-4 -left-3 h-10 w-10 rounded-full bg-apricot border-2 border-foreground flex items-center justify-center font-bold text-lg">
                {s.n}
              </span>
              <div className="text-4xl">{s.emoji}</div>
              <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/practice" className="btn-pop bg-primary text-lg inline-block">
            지금 연습 시작하기 →
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="card-soft p-8 sm:p-12 bg-sky/40 text-center">
          <div className="text-5xl">💌</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">문의하기</h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            아이의 읽기 어려움이나 학습 상담이 필요하다면 문의해 주세요.
          </p>
          <a href="mailto:example@example.com" className="btn-pop inline-block mt-6 bg-apricot text-lg">
            상담 문의하기
          </a>
        </div>
      </section>
    </Layout>
  );
}
