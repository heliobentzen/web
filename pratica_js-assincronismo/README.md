# Prática Integrada - Módulos 05 e 06

## Descrição

Esta prática integra os conteúdos dos módulos 05 e 06 por meio de uma aplicação simples de consulta e renderização de tarefas.

## Propósito Didático

O foco é comparar uma implementação mais direta com uma versão mais modular, observando como decisões de organização afetam leitura, manutenção e evolução do código.

O objetivo é comparar duas abordagens:

- [projeto-a](projeto-a): versão concentrada em um único arquivo JavaScript, com manipulação direta de DOM e fluxo assíncrono básico.
- [projeto-b](projeto-b): versão modularizada, com separação de responsabilidades, estados de carregamento e tratamento de erro mais explícito.

## Objetivos de Aprendizagem

- Manipular DOM com JavaScript puro
- Trabalhar com eventos de formulário
- Consumir dados assíncronos com `fetch`
- Tratar erros e estados de carregamento
- Comparar organização de código entre uma versão monolítica e uma modular

## Estrutura

```text
pratica_js-assincronismo/
├── projeto-a/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── projeto-b/
│   ├── api.js
│   ├── app.js
│   ├── index.html
│   └── styles.css
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

Abra [projeto-b/index.html](projeto-b/index.html) no navegador.

## Entrega Sugerida

- Análise comparativa entre as duas versões
- Identificação de problemas de legibilidade e manutenção
- Proposta de melhorias estruturais
- Registro dos testes manuais realizados

Ao final, a turma deve conseguir justificar qual abordagem oferece melhor base para continuar evoluindo a aplicação.

Os detalhes da atividade estão em `task.md`.
