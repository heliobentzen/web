# Prática Integrada - Módulo 08

## Descrição

Esta prática apresenta o ecossistema front-end moderno a partir da comparação entre uma versão sem tooling e uma versão com Vite.

## Propósito Didático

O foco é mostrar quando uma aplicação simples pode ser mantida sem ferramentas adicionais e quando faz sentido adotar módulos organizados, scripts padronizados e um fluxo com build tool.

## Objetivos de Aprendizagem

- Entender a diferença entre um projeto direto no navegador e um projeto com build tool
- Trabalhar com módulos ES
- Usar `npm` e scripts de desenvolvimento
- Executar um projeto com Vite
- Discutir organização de pastas e escalabilidade

## Estrutura

```text
pratica_ecossistema_frontend/
├── projeto-a/
│   ├── data.js
│   ├── index.html
│   ├── main.js
│   └── styles.css
├── projeto-b/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── catalogo.js
│       ├── main.js
│       └── styles.css
├── COMPARACAO_DIDATICA.md
├── GUIA_EXECUCAO_E_ANALISE.md
├── README.md
├── VERSAO_CORRIGIDA.md
└── task.md
```

## Como Executar

### Projeto A

Abra [projeto-a/index.html](projeto-a/index.html) no navegador.

### Projeto B

```bash
cd pratica_ecossistema_frontend/projeto-b
npm install
npm run dev
```

## Foco Didático

O [projeto-a](projeto-a) serve como ponto de partida simples. O [projeto-b](projeto-b) mostra a transição para uma base mais próxima do fluxo de desenvolvimento atual.

Ao final, a turma deve reconhecer os custos e benefícios dessa transição e identificar quando ela vale a pena.
