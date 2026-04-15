# Módulo 04 – Acessibilidade Web (a11y)

## Objetivos

Ao final deste módulo você será capaz de:

- Compreender o que é acessibilidade web e por que ela é fundamental
- Conhecer as diretrizes WCAG 2.1/2.2 e seus níveis de conformidade
- Usar atributos ARIA corretamente
- Implementar navegação por teclado
- Garantir contraste de cores adequado
- Testar acessibilidade com ferramentas reais

---

## 1. O que é Acessibilidade Web?

Acessibilidade web (abreviada como **a11y** – "a" + 11 letras + "y") significa que **todos os usuários**, independentemente de suas capacidades físicas, cognitivas ou tecnológicas, podem perceber, entender, navegar e interagir com sites e aplicações web.

### 1.1 Quem se beneficia?

- Pessoas com **deficiência visual** (usando leitores de tela como NVDA, JAWS, VoiceOver)
- Pessoas com **deficiência auditiva** (precisam de legendas em vídeos)
- Pessoas com **deficiência motora** (navegam apenas com teclado ou dispositivos de entrada alternativos)
- Pessoas com **deficiências cognitivas** (TDAH, dislexia – se beneficiam de layout claro e linguagem simples)
- Usuários com **conexão lenta** (alt text quando imagem não carrega)
- Usuários em **ambientes adversos** (sol forte, mão ocupada)
- **Robôs de busca** (SEO se beneficia das mesmas práticas de acessibilidade)

> 🌍 Segundo a OMS, mais de 1 bilhão de pessoas no mundo têm alguma deficiência.

### 1.2 Base Legal (Brasil)

- **Lei Brasileira de Inclusão (LBI / Lei nº 13.146/2015)** – Art. 63: sites de empresas e órgãos governamentais devem ser acessíveis.
- **Decreto nº 5.296/2004** – Exige acessibilidade em serviços públicos digitais.
- **e-MAG** (Modelo de Acessibilidade em Governo Eletrônico) – padrão para sites governamentais.

---

## 2. WCAG – Web Content Accessibility Guidelines

O WCAG é o padrão internacional de acessibilidade publicado pelo W3C. A versão atual é **WCAG 2.2** (2023).

### 2.1 Os 4 Princípios (POUR)

| Princípio | Descrição |
|-----------|-----------|
| **P**erceptível | Informações e UI devem ser apresentáveis a todos os sentidos |
| **O**perável | UI e navegação devem ser operáveis por todos |
| **C**ompreensível | Informação e operação da UI devem ser compreensíveis |
| **R**obusta | Conteúdo deve ser interpretável por tecnologias assistivas |

### 2.2 Níveis de Conformidade

| Nível | Descrição | Meta |
|-------|-----------|------|
| **A** | Critérios básicos | Mínimo aceitável |
| **AA** | Padrão do mercado | Meta recomendada para a maioria dos sites |
| **AAA** | Máximo | Difícil de atingir em todo o site |

### 2.3 Critérios Essenciais (Nível AA)

**1.1.1 – Conteúdo não textual (A)**
```html
<!-- ✅ Correto -->
<img src="grafico.png" alt="Gráfico de vendas mostrando crescimento de 23% em 2024">

<!-- ✅ Imagem decorativa -->
<img src="divider.png" alt="">

<!-- ❌ Errado -->
<img src="grafico.png">
```

**1.3.1 – Informação e relações (A)**
```html
<!-- ✅ Use estrutura semântica -->
<table>
  <thead><tr><th scope="col">Nome</th><th scope="col">Valor</th></tr></thead>
  <tbody><tr><td>Produto A</td><td>R$ 50</td></tr></tbody>
</table>

<!-- ❌ Não use tabelas para layout -->
```

**1.4.3 – Contraste mínimo (AA)**
- Texto normal: proporção mínima **4.5:1**
- Texto grande (≥18pt / ≥14pt negrito): proporção mínima **3:1**

**2.1.1 – Teclado (A)**
- Toda funcionalidade deve ser acessível via teclado

**2.4.7 – Foco visível (AA)**
```css
/* ✅ Nunca remova o outline sem alternativa */
:focus {
  outline: 3px solid #0d6efd;
  outline-offset: 2px;
}

/* ❌ Nunca faça isso sem alternativa */
* { outline: none; }
```

**3.1.1 – Idioma da página (A)**
```html
<html lang="pt-BR">
```

---

## 3. ARIA – Accessible Rich Internet Applications

ARIA é um conjunto de atributos HTML que adicionam semântica a elementos que não a possuem nativamente.

> **Regra de ouro**: Prefira sempre HTML semântico nativo. Use ARIA apenas quando o HTML semântico não for suficiente.

### 3.1 Roles

```html
<!-- LANDMARKS: ajudam leitores de tela a navegar -->
<header role="banner">...</header>       <!-- já implícito em <header> -->
<nav role="navigation">...</nav>         <!-- já implícito em <nav> -->
<main role="main">...</main>             <!-- já implícito em <main> -->
<aside role="complementary">...</aside>  <!-- já implícito em <aside> -->
<footer role="contentinfo">...</footer>  <!-- já implícito em <footer> -->

<!-- Roles para componentes sem equivalente semântico -->
<div role="dialog" aria-modal="true" aria-labelledby="dialog-titulo">
  <h2 id="dialog-titulo">Confirmar exclusão</h2>
  ...
</div>

<div role="alert">
  Formulário enviado com sucesso!
</div>

<div role="status" aria-live="polite">
  3 resultados encontrados.
</div>

<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="painel-1">Aba 1</button>
  <button role="tab" aria-selected="false" aria-controls="painel-2">Aba 2</button>
</div>
<div role="tabpanel" id="painel-1">Conteúdo da aba 1</div>
```

### 3.2 Estados e Propriedades ARIA

```html
<!-- aria-label: rótulo acessível alternativo -->
<button aria-label="Fechar diálogo">✕</button>
<nav aria-label="Navegação principal">...</nav>

<!-- aria-labelledby: associar ao texto de outro elemento -->
<div role="dialog" aria-labelledby="titulo-dialog">
  <h2 id="titulo-dialog">Confirmar ação</h2>
</div>

<!-- aria-describedby: associar a texto descritivo -->
<input
  type="password"
  aria-describedby="senha-requisitos"
>
<p id="senha-requisitos">A senha deve ter pelo menos 8 caracteres.</p>

<!-- aria-expanded: estado de elementos que podem expandir/colapsar -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>...</ul>

<!-- aria-hidden: ocultar da árvore de acessibilidade -->
<span aria-hidden="true">👋</span>  <!-- emojis decorativos -->

<!-- aria-required: campo obrigatório -->
<input type="email" aria-required="true">

<!-- aria-invalid: campo com erro -->
<input type="email" aria-invalid="true" aria-describedby="email-erro">
<span id="email-erro" role="alert">E-mail inválido.</span>

<!-- aria-live: anunciar mudanças dinâmicas -->
<div aria-live="polite">Carregando resultados...</div>    <!-- aguarda pausa -->
<div aria-live="assertive">Erro crítico!</div>             <!-- interrompe imediatamente -->

<!-- aria-current: indicar item atual em navegações -->
<a href="/sobre" aria-current="page">Sobre</a>
<li aria-current="step">Passo 2 de 3</li>
```

---

## 4. Gerenciamento de Foco

O foco indica onde a interação do teclado está. Gerenciá-lo corretamente é essencial.

```css
/* Indicador de foco visível */
:focus-visible {
  outline: 3px solid #0d6efd;
  outline-offset: 3px;
  border-radius: 4px;
}
```

```javascript
// Mover foco ao abrir um modal
function abrirModal(modal) {
  modal.removeAttribute('hidden')
  modal.setAttribute('aria-modal', 'true')

  // Salvar elemento que abriu o modal
  modal.opener = document.activeElement

  // Mover foco para o primeiro elemento focável
  const primeiroBotao = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  primeiroBotao?.focus()
}

// Restaurar foco ao fechar
function fecharModal(modal) {
  modal.setAttribute('hidden', '')
  modal.opener?.focus()  // retorna o foco ao elemento que abriu
}

// Aprisionar foco dentro do modal (focus trap)
function armadilhaDeFoco(event, modal) {
  const focaveis = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const primeiro = focaveis[0]
  const ultimo = focaveis[focaveis.length - 1]

  if (event.key === 'Tab') {
    if (event.shiftKey && document.activeElement === primeiro) {
      event.preventDefault()
      ultimo.focus()
    } else if (!event.shiftKey && document.activeElement === ultimo) {
      event.preventDefault()
      primeiro.focus()
    }
  }

  if (event.key === 'Escape') {
    fecharModal(modal)
  }
}
```

---

## 5. Links e Botões Acessíveis

```html
<!-- Links: sempre devem ter texto descritivo -->

<!-- ✅ Correto -->
<a href="/artigo-html">Leia o artigo sobre HTML semântico</a>
<a href="/pdf/relatorio.pdf" aria-label="Baixar Relatório Anual 2024 (PDF, 2MB)">
  📄 Baixar relatório
</a>

<!-- ❌ Evitar: texto não descritivo -->
<a href="/artigo">Clique aqui</a>
<a href="/pdf">Leia mais</a>

<!-- Botões: use <button> para ações, <a> para navegação -->

<!-- ✅ Correto: botão com ícone tem aria-label -->
<button type="button" aria-label="Excluir item">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>

<!-- ✅ Botão de toggle com aria-expanded -->
<button type="button" aria-expanded="false" aria-controls="menu-principal">
  ☰ Menu
</button>

<!-- ❌ Errado: div ou span como botão sem semântica -->
<div onclick="acao()">Clique</div>
```

---

## 6. Formulários Acessíveis

```html
<form>
  <!-- ✅ SEMPRE associe label ao input com for/id correspondentes -->
  <label for="nome">Nome completo *</label>
  <input
    type="text"
    id="nome"
    name="nome"
    required
    aria-required="true"
    autocomplete="name"
  >

  <!-- Mensagem de erro acessível -->
  <label for="email">E-mail *</label>
  <input
    type="email"
    id="email"
    aria-required="true"
    aria-invalid="true"
    aria-describedby="email-dica email-erro"
  >
  <span id="email-dica">Informe seu e-mail principal.</span>
  <span id="email-erro" role="alert">
    Por favor, informe um e-mail válido.
  </span>

  <!-- Grupos de opções com fieldset/legend -->
  <fieldset>
    <legend>Notificações *</legend>
    <label>
      <input type="radio" name="notif" value="email" required>
      Por e-mail
    </label>
    <label>
      <input type="radio" name="notif" value="sms">
      Por SMS
    </label>
  </fieldset>

  <!-- Indicar campos obrigatórios claramente -->
  <p role="note">
    <span aria-hidden="true">*</span> Campos obrigatórios
  </p>
</form>
```

---

## 7. Imagens e Mídias

```html
<!-- Texto alternativo adequado -->
<!-- ✅ Imagem informativa: descrever o CONTEÚDO e CONTEXTO -->
<img src="foto-equipe.jpg" alt="Equipe de 8 desenvolvedores reunidos na sala de conferência">

<!-- ✅ Imagem funcional (botão/link) -->
<a href="/">
  <img src="logo.png" alt="TechBlog – Ir para a página inicial">
</a>

<!-- ✅ Imagem decorativa: alt vazio -->
<img src="wave-divider.svg" alt="">

<!-- ✅ Gráfico complexo: descrever tendências + fornecer dados em tabela -->
<figure>
  <img src="grafico-vendas.png" alt="Ver descrição abaixo">
  <figcaption>
    Vendas cresceram 45% no Q1 e 23% no Q2 de 2024 comparado a 2023.
    <details>
      <summary>Dados completos em tabela</summary>
      <table>...</table>
    </details>
  </figcaption>
</figure>

<!-- Vídeo: sempre forneça legendas e audiodescrição -->
<video controls>
  <source src="tutorial.mp4" type="video/mp4">
  <track kind="subtitles" src="legendas-pt.vtt" srclang="pt" label="Português" default>
  <track kind="descriptions" src="audiodesc.vtt" srclang="pt" label="Audiodescrição">
</video>
```

---

## 8. Contraste de Cores

Ferramentas para verificar contraste:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser (app)](https://www.tpgi.com/color-contrast-checker/)
- DevTools do Chrome (Elements > Accessibility)

**Proporções mínimas WCAG 2.2 (AA):**

| Contexto | Proporção mínima |
|----------|-----------------|
| Texto normal (< 18pt / < 14pt bold) | 4.5:1 |
| Texto grande (≥ 18pt / ≥ 14pt bold) | 3:1 |
| Componentes de UI e gráficos | 3:1 |

```css
/* Exemplos de combinações aprovadas */

/* ✅ Azul sobre branco: 8.59:1 (passa AA e AAA) */
body { background: white; color: #0057b8; }

/* ✅ Branco sobre azul primário: 4.54:1 (passa AA) */
.btn { background: #0d6efd; color: white; }

/* ❌ Cinza claro sobre branco: 1.6:1 (FALHA) */
.placeholder { color: #cccccc; }

/* ✅ Cinza suficientemente escuro: 4.54:1 */
.metadados { color: #767676; }
```

---

## 9. Testando Acessibilidade

### 9.1 Ferramentas automáticas

| Ferramenta | Uso |
|------------|-----|
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/) | DevTools > Lighthouse > Accessibility |
| [axe DevTools](https://www.deque.com/axe/) | Extensão de navegador |
| [WAVE](https://wave.webaim.org/) | Extensão ou site online |
| [Accessibility Insights](https://accessibilityinsights.io/) | Extensão Microsoft |

> ⚠️ Ferramentas automáticas detectam apenas ~30–40% dos problemas. Teste manual é essencial.

### 9.2 Teste com teclado

Navegue pelo site **apenas com o teclado**:
- `Tab` – próximo elemento focável
- `Shift+Tab` – elemento anterior
- `Enter` / `Space` – ativar links e botões
- `Arrows` – navegar em menus, listas, tabs
- `Escape` – fechar diálogos, menus

### 9.3 Teste com leitor de tela

| Leitor de tela | Sistema | Gratuito? |
|---------------|---------|-----------|
| NVDA | Windows | ✅ Sim |
| JAWS | Windows | ❌ Pago |
| VoiceOver | macOS / iOS | ✅ Nativo |
| TalkBack | Android | ✅ Nativo |
| Orca | Linux | ✅ Sim |

---

## Práticas

| # | Arquivo | Descrição |
|---|---------|-----------|
| 01 | [ARIA e Roles](praticas/01-aria-roles.html) | Landmarks, roles e atributos ARIA |
| 02 | [Formulário Acessível](praticas/02-formulario-acessivel.html) | Formulário com validação e anúncios acessíveis |

---

## Referências

- [WCAG 2.2 – W3C](https://www.w3.org/TR/WCAG22/)
- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM – Web Accessibility In Mind](https://webaim.org/)
- [Inclusive Components (Heydon Pickering)](https://inclusive-components.design/)
- [A11y Project](https://www.a11yproject.com/)
- [Acessibilidade – MDN](https://developer.mozilla.org/pt-BR/docs/Web/Accessibility)
- [LBI – Lei nº 13.146/2015 (Governo Federal)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm)
