import { useMemo, useState } from "react";
import { TAROT_DECK } from "./data/tarotDeck.js";

const THEMES = [
  ["geral", "Leitura geral", "Momento atual, desafio e conselho."],
  ["amor", "Amor", "Vínculos, expectativas, comunicação e limites."],
  ["trabalho", "Trabalho", "Postura profissional, estratégia e próximos passos."],
  ["decisao", "Decisão", "Comparação simbólica entre caminhos possíveis."],
  ["espiritualidade", "Espiritualidade", "Sentido, recolhimento, intuição e valores."],
  ["dinheiro", "Dinheiro", "Prudência, organização, risco e estabilidade."],
  ["autocuidado", "Autocuidado", "Cuidado, equilíbrio e atenção ao próprio estado."]
].map(([id, label, helper]) => ({ id, label, helper }));

const SPREADS = [
  { id: "auto", label: "Escolha automática", positions: [] },
  { id: "single", label: "Carta única", positions: ["Conselho central"] },
  { id: "three", label: "Três cartas — Situação, Desafio e Conselho", positions: ["Situação atual", "Desafio", "Conselho"] },
  { id: "time", label: "Três cartas — Influência, Presente e Tendência", positions: ["Influência anterior", "Momento presente", "Tendência"] },
  { id: "relationship", label: "Três cartas — Você, o Outro e a Dinâmica", positions: ["Sua postura", "Energia percebida da outra parte", "Dinâmica entre vocês"] },
  { id: "choice", label: "Três cartas — Caminho A, Caminho B e Conselho", positions: ["Caminho A", "Caminho B", "Conselho para decidir"] },
  { id: "cross", label: "Cruz simples", positions: ["Situação atual", "Obstáculo", "Base da questão", "Orientação", "Tendência ou síntese"] }
];

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

function detectSensitive(theme, question) {
  const text = normalize(`${theme} ${question}`);
  if (["diagnostico", "tratamento", "remedio", "sintoma", "gravidez"].some((w) => text.includes(w))) {
    return "O Tarô não deve ser usado para diagnóstico, tratamento ou prognóstico. A leitura pode ser simbólica, focada em autocuidado e busca de apoio adequado.";
  }
  if (["investir", "aposta", "emprestimo", "todo meu dinheiro", "cripto"].some((w) => text.includes(w))) {
    return "A leitura não deve recomendar investimento, compra, venda, empréstimo ou aposta. O foco deve ser prudência, risco e planejamento.";
  }
  if (["processo", "advogado", "justica", "sentenca"].some((w) => text.includes(w))) {
    return "O Tarô não substitui orientação jurídica. A leitura pode abordar postura, clareza e cuidado, sem afirmar desfecho legal.";
  }
  if (["ele sente", "ela sente", "me ama", "vai voltar", "traicao", "trai"].some((w) => text.includes(w))) {
    return "Perguntas sobre terceiros devem focar na dinâmica percebida, nos limites e na postura do usuário, sem afirmar sentimentos ou ações de outra pessoa como certeza.";
  }
  return "";
}

function chooseSpread(theme, question) {
  if (theme === "decisao") return "choice";
  if (theme === "amor" && /voltar|gosta|ama|relacao|relação|conexao|conexão|ele|ela/i.test(question)) return "relationship";
  if ((question || "").length > 160) return "cross";
  if ((question || "").length < 35) return "single";
  return "three";
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
  const p = normalize(position);
  if (p.includes("conselho") || p.includes("orientacao")) return "advice";
  if (p.includes("desafio") || p.includes("obstaculo")) return "obstacle";
  if (p.includes("tendencia") || p.includes("sintese")) return "trend";
  if (p.includes("base")) return "shadow";
  return "essential";
}

function sentence(text) {
  const value = String(text || "").trim();
  return value.endsWith(".") ? value : `${value}.`;
}

function interpretCard(card, position, theme) {
  const kind = kindFor(position);
  const source = card[kind] || card.essential;
  const context = THEME_TEXT[theme] || "na situação consultada";
  if (kind === "advice") return `${sentence(source)} Aplicada ${context}, esta carta propõe uma postura possível, não uma ordem.`;
  if (kind === "obstacle") return `${sentence(source)} Como ponto de atenção ${context}, ela mostra um bloqueio que pode ser observado sem fatalismo.`;
  if (kind === "trend") return `${sentence(source)} Como tendência, indica uma possibilidade condicionada à forma como a situação continuar se desenvolvendo.`;
  if (kind === "shadow") return `${sentence(source)} Na base da questão, ajuda a perceber uma raiz simbólica da situação.`;
  return `${sentence(source)} Na posição de “${position}”, ela colore ${context} com esse tema central.`;
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
  if (majors >= Math.ceil(cards.length / 2)) parts.push("A presença de Arcanos Maiores dá peso simbólico à leitura e sugere aprendizado ou amadurecimento relevante.");
  if (mainSuit) parts.push(`A predominância de ${mainSuit} orienta a leitura para esse campo simbólico específico.`);
  if (challenging && favorable) parts.push("O conjunto mostra tensão e abertura ao mesmo tempo: há pontos a encarar, mas também recursos para atravessar a situação com clareza.");
  else if (challenging) parts.push("O conjunto é exigente, mas não fatalista. A leitura pede prudência, verdade e cuidado com reações automáticas.");
  else if (favorable) parts.push("O conjunto é favorável, mas não deve ser lido como garantia automática. Ele indica abertura quando há ação consciente.");
  parts.push(`Em síntese, as cartas sugerem uma leitura reflexiva ${context}, sem fechar o futuro como certeza.`);
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

export default function TarotApp() {
  const [theme, setTheme] = useState("geral");
  const [question, setQuestion] = useState("");
  const [spreadId, setSpreadId] = useState("auto");
  const [reading, setReading] = useState(null);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("tarot-history") || "[]"));

  const selectedSpread = useMemo(() => {
    const id = spreadId === "auto" ? chooseSpread(theme, question) : spreadId;
    return SPREADS.find((spread) => spread.id === id) || SPREADS[2];
  }, [spreadId, theme, question]);

  function saveHistory(nextReading) {
    const next = [nextReading, ...history].slice(0, 8);
    setHistory(next);
    localStorage.setItem("tarot-history", JSON.stringify(next));
  }

  function createReading() {
    const warning = detectSensitive(theme, question);
    const cards = shuffle(TAROT_DECK).slice(0, selectedSpread.positions.length).map((card, index) => ({
      ...card,
      position: selectedSpread.positions[index],
      text: interpretCard(card, selectedSpread.positions[index], theme)
    }));
    const nextReading = {
      id: crypto.randomUUID(),
      createdAt: new Date().toLocaleString("pt-BR"),
      theme,
      question: question.trim() || "Leitura geral do momento.",
      spread: selectedSpread,
      warning,
      cards,
      synthesis: buildSynthesis(cards, theme),
      advice: warning || "O conselho central é agir com clareza, reconhecer o que as cartas destacam e transformar a leitura em reflexão prática, não em certeza absoluta.",
      reflection: reflectiveQuestion(theme)
    };
    setReading(nextReading);
    saveHistory(nextReading);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:px-8">
        <header className="rounded-[2rem] border border-violet-500/20 bg-slate-900/70 p-6 shadow-2xl shadow-violet-950/30">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Tarô simbólico</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">Leitura individualizada</h1>
          <p className="mt-4 max-w-3xl text-slate-300">Uma experiência de Tarô reflexiva, não determinista e construída para orientar perguntas sem prometer certezas absolutas.</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form className="rounded-3xl border border-white/10 bg-white/5 p-5" onSubmit={(event) => { event.preventDefault(); createReading(); }}>
            <h2 className="text-2xl font-semibold">Preparar tiragem</h2>
            <label className="mt-5 block text-sm font-medium text-slate-300">Tema</label>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {THEMES.map((item) => (
                <button type="button" key={item.id} onClick={() => setTheme(item.id)} className={`rounded-2xl border p-3 text-left transition ${theme === item.id ? "border-violet-300 bg-violet-500/20" : "border-white/10 bg-slate-900/80 hover:border-violet-300/60"}`}>
                  <span className="block font-medium">{item.label}</span>
                  <span className="mt-1 block text-xs text-slate-400">{item.helper}</span>
                </button>
              ))}
            </div>
            <label className="mt-5 block text-sm font-medium text-slate-300" htmlFor="question">Pergunta</label>
            <textarea id="question" value={question} onChange={(event) => setQuestion(event.target.value)} rows={5} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-slate-100 outline-none focus:border-violet-300" placeholder="Escreva sua pergunta ou deixe em branco para uma leitura geral." />
            <label className="mt-5 block text-sm font-medium text-slate-300" htmlFor="spread">Tiragem</label>
            <select id="spread" value={spreadId} onChange={(event) => setSpreadId(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-slate-100 outline-none focus:border-violet-300">
              {SPREADS.map((spread) => <option key={spread.id} value={spread.id}>{spread.label}</option>)}
            </select>
            <button type="submit" className="mt-6 w-full rounded-2xl bg-violet-400 px-5 py-4 font-semibold text-slate-950 transition hover:bg-violet-300">Embaralhar e revelar cartas</button>
          </form>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
            {!reading ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center text-slate-300">
                <div className="mb-5 h-28 w-20 rounded-2xl border border-violet-300/50 bg-gradient-to-br from-violet-800 to-slate-900 shadow-xl shadow-violet-950" />
                <h2 className="text-2xl font-semibold text-slate-100">Sua leitura aparecerá aqui</h2>
                <p className="mt-2 max-w-md">Escolha um tema, formule a pergunta e revele as cartas.</p>
              </div>
            ) : (
              <article className="space-y-5">
                <div>
                  <p className="text-sm text-violet-300">{reading.createdAt}</p>
                  <h2 className="mt-1 text-2xl font-semibold">{reading.spread.label}</h2>
                  <p className="mt-2 text-slate-300">Pergunta: {reading.question}</p>
                </div>
                {reading.warning && <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-amber-100">{reading.warning}</div>}
                <div className="grid gap-4">
                  {reading.cards.map((card) => (
                    <div key={`${card.name}-${card.position}`} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <p className="text-sm text-violet-300">{card.position}</p>
                      <h3 className="mt-1 text-xl font-semibold">{card.name}</h3>
                      <p className="mt-2 text-slate-300">{card.text}</p>
                    </div>
                  ))}
                </div>
                <section className="rounded-2xl border border-violet-300/20 bg-violet-300/10 p-4">
                  <h3 className="font-semibold">Leitura combinada</h3>
                  <p className="mt-2 text-slate-300">{reading.synthesis}</p>
                </section>
                <section className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <h3 className="font-semibold">Conselho</h3>
                    <p className="mt-2 text-slate-300">{reading.advice}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <h3 className="font-semibold">Pergunta para reflexão</h3>
                    <p className="mt-2 text-slate-300">{reading.reflection}</p>
                  </div>
                </section>
              </article>
            )}
          </section>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-2xl font-semibold">Histórico local</h2>
          {history.length === 0 ? <p className="mt-2 text-slate-400">Nenhuma leitura salva neste navegador.</p> : (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {history.map((item) => (
                <button key={item.id} onClick={() => setReading(item)} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-left hover:border-violet-300/60">
                  <p className="text-sm text-slate-400">{item.createdAt}</p>
                  <p className="mt-1 font-semibold">{item.spread.label}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-300">{item.question}</p>
                </button>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
