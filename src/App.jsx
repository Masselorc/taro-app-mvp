import { useEffect, useMemo, useState } from "react";
import TarotCard from "./components/TarotCard.jsx";
import { DIRECT_MODE_DESCRIPTION, DIRECT_MODE_LABEL } from "./data/directMode.js";
import { MOODS, NEEDS } from "./data/readingContext.js";
import { TAROT_DECK } from "./data/tarotDeck.js";
import {
  buildCardAdvice,
  buildFinalAdvice,
  buildReadingOpening,
  buildReflection,
  buildSynthesis,
  interpretCard
} from "./services/readingEngine.js";

const THEMES = [
  {
    id: "geral",
    label: "Leitura geral",
    helper: "Para entender o clima do momento.",
    detail: "Use quando você quer uma visão ampla sobre sua fase atual, sem focar em uma área específica.",
    icon: "✦"
  },
  {
    id: "amor",
    label: "Amor",
    helper: "Para vínculos, sentimentos e relações.",
    detail: "Use para observar sua postura afetiva, a dinâmica da relação e o que precisa de mais clareza emocional.",
    icon: "♡"
  },
  {
    id: "trabalho",
    label: "Trabalho",
    helper: "Para carreira, rotina e postura profissional.",
    detail: "Use para refletir sobre direção profissional, desafios, reconhecimento, estratégia e próximos passos.",
    icon: "♜"
  },
  {
    id: "decisao",
    label: "Decisão",
    helper: "Para comparar caminhos possíveis.",
    detail: "Use quando existem duas possibilidades em aberto e você quer enxergar melhor o peso simbólico de cada caminho.",
    icon: "⚖"
  },
  {
    id: "espiritualidade",
    label: "Espiritualidade",
    helper: "Para sentido, intuição e recolhimento.",
    detail: "Use para observar sua escuta interior, seus valores, sua energia espiritual e o que pede mais presença.",
    icon: "☾"
  },
  {
    id: "dinheiro",
    label: "Dinheiro",
    helper: "Para recursos, prudência e estabilidade.",
    detail: "Use para refletir sobre organização, cautela, risco, segurança e relação com recursos materiais.",
    icon: "◈"
  },
  {
    id: "autocuidado",
    label: "Autocuidado",
    helper: "Para equilíbrio, descanso e atenção a si.",
    detail: "Use para observar sua energia, seus limites e o tipo de cuidado que pode estar precisando de atenção.",
    icon: "✿"
  }
];

const SPREADS = [
  {
    id: "single",
    label: "Carta única",
    cards: "1 carta",
    positions: ["Conselho central"],
    summary: "Uma resposta simples e direta.",
    bestFor: "Boa para quando você quer uma orientação rápida, sem aprofundar muito.",
    implication: "A leitura fica mais objetiva, mas também menos detalhada. Ela aponta uma energia principal."
  },
  {
    id: "three",
    label: "Situação, Desafio e Conselho",
    cards: "3 cartas",
    positions: ["Situação atual", "Desafio", "Conselho"],
    summary: "A tiragem mais equilibrada para a maioria dos temas.",
    bestFor: "Boa para entender o que está acontecendo, qual é o ponto de tensão e que postura pode ajudar.",
    implication: "A leitura ganha mais contexto do que a carta única, sem ficar longa demais."
  },
  {
    id: "time",
    label: "Influência, Presente e Tendência",
    cards: "3 cartas",
    positions: ["Influência anterior", "Momento presente", "Tendência"],
    summary: "Mostra o movimento da situação ao longo do tempo.",
    bestFor: "Boa para perceber de onde a energia vem, como aparece agora e para onde pode caminhar.",
    implication: "Ajuda a enxergar processo, mas a tendência não deve ser lida como destino fixo."
  },
  {
    id: "relationship",
    label: "Você, o Outro e a Dinâmica",
    cards: "3 cartas",
    positions: ["Sua postura", "Energia percebida da outra parte", "Dinâmica entre vocês"],
    summary: "Focada em relações e vínculos.",
    bestFor: "Boa para temas afetivos, familiares ou relacionais, sem afirmar sentimentos de terceiros como certeza.",
    implication: "Mostra a dinâmica simbólica da relação e ajuda a refletir sobre limites, postura e comunicação."
  },
  {
    id: "choice",
    label: "Caminho A, Caminho B e Conselho",
    cards: "3 cartas",
    positions: ["Caminho A", "Caminho B", "Conselho para decidir"],
    summary: "Compara duas possibilidades.",
    bestFor: "Boa quando você precisa escolher entre dois caminhos e quer refletir sobre cada alternativa.",
    implication: "A leitura não decide por você. Ela organiza simbolicamente os pontos de atenção de cada opção."
  },
  {
    id: "cross",
    label: "Cruz simples",
    cards: "5 cartas",
    positions: ["Situação atual", "Obstáculo", "Base da questão", "Orientação", "Tendência ou síntese"],
    summary: "Uma leitura mais completa e profunda.",
    bestFor: "Boa para temas complexos, repetitivos ou quando você quer mais camadas de interpretação.",
    implication: "A leitura fica mais rica, mas também mais longa. Ela mostra contexto, bloqueio, raiz, orientação e tendência."
  }
];

const RECOMMENDED_SPREAD_BY_THEME = {
  geral: "three",
  amor: "relationship",
  trabalho: "three",
  decisao: "choice",
  espiritualidade: "time",
  dinheiro: "three",
  autocuidado: "three"
};

function getThemeWarning(theme) {
  if (theme === "dinheiro") {
    return "Esta leitura não substitui orientação financeira. Use as cartas como apoio reflexivo sobre prudência, risco, organização e planejamento.";
  }

  if (theme === "autocuidado") {
    return "Esta leitura não substitui cuidado médico, psicológico ou profissional. Use as cartas como apoio simbólico para observar equilíbrio, descanso e atenção a si.";
  }

  return "";
}

function shuffle(cards) {
  const deck = [...cards];
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function Paragraphs({ text }) {
  return String(text || "")
    .split("\n\n")
    .filter(Boolean)
    .map((paragraph) => (
      <p key={paragraph.slice(0, 50)} className="mt-3 leading-relaxed text-slate-300">
        {paragraph}
      </p>
    ));
}

export default function TarotApp() {
  const [step, setStep] = useState("home");
  const [themeIndex, setThemeIndex] = useState(0);
  const [moodIndex, setMoodIndex] = useState(0);
  const [needIndex, setNeedIndex] = useState(0);
  const [readingMode, setReadingMode] = useState("normal");
  const [reading, setReading] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [step]);

  const selectedTheme = THEMES[themeIndex];
  const selectedMood = MOODS[moodIndex];
  const selectedNeed = NEEDS[needIndex];
  const isDirectMode = readingMode === "direct";

  const orderedSpreads = useMemo(() => {
    const recommendedId = RECOMMENDED_SPREAD_BY_THEME[selectedTheme.id] || "three";
    const recommended = SPREADS.find((spread) => spread.id === recommendedId);
    return [recommended, ...SPREADS.filter((spread) => spread.id !== recommendedId)].filter(Boolean);
  }, [selectedTheme.id]);

  function selectTheme(index) {
    setThemeIndex(index);
    setStep("mood");
  }

  function selectMood(index) {
    setMoodIndex(index);
    setStep("need");
  }

  function selectNeed(index) {
    setNeedIndex(index);
    setStep("spread");
  }

  function createReading(spread) {
    const warning = getThemeWarning(selectedTheme.id);
    const cards = shuffle(TAROT_DECK).slice(0, spread.positions.length).map((card, index) => {
      const position = spread.positions[index];
      return {
        ...card,
        position,
        text: interpretCard({ card, position, theme: selectedTheme, mood: selectedMood, need: selectedNeed, spread, readingMode }),
        personalAdvice: buildCardAdvice({ card, position, theme: selectedTheme, mood: selectedMood, need: selectedNeed, spread, readingMode })
      };
    });

    const nextReading = {
      id: crypto.randomUUID(),
      createdAt: new Date().toLocaleString("pt-BR"),
      theme: selectedTheme.id,
      themeLabel: selectedTheme.label,
      mood: selectedMood,
      need: selectedNeed,
      readingMode,
      spread,
      warning,
      cards,
      opening: buildReadingOpening({ theme: selectedTheme, mood: selectedMood, need: selectedNeed, spread, readingMode }),
      synthesis: buildSynthesis({ cards, theme: selectedTheme, mood: selectedMood, need: selectedNeed, readingMode }),
      advice: buildFinalAdvice({ cards, theme: selectedTheme, mood: selectedMood, need: selectedNeed, readingMode }),
      reflection: buildReflection({ theme: selectedTheme, mood: selectedMood, need: selectedNeed, readingMode })
    };
    setReading(nextReading);
    setStep("result");
  }

  function startOver() {
    setReading(null);
    setStep("home");
  }

  function renderModeToggle() {
    return (
      <div className={`mx-auto mt-7 max-w-2xl rounded-3xl border p-4 text-left ${isDirectMode ? "border-amber-300/50 bg-amber-300/10" : "border-white/10 bg-slate-950/70"}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-100">Modo da leitura</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-50">{isDirectMode ? DIRECT_MODE_LABEL : "Modo Reflexivo"}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {isDirectMode ? DIRECT_MODE_DESCRIPTION : "Leitura mais analítica, simbólica e acolhedora, com orientação gradual."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setReadingMode((current) => current === "direct" ? "normal" : "direct")}
            className={`rounded-2xl px-5 py-3 font-semibold transition ${isDirectMode ? "bg-amber-300 text-slate-950 hover:bg-amber-200" : "bg-violet-400 text-slate-950 hover:bg-violet-300"}`}
          >
            {isDirectMode ? "Desativar modo direto" : "Ativar modo direto"}
          </button>
        </div>
      </div>
    );
  }

  function renderHome() {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-violet-500/20 bg-slate-900/70 p-6 text-center shadow-2xl shadow-violet-950/30 md:p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Tarô - Leitura de Cartas</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Escolha sua leitura</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-300">
          Você será guiado passo a passo: tema, estado atual, necessidade principal, tiragem e resultado final.
        </p>
        <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
          {["☾", "✦", "☀"].map((symbol) => (
            <div key={symbol} className="flex aspect-[2/3] items-center justify-center rounded-3xl border border-amber-100/40 bg-slate-950 text-4xl text-amber-100 shadow-xl shadow-violet-950/40">
              {symbol}
            </div>
          ))}
        </div>
        {renderModeToggle()}
        <button onClick={() => setStep("theme")} className="mt-8 rounded-2xl bg-violet-400 px-8 py-4 font-semibold text-slate-950 transition hover:bg-violet-300">
          Começar leitura
        </button>
      </section>
    );
  }

  function renderThemeSelection() {
    return (
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 md:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Etapa 1 de 5</p>
        <h2 className="mt-3 text-3xl font-semibold">Escolha a temática</h2>
        <p className="mt-2 text-slate-300">Todos os temas aparecem abaixo. Toque na área que combina melhor com a leitura que você deseja fazer.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((theme, index) => (
            <button
              key={theme.id}
              onClick={() => selectTheme(index)}
              className="group min-h-[230px] rounded-[1.7rem] border border-white/10 bg-slate-950/80 p-5 text-left shadow-xl shadow-slate-950/30 transition hover:-translate-y-1 hover:border-violet-300/70 hover:bg-violet-950/30 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-100/40 bg-violet-300/10 text-3xl text-amber-100 transition group-hover:scale-105">
                {theme.icon}
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-slate-50">{theme.label}</h3>
              <p className="mt-2 text-sm font-medium text-violet-100">{theme.helper}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{theme.detail}</p>
              <span className="mt-5 inline-flex rounded-full border border-violet-200/30 bg-violet-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-100">
                Selecionar
              </span>
            </button>
          ))}
        </div>

        <button onClick={() => setStep("home")} className="mt-6 text-sm text-slate-400 underline-offset-4 hover:text-slate-200 hover:underline">
          Voltar ao início
        </button>
      </section>
    );
  }

  function renderMoodSelection() {
    return (
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 md:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Etapa 2 de 5</p>
        <h2 className="mt-3 text-3xl font-semibold">Como você chega para esta leitura?</h2>
        <p className="mt-2 text-slate-300">Essa escolha ajuda a deixar o resultado mais pessoal. Ela informa o tom emocional com que as cartas serão interpretadas.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOODS.map((mood, index) => (
            <button
              key={mood.id}
              onClick={() => selectMood(index)}
              className="group min-h-[220px] rounded-[1.7rem] border border-white/10 bg-slate-950/80 p-5 text-left shadow-xl shadow-slate-950/30 transition hover:-translate-y-1 hover:border-violet-300/70 hover:bg-violet-950/30 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-100/40 bg-violet-300/10 text-3xl text-amber-100 transition group-hover:scale-105">
                {mood.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-50">{mood.label}</h3>
              <p className="mt-2 text-sm font-medium text-violet-100">{mood.helper}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{mood.detail}</p>
            </button>
          ))}
        </div>

        <button onClick={() => setStep("theme")} className="mt-6 text-sm text-slate-400 underline-offset-4 hover:text-slate-200 hover:underline">
          Voltar para a temática
        </button>
      </section>
    );
  }

  function renderNeedSelection() {
    return (
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 md:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Etapa 3 de 5</p>
        <h2 className="mt-3 text-3xl font-semibold">O que você mais precisa agora?</h2>
        <p className="mt-2 text-slate-300">Essa escolha direciona a leitura. As cartas serão interpretadas considerando o tipo de resposta que você procura.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NEEDS.map((need, index) => (
            <button
              key={need.id}
              onClick={() => selectNeed(index)}
              className="group min-h-[220px] rounded-[1.7rem] border border-white/10 bg-slate-950/80 p-5 text-left shadow-xl shadow-slate-950/30 transition hover:-translate-y-1 hover:border-violet-300/70 hover:bg-violet-950/30 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-100/40 bg-violet-300/10 text-3xl text-amber-100 transition group-hover:scale-105">
                {need.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-50">{need.label}</h3>
              <p className="mt-2 text-sm font-medium text-violet-100">{need.helper}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{need.detail}</p>
            </button>
          ))}
        </div>

        <button onClick={() => setStep("mood")} className="mt-6 text-sm text-slate-400 underline-offset-4 hover:text-slate-200 hover:underline">
          Voltar para o estado atual
        </button>
      </section>
    );
  }

  function renderSpreadSelection() {
    return (
      <section className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 md:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Etapa 4 de 5</p>
        <h2 className="mt-3 text-3xl font-semibold">Escolha a tiragem</h2>
        <p className="mt-2 text-slate-300">
          Tema: <span className="font-semibold text-violet-100">{selectedTheme.label}</span>. Estado: <span className="font-semibold text-violet-100">{selectedMood.label}</span>. Busca: <span className="font-semibold text-violet-100">{selectedNeed.label}</span>.
        </p>
        {isDirectMode && <p className="mt-2 text-sm font-semibold text-amber-100">{DIRECT_MODE_LABEL} ativado: a leitura será mais firme e sem rodeios.</p>}

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {orderedSpreads.map((spread) => {
            const isRecommended = spread.id === RECOMMENDED_SPREAD_BY_THEME[selectedTheme.id];

            return (
              <button
                key={spread.id}
                onClick={() => createReading(spread)}
                className="group flex min-h-[360px] flex-col rounded-[1.7rem] border border-white/10 bg-slate-950/80 p-5 text-left shadow-xl shadow-slate-950/30 transition hover:-translate-y-1 hover:border-violet-300/70 hover:bg-violet-950/30 focus:outline-none focus:ring-2 focus:ring-violet-300"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-amber-100/30 bg-amber-100/10 px-3 py-1 text-sm font-semibold text-amber-100">{spread.cards}</span>
                  {isRecommended && <span className="rounded-full border border-violet-200/30 bg-violet-300/10 px-3 py-1 text-sm font-semibold text-violet-100">Recomendada para este tema</span>}
                </div>

                <h3 className="mt-5 text-2xl font-semibold text-slate-50">{spread.label}</h3>
                <p className="mt-3 text-base font-medium text-violet-100">{spread.summary}</p>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <h4 className="font-semibold text-amber-100">Quando escolher</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{spread.bestFor}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <h4 className="font-semibold text-amber-100">O que isso muda</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{spread.implication}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-violet-200/20 bg-violet-300/10 p-4">
                  <h4 className="font-semibold text-violet-100">Posições das cartas</h4>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {spread.positions.map((position, index) => (
                      <div key={position} className="rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">
                        {index + 1}. {position}
                      </div>
                    ))}
                  </div>
                </div>

                <span className="mt-auto inline-flex w-fit rounded-full border border-violet-200/30 bg-violet-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-100">
                  Escolher esta tiragem
                </span>
              </button>
            );
          })}
        </div>

        <button onClick={() => setStep("need")} className="mt-6 text-sm text-slate-400 underline-offset-4 hover:text-slate-200 hover:underline">
          Voltar para a necessidade principal
        </button>
      </section>
    );
  }

  function renderResult() {
    if (!reading) return renderHome();

    const resultDirectMode = reading.readingMode === "direct";

    return (
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 md:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Etapa 5 de 5</p>
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Resultado da leitura</h2>
            <p className="mt-2 text-slate-300">Tema: {reading.themeLabel}</p>
            <p className="mt-1 text-slate-300">Estado: {reading.mood.label}</p>
            <p className="mt-1 text-slate-300">Busca: {reading.need.label}</p>
            <p className="mt-1 text-slate-300">Tiragem: {reading.spread.label}</p>
            <p className="mt-1 text-slate-300">Modo: {resultDirectMode ? DIRECT_MODE_LABEL : "Reflexivo"}</p>
            <p className="mt-1 text-sm text-slate-400">{reading.createdAt}</p>
          </div>
          <button onClick={startOver} className="rounded-2xl border border-white/10 bg-slate-950 px-5 py-3 font-medium text-slate-100 hover:border-violet-300/70">
            Nova leitura
          </button>
        </div>

        {reading.warning && <div className="mt-5 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-amber-100">{reading.warning}</div>}
        {resultDirectMode && <div className="mt-5 rounded-2xl border border-amber-300/40 bg-amber-300/10 p-4 text-amber-100">Modo Direto ativado: leitura mais firme, crua e sem rodeios, mantendo prudência em temas sensíveis.</div>}

        <section className={`mt-6 rounded-2xl border p-5 ${resultDirectMode ? "border-amber-100/30 bg-amber-100/10" : "border-amber-100/20 bg-amber-100/10"}`}>
          <h3 className="font-semibold text-amber-100">Abertura da leitura</h3>
          <Paragraphs text={reading.opening} />
        </section>

        <div className="mt-6 grid gap-5">
          {reading.cards.map((card) => <TarotCard key={`${card.name}-${card.position}`} card={card} />)}
        </div>

        <section className="mt-5 rounded-2xl border border-violet-300/20 bg-violet-300/10 p-5">
          <h3 className="font-semibold text-violet-100">Padrão central da leitura</h3>
          <Paragraphs text={reading.synthesis} />
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
          <h3 className="font-semibold">Conselho final</h3>
          <Paragraphs text={reading.advice} />
        </section>

        <section className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
          <h3 className="font-semibold">Pergunta para reflexão</h3>
          <p className="mt-2 leading-relaxed text-slate-300">{reading.reflection}</p>
        </section>
      </section>
    );
  }

  function renderCurrentStep() {
    if (step === "theme") return renderThemeSelection();
    if (step === "mood") return renderMoodSelection();
    if (step === "need") return renderNeedSelection();
    if (step === "spread") return renderSpreadSelection();
    if (step === "result") return renderResult();
    return renderHome();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:px-8">
        {renderCurrentStep()}

        <p className="text-center text-xs text-slate-500">
          Imagens das cartas: baralho Rider-Waite-Smith, via Wikimedia Commons.
        </p>
      </section>
    </main>
  );
}
