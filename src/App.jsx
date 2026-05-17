import { useMemo, useState } from "react";
import TarotCard from "./components/TarotCard.jsx";
import { TAROT_DECK } from "./data/tarotDeck.js";

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

const THEME_TEXT = {
  geral: "no seu momento atual",
  amor: "na vida afetiva",
  trabalho: "no campo profissional",
  decisao: "diante dessa decisão",
  espiritualidade: "na sua busca de sentido",
  dinheiro: "na relação com recursos e estabilidade",
  autocuidado: "na relação com cuidado e equilíbrio"
};

function normalize(value = "") {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

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

function kindFor(position) {
  const positionText = normalize(position);
  if (positionText.includes("conselho") || positionText.includes("orientacao")) return "advice";
  if (positionText.includes("desafio") || positionText.includes("obstaculo")) return "obstacle";
  if (positionText.includes("tendencia") || positionText.includes("sintese")) return "trend";
  if (positionText.includes("base")) return "shadow";
  return "essential";
}

function sentence(text) {
  const value = String(text || "").trim();
  if (!value) return "";
  const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
  return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

function interpretCard(card, position, theme) {
  const kind = kindFor(position);
  const context = THEME_TEXT[theme] || "na situação consultada";
  const base = sentence(card.simpleExplanation || card.essential);

  if (kind === "advice") {
    return `${base} Como conselho ${context}, a carta pede uma atitude consciente e possível, não uma ordem nem uma previsão fechada.`;
  }

  if (kind === "obstacle") {
    return `${base} Como desafio ${context}, ela mostra um ponto que precisa ser observado com mais calma para evitar repetição ou impulso.`;
  }

  if (kind === "trend") {
    return `${base} Como tendência, ela indica uma direção possível se a situação continuar seguindo o mesmo ritmo.`;
  }

  if (kind === "shadow") {
    return `${base} Na base da questão, ela ajuda a perceber o que pode estar influenciando a situação por trás da aparência imediata.`;
  }

  return `${base} Na posição de “${position}”, esta carta ajuda a entender o que está mais evidente ${context}.`;
}

function buildSynthesis(cards, theme) {
  const majors = cards.filter((card) => card.arcana === "Maior").length;
  const challenging = cards.filter((card) => card.tone === "desafiadora").length;
  const favorable = cards.filter((card) => card.tone === "favorável").length;
  const suits = cards.reduce((acc, card) => {
    if (card.suit) acc[card.suit] = (acc[card.suit] || 0) + 1;
    return acc;
  }, {});
  const mainSuit = Object.entries(suits).sort((a, b) => b[1] - a[1])[0]?.[0];
  const context = THEME_TEXT[theme] || "na situação consultada";
  const parts = [];

  if (majors >= Math.ceil(cards.length / 2)) {
    parts.push("A presença de Arcanos Maiores dá mais peso à leitura e sugere um aprendizado importante neste momento.");
  }
  if (mainSuit) {
    parts.push(`A predominância de ${mainSuit} mostra que esse campo da vida merece atenção especial.`);
  }
  if (challenging && favorable) {
    parts.push("O conjunto mistura tensão e abertura. Há pontos a encarar, mas também recursos para agir com mais clareza.");
  } else if (challenging) {
    parts.push("O conjunto é exigente, mas não fatalista. Ele pede prudência, honestidade e cuidado com reações automáticas.");
  } else if (favorable) {
    parts.push("O conjunto é favorável, mas não deve ser lido como garantia automática. Ele indica abertura quando há ação consciente.");
  }

  parts.push(`Em síntese, as cartas oferecem uma leitura reflexiva ${context}, sem transformar o futuro em certeza.`);
  return parts.join(" ");
}

function reflectiveQuestion(theme) {
  const questions = {
    geral: "O que este momento está pedindo que você enxergue com mais calma?",
    amor: "Que postura preserva melhor sua clareza e seus limites afetivos agora?",
    trabalho: "Qual atitude concreta pode trazer mais consistência ao seu caminho profissional?",
    decisao: "Qual escolha parece mais alinhada com seus valores e condições reais?",
    espiritualidade: "Que prática ou silêncio pode fortalecer sua escuta interior?",
    dinheiro: "Onde prudência e planejamento podem substituir ansiedade por controle?",
    autocuidado: "Que cuidado real você vem adiando e precisa observar com mais atenção?"
  };
  return questions[theme] || questions.geral;
}

function rotateIndex(index, direction, length) {
  return (index + direction + length) % length;
}

export default function TarotApp() {
  const [step, setStep] = useState("home");
  const [themeIndex, setThemeIndex] = useState(0);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [reading, setReading] = useState(null);

  const selectedTheme = THEMES[themeIndex];

  const orderedSpreads = useMemo(() => {
    const recommendedId = RECOMMENDED_SPREAD_BY_THEME[selectedTheme.id] || "three";
    const recommended = SPREADS.find((spread) => spread.id === recommendedId);
    return [recommended, ...SPREADS.filter((spread) => spread.id !== recommendedId)].filter(Boolean);
  }, [selectedTheme.id]);

  const selectedSpread = orderedSpreads[spreadIndex] || orderedSpreads[0];

  function selectTheme(index) {
    setThemeIndex(index);
    setSpreadIndex(0);
    setStep("spread");
  }

  function createReading(spread = selectedSpread) {
    const warning = getThemeWarning(selectedTheme.id);
    const cards = shuffle(TAROT_DECK).slice(0, spread.positions.length).map((card, index) => ({
      ...card,
      position: spread.positions[index],
      text: interpretCard(card, spread.positions[index], selectedTheme.id)
    }));
    const nextReading = {
      id: crypto.randomUUID(),
      createdAt: new Date().toLocaleString("pt-BR"),
      theme: selectedTheme.id,
      themeLabel: selectedTheme.label,
      spread,
      warning,
      cards,
      synthesis: buildSynthesis(cards, selectedTheme.id),
      advice: warning || "Use a leitura como apoio para refletir. Observe o que as cartas destacam, escolha uma atitude possível e evite transformar a mensagem em certeza absoluta.",
      reflection: reflectiveQuestion(selectedTheme.id)
    };
    setReading(nextReading);
    setStep("result");
  }

  function startOver() {
    setReading(null);
    setStep("home");
  }

  function renderHome() {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-violet-500/20 bg-slate-900/70 p-6 text-center shadow-2xl shadow-violet-950/30 md:p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Tarô - Leitura de Cartas</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Escolha sua leitura</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-300">
          Você será guiado passo a passo: primeiro escolhe o tema, depois entende as opções de tiragem e, por fim, revela as cartas.
        </p>
        <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
          {["☾", "✦", "☀"].map((symbol) => (
            <div key={symbol} className="flex aspect-[2/3] items-center justify-center rounded-3xl border border-amber-100/40 bg-slate-950 text-4xl text-amber-100 shadow-xl shadow-violet-950/40">
              {symbol}
            </div>
          ))}
        </div>
        <button onClick={() => setStep("theme")} className="mt-8 rounded-2xl bg-violet-400 px-8 py-4 font-semibold text-slate-950 transition hover:bg-violet-300">
          Começar leitura
        </button>
      </section>
    );
  }

  function renderThemeSelection() {
    return (
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 md:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Etapa 1 de 3</p>
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

  function renderSpreadSelection() {
    const isRecommended = selectedSpread.id === RECOMMENDED_SPREAD_BY_THEME[selectedTheme.id];

    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 md:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Etapa 2 de 3</p>
        <h2 className="mt-3 text-3xl font-semibold">Escolha a tiragem</h2>
        <p className="mt-2 text-slate-300">
          Tema escolhido: <span className="font-semibold text-violet-100">{selectedTheme.label}</span>. Agora escolha quantas cartas e qual tipo de leitura faz mais sentido.
        </p>

        <div className="mt-6 rounded-[2rem] border border-amber-100/20 bg-slate-950/80 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-100/30 bg-amber-100/10 px-3 py-1 text-sm font-semibold text-amber-100">{selectedSpread.cards}</span>
            {isRecommended && <span className="rounded-full border border-violet-200/30 bg-violet-300/10 px-3 py-1 text-sm font-semibold text-violet-100">Recomendada para este tema</span>}
            <span className="text-sm text-slate-400">Tiragem {spreadIndex + 1} de {orderedSpreads.length}</span>
          </div>

          <h3 className="mt-5 text-3xl font-semibold text-slate-50">{selectedSpread.label}</h3>
          <p className="mt-3 text-lg text-violet-100">{selectedSpread.summary}</p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <h4 className="font-semibold text-amber-100">Quando escolher</h4>
              <p className="mt-2 leading-relaxed text-slate-300">{selectedSpread.bestFor}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <h4 className="font-semibold text-amber-100">O que isso muda</h4>
              <p className="mt-2 leading-relaxed text-slate-300">{selectedSpread.implication}</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-violet-200/20 bg-violet-300/10 p-4">
            <h4 className="font-semibold text-violet-100">Posições das cartas</h4>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {selectedSpread.positions.map((position, index) => (
                <div key={position} className="rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">
                  {index + 1}. {position}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <button onClick={() => setSpreadIndex((current) => rotateIndex(current, -1, orderedSpreads.length))} className="rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 font-medium text-slate-100 hover:border-violet-300/70">
            Tiragem anterior
          </button>
          <button onClick={() => createReading(selectedSpread)} className="rounded-2xl bg-violet-400 px-5 py-4 font-semibold text-slate-950 hover:bg-violet-300">
            Revelar cartas
          </button>
          <button onClick={() => setSpreadIndex((current) => rotateIndex(current, 1, orderedSpreads.length))} className="rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 font-medium text-slate-100 hover:border-violet-300/70">
            Próxima tiragem
          </button>
        </div>

        <button onClick={() => setStep("theme")} className="mt-5 text-sm text-slate-400 underline-offset-4 hover:text-slate-200 hover:underline">
          Voltar para a escolha do tema
        </button>
      </section>
    );
  }

  function renderResult() {
    if (!reading) return renderHome();

    return (
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 md:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Etapa 3 de 3</p>
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Resultado da leitura</h2>
            <p className="mt-2 text-slate-300">Tema: {reading.themeLabel}</p>
            <p className="mt-1 text-slate-300">Tiragem: {reading.spread.label}</p>
            <p className="mt-1 text-sm text-slate-400">{reading.createdAt}</p>
          </div>
          <button onClick={startOver} className="rounded-2xl border border-white/10 bg-slate-950 px-5 py-3 font-medium text-slate-100 hover:border-violet-300/70">
            Nova leitura
          </button>
        </div>

        {reading.warning && <div className="mt-5 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-amber-100">{reading.warning}</div>}

        <div className="mt-6 grid gap-5">
          {reading.cards.map((card) => <TarotCard key={`${card.name}-${card.position}`} card={card} />)}
        </div>

        <section className="mt-5 rounded-2xl border border-violet-300/20 bg-violet-300/10 p-4">
          <h3 className="font-semibold">Leitura combinada</h3>
          <p className="mt-2 leading-relaxed text-slate-300">{reading.synthesis}</p>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <h3 className="font-semibold">Conselho final</h3>
            <p className="mt-2 leading-relaxed text-slate-300">{reading.advice}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <h3 className="font-semibold">Pergunta para reflexão</h3>
            <p className="mt-2 leading-relaxed text-slate-300">{reading.reflection}</p>
          </div>
        </section>
      </section>
    );
  }

  function renderCurrentStep() {
    if (step === "theme") return renderThemeSelection();
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
