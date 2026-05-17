# Tarô App MVP

Protótipo funcional em React/Vite para leitura individualizada de Tarô, simbólica, reflexiva e não determinista.

## O que está implementado

- Seleção de tema: leitura geral, amor, trabalho, decisão, espiritualidade, dinheiro e autocuidado.
- Campo de pergunta do usuário.
- Escolha automática ou manual de tiragem.
- Tiragens: carta única, três cartas, relacionamento, decisão e cruz simples.
- Baralho completo com 78 cartas.
- Sorteio sem repetição.
- Revelação de cartas.
- Interpretação por carta, posição e tema.
- Síntese, conselho e pergunta reflexiva.
- Tratamento prudente de temas sensíveis.
- Histórico local no navegador.

## Como rodar

```bash
npm install
npm run dev
```

Depois acesse o endereço exibido pelo Vite.

## Escopo do MVP

Este MVP é frontend-only. Ele não possui backend, banco de dados, autenticação, integração com LLM ou persistência remota. O histórico é salvo no `localStorage` do navegador.

## Diretrizes de produto

O app não promete previsão absoluta, diagnóstico, decisão jurídica, decisão financeira ou certeza sobre terceiros. As leituras são apresentadas como interpretações simbólicas e reflexivas.
