import {
  DIRECT_MOOD_PATTERNS,
  DIRECT_NEED_PATTERNS,
  DIRECT_THEME_PATTERNS
} from "../data/directMode.js";

const DIRECT_THEME_CONTEXT = {
  geral: {
    field: "no seu momento atual",
    punch: "Aqui o foco não é um detalhe isolado. É o padrão inteiro que você vem repetindo, tolerando ou fingindo que ainda não entendeu."
  },
  amor: {
    field: "na vida afetiva",
    punch: "No amor, a verdade nua e crua é separar afeto de carência, sinal de fantasia e vínculo de dependência emocional."
  },
  trabalho: {
    field: "no campo profissional",
    punch: "No trabalho, a leitura olha para postura, consistência e entrega. Boa intenção não compensa falta de direção prática."
  },
  decisao: {
    field: "diante dessa decisão",
    punch: "Toda escolha cobra um preço. O problema é querer escolher sem perder nada, sem se frustrar e sem assumir consequência."
  },
  espiritualidade: {
    field: "na sua busca de sentido",
    punch: "Na espiritualidade, o corte é separar intuição de fuga. Nem todo sinal é chamado; às vezes é medo procurando fantasia bonita."
  },
  dinheiro: {
    field: "na relação com recursos e estabilidade",
    punch: "Em dinheiro, a verdade é concreta: desejo não é planejamento, impulso não é estratégia e risco ignorado continua sendo risco."
  },
  autocuidado: {
    field: "na relação com cuidado e equilíbrio",
    punch: "No autocuidado, a leitura não romantiza exaustão. Se você se abandona para sustentar tudo, o problema já apareceu."
  }
};

const DIRECT_POSITION_READS = {
  "Conselho central": {
    lead: "A carta central corta a desculpa principal.",
    action: "O recado precisa virar atitude; se ficar só na reflexão, vira enfeite espiritual."
  },
  "Situação atual": {
    lead: "A situação atual mostra o que está escancarado, mesmo que você esteja tentando chamar de dúvida.",
    action: "O primeiro passo é parar de maquiar o estado real das coisas."
  },
  Desafio: {
    lead: "O desafio mostra o ponto que você provavelmente já percebeu, mas ainda tenta negociar.",
    action: "Enquanto você tratar isso como detalhe, vai continuar preso ao mesmo ciclo."
  },
  Conselho: {
    lead: "O conselho é simples: pare de pedir sinal para aquilo que exige postura.",
    action: "A carta cobra uma ação pequena, concreta e verificável."
  },
  "Influência anterior": {
    lead: "A influência anterior mostra o que ainda está mandando na situação sem pedir licença.",
    action: "Se você não digerir isso, vai continuar reagindo ao passado como se fosse presente."
  },
  "Momento presente": {
    lead: "O presente está mostrando onde a situação exige presença, não dramatização.",
    action: "Veja o que está diante de você antes de inventar mais cenários."
  },
  Tendência: {
    lead: "A tendência mostra para onde isso vai se você continuar igual.",
    action: "Não chame de destino aquilo que talvez seja repetição de postura."
  },
  "Sua postura": {
    lead: "Esta carta fala de você. Não adianta terceirizar tudo.",
    action: "A pergunta é onde sua postura alimenta exatamente aquilo que você reclama."
  },
  "Energia percebida da outra parte": {
    lead: "A energia da outra parte não autoriza fantasia nem certeza inventada.",
    action: "Olhe atitudes, não o roteiro que sua cabeça gostaria de confirmar."
  },
  "Dinâmica entre vocês": {
    lead: "A dinâmica entre vocês não surgiu sozinha.",
    action: "Ela é alimentada pelo que cada lado permite, evita, cobra ou finge que não vê."
  },
  "Caminho A": {
    lead: "O Caminho A tem preço.",
    action: "Não escolha esse caminho se depois vai fingir surpresa pela consequência."
  },
  "Caminho B": {
    lead: "O Caminho B também cobra algo.",
    action: "Escolher diferente não significa escapar de desconforto; significa escolher qual desconforto você aceita enfrentar."
  },
  "Conselho para decidir": {
    lead: "A decisão pede maturidade, não uma opção sem risco.",
    action: "Pare de procurar garantia absoluta. Ela não vem."
  },
  Obstáculo: {
    lead: "O obstáculo não está tão escondido quanto parece.",
    action: "O difícil é admitir o que ele exige de você."
  },
  "Base da questão": {
    lead: "A base da questão mostra a raiz que você talvez prefira não mexer.",
    action: "Sem tocar nesse ponto, qualquer solução vira maquiagem."
  },
  Orientação: {
    lead: "A orientação é prática e pouco romântica.",
    action: "Pare de interpretar tudo e ajuste o que precisa ser ajustado."
  },
  "Tendência ou síntese": {
    lead: "A síntese mostra o retrato do caminho atual.",
    action: "Se nada mudar, não espere um resultado muito diferente."
  }
};

const ARCANA_DIRECT = {
  Maior: "Quando um Arcano Maior aparece, a leitura não está falando só de um detalhe. Está apontando uma lição maior, daquelas que voltam até serem encaradas.",
  Menor: "Quando um Arcano Menor aparece, o recado desce para a vida prática: atitude, rotina, conversa, limite, escolha e consequência."
};

const SUIT_DIRECT = {
  Paus: "Paus cobra movimento. Se existe vontade, ela precisa sair do discurso e virar ação com direção.",
  Copas: "Copas cobra maturidade emocional. Sentir muito não prova que algo é bom, recíproco ou sustentável.",
  Espadas: "Espadas corta confusão. Pensar sem decidir vira tortura mental com aparência de análise.",
  Ouros: "Ouros puxa para o concreto. O que não se sustenta na prática não deve ser tratado como plano sólido."
};

const TONE_DIRECT = {
  favorável: "A carta abre uma possibilidade, mas não faça disso garantia. Potencial desperdiçado também vira frustração.",
  desafiadora: "A carta vem desconfortável porque tem coisa que você talvez tenha tentado empurrar para debaixo do tapete.",
  neutra: "A carta não passa a mão na cabeça nem condena. Ela mostra um ponto que precisa de leitura honesta e ação limpa."
};

const NEED_PRICE = {
  clareza: "Clareza cobra parar de fingir que tudo é complexo quando o básico já apareceu.",
  coragem: "Coragem cobra agir antes que o medo vire identidade.",
  cuidado: "Cuidado cobra parar de chamar autoabandono de generosidade.",
  direcao: "Direção cobra escolher um passo e parar de girar em círculo.",
  encerramento: "Encerramento cobra parar de alimentar o que você diz querer superar.",
  paciencia: "Paciência cobra sustentar processo sem usar espera como desculpa para inércia.",
  "confirmacao-interna": "Confirmação interna cobra aceitar a percepção que volta sempre, mesmo quando você tenta negociar com ela.",
  alerta: "Alerta cobra olhar para o sinal concreto que você vem diminuindo para não ter que mudar."
};

function meaning(card) {
  return String(card.shortMeaning || "").trim().replace(/[.!?]+$/g, "").toLowerCase();
}

function themeInfo(theme) {
  return DIRECT_THEME_CONTEXT[theme?.id] || DIRECT_THEME_CONTEXT.geral;
}

function positionInfo(position) {
  return DIRECT_POSITION_READS[position] || {
    lead: "Esta posição mostra um ponto que precisa ser visto sem enfeite.",
    action: "Se a leitura não virar postura, ela vira só curiosidade."
  };
}

function cardHook(card) {
  const cardMeaning = meaning(card);
  const tone = TONE_DIRECT[card.tone] || TONE_DIRECT.neutra;
  const arcana = ARCANA_DIRECT[card.arcana] || ARCANA_DIRECT.Menor;
  const suit = card.suit ? SUIT_DIRECT[card.suit] : "";

  return `${card.name} coloca na mesa ${cardMeaning}. ${tone} ${arcana} ${suit}`.replace(/\s+/g, " ").trim();
}

function directCardMirror(card, theme, mood, need) {
  const themePunch = themeInfo(theme).punch;
  const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
  const needPrice = NEED_PRICE[need.id] || "O que você pediu cobra atitude, não apenas interpretação.";

  return `${themePunch} ${moodPattern.opening} ${needPrice} Com ${card.name}, o espelho é este: existe uma diferença entre perceber o padrão e continuar alimentando o padrão enquanto diz que quer resposta.`;
}

function concreteAction(card, position, need) {
  const actions = {
    clareza: "escreva os fatos sem interpretar, corte as suposições e veja o que sobra",
    coragem: "faça a conversa, o limite ou a escolha que você está adiando",
    cuidado: "retire energia do que está te drenando e proteja o básico primeiro",
    direcao: "defina um próximo passo pequeno, com prazo e consequência clara",
    encerramento: "pare de alimentar a expectativa que mantém o ciclo vivo",
    paciencia: "segure a ansiedade e use a espera para ajustar sua postura",
    "confirmacao-interna": "pare de pedir a mesma confirmação e assuma o que já percebeu",
    alerta: "observe o sinal concreto e aja antes que ele vire problema maior"
  };

  const action = actions[need.id] || "escolha uma atitude concreta e verificável";
  return `Para ${position}, a atitude mínima é: ${action}. Se ${card.name} te incomodou, melhor ainda; incômodo costuma apontar onde a defesa está mais forte.`;
}

export function directInterpretCard({ card, position, theme, mood, need }) {
  const pos = positionInfo(position);

  return [
    `${pos.lead} ${cardHook(card)}`,
    `${directCardMirror(card, theme, mood, need)}`,
    `${pos.action} ${concreteAction(card, position, need)}`,
    `A verdade nua e crua desta carta: se você apenas concordar com a leitura e continuar fazendo a mesma coisa, a carta não falhou. Você é que preferiu usar consciência como decoração.`
  ].join("\n\n");
}

export function directCardAdvice({ card, position, theme, mood, need }) {
  const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
  const needPattern = DIRECT_NEED_PATTERNS[need.id];
  const themeField = themeInfo(theme).field;

  return [
    `Conselho sem anestesia: ${concreteAction(card, position, need)}`,
    `${moodPattern.advice} ${needPattern.advice}`,
    `Aplicado ${themeField}, isso significa parar de esperar que a leitura resolva o que só muda quando você muda comportamento. Faça uma coisa menor, mas faça de verdade.`
  ].join("\n\n");
}

export function directOpening({ theme, mood, need, spread }) {
  const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
  const needPattern = DIRECT_NEED_PATTERNS[need.id];
  const themePunch = directThemePunch(theme);

  return [
    `Você ativou a verdade nua e crua. Então a leitura não vai tentar te agradar. Ela vai apontar onde existe autoengano, adiamento, apego, fantasia ou omissão disfarçada de dúvida.`,
    `Você escolheu ${theme.label}, chegou ${mood.label.toLowerCase()} e disse que precisa de ${need.label.toLowerCase()}. ${themePunch} ${moodPattern.opening}`,
    `${needPattern.opening} A tiragem ${spread.label} não entra como ritual decorativo. Ela entra como espelho: cada carta vai mostrar uma parte do que precisa ser encarado, inclusive se o incômodo for justamente o ponto.`
  ].join("\n\n");
}

function directThemePunch(theme) {
  return DIRECT_THEME_PATTERNS[theme.id] || themeInfo(theme).punch;
}

function suitSynthesis(cards) {
  const suits = cards.reduce((acc, card) => {
    if (card.suit) acc[card.suit] = (acc[card.suit] || 0) + 1;
    return acc;
  }, {});
  const mainSuit = Object.entries(suits).sort((a, b) => b[1] - a[1])[0]?.[0];

  if (!mainSuit) return "A força dos Arcanos Maiores mostra que o assunto é maior do que um detalhe passageiro. Tem lição repetida aqui, e lição ignorada costuma voltar mais cara.";
  return SUIT_DIRECT[mainSuit];
}

function toneSynthesis(cards) {
  const challenging = cards.filter((card) => card.tone === "desafiadora").length;
  const favorable = cards.filter((card) => card.tone === "favorável").length;

  if (challenging > favorable) return "O conjunto é desconfortável, e essa é a utilidade dele. Ele não veio para aliviar; veio para mostrar onde você precisa parar de se explicar e começar a se responsabilizar.";
  if (favorable > challenging) return "O conjunto abre possibilidade, mas possibilidade não é prêmio. Se você não sustentar atitude, a abertura vira só mais uma chance desperdiçada.";
  return "O conjunto mistura abertura e cobrança. Isso significa que existe saída, mas ela não combina com passividade, autoengano ou espera infinita.";
}

export function directSynthesis({ cards, theme, mood, need }) {
  const names = cards.map((card) => card.name).join(", ");
  const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
  const needPattern = DIRECT_NEED_PATTERNS[need.id];
  const themeField = themeInfo(theme).field;

  return [
    `O padrão central entre ${names} é este: ${themeField}, você pode estar tentando transformar percepção em espera, desconforto em confusão ou desejo em justificativa.`,
    `${suitSynthesis(cards)} ${toneSynthesis(cards)}`,
    `Como você chegou ${mood.label.toLowerCase()} e busca ${need.label.toLowerCase()}, o recado não é delicado: ${moodPattern.advice} ${needPattern.advice}`,
    `A leitura não serve para terceirizar responsabilidade para as cartas. Ela serve para devolver o espelho. Se doeu, ótimo. Dor honesta costuma ser mais útil do que conforto que mantém tudo exatamente igual.`
  ].join("\n\n");
}

export function directFinalAdvice({ cards, theme, mood, need }) {
  const first = cards[0];
  const last = cards[cards.length - 1];
  const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
  const needPattern = DIRECT_NEED_PATTERNS[need.id];
  const themeField = themeInfo(theme).field;

  return [
    `Conselho final, sem anestesia: comece pelo que depende de você e pare de fingir que clareza só existe quando não dói. ${moodPattern.advice} ${needPattern.advice}`,
    `${first.name} abre a leitura com ${meaning(first)}. ${last.name} fecha ou orienta o conjunto com ${meaning(last)}. Entre uma carta e outra, o recado é simples: perceber padrão e continuar igual é só vaidade espiritual com outro nome.`,
    `Nas próximas 24 horas, faça algo concreto ${themeField}: um limite, uma conversa, uma pausa, uma organização, uma decisão ou o corte de uma expectativa que você sabe que está te puxando para o mesmo ciclo. Se você não fizer nada, tudo bem — mas então não chame de destino aquilo que também é omissão.`
  ].join("\n\n");
}

export function directReflection({ mood, need }) {
  const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
  const needPattern = DIRECT_NEED_PATTERNS[need.id];
  return `${moodPattern.reflection} ${needPattern.reflection}`;
}
