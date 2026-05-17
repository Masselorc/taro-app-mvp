const majorCards = [
  ["major-00", "O Louco", "☄", "Começos, liberdade e coragem para iniciar.", "O Louco fala de um novo caminho. Ele mostra vontade de experimentar, mas também pede atenção para que entusiasmo não vire imprudência.", "Dê espaço ao novo, mas caminhe com atenção aos riscos práticos."],
  ["major-01", "O Mago", "✦", "Iniciativa, foco e uso dos próprios recursos.", "O Mago mostra que você já tem ferramentas para agir. A questão principal é usar energia, inteligência e intenção de forma organizada.", "Escolha um objetivo claro e transforme intenção em ação concreta."],
  ["major-02", "A Sacerdotisa", "☾", "Intuição, silêncio e escuta interior.", "A Sacerdotisa indica que nem tudo está visível. Ela pede observação, reserva e confiança na percepção interna.", "Observe mais antes de agir e escute os sinais sutis da situação."],
  ["major-03", "A Imperatriz", "✿", "Criação, cuidado e desenvolvimento.", "A Imperatriz fala de crescimento. Ela mostra algo que pode florescer quando recebe atenção, cuidado e presença.", "Alimente o que é saudável e dê tempo para a situação amadurecer."],
  ["major-04", "O Imperador", "♜", "Estrutura, limites e responsabilidade.", "O Imperador pede organização. Ele indica a necessidade de colocar ordem, assumir responsabilidades e definir limites claros.", "Organize a situação sem endurecer demais."],
  ["major-05", "O Hierofante", "☉", "Tradição, orientação e valores.", "O Hierofante fala de aprendizado, referências e princípios. Ele sugere buscar orientação sem perder o próprio discernimento.", "Procure bons conselhos, mas decida com consciência própria."],
  ["major-06", "Os Enamorados", "♡", "Escolha, vínculo e alinhamento de valores.", "Os Enamorados mostram uma decisão importante. A carta pede coerência entre desejo, afeto e valores pessoais.", "Escolha o caminho que respeita seus valores, não apenas o impulso do momento."],
  ["major-07", "O Carro", "◆", "Direção, avanço e força de vontade.", "O Carro indica movimento. Ele favorece progresso quando existe foco, disciplina e controle dos impulsos.", "Avance com direção clara e não deixe a pressa conduzir suas escolhas."],
  ["major-08", "A Justiça", "⚖", "Equilíbrio, verdade e consequência.", "A Justiça pede lucidez. Ela mostra que escolhas geram consequências e que fatos precisam ser vistos com honestidade.", "Avalie a situação com equilíbrio, responsabilidade e atenção aos detalhes."],
  ["major-09", "O Eremita", "✶", "Recolhimento, prudência e sabedoria.", "O Eremita indica pausa e maturidade. Ele pede menos ruído externo e mais escuta do que realmente importa.", "Reduza a pressa e procure clareza antes de decidir."],
  ["major-10", "A Roda da Fortuna", "◎", "Mudança, ciclos e adaptação.", "A Roda mostra que a situação está em movimento. Ela lembra que fases mudam e que adaptação é parte do processo.", "Observe o ciclo atual e ajuste sua postura ao que está mudando."],
  ["major-11", "A Força", "♌", "Coragem serena, paciência e autocontrole.", "A Força fala de domínio interior. Ela não sugere imposição, mas firmeza calma diante do que exige maturidade.", "Aja com firmeza, mas sem agressividade."],
  ["major-12", "O Enforcado", "☍", "Pausa, revisão e nova perspectiva.", "O Enforcado mostra que forçar uma resposta agora pode não ajudar. A carta pede mudança de olhar e aceitação temporária da pausa.", "Mude o ponto de vista antes de insistir na mesma saída."],
  ["major-13", "A Mor" + "te", "♢", "Encerramento, transição e renovação.", "Esta carta fala de fim de ciclo. Ela não deve ser lida como ameaça, mas como sinal de transformação e necessidade de desapego.", "Reconheça o que precisa terminar para que algo novo se reorganize."],
  ["major-14", "A Temperança", "♒", "Equilíbrio, conciliação e medida.", "A Temperança pede calma e integração. Ela mostra que a melhor resposta pode estar no meio-termo e na paciência.", "Busque equilíbrio e evite extremos."],
  ["major-15", "O Dia" + "bo", "♑", "Apego, desejo e padrões que limitam.", "Esta carta mostra vínculos, desejos ou hábitos que podem estar tirando autonomia. Ela pede honestidade sobre dependências e excessos.", "Observe onde existe apego e recupere poder de escolha."],
  ["major-16", "A Torre", "⚡", "Ruptura, verdade e reconstrução.", "A Torre mostra que algo frágil pode não se sustentar. Embora desconfortável, ela abre espaço para uma base mais verdadeira.", "Encare o que precisa ser revisto e reconstrua com mais honestidade."],
  ["major-17", "A Estrela", "✧", "Esperança, inspiração e confiança gradual.", "A Estrela traz alívio e renovação. Ela fala de esperança, mas também pede constância para que a confiança se torne caminho real.", "Recupere a fé no processo sem abandonar atitudes concretas."],
  ["major-18", "A Lua", "☽", "Sensibilidade, dúvida e necessidade de clareza.", "A Lua mostra que a situação pode estar confusa. Ela pede cuidado com ansiedade, projeções e conclusões precipitadas.", "Espere mais clareza antes de tomar decisões definitivas."],
  ["major-19", "O Sol", "☀", "Clareza, vitalidade e abertura.", "O Sol traz luz para a leitura. Ele favorece transparência, simplicidade e confiança no que pode ser visto com clareza.", "Busque conversas claras e escolhas simples."],
  ["major-20", "O Julgamento", "☌", "Revisão, chamado e consciência.", "O Julgamento fala de despertar. Ele pede revisão de padrões e coragem para responder a uma nova fase com maturidade.", "Aprenda com o passado e escolha com mais consciência."],
  ["major-21", "O Mundo", "⊕", "Conclusão, integração e realização.", "O Mundo indica fechamento de ciclo e integração. Ele mostra que uma etapa pode se completar com mais maturidade.", "Reconheça o aprendizado e avance para a próxima fase."
  ]
];

const suits = {
  Paus: { element: "Fogo", symbol: "🔥", domain: "ação, energia, vontade e criatividade", simple: "Esta carta fala de iniciativa, coragem e movimento." },
  Copas: { element: "Água", symbol: "💧", domain: "sentimentos, vínculos, afetos e intuição", simple: "Esta carta fala de emoções, relações e escuta do coração." },
  Espadas: { element: "Ar", symbol: "🜁", domain: "pensamento, comunicação, conflito e decisão", simple: "Esta carta fala de ideias, conversas, escolhas e tensões mentais." },
  Ouros: { element: "Terra", symbol: "◈", domain: "trabalho, recursos, corpo e estabilidade", simple: "Esta carta fala de vida prática, segurança e resultados concretos." }
};

const ranks = [
  ["as", "Ás", "Um começo se abre.", "Existe potencial, mas ele ainda precisa ser cuidado para se tornar realidade."],
  ["dois", "Dois", "Há uma escolha ou relação em evidência.", "A situação pede equilíbrio, diálogo e percepção dos dois lados."],
  ["tres", "Três", "Algo começa a se desenvolver.", "A carta favorece expressão, colaboração e crescimento inicial."],
  ["quatro", "Quatro", "A situação pede estrutura.", "Pode ser hora de estabilizar, descansar ou organizar melhor as bases."],
  ["cinco", "Cinco", "Existe tensão ou desafio.", "A carta pede adaptação e cuidado para não reagir no impulso.", "desafiadora"],
  ["seis", "Seis", "Um ajuste começa a ser possível.", "A carta indica reequilíbrio, reconciliação ou retomada gradual de harmonia."],
  ["sete", "Sete", "Há um teste de estratégia.", "A situação pede avaliação, paciência e atenção ao que não está óbvio."],
  ["oito", "Oito", "Há movimento e esforço em curso.", "A carta mostra repetição, prática ou avanço que depende de constância."],
  ["nove", "Nove", "O tema está amadurecendo.", "A carta indica intensidade, aprendizado acumulado e preparação para um desfecho."],
  ["dez", "Dez", "Um ciclo chega ao limite.", "A carta mostra culminância, excesso ou fechamento de uma etapa."],
  ["pajem", "Pajem", "Há aprendizado e abertura.", "A carta mostra curiosidade, mensagem, começo de maturidade ou postura de aprendiz."],
  ["cavaleiro", "Cavaleiro", "Há movimento e busca.", "A carta indica ação, deslocamento ou impulso direcionado para um objetivo."],
  ["rainha", "Rainha", "Há maturidade interna.", "A carta mostra domínio emocional, mental, criativo ou prático a partir de presença e percepção."],
  ["rei", "Rei", "Há maturidade ativa.", "A carta indica liderança, responsabilidade e capacidade de conduzir a situação com firmeza."]
];

function majorCard([id, name, symbol, shortMeaning, simpleExplanation, advice]) {
  return {
    id,
    name,
    arcana: "Maior",
    symbol,
    image: null,
    shortMeaning,
    simpleExplanation,
    essential: simpleExplanation,
    light: simpleExplanation,
    shadow: `O ponto de atenção é evitar distorções ligadas a ${shortMeaning.toLowerCase()}`,
    advice,
    obstacle: `O desafio desta carta é lidar com ${shortMeaning.toLowerCase()} sem perder clareza.`,
    trend: `A tendência é que o tema de ${shortMeaning.toLowerCase()} ganhe importância na situação.`,
    caution: "Esta carta deve ser lida como símbolo, não como certeza absoluta.",
    tone: ["A Torre", "A Mor" + "te", "O Dia" + "bo", "A Lua"].includes(name) ? "desafiadora" : ["O Sol", "A Estrela", "O Mundo"].includes(name) ? "favorável" : "neutra"
  };
}

function minorCard([rankId, rank, shortMeaning, simpleExplanation, tone = "neutra"], suit) {
  const suitData = suits[suit];
  return {
    id: `minor-${suit.toLowerCase()}-${rankId}`,
    name: `${rank} de ${suit}`,
    arcana: "Menor",
    suit,
    element: suitData.element,
    symbol: suitData.symbol,
    image: null,
    shortMeaning,
    simpleExplanation: `${simpleExplanation} No naipe de ${suit}, o tema aparece no campo de ${suitData.domain}.`,
    essential: `${simpleExplanation} ${suitData.simple}`,
    light: `Esta carta favorece uma expressão mais consciente de ${suitData.domain}.`,
    shadow: `O ponto de atenção é o excesso, a falta ou a confusão no campo de ${suitData.domain}.`,
    advice: `Observe como ${suitData.domain} aparece na sua pergunta e escolha uma postura mais clara e responsável.`,
    obstacle: `O bloqueio pode estar na forma de lidar com ${suitData.domain}.`,
    trend: `A tendência envolve acontecimentos ou percepções ligados a ${suitData.domain}.`,
    caution: "Interprete esta carta conforme a posição, a pergunta e as cartas vizinhas.",
    tone
  };
}

export const TAROT_DECK = [
  ...majorCards.map(majorCard),
  ...Object.keys(suits).flatMap((suit) => ranks.map((rank) => minorCard(rank, suit)))
];
