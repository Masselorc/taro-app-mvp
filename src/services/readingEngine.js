import {
  DIRECT_MOOD_PATTERNS,
  DIRECT_NEED_PATTERNS,
  DIRECT_THEME_PATTERNS
} from "../data/directMode.js";

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

const DIRECT_POSITION_TRUTHS = {
  "Conselho central": "A verdade central é simples: você não precisa de mais enfeite, precisa de uma postura mais honesta.",
  "Situação atual": "A situação atual não está pedindo uma explicação bonita. Ela está mostrando o ponto que você precisa parar de contornar.",
  Desafio: "O desafio não é um mistério místico. É o ponto que você provavelmente já percebeu e ainda tenta negociar.",
  Conselho: "O conselho não é para decorar a leitura. É para virar atitude, ou então não serve para nada.",
  "Influência anterior": "O passado ainda está cobrando presença porque alguma lição ficou mal digerida.",
  "Momento presente": "O presente está pedindo menos reação automática e mais coragem para ver o que está na sua frente.",
  Tendência: "A tendência não é sentença. É o caminho que continua se você seguir repetindo a mesma postura.",
  "Sua postura": "A carta está falando de você. Não adianta jogar tudo na conta da outra pessoa.",
  "Energia percebida da outra parte": "A outra parte pode até importar, mas a leitura não te autoriza a inventar certeza sobre o que alguém sente. Olhe os sinais, não a fantasia.",
  "Dinâmica entre vocês": "A dinâmica não nasce sozinha. Ela é alimentada pelo que cada lado permite, evita, cobra ou finge que não vê.",
  "Caminho A": "Esse caminho tem preço. A pergunta é se você está disposto a pagar sem depois fingir surpresa.",
  "Caminho B": "Essa alternativa também cobra algo. Escolher não é escapar de consequência; é escolher qual consequência você aceita encarar.",
  "Conselho para decidir": "Decidir exige parar de procurar uma opção sem risco. Isso não existe.",
  Obstáculo: "O obstáculo está menos escondido do que parece. O difícil é admitir o que ele exige de você.",
  "Base da questão": "A raiz do problema não está na superfície. Ela está no padrão que você repete, tolera ou alimenta.",
  Orientação: "A orientação é prática: pare de interpretar tudo e faça o ajuste que a situação está pedindo.",
  "Tendência ou síntese": "A síntese é o retrato do caminho atual. Se você não mudar nada, não espere um resultado muito diferente."
};

function isDirect(readingMode) {
  return readingMode === "direct";
}

function cleanMeaning(value = "") {
  return String(value).trim().replace(/[.!?]+$/g, "").toLowerCase();
}

function getPositionContext(position) {
  return POSITION_CONTEXTS[position] || {
    purpose: "Esta posição mostra uma camada importante da leitura.",
    bridge: "A carta deve ser lida em relação ao tema, ao momento declarado e ao conjunto da tiragem."
  };
}

function directCardPunch(card) {
  const meaning = cleanMeaning(card.shortMeaning);

  if (card.tone === "desafiadora") {
    return `${card.name} não veio para agradar. Veio para mostrar onde ${meaning} pode estar cobrando uma conta que você preferia não olhar.`;
  }

  if (card.tone === "favorável") {
    return `${card.name} até abre uma possibilidade boa, mas não confunda isso com garantia. ${meaning} só vira algo real se você parar de esperar que a carta faça a parte que é sua.`;
  }

  return `${card.name} coloca na mesa ${meaning}. A parte incômoda é que isso não é abstrato: tem a ver com uma postura concreta que precisa ser revista agora.`;
}

function directThemePunch(theme) {
  return DIRECT_THEME_PATTERNS[theme.id] || "O tema escolhido pede menos fantasia e mais responsabilidade sobre o que está acontecendo.";
}

function toneFromCards(cards, readingMode = "normal") {
  const challenging = cards.filter((card) => card.tone === "desafiadora").length;
  const favorable = cards.filter((card) => card.tone === "favorável").length;

  if (isDirect(readingMode)) {
    if (challenging > favorable) return "O conjunto é incômodo, e é melhor que seja. Tem coisa aqui que não melhora enquanto você continuar explicando, justificando ou esperando que o desconforto desapareça sozinho.";
    if (favorable > challenging) return "O conjunto até abre caminho, mas carta favorável não é babá. Ela mostra potencial; quem sustenta ou estraga esse potencial é a sua postura.";
    return "O conjunto é misto: existe saída, mas também existe cobrança. A leitura não está dizendo 'fica tranquilo'. Está dizendo: pare de empurrar com a barriga o que já pede atitude.";
  }

  if (challenging > favorable) return "O tom geral pede prudência. Não significa que a leitura seja negativa, mas indica que há algo a encarar com mais honestidade antes de esperar leveza.";
  if (favorable > challenging) return "O tom geral traz abertura. Ainda assim, a leitura não fala de garantia automática; ela mostra que existe espaço para agir com mais confiança se houver presença e responsabilidade.";
  return "O tom geral é misto. A leitura mostra pontos de tensão e de apoio ao mesmo tempo, como se a situação pedisse equilíbrio entre cautela e movimento.";
}

function suitPattern(cards, readingMode = "normal") {
  const suits = cards.reduce((acc, card) => {
    if (card.suit) acc[card.suit] = (acc[card.suit] || 0) + 1;
    return acc;
  }, {});
  const mainSuit = Object.entries(suits).sort((a, b) => b[1] - a[1])[0]?.[0];

  const normalMeanings = {
    Paus: "A presença de Paus destaca ação, energia, iniciativa e vontade. A situação pede movimento, mas também direção para não virar impulso.",
    Copas: "A presença de Copas destaca sentimentos, vínculos e escuta emocional. A situação pede sensibilidade, mas também cuidado para não confundir desejo com realidade.",
    Espadas: "A presença de Espadas destaca pensamento, comunicação e decisão. A situação pede clareza mental, mas também cuidado para que a análise não vire dureza ou ansiedade.",
    Ouros: "A presença de Ouros destaca vida prática, recursos e estabilidade. A situação pede organização concreta, paciência e atenção ao que pode ser sustentado no mundo real."
  };

  const directMeanings = {
    Paus: "Paus coloca ação em destaque. Se você diz que quer mudança, precisa parar de confundir vontade com movimento real.",
    Copas: "Copas puxa emoção para a mesa. Sentir muito não prova que algo é saudável, recíproco ou digno de continuar ocupando tanto espaço.",
    Espadas: "Espadas corta desculpa. Aqui, confusão precisa de fato, conversa e decisão — não de mais voltas mentais.",
    Ouros: "Ouros te puxa para o chão. Desejo, medo e esperança não bastam; importa o que se sustenta na prática."
  };

  if (!mainSuit) {
    return isDirect(readingMode)
      ? "A presença forte de Arcanos Maiores mostra que isso não é só um detalhe. É um padrão pedindo maturidade. Fugir dele só muda o cenário, não muda a lição."
      : "A presença forte de Arcanos Maiores indica que a leitura toca mais em aprendizado, mudança de consciência e amadurecimento do que em acontecimentos isolados.";
  }

  return isDirect(readingMode) ? directMeanings[mainSuit] : normalMeanings[mainSuit];
}

export function interpretCard({ card, position, theme, mood, need, readingMode = "normal" }) {
  const positionContext = getPositionContext(position);
  const themeContext = THEME_CONTEXT[theme?.id] || "na situação consultada";

  if (isDirect(readingMode)) {
    const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
    const needPattern = DIRECT_NEED_PATTERNS[need.id];
    const positionTruth = DIRECT_POSITION_TRUTHS[position] || "A carta está apontando para uma verdade que fica inútil se você apenas concordar e não mudar nada.";

    return [
      `${positionTruth} ${directCardPunch(card)}`,
      `Na prática, ${card.simpleExplanation} Dentro de ${themeContext}, isso aponta para uma coisa: ${directThemePunch(theme)}`,
      `${moodPattern.opening} Então pare de tratar essa carta como curiosidade. Ela está mostrando onde você pode estar alimentando o próprio nó — por medo, apego, pressa, orgulho, carência ou comodismo.`,
      `${needPattern.opening} Se você quer ${need.label.toLowerCase()}, vai precisar pagar o preço disso: olhar para o que incomoda e fazer um ajuste real, não apenas buscar uma frase que te conforte.`,
      `A verdade desta carta: ${card.shadow || "o padrão já apareceu; a escolha agora é encarar ou continuar repetindo com outro nome."}`
    ].join("\n\n");
  }

  return [
    `${positionContext.purpose} ${card.name} aparece aqui trazendo o tema de ${cleanMeaning(card.shortMeaning)} ${themeContext}.`,
    `${card.simpleExplanation} ${positionContext.bridge}`,
    `${mood.readingTone} Nesse contexto, ${card.name} ganha uma leitura mais pessoal: a carta mostra onde sua forma de chegar à situação pode influenciar o modo como você interpreta sinais, escolhas e limites.`,
    `${need.readingTone} Por isso, esta carta não deve ser lida apenas como significado geral do Tarô, mas como uma orientação para transformar percepção em atitude concreta.`,
    `Ponto de atenção: ${card.shadow || "observe onde há excesso, falta de clareza ou repetição de padrão."}`
  ].join("\n\n");
}

export function buildCardAdvice({ card, position, theme, mood, need, readingMode = "normal" }) {
  const themeContext = THEME_CONTEXT[theme?.id] || "na situação consultada";

  if (isDirect(readingMode)) {
    const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
    const needPattern = DIRECT_NEED_PATTERNS[need.id];

    return [
      `${card.advice} Mas não transforme isso em frase bonita para salvar no celular e continuar igual. Aplicado ${themeContext}, o conselho é virar comportamento.`,
      `${moodPattern.advice} ${needPattern.advice}`,
      `A atitude mínima: escolha uma coisa concreta nas próximas 24 horas. Uma conversa. Um limite. Uma pausa. Uma decisão. Uma organização. Um corte de expectativa. Qualquer coisa que prove que você entendeu a leitura e não veio só colecionar sinal.`
    ].join("\n\n");
  }

  return [
    `${card.advice} Aplicado ${themeContext}, esse conselho pede uma atitude que você consiga praticar de verdade, sem transformar a leitura em cobrança impossível.`,
    `${mood.adviceTone} ${need.adviceTone}`,
    `Para esta posição — ${position} — o movimento mais útil é escolher um passo pequeno, verificável e coerente com a energia da carta. A pergunta prática é: o que pode ser feito hoje sem depender de controlar todo o resultado?`
  ].join("\n\n");
}

export function buildReadingOpening({ theme, mood, need, spread, readingMode = "normal" }) {
  if (isDirect(readingMode)) {
    const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
    const needPattern = DIRECT_NEED_PATTERNS[need.id];
    const themePattern = DIRECT_THEME_PATTERNS[theme.id];

    return [
      `Você ativou a verdade nua e crua. Então a leitura não vai tentar te agradar: vai apontar onde você pode estar se enganando, adiando decisão ou chamando de destino aquilo que talvez seja padrão repetido.`,
      `Você escolheu ${theme.label}, chegou ${mood.label.toLowerCase()} e disse que precisa de ${need.label.toLowerCase()}. ${themePattern} ${moodPattern.opening}`,
      `${needPattern.opening} A tiragem ${spread.label} não está aqui para te entregar uma sentença pronta. Ela está aqui para esfregar na sua frente o que precisa ser visto, inclusive se isso for desconfortável.`
    ].join("\n\n");
  }

  return [
    `Esta leitura parte do tema ${theme.label} e do modo como você chegou a ela: ${mood.label.toLowerCase()}. Isso muda a forma de ler as cartas, porque o Tarô não está apenas descrevendo uma situação externa; ele também espelha a postura com que você olha para essa situação agora.`,
    `${mood.readingTone} Ao mesmo tempo, você indicou que precisa de ${need.label.toLowerCase()}. ${need.readingTone}`,
    `A tiragem escolhida foi ${spread.label}. Ela organiza a leitura em ${spread.positions.length} posição${spread.positions.length > 1 ? "ões" : ""}: ${spread.positions.join(", ")}. Isso permite ler cada carta como uma parte da análise, e não como mensagens soltas.`
  ].join("\n\n");
}

export function buildSynthesis({ cards, theme, mood, need, readingMode = "normal" }) {
  const majors = cards.filter((card) => card.arcana === "Maior").length;
  const themeContext = THEME_CONTEXT[theme?.id] || "na situação consultada";
  const cardNames = cards.map((card) => card.name).join(", ");

  const arcanaText = majors >= Math.ceil(cards.length / 2)
    ? isDirect(readingMode)
      ? "Tem Arcano Maior demais para você tratar isso como detalhe. O assunto está cutucando uma lição maior, e a vida costuma repetir lição que a gente se recusa a aprender."
      : "A quantidade de Arcanos Maiores dá peso à leitura. Isso sugere que o tema não deve ser tratado apenas como um episódio passageiro, mas como parte de um aprendizado mais amplo."
    : isDirect(readingMode)
      ? "A presença maior de Arcanos Menores puxa para a vida prática. Ou seja: menos teoria, menos sinal, menos desculpa. O ajuste precisa aparecer no cotidiano."
      : "A presença maior de Arcanos Menores aproxima a leitura da vida prática. Isso sugere que pequenas escolhas, conversas, hábitos e atitudes concretas podem alterar bastante o caminho.";

  if (isDirect(readingMode)) {
    const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
    const needPattern = DIRECT_NEED_PATTERNS[need.id];

    return [
      `O padrão central entre ${cardNames} é este: o tema se complica ${themeContext} quando você tenta transformar percepção em espera, desconforto em confusão ou desejo em justificativa.`,
      `${arcanaText} ${suitPattern(cards, readingMode)}`,
      `${toneFromCards(cards, readingMode)} Como você chegou ${mood.label.toLowerCase()} e busca ${need.label.toLowerCase()}, o recado é direto: ${moodPattern.advice} ${needPattern.advice}`,
      `A parte mais dura: a leitura não serve para terceirizar responsabilidade para as cartas. Ela serve para te devolver o espelho. Se doer, melhor ainda. Dor honesta costuma ser mais útil do que conforto que mantém tudo igual.`
    ].join("\n\n");
  }

  return [
    `O padrão central aparece na combinação entre ${cardNames}. Lidas em conjunto, as cartas mostram como o tema se organiza ${themeContext}: não como uma resposta única, mas como um conjunto de forças que pedem observação e escolha consciente.`,
    `${arcanaText} ${suitPattern(cards)}`,
    `${toneFromCards(cards)} Como você chegou ${mood.label.toLowerCase()} e busca ${need.label.toLowerCase()}, a síntese principal é esta: a leitura pede que você não confunda intensidade interna com urgência externa. Há algo a compreender, algo a ajustar e algo a praticar.`,
    `O ponto mais individual da leitura está no cruzamento entre sua necessidade e as cartas. Se você usar essa leitura apenas para tentar prever o que acontecerá, ela perde força. Se usar como espelho para perceber postura, limite, desejo e próximo passo, ela se torna mais útil.`
  ].join("\n\n");
}

export function buildFinalAdvice({ cards, theme, mood, need, readingMode = "normal" }) {
  const firstCard = cards[0];
  const lastCard = cards[cards.length - 1];
  const themeContext = THEME_CONTEXT[theme?.id] || "na situação consultada";

  if (isDirect(readingMode)) {
    const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
    const needPattern = DIRECT_NEED_PATTERNS[need.id];

    return [
      `Conselho final, sem anestesia: comece pelo que depende de você e pare de fingir que clareza só existe quando não dói. ${moodPattern.advice} ${needPattern.advice}`,
      `${firstCard.name} abre a leitura com ${cleanMeaning(firstCard.shortMeaning)}. ${lastCard.name} fecha ou orienta o conjunto com ${cleanMeaning(lastCard.shortMeaning)}. Entre uma carta e outra, o recado é simples: perceber padrão e continuar igual é só vaidade espiritual com outro nome.`,
      `Nas próximas 24 horas, faça algo que prove que você entendeu. Não precisa ser grandioso: um limite, uma conversa, uma pausa, uma organização, uma decisão ou o corte de uma expectativa que você sabe que está te puxando para o mesmo ciclo. Se você não fizer nada, tudo bem — mas então não chame de destino aquilo que também é omissão.`
    ].join("\n\n");
  }

  return [
    `O conselho final é começar pelo que está sob seu alcance. ${mood.adviceTone} ${need.adviceTone} A leitura não pede que você controle tudo; ela pede que você escolha melhor sua postura diante do que está acontecendo ${themeContext}.`,
    `${firstCard.name} abre a leitura mostrando ${cleanMeaning(firstCard.shortMeaning)}. ${lastCard.name} encerra ou orienta o conjunto trazendo ${cleanMeaning(lastCard.shortMeaning)}. Entre uma coisa e outra, existe um caminho: reconhecer o que está ativo, perceber onde há tensão e transformar a mensagem em uma atitude concreta.`,
    `Na prática, escolha uma ação simples para as próximas 24 horas: uma conversa mais honesta, uma pausa antes de responder, uma organização objetiva, um limite, um pedido de ajuda ou a decisão de não alimentar um padrão repetido. A força desta leitura está menos em prever o futuro e mais em devolver para você uma direção possível agora.`
  ].join("\n\n");
}

export function buildReflection({ theme, mood, need, readingMode = "normal" }) {
  if (isDirect(readingMode)) {
    const moodPattern = DIRECT_MOOD_PATTERNS[mood.id];
    const needPattern = DIRECT_NEED_PATTERNS[need.id];
    return `${moodPattern.reflection} ${needPattern.reflection}`;
  }

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
