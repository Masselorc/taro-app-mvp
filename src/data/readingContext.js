export const MOODS = [
  {
    id: "confuso",
    label: "Confuso",
    helper: "Quando há muitas informações e pouca clareza.",
    detail: "A leitura deve ajudar a separar sensação, fato, expectativa e medo.",
    icon: "☁",
    readingTone: "Você chega com uma energia de confusão, então as cartas devem ser lidas como um convite para organizar o que está misturado, sem exigir resposta imediata.",
    adviceTone: "Antes de agir, escolha uma coisa para esclarecer primeiro. Clareza costuma aparecer por partes, não como um bloco completo.",
    question: "O que exatamente está confuso: os fatos, seus sentimentos ou a atitude de outra pessoa?"
  },
  {
    id: "ansioso",
    label: "Ansioso",
    helper: "Quando existe urgência por resposta ou controle.",
    detail: "A leitura deve desacelerar a pressa e distinguir intuição de antecipação.",
    icon: "☄",
    readingTone: "Você chega com ansiedade, então as cartas precisam ser lidas com cuidado para não transformar pressa em certeza. A leitura ajuda a respirar antes de concluir.",
    adviceTone: "Separe fatos de cenários imaginados. Uma atitude pequena e concreta vale mais do que tentar resolver tudo de uma vez.",
    question: "Que parte da sua urgência vem da situação real e que parte vem do medo do que pode acontecer?"
  },
  {
    id: "esperancoso",
    label: "Esperançoso",
    helper: "Quando existe abertura para algo melhorar.",
    detail: "A leitura deve acolher a esperança sem alimentar ilusão.",
    icon: "✧",
    readingTone: "Você chega com esperança, então a leitura pode mostrar caminhos de abertura, mas também precisa diferenciar confiança de expectativa sem base.",
    adviceTone: "Sustente a esperança com atitudes coerentes. O melhor sinal é aquele que aparece junto com ações concretas.",
    question: "A sua esperança está sendo alimentada por atitudes reais ou apenas pelo desejo de que algo melhore?"
  },
  {
    id: "cansado",
    label: "Cansado",
    helper: "Quando a situação já consumiu muita energia.",
    detail: "A leitura deve considerar limite, desgaste e necessidade de recuperar forças.",
    icon: "☾",
    readingTone: "Você chega cansado, então as cartas não devem ser lidas como cobrança para fazer mais, mas como orientação para entender onde sua energia está sendo drenada.",
    adviceTone: "Antes de ampliar qualquer esforço, veja o que pode ser simplificado, encerrado ou dividido com alguém.",
    question: "O que está exigindo de você mais energia do que realmente deveria?"
  },
  {
    id: "decidido",
    label: "Decidido",
    helper: "Quando já existe vontade de agir.",
    detail: "A leitura deve ajudar a verificar direção, consequência e maturidade da decisão.",
    icon: "◆",
    readingTone: "Você chega decidido, então a leitura funciona como teste de consciência: ela não precisa travar sua ação, mas pode mostrar onde ajustar rota.",
    adviceTone: "Mantenha firmeza, mas revise consequências. Decisão madura não é pressa; é direção com responsabilidade.",
    question: "Sua decisão está vindo de clareza ou de vontade de acabar logo com a tensão?"
  },
  {
    id: "medo-de-errar",
    label: "Com medo de errar",
    helper: "Quando o receio de escolher pesa mais que a escolha.",
    detail: "A leitura deve reduzir paralisia e mostrar um próximo passo possível.",
    icon: "⚖",
    readingTone: "Você chega com medo de errar, então as cartas devem ser lidas como apoio para diminuir a paralisia, não como obrigação de encontrar uma resposta perfeita.",
    adviceTone: "Procure o próximo passo mais honesto, não a garantia absoluta. Muitas escolhas amadurecem durante o caminho.",
    question: "Qual erro você está tentando evitar: perder algo, se frustrar, decepcionar alguém ou assumir uma consequência?"
  },
  {
    id: "querendo-mudanca",
    label: "Querendo mudança",
    helper: "Quando existe vontade de romper um padrão.",
    detail: "A leitura deve mostrar o que precisa se mover e o que ainda prende a situação.",
    icon: "♢",
    readingTone: "Você chega querendo mudança, então a leitura deve observar o que já não sustenta sua vida do mesmo jeito e qual movimento pode abrir passagem.",
    adviceTone: "Mude primeiro o que depende diretamente de você. Esperar que tudo mude por fora pode manter o mesmo padrão por dentro.",
    question: "Que padrão você já percebeu, mas ainda continua alimentando por hábito, medo ou apego?"
  },
  {
    id: "buscando-confirmacao",
    label: "Buscando confirmação",
    helper: "Quando você já sente algo, mas quer validar.",
    detail: "A leitura deve confirmar, ajustar ou questionar sua impressão inicial.",
    icon: "☌",
    readingTone: "Você chega buscando confirmação, então as cartas devem ser lidas como espelho. Elas podem fortalecer uma percepção, mas também mostrar onde existe projeção ou desejo de ouvir apenas uma resposta.",
    adviceTone: "Compare a leitura com fatos concretos. Confirmação verdadeira costuma trazer paz e responsabilidade, não dependência de sinais repetidos.",
    question: "Você está buscando confirmação para agir melhor ou para não precisar encarar uma decisão?"
  }
];

export const NEEDS = [
  {
    id: "clareza",
    label: "Clareza",
    helper: "Entender melhor o que está acontecendo.",
    detail: "A leitura deve tornar a situação menos nebulosa e mais organizada.",
    icon: "☀",
    readingTone: "Como você busca clareza, cada carta deve ajudar a separar o que é central do que é ruído.",
    adviceTone: "Procure evidências, nomeie o problema e evite decidir com base apenas em impressão.",
    question: "Qual verdade simples você talvez já esteja vendo, mas ainda não assumiu completamente?"
  },
  {
    id: "coragem",
    label: "Coragem",
    helper: "Ganhar força para agir ou se posicionar.",
    detail: "A leitura deve mostrar onde existe medo e onde existe potência.",
    icon: "♌",
    readingTone: "Como você busca coragem, as cartas devem indicar qual parte da situação pede presença, firmeza e ação consciente.",
    adviceTone: "Coragem aqui não é agir sem medo; é escolher um passo possível mesmo sem controle total do resultado.",
    question: "Que atitude você adiaria menos se confiasse um pouco mais em si?"
  },
  {
    id: "cuidado",
    label: "Cuidado",
    helper: "Preservar limites, energia e bem-estar.",
    detail: "A leitura deve priorizar proteção, delicadeza e limites saudáveis.",
    icon: "✿",
    readingTone: "Como você busca cuidado, a leitura deve mostrar onde a situação pede acolhimento, limite e menos cobrança interna.",
    adviceTone: "Cuide primeiro do que está sendo negligenciado: tempo, corpo, descanso, dinheiro, afeto ou silêncio.",
    question: "Que limite ou necessidade sua está pedindo atenção há mais tempo do que deveria?"
  },
  {
    id: "direcao",
    label: "Direção",
    helper: "Saber qual próximo passo faz mais sentido.",
    detail: "A leitura deve transformar reflexão em movimento prático.",
    icon: "◆",
    readingTone: "Como você busca direção, as cartas devem apontar menos para teoria e mais para o próximo movimento possível.",
    adviceTone: "Escolha uma ação concreta, pequena e verificável. Direção se confirma quando você começa a caminhar.",
    question: "Qual é o menor passo real que já colocaria a situação em movimento?"
  },
  {
    id: "encerramento",
    label: "Encerramento",
    helper: "Entender o que precisa terminar ou ser solto.",
    detail: "A leitura deve observar ciclos, desapego e fechamento emocional ou prático.",
    icon: "♢",
    readingTone: "Como você busca encerramento, as cartas devem mostrar o que ainda está aberto, o que já cumpriu seu papel e o que precisa ser liberado.",
    adviceTone: "Encerrar não é apagar o que aconteceu. É retirar sua energia do que não pode mais crescer do mesmo modo.",
    question: "O que você ainda mantém vivo por afeto, medo, culpa ou costume?"
  },
  {
    id: "paciencia",
    label: "Paciência",
    helper: "Saber esperar sem se perder no processo.",
    detail: "A leitura deve ajudar a sustentar tempo, maturação e ritmo.",
    icon: "♒",
    readingTone: "Como você busca paciência, as cartas devem mostrar o que está em maturação e o que não deve ser forçado antes da hora.",
    adviceTone: "Esperar não precisa ser passividade. Use o tempo para observar, ajustar e fortalecer sua base.",
    question: "O que você pode cuidar enquanto a resposta final ainda não aparece?"
  },
  {
    id: "confirmacao-interna",
    label: "Confirmação interna",
    helper: "Reconhecer o que você já sente ou percebe.",
    detail: "A leitura deve aproximar percepção, intuição e responsabilidade.",
    icon: "☌",
    readingTone: "Como você busca confirmação interna, as cartas devem funcionar como espelho daquilo que talvez você já perceba, mas ainda não organizou em palavras.",
    adviceTone: "Confie no que se repete de forma calma e consistente. Desconfie apenas da urgência que exige certeza imediata.",
    question: "Qual percepção volta sempre, mesmo quando você tenta ignorá-la?"
  },
  {
    id: "alerta",
    label: "Um alerta",
    helper: "Perceber riscos, excessos ou pontos cegos.",
    detail: "A leitura deve destacar cuidado, prudência e sinais que merecem atenção.",
    icon: "⚡",
    readingTone: "Como você busca um alerta, as cartas devem ser lidas com atenção aos excessos, omissões e pontos que podem estar sendo minimizados.",
    adviceTone: "Observe sinais práticos, não apenas sensações. Um alerta útil aponta cuidado, não medo permanente.",
    question: "Que sinal concreto você já viu, mas talvez tenha diminuído para não mexer na situação?"
  }
];
