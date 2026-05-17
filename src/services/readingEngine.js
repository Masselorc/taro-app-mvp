const THEME_CONTEXT = {
  geral: "no seu momento atual",
  amor: "na vida afetiva",
  trabalho: "no campo profissional",
  decisao: "diante dessa decisão",
  espiritualidade: "na sua busca de sentido",
  dinheiro: "na relação com recursos e estabilidade",
  autocuidado: "na relação com cuidado e equilíbrio"
};

const POSITION_CONTEXTS = {
  "Conselho central": {
    purpose: "Esta posição funciona como eixo da leitura. Ela mostra a mensagem principal que precisa ser observada agora.",
    bridge: "Como conselho central, a carta não exige uma atitude perfeita; ela aponta um movimento simples que pode reorganizar sua postura."
  },
  "Situação atual": {
    purpose: "Esta posição mostra o clima principal da situação. Ela revela o que está mais ativo agora, mesmo que ainda não esteja totalmente evidente.",
    bridge: "Aqui, a carta descreve o ponto de partida da leitura e ajuda a nomear o que está acontecendo."
  },
  Desafio: {
    purpose: "Esta posição mostra o ponto de tensão. Ela não aparece como condenação, mas como algo que precisa ser encarado com mais consciência.",
    bridge: "Como desafio, a carta aponta onde pode haver repetição, bloqueio, excesso ou dificuldade de sustentar uma postura mais madura."
  },
  Conselho: {
    purpose: "Esta posição mostra uma orientação prática. Ela indica uma atitude possível para atravessar melhor a situação.",
    bridge: "Como conselho, a carta transforma a leitura em direção: o foco deixa de ser apenas entender e passa a ser agir com mais consciência."
  },
  "Influência anterior": {
    purpose: "Esta posição mostra uma influência que vem de antes. Pode ser um padrão, uma experiência recente ou uma energia que ainda atua na situação.",
    bridge: "Ela ajuda a entender de onde vem parte do movimento atual, sem prender a leitura ao passado."
  },
  "Momento presente": {
    purpose: "Esta posição mostra como a situação se apresenta agora. Ela revela o ponto de maior atenção no presente.",
    bridge: "Aqui, a carta mostra o que pede presença imediata, antes de pensar em desfecho ou tendência."
  },
  Tendência: {
    purpose: "Esta posição mostra uma direção possível. Tendência não é destino fixo; é o caminho provável se a situação continuar no mesmo ritmo.",
    bridge: "Ela ajuda a perceber para onde as coisas podem caminhar e o que ainda pode ser ajustado."
  },
  "Sua postura": {
    purpose: "Esta posição mostra sua postura dentro da dinâmica. Ela fala mais de como você se coloca do que do que outra pessoa sente ou fará.",
    bridge: "Aqui, a carta ajuda a perceber atitudes, expectativas, defesas e necessidades que partem de você."
  },
  "Energia percebida da outra parte": {
    purpose: "Esta posição mostra uma energia percebida na outra parte, sem afirmar sentimentos ou intenções como certeza absoluta.",
    bridge: "Ela deve ser lida com prudência: aponta sinais simbólicos da dinâmica, não uma garantia sobre o interior de outra pessoa."
  },
  "Dinâmica entre vocês": {
    purpose: "Esta posição mostra o campo relacional entre as partes. Ela indica o padrão que se forma no encontro entre posturas, expectativas e limites.",
    bridge: "Aqui, a carta ajuda a entender a relação como movimento, não como sentença fechada."
  },
  "Caminho A": {
    purpose: "Esta posição mostra uma possibilidade. Ela ajuda a observar o que esse caminho tende a exigir, favorecer ou revelar.",
    bridge: "A carta não escolhe por você; ela mostra o peso simbólico de uma alternativa."
  },
  "Caminho B": {
    purpose: "Esta posição mostra outra possibilidade. Ela permite comparar o segundo caminho sem transformar a leitura em ordem definitiva.",
    bridge: "A carta revela o que essa alternativa pode mobilizar, pedir ou colocar em evidência."
  },
  "Conselho para decidir": {
    purpose: "Esta posição organiza a decisão. Ela mostra a postura mais consciente para escolher entre caminhos possíveis.",
    bridge: "Como conselho, a carta ajuda a decidir com mais critério, não apenas por medo, pressa ou expectativa."
  },
  Obstáculo: {
    purpose: "Esta posição mostra o obstáculo principal. Pode ser externo, mas muitas vezes aparece como postura, medo, apego ou excesso.",
    bridge: "A carta mostra o que precisa ser reconhecido para que a situação não continue girando em torno do mesmo ponto."
  },
  "Base da questão": {
    purpose: "Esta posição mostra a raiz simbólica da situação. Ela ajuda a perceber o que está sustentando o tema por baixo da aparência imediata.",
    bridge: "Aqui, a carta convida a olhar para a origem do padrão, não apenas para o sintoma mais visível."
  },
  Orientação: {
    purpose: "Esta posição mostra uma orientação de conduta. Ela aponta como atravessar a situação de modo mais consciente.",
    bridge: "A carta funciona como uma bússola prática para ajustar postura, ritmo e decisão."
  },
  "Tendência ou síntese": {
    purpose: "Esta posição mostra o fechamento simbólico da tiragem. Ela resume a direção provável e o aprendizado central.",
    bridge: "Ela não fecha o futuro; apenas indica o padrão mais forte que aparece quando as cartas são lidas em conjunto."
  }
};

function getPositionContext(position) {
  return POSITION_CONTEXTS[position] || {
    purpose: "Esta posição mostra uma camada importante da leitura.",
    bridge: "A carta deve ser lida em relação ao tema, ao momento declarado e ao conjunto da tiragem."
  };
}

function toneFromCards(cards) {
  const challenging = cards.filter((card) => card.tone === "desafiadora").length;
  const favorable = cards.filter((card) => card.tone === "favorável").length;

  if (challenging > favorable) {
    return "O tom geral pede prudência. Não significa que a leitura seja negativa, mas indica que há algo a encarar com mais honestidade antes de esperar leveza.";
  }

  if (favorable > challenging) {
    return "O tom geral traz abertura. Ainda assim, a leitura não fala de garantia automática; ela mostra que existe espaço para agir com mais confiança se houver presença e responsabilidade.";
  }

  return "O tom geral é misto. A leitura mostra pontos de tensão e de apoio ao mesmo tempo, como se a situação pedisse equilíbrio entre cautela e movimento.";
}

function suitPattern(cards) {
  const suits = cards.reduce((acc, card) => {
    if (card.suit) acc[card.suit] = (acc[card.suit] || 0) + 1;
    return acc;
  }, {});
  const mainSuit = Object.entries(suits).sort((a, b) => b[1] - a[1])[0]?.[0];

  const meanings = {
    Paus: "A presença de Paus destaca ação, energia, iniciativa e vontade. A situação pede movimento, mas também direção para não virar impulso.",
    Copas: "A presença de Copas destaca sentimentos, vínculos e escuta emocional. A situação pede sensibilidade, mas também cuidado para não confundir desejo com realidade.",
    Espadas: "A presença de Espadas destaca pensamento, comunicação e decisão. A situação pede clareza mental, mas também cuidado para que a análise não vire dureza ou ansiedade.",
    Ouros: "A presença de Ouros destaca vida prática, recursos e estabilidade. A situação pede organização concreta, paciência e atenção ao que pode ser sustentado no mundo real."
  };

  return mainSuit ? meanings[mainSuit] : "A presença forte de Arcanos Maiores indica que a leitura toca mais em aprendizado, mudança de consciência e amadurecimento do que em acontecimentos isolados.";
}

export function interpretCard({ card, position, theme, mood, need }) {
  const positionContext = getPositionContext(position);
  const themeContext = THEME_CONTEXT[theme?.id] || "na situação consultada";

  const paragraphs = [
    `${positionContext.purpose} ${card.name} aparece aqui trazendo o tema de ${card.shortMeaning.toLowerCase()} ${themeContext}.`,
    `${card.simpleExplanation} ${positionContext.bridge}`,
    `${mood.readingTone} Nesse contexto, ${card.name} ganha uma leitura mais pessoal: a carta mostra onde sua forma de chegar à situação pode influenciar o modo como você interpreta sinais, escolhas e limites.`,
    `${need.readingTone} Por isso, esta carta não deve ser lida apenas como significado geral do Tarô, mas como uma orientação para transformar percepção em atitude concreta.`,
    `Ponto de atenção: ${card.shadow || "observe onde há excesso, falta de clareza ou repetição de padrão."}`
  ];

  return paragraphs.join("\n\n");
}

export function buildCardAdvice({ card, position, theme, mood, need }) {
  const themeContext = THEME_CONTEXT[theme?.id] || "na situação consultada";

  return [
    `${card.advice} Aplicado ${themeContext}, esse conselho pede uma atitude que você consiga praticar de verdade, sem transformar a leitura em cobrança impossível.`,
    `${mood.adviceTone} ${need.adviceTone}`,
    `Para esta posição — ${position} — o movimento mais útil é escolher um passo pequeno, verificável e coerente com a energia da carta. A pergunta prática é: o que pode ser feito hoje sem depender de controlar todo o resultado?`
  ].join("\n\n");
}

export function buildReadingOpening({ theme, mood, need, spread }) {
  return [
    `Esta leitura parte do tema ${theme.label} e do modo como você chegou a ela: ${mood.label.toLowerCase()}. Isso muda a forma de ler as cartas, porque o Tarô não está apenas descrevendo uma situação externa; ele também espelha a postura com que você olha para essa situação agora.`,
    `${mood.readingTone} Ao mesmo tempo, você indicou que precisa de ${need.label.toLowerCase()}. ${need.readingTone}`,
    `A tiragem escolhida foi ${spread.label}. Ela organiza a leitura em ${spread.positions.length} posição${spread.positions.length > 1 ? "ões" : ""}: ${spread.positions.join(", ")}. Isso permite ler cada carta como uma parte da análise, e não como mensagens soltas.`
  ].join("\n\n");
}

export function buildSynthesis({ cards, theme, mood, need }) {
  const majors = cards.filter((card) => card.arcana === "Maior").length;
  const themeContext = THEME_CONTEXT[theme?.id] || "na situação consultada";
  const cardNames = cards.map((card) => card.name).join(", ");

  const arcanaText = majors >= Math.ceil(cards.length / 2)
    ? "A quantidade de Arcanos Maiores dá peso à leitura. Isso sugere que o tema não deve ser tratado apenas como um episódio passageiro, mas como parte de um aprendizado mais amplo."
    : "A presença maior de Arcanos Menores aproxima a leitura da vida prática. Isso sugere que pequenas escolhas, conversas, hábitos e atitudes concretas podem alterar bastante o caminho.";

  return [
    `O padrão central aparece na combinação entre ${cardNames}. Lidas em conjunto, as cartas mostram como o tema se organiza ${themeContext}: não como uma resposta única, mas como um conjunto de forças que pedem observação e escolha consciente.`,
    `${arcanaText} ${suitPattern(cards)}`,
    `${toneFromCards(cards)} Como você chegou ${mood.label.toLowerCase()} e busca ${need.label.toLowerCase()}, a síntese principal é esta: a leitura pede que você não confunda intensidade interna com urgência externa. Há algo a compreender, algo a ajustar e algo a praticar.`,
    `O ponto mais individual da leitura está no cruzamento entre sua necessidade e as cartas. Se você usar essa leitura apenas para tentar prever o que acontecerá, ela perde força. Se usar como espelho para perceber postura, limite, desejo e próximo passo, ela se torna mais útil.`
  ].join("\n\n");
}

export function buildFinalAdvice({ cards, theme, mood, need }) {
  const firstCard = cards[0];
  const lastCard = cards[cards.length - 1];
  const themeContext = THEME_CONTEXT[theme?.id] || "na situação consultada";

  return [
    `O conselho final é começar pelo que está sob seu alcance. ${mood.adviceTone} ${need.adviceTone} A leitura não pede que você controle tudo; ela pede que você escolha melhor sua postura diante do que está acontecendo ${themeContext}.`,
    `${firstCard.name} abre a leitura mostrando ${firstCard.shortMeaning.toLowerCase()}. ${lastCard.name} encerra ou orienta o conjunto trazendo ${lastCard.shortMeaning.toLowerCase()}. Entre uma coisa e outra, existe um caminho: reconhecer o que está ativo, perceber onde há tensão e transformar a mensagem em uma atitude concreta.`,
    `Na prática, escolha uma ação simples para as próximas 24 horas: uma conversa mais honesta, uma pausa antes de responder, uma organização objetiva, um limite, um pedido de ajuda ou a decisão de não alimentar um padrão repetido. A força desta leitura está menos em prever o futuro e mais em devolver para você uma direção possível agora.`
  ].join("\n\n");
}

export function buildReflection({ theme, mood, need }) {
  const themeQuestions = {
    geral: "O que este momento está tentando mostrar que você ainda não organizou em palavras?",
    amor: "Que atitude preserva melhor seus sentimentos e seus limites ao mesmo tempo?",
    trabalho: "Qual escolha profissional fortalece consistência em vez de apenas aliviar pressão?",
    decisao: "Qual caminho parece mais coerente com seus valores, mesmo que não seja o mais fácil?",
    espiritualidade: "Que silêncio ou prática pode ajudar você a escutar melhor o que já percebe?",
    dinheiro: "Que decisão prática traria mais segurança sem ser movida por medo?",
    autocuidado: "Que cuidado básico você já sabe que precisa retomar?"
  };

  return `${themeQuestions[theme.id] || themeQuestions.geral} ${mood.question} ${need.question}`;
}
