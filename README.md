# Desenvolvimento Web

Material didático da disciplina de **Desenvolvimento Web** do curso superior de tecnologia
em **Análise e Desenvolvimento de Sistemas** do **IFPE**.

A trilha vai do funcionamento da web até um projeto front-end com ferramental moderno,
sempre sobre padrões abertos e com prática executável em cada módulo.

---

## Trilha da disciplina

Os módulos são **sequenciais**: cada um assume o anterior.

| # | Módulo | Conteúdo | Horas |
| --- | --- | --- | --- |
| 01 | [Arquitetura da Web](modulos/01-arquitetura-web/README.md) | HTTP, HTTPS, renderização, DOM e Web Standards | 8 |
| 02 | [HTML Semântico](modulos/02-html-semantico/README.md) | Estrutura, semântica, formulários e SEO | 8 |
| 03 | [CSS Moderno](modulos/03-css-moderno/README.md) | Cascata, Flexbox, Grid, responsividade e container queries | 10 |
| 04 | [Acessibilidade Web](modulos/04-acessibilidade/README.md) | WCAG 2.2, ARIA, teclado e legislação brasileira | 8 |
| 05 | [JavaScript](modulos/05-javascript/README.md) | Linguagem, coleções, DOM, eventos e JSON | 12 |
| 06 | [Assincronismo e APIs](modulos/06-assincronismo/README.md) | Event loop, Promises, `fetch` e tratamento de erros | 10 |
| 07 | [DevTools](modulos/07-devtools/README.md) | Depuração, Network, Core Web Vitals e Lighthouse | 8 |
| 08 | [Ecossistema Front-End](modulos/08-ecossistema-frontend/README.md) | Node, npm, módulos ES, Vite e build | 10 |
| — | [Práticas integradas](#práticas-integradas) | Projetos comparativos | 6 |
| | **Total** | | **80** |

A distribuição de horas é uma sugestão para 20 semanas com 4 h/semana. Ajuste conforme o
plano de ensino da turma.

### Dependências entre módulos

```text
01 Arquitetura
     ↓
02 HTML ──────────────┐
     ↓                │
03 CSS ───────────────┤
     ↓                │
04 Acessibilidade ────┤  (04 depende de 02 e 03)
     ↓                │
05 JavaScript ────────┤
     ↓                │
06 Assincronismo ─────┤  (06 depende de 05)
     ↓                │
07 DevTools ──────────┤  (07 revisita 01 a 06)
     ↓                │
08 Ecossistema ───────┘
```

---

## Como usar este material

Cada módulo tem a mesma estrutura:

```text
modulos/NN-nome/
├── README.md      apostila — o texto de estudo, completo e autossuficiente
├── slides.md      deck Marp para a aula expositiva (nos módulos que têm)
└── praticas/      exercícios executáveis, numerados por dificuldade
```

E cada `README.md` segue a mesma sequência: objetivos de aprendizagem → roteiro →
conteúdo progressivo → erros comuns → checklist de autoavaliação → práticas →
exercícios em três níveis → referências.

### Para o aluno

1. Leia a apostila (`README.md`) do módulo, executando os exemplos conforme aparecem —
   os blocos **Experimente** existem para isso.
2. Faça as práticas na ordem numerada.
3. Preencha o **checklist de autoavaliação**. Item não marcado é ponto a revisar.
4. Resolva os exercícios: nível 1 para fixar, nível 2 para aplicar, nível 3 para aprofundar.
5. Só avance quando o checklist estiver completo.

### Para o professor

- Os `slides.md` são decks [Marp](https://marp.app/) prontos para projetar. Exporte com a
  extensão do VS Code ou por `npx @marp-team/marp-cli@latest arquivo.md --pdf`.
- Os exercícios de nível 3 servem bem como avaliação prática ou trabalho de unidade.
- Os blocos **Erros comuns** de cada módulo funcionam como roteiro de plantão de dúvidas.
- O padrão de organização está descrito em [`assets/padrao-do-material.md`](assets/padrao-do-material.md);
  o tema visual dos slides, em [`assets/tema-marp.md`](assets/tema-marp.md).

---

## Práticas integradas

Atividades que atravessam mais de um módulo, sempre comparando duas implementações do
mesmo problema para discutir decisões de projeto.

| Prática | Módulos | Foco |
| --- | --- | --- |
| [JavaScript e Assincronismo](pratica_js-assincronismo/README.md) | 05 e 06 | Versão monolítica contra versão modular, com estados e tratamento de erro |
| [Ecossistema Front-end](pratica_ecossistema_frontend/README.md) | 08 | Projeto sem ferramental contra projeto com Vite |

---

## Pré-requisitos

- Navegador moderno atualizado (Chrome, Firefox, Edge ou Safari)
- Editor de código — [VS Code](https://code.visualstudio.com/) é o recomendado
- Conta no [GitHub](https://github.com/) para versionar as atividades
- **Node.js LTS** (versão 22 ou superior) — necessário a partir do Módulo 08

Extensões úteis no VS Code: *Live Server*, *Marp for VS Code*, *axe Accessibility Linter*
e *ESLint*.

---

## Princípios do material

- **Padrões abertos.** HTML Living Standard, ECMAScript, CSS Specifications e WCAG — não
  o comportamento particular de um navegador ou biblioteca.
- **Recursos disponíveis hoje.** Só entra no material o que é
  [Baseline widely available](https://web.dev/baseline), salvo aviso explícito no texto.
- **Acessibilidade desde o primeiro módulo**, não como capítulo final.
- **Todo exemplo é executável.** Nada de pseudocódigo apresentado como código real.
- **Fundamentos antes de framework.** Quem entende a plataforma aprende qualquer
  framework; o contrário não se sustenta.

---

## Contribuindo

Correções e sugestões são bem-vindas por *issue* ou *pull request*. Ao propor mudanças no
conteúdo, siga o padrão descrito em [`assets/padrao-do-material.md`](assets/padrao-do-material.md).

---

**Prof. Hélio Bentzen** · IFPE — Instituto Federal de Pernambuco
