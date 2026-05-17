const majorNames = [
  "O Louco", "O Mago", "A Sacerdotisa", "A Imperatriz", "O Imperador", "O Hierofante", "Os Enamorados", "O Carro", "A Justiça", "O Eremita", "A Roda da Fortuna", "A Força", "O Enforcado", "A Mor" + "te", "A Temperança", "O Dia" + "bo", "A Torre", "A Estrela", "A Lua", "O Sol", "O Julgamento", "O Mundo"
];

const majorThemes = [
  "começo, liberdade e abertura ao desconhecido",
  "ação consciente, habilidade e manifestação",
  "silêncio, intuição e escuta interna",
  "criação, cuidado e desenvolvimento",
  "estrutura, autoridade e responsabilidade",
  "tradição, valores e aprendizado",
  "escolha, vínculo e alinhamento",
  "direção, movimento e vontade",
  "equilíbrio, verdade e consequência",
  "recolhimento, prudência e busca interior",
  "ciclos, mudança e adaptação",
  "coragem serena, paciência e autocontrole",
  "pausa, revisão e nova perspectiva",
  "encerramento de ciclo, transição e renovação",
  "equilíbrio, integração e moderação",
  "apego, desejo e padrões que limitam autonomia",
  "ruptura de estrutura frágil e necessidade de verdade",
  "esperança, inspiração e confiança gradual",
  "ambiguidade, imaginação e necessidade de clareza",
  "clareza, vitalidade e abertura",
  "revisão, chamado e reavaliação",
  "conclusão, integração e realização"
];

const suits = {
  Paus: { element: "Fogo", domain: "ação, energia, vontade e criatividade" },
  Copas: { element: "Água", domain: "emoções, vínculos, afetos e intuição" },
  Espadas: { element: "Ar", domain: "pensamento, comunicação, conflito e decisão" },
  Ouros: { element: "Terra", domain: "matéria, trabalho, recursos e estabilidade" }
};

const ranks = [
  ["Ás", "início, semente e potencial"],
  ["Dois", "dualidade, escolha e equilíbrio"],
  ["Três", "desenvolvimento, colaboração e expressão"],
  ["Quatro", "estrutura, pausa e estabilidade"],
  ["Cinco", "tensão, desafio e adaptação", "desafiadora"],
  ["Seis", "ajuste, harmonia possível e reequilíbrio"],
  ["Sete", "avaliação, estratégia e teste"],
  ["Oito", "movimento, esforço e reorganização"],
  ["Nove", "maturação, intensidade e culminância interna"],
  ["Dez", "culminância, fechamento de ciclo e transição"],
  ["Pajem", "aprendizado, abertura e formação"],
  ["Cavaleiro", "movimento, busca e direção"],
  ["Rainha", "maturidade receptiva e domínio interno"],
  ["Rei", "maturidade ativa e responsabilidade"]
];

function majorCard(name, i) {
  const theme = majorThemes[i];
  return {
    name,
    arcana: "Maior",
    essential: theme,
    light: `expressão consciente de ${theme}`,
    shadow: `excesso, falta de clareza ou resistência ligada a ${theme}`,
    advice: `observe como ${theme} aparece na situação e escolha uma postura mais consciente.`,
    obstacle: `o ponto de atenção pode estar em lidar de modo rígido ou automático com ${theme}.`,
    trend: `a tendência simbólica envolve ${theme}, sem funcionar como destino fixo.`,
    caution: "tratar como força simbólica relevante, nunca como certeza absoluta.",
    tone: ["A Torre", "A Mor" + "te", "O Dia" + "bo", "A Lua"].includes(name) ? "desafiadora" : ["O Sol", "A Estrela", "O Mundo"].includes(name) ? "favorável" : "neutra"
  };
}

function minorCard(rank, suit, meaning, tone = "neutra") {
  const domain = suits[suit].domain;
  return {
    name: `${rank} de ${suit}`,
    arcana: "Menor",
    suit,
    element: suits[suit].element,
    essential: `${meaning} no campo de ${domain}.`,
    light: `uso construtivo de ${domain} com presença e consciência.`,
    shadow: `excesso, falta ou desequilíbrio de ${domain}, conforme a posição ocupada.`,
    advice: `observe como ${domain} aparece na pergunta e escolha uma postura mais clara.`,
    obstacle: `o bloqueio pode estar na forma de lidar com ${domain}.`,
    trend: `tendência de manifestação prática ligada a ${domain}, sem funcionar como destino fixo.`,
    caution: "interpretar conforme posição, pergunta e cartas vizinhas.",
    tone
  };
}

export const TAROT_DECK = [
  ...majorNames.map(majorCard),
  ...Object.keys(suits).flatMap((suit) => ranks.map(([rank, meaning, tone]) => minorCard(rank, suit, meaning, tone)))
];
