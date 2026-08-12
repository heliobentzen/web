# Módulo 04 — Acessibilidade Web

> Acessibilidade não é um recurso extra que se adiciona no fim. É consequência de escrever HTML correto — e, no Brasil, é exigência legal.

| | |
| --- | --- |
| **Carga horária** | 8 h (4 h expositivas + 4 h de prática) |
| **Pré-requisito** | [Módulo 03 — CSS Moderno](../03-css-moderno/README.md) |
| **Práticas** | [`praticas/`](praticas/) |

---

## Objetivos de aprendizagem

Ao final deste módulo, você será capaz de:

1. **Explicar** os quatro princípios da WCAG e o que significa conformidade nível AA.
2. **Identificar** falhas de acessibilidade em uma página usando teclado, leitor de tela e ferramentas automáticas.
3. **Escrever** HTML que dispensa ARIA na maior parte dos casos, e aplicar ARIA corretamente quando não houver alternativa.
4. **Construir** formulários com erros anunciados a tecnologias assistivas.
5. **Verificar** contraste de cores e corrigir combinações reprovadas.
6. **Gerenciar** foco de teclado em componentes interativos como diálogos e menus.

---

## Roteiro

```text
1. Por que acessibilidade         ← motivação e lei brasileira
        ↓
2. WCAG: os quatro princípios     ← o padrão de referência
        ↓
3. HTML semântico primeiro        ← 80% do trabalho está aqui
        ↓
4. ARIA: quando o HTML não basta
        ↓
5. Teclado e gerenciamento de foco
        ↓
6. Formulários acessíveis
        ↓
7. Imagens, mídia e contraste
        ↓
8. Como testar
```

---

## 1. Por que acessibilidade

Cerca de **18,6 milhões de brasileiros** com 2 anos ou mais têm alguma deficiência
(IBGE, PNAD Contínua 2022). Isso é maior que a população da maioria dos estados do país.
Mas o alcance é maior que esse número:

| Situação | Quem é afetado |
| --- | --- |
| Deficiência visual | Leitor de tela, ampliação, alto contraste |
| Deficiência auditiva | Legendas, transcrições |
| Deficiência motora | Navegação por teclado, alvos de toque maiores |
| Deficiência cognitiva | Linguagem clara, layout previsível |
| **Limitação temporária** | Braço quebrado, olho irritado, cirurgia recente |
| **Limitação situacional** | Sol na tela, ambiente barulhento, mão ocupada, internet lenta |
| **Envelhecimento** | Perda gradual de visão, audição e coordenação |

Todo mundo passa por limitação temporária ou situacional. Acessibilidade é design para
casos reais, não para uma minoria.

### 1.1 Obrigação legal no Brasil

| Norma | O que exige |
| --- | --- |
| [Lei 13.146/2015 (LBI)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm) | Art. 63: sites de empresas com sede ou representação no país devem ser acessíveis |
| [Decreto 5.296/2004](https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/decreto/d5296.htm) | Acessibilidade obrigatória em portais da administração pública |
| [eMAG](https://emag.governoeletronico.gov.br/) | Modelo de acessibilidade para sites do governo federal |
| [Lei 14.126/2021](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14126.htm) | Classifica a visão monocular como deficiência visual |

O descumprimento gera responsabilização civil. Não é opcional.

### 1.2 Benefícios colaterais

Legendas ajudam quem assiste vídeo no transporte público. Estrutura semântica melhora
SEO. Bom contraste torna a tela legível sob o sol. Navegação por teclado acelera o
trabalho de usuários avançados. O que é necessário para alguns é melhor para todos.

---

## 2. WCAG: os quatro princípios

A **WCAG** (*Web Content Accessibility Guidelines*) é o padrão internacional, publicado
pelo W3C. A versão atual é a **2.2**, de outubro de 2023.

Os princípios formam a sigla **POUR**, do inglês:

| Princípio | Em português | Significado |
| --- | --- | --- |
| **P**erceivable | Perceptível | O conteúdo precisa ser percebido por algum sentido — não pode depender só da visão ou só da audição |
| **O**perable | Operável | A interface precisa ser usável por teclado, mouse, toque ou voz |
| **U**nderstandable | Compreensível | O conteúdo e o funcionamento precisam ser previsíveis e claros |
| **R**obust | Robusto | O código precisa funcionar com tecnologias assistivas diversas, hoje e no futuro |

### 2.1 Níveis de conformidade

| Nível | Descrição | Meta |
| --- | --- | --- |
| **A** | Barreiras críticas removidas | Mínimo absoluto |
| **AA** | Padrão adotado por leis no mundo todo | **É a meta deste curso e do mercado** |
| **AAA** | Máximo rigor | Difícil de atingir num site inteiro |

### 2.2 Critérios mais relevantes na prática

**1.1.1 — Conteúdo não textual (A)**

```html
<!-- ✅ Informativa: descreve o conteúdo relevante -->
<img src="grafico.png" alt="Matrículas em ADS cresceram 58% entre 2024 e 2026">

<!-- ✅ Decorativa: alt vazio, para o leitor de tela ignorar -->
<img src="divisor.svg" alt="">

<!-- ❌ Sem alt: o leitor de tela lê o nome do arquivo -->
<img src="grafico-final-v2.png">
```

**1.3.1 — Informação e relações (A)** — a estrutura visual precisa existir também no código.
Um título que "parece" título por ser grande e negrito, mas é uma `<div>`, não existe para
o leitor de tela.

**1.4.3 — Contraste mínimo (AA)** — 4.5:1 para texto normal, 3:1 para texto grande.

**1.4.11 — Contraste de elementos não textuais (AA)** — 3:1 para bordas de campos, ícones e
componentes de interface.

**2.1.1 — Teclado (A)** — toda funcionalidade acessível por teclado, sem exceção.

**2.4.7 — Foco visível (AA)** — o indicador de foco precisa ser visível.

```css
/* ✅ Correto */
:focus-visible {
  outline: 3px solid #0b5f31;
  outline-offset: 2px;
}

/* ❌ Isso torna o site inutilizável por teclado */
*:focus { outline: none; }
```

**3.1.1 — Idioma da página (A)** — `<html lang="pt-BR">`.

**3.3.2 — Rótulos ou instruções (A)** — todo campo tem rótulo visível.

### 2.3 Novidades da WCAG 2.2

Cinco critérios acrescentados na versão 2.2 que costumam pegar projetos desprevenidos:

| Critério | Nível | Exigência |
| --- | --- | --- |
| **2.4.11** Foco não obscurecido | AA | O elemento focado não pode ficar escondido atrás de cabeçalho fixo ou banner de cookies |
| **2.5.7** Movimentos de arrastar | AA | Toda ação de arrastar precisa ter alternativa por clique simples |
| **2.5.8** Tamanho do alvo (mínimo) | AA | Alvos de clique com pelo menos **24 × 24 px** |
| **3.3.7** Entrada redundante | A | Não pedir de novo uma informação já fornecida no mesmo processo |
| **3.3.8** Autenticação acessível | AA | Login não pode exigir teste de memória ou transcrição; permita colar a senha |

O critério **2.4.11** é o mais violado hoje: cabeçalhos `position: sticky` costumam cobrir
o elemento focado durante a navegação por Tab.

```css
/* Garante que o elemento focado não fique sob o cabeçalho fixo */
:root { scroll-padding-top: 5rem; }
```

O critério **2.5.8** afeta diretamente ícones pequenos:

```css
/* Alvo de toque adequado, mesmo que o ícone seja menor */
.botao-icone {
  min-width: 24px;
  min-height: 24px;
  display: inline-grid;
  place-items: center;
}
```

---

## 3. HTML semântico primeiro

A maior parte da acessibilidade vem do [Módulo 02](../02-html-semantico/README.md).
Elemento nativo já traz papel, estado, foco e comportamento de teclado prontos.

| Em vez de | Use | O que você ganha de graça |
| --- | --- | --- |
| `<div onclick>` | `<button>` | Foco, Enter, Espaço, papel anunciado |
| `<div class="titulo">` | `<h2>` | Navegação por títulos no leitor de tela |
| `<span>` clicável para navegar | `<a href>` | Foco, Enter, menu de contexto, abrir em nova aba |
| `<div class="lista">` | `<ul>` / `<ol>` | "Lista com 5 itens" anunciado |
| `<div class="modal">` | `<dialog>` | Foco preso, Esc para fechar, fundo inerte |
| Grupo de rádios solto | `<fieldset>` + `<legend>` | Pergunta anunciada antes das opções |

Compare o custo:

```html
<!-- ❌ 4 atributos e JavaScript para imitar um botão -->
<div role="button" tabindex="0"
     onclick="salvar()"
     onkeydown="if(event.key==='Enter'||event.key===' ')salvar()">
  Salvar
</div>

<!-- ✅ Mesmo resultado, acessível por padrão -->
<button type="button" onclick="salvar()">Salvar</button>
```

### 3.1 O elemento `<dialog>`

Substitui a modal artesanal com todos os comportamentos corretos:

```html
<dialog id="confirmacao">
  <h2>Confirmar exclusão</h2>
  <p>Esta ação não pode ser desfeita.</p>
  <form method="dialog">
    <button value="cancelar">Cancelar</button>
    <button value="confirmar">Excluir</button>
  </form>
</dialog>

<button type="button" id="abrir">Excluir item</button>
```

```javascript
const dialogo = document.querySelector('#confirmacao')

document.querySelector('#abrir').addEventListener('click', () => {
  dialogo.showModal()   // prende o foco, torna o resto inerte, habilita Esc
})

dialogo.addEventListener('close', () => {
  console.log('Resultado:', dialogo.returnValue)
})
```

`showModal()` entrega gratuitamente: foco movido para dentro, foco preso, fechamento por
`Esc`, fundo inerte e retorno do foco ao botão de origem. Reproduzir isso à mão leva
dezenas de linhas — e quase sempre com algum detalhe errado.

---

## 4. ARIA: quando o HTML não basta

> **Primeira regra do ARIA:** não use ARIA. Se existe elemento HTML nativo com a
> semântica desejada, use-o. ARIA mal aplicado é **pior** que ARIA nenhum, porque
> sobrescreve a semântica correta com uma informação falsa.

ARIA não adiciona comportamento — só altera o que a tecnologia assistiva anuncia. Colocar
`role="button"` numa `div` não a torna focável nem faz o Enter funcionar.

### 4.1 Roles

Landmarks já vêm implícitos nos elementos semânticos — não precisa repetir:

```html
<header>…</header>    <!-- role="banner" implícito -->
<nav>…</nav>          <!-- role="navigation" implícito -->
<main>…</main>        <!-- role="main" implícito -->
<aside>…</aside>      <!-- role="complementary" implícito -->
<footer>…</footer>    <!-- role="contentinfo" implícito -->
```

Roles úteis para componentes sem equivalente nativo:

```html
<!-- Mensagem urgente: interrompe o leitor de tela -->
<div role="alert">Não foi possível salvar. Tente novamente.</div>

<!-- Mensagem não urgente: aguarda uma pausa -->
<div role="status" aria-live="polite">3 resultados encontrados.</div>

<!-- Abas -->
<div role="tablist" aria-label="Informações do curso">
  <button role="tab" aria-selected="true"  aria-controls="painel-1" id="aba-1">Ementa</button>
  <button role="tab" aria-selected="false" aria-controls="painel-2" id="aba-2">Docentes</button>
</div>
<div role="tabpanel" id="painel-1" aria-labelledby="aba-1">…</div>
```

### 4.2 Estados e propriedades

```html
<!-- Rótulo acessível quando não há texto visível -->
<button aria-label="Fechar">✕</button>

<!-- Rótulo vindo de outro elemento -->
<section aria-labelledby="titulo-secao">
  <h2 id="titulo-secao">Documentos necessários</h2>
</section>

<!-- Descrição complementar -->
<input type="password" id="senha" aria-describedby="regras-senha">
<p id="regras-senha">Mínimo de 8 caracteres, com ao menos um número.</p>

<!-- Estado de expansão: precisa ser atualizado por JavaScript -->
<button aria-expanded="false" aria-controls="submenu">Cursos</button>
<ul id="submenu" hidden>…</ul>

<!-- Esconde da árvore de acessibilidade (elemento decorativo) -->
<span aria-hidden="true">👋</span>

<!-- Erro de validação -->
<input type="email" aria-invalid="true" aria-describedby="erro-email">
<span id="erro-email">E-mail inválido.</span>

<!-- Item atual na navegação -->
<a href="/cursos" aria-current="page">Cursos</a>
```

Atenção com `aria-expanded`: ele precisa ser **atualizado no JavaScript** quando o menu
abre e fecha. Um `aria-expanded="false"` estático em um menu aberto informa o contrário
da realidade.

```javascript
botao.addEventListener('click', () => {
  const aberto = botao.getAttribute('aria-expanded') === 'true'
  botao.setAttribute('aria-expanded', String(!aberto))
  submenu.hidden = aberto
})
```

### 4.3 Erros clássicos de ARIA

| Erro | Problema |
| --- | --- |
| `<button role="button">` | Redundante |
| `<h2 role="heading">` | Redundante |
| `<button role="link">` | Mente sobre o comportamento real |
| `aria-hidden="true"` em elemento focável | O usuário chega nele por Tab, mas nada é anunciado |
| `aria-label` em elemento sem papel interativo | Ignorado pela maioria dos leitores |
| `role="button"` sem `tabindex="0"` | Não recebe foco por teclado |

---

## 5. Teclado e gerenciamento de foco

### 5.1 Teclas esperadas

| Tecla | Ação |
| --- | --- |
| `Tab` | Próximo elemento focável |
| `Shift + Tab` | Elemento anterior |
| `Enter` | Ativa links e botões |
| `Espaço` | Ativa botões, marca checkbox, rola a página |
| `Setas` | Navega dentro de menus, abas, rádios |
| `Esc` | Fecha diálogos e menus |

### 5.2 Ordem de foco

A ordem do Tab segue a ordem do **DOM**, não a ordem visual. Se o CSS reordenou elementos
com `order` ou `grid-area`, a navegação por teclado pode ficar ilógica. Solução: corrija a
ordem no HTML.

Sobre `tabindex`:

| Valor | Efeito | Quando usar |
| --- | --- | --- |
| `tabindex="0"` | Entra na ordem natural | Elemento customizado que precisa ser focável |
| `tabindex="-1"` | Focável só por script | Destino de foco programático |
| `tabindex="1"` ou maior | **Quebra a ordem da página** | Nunca |

### 5.3 Link de pular para o conteúdo

Permite que quem navega por teclado ignore o menu em todas as páginas:

```html
<body>
  <a href="#conteudo" class="pular-link">Pular para o conteúdo</a>
  <header>…</header>
  <main id="conteudo" tabindex="-1">…</main>
</body>
```

```css
.pular-link {
  position: absolute;
  left: -9999px;
}
.pular-link:focus {
  left: 1rem;
  top: 1rem;
  z-index: 100;
  background: #fff;
  padding: 0.75rem 1rem;
  outline: 3px solid #0b5f31;
}
```

O link fica fora da tela até receber foco. É o primeiro elemento do Tab.

### 5.4 Foco em componentes customizados

Se você precisar construir um diálogo sem `<dialog>`, o mínimo é:

```javascript
let elementoAnterior = null

function abrirModal(modal) {
  elementoAnterior = document.activeElement    // guarda de onde veio
  modal.hidden = false
  const focaveis = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  focaveis[0]?.focus()                          // move o foco para dentro
}

function fecharModal(modal) {
  modal.hidden = true
  elementoAnterior?.focus()                     // devolve o foco
}

function prenderFoco(evento, modal) {
  if (evento.key === 'Escape') return fecharModal(modal)
  if (evento.key !== 'Tab') return

  const focaveis = [...modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )]
  const primeiro = focaveis[0]
  const ultimo = focaveis.at(-1)

  if (evento.shiftKey && document.activeElement === primeiro) {
    evento.preventDefault()
    ultimo.focus()
  } else if (!evento.shiftKey && document.activeElement === ultimo) {
    evento.preventDefault()
    primeiro.focus()
  }
}
```

Compare com as três linhas da seção 3.1. Use `<dialog>` sempre que possível.

---

## 6. Formulários acessíveis

Formulário é onde a acessibilidade mais falha e onde o impacto é maior — é o ponto em que
o usuário precisa concluir uma tarefa.

```html
<form novalidate>
  <label for="nome">Nome completo <span aria-hidden="true">*</span></label>
  <input type="text" id="nome" name="nome"
         required autocomplete="name"
         aria-describedby="nome-erro">
  <span id="nome-erro" role="alert"></span>

  <label for="email">E-mail <span aria-hidden="true">*</span></label>
  <input type="email" id="email" name="email"
         required autocomplete="email"
         aria-describedby="email-dica email-erro">
  <span id="email-dica">Usaremos apenas para confirmar a inscrição.</span>
  <span id="email-erro" role="alert"></span>

  <fieldset>
    <legend>Turno de preferência <span aria-hidden="true">*</span></legend>
    <label><input type="radio" name="turno" value="manha" required> Manhã</label>
    <label><input type="radio" name="turno" value="noite"> Noite</label>
  </fieldset>

  <p><span aria-hidden="true">*</span> Campos obrigatórios</p>

  <button type="submit">Enviar inscrição</button>
</form>
```

Pontos que fazem a diferença:

- **`aria-describedby` liga o erro ao campo.** Sem isso, o leitor de tela anuncia o campo e
  a mensagem de erro fica órfã em outro ponto da página.
- **`role="alert"` no contêiner de erro** faz a mensagem ser anunciada assim que aparece.
  Ele precisa existir **vazio** no HTML desde o início: se for criado só na hora do erro,
  o anúncio pode não acontecer.
- **O asterisco recebe `aria-hidden`** e a obrigatoriedade vem de `required`. Sem isso, o
  leitor de tela anuncia "asterisco" no meio do rótulo.
- **`autocomplete`** é o critério WCAG 1.3.5, além de reduzir o esforço de digitação.

### 6.1 Anunciando erros na validação

```javascript
const form = document.querySelector('form')

form.addEventListener('submit', (evento) => {
  evento.preventDefault()
  let primeiroInvalido = null

  for (const campo of form.elements) {
    const alvoErro = document.querySelector(`#${campo.id}-erro`)
    if (!alvoErro) continue

    if (campo.validity.valid) {
      campo.setAttribute('aria-invalid', 'false')
      alvoErro.textContent = ''
    } else {
      campo.setAttribute('aria-invalid', 'true')
      alvoErro.textContent = mensagemDeErro(campo)
      primeiroInvalido ??= campo
    }
  }

  // Leva o usuário direto ao primeiro problema
  primeiroInvalido?.focus()
})

function mensagemDeErro(campo) {
  if (campo.validity.valueMissing) return 'Este campo é obrigatório.'
  if (campo.validity.typeMismatch) return 'Informe um formato válido.'
  if (campo.validity.tooShort) return `Mínimo de ${campo.minLength} caracteres.`
  return 'Valor inválido.'
}
```

Mover o foco para o primeiro campo inválido é o comportamento que mais ajuda: sem isso, o
usuário de leitor de tela precisa percorrer o formulário inteiro procurando o que deu errado.

---

## 7. Imagens, mídia e contraste

### 7.1 Escrevendo bons textos alternativos

A pergunta certa é: **qual a função desta imagem aqui?**

```html
<!-- Informativa: descreva a informação, não a aparência -->
<img src="turma.jpg" alt="Turma de ADS 2026 na cerimônia de acolhimento">

<!-- Funcional (dentro de link ou botão): descreva a AÇÃO -->
<a href="/"><img src="logo.svg" alt="IFPE — ir para a página inicial"></a>

<!-- Decorativa: alt vazio -->
<img src="ondas.svg" alt="">

<!-- Complexa: resumo no alt, dados completos acessíveis a todos -->
<figure>
  <img src="grafico.png" alt="Gráfico de matrículas; dados detalhados na tabela abaixo">
  <figcaption>
    Matrículas cresceram 58% entre 2024 e 2026.
    <details>
      <summary>Ver dados em tabela</summary>
      <table>…</table>
    </details>
  </figcaption>
</figure>
```

Erros frequentes: começar com "Imagem de" (o leitor já anuncia que é imagem), repetir a
legenda que já está visível ao lado, ou usar o nome do arquivo.

### 7.2 Vídeo e áudio

```html
<video controls>
  <source src="aula.mp4" type="video/mp4">
  <track kind="captions" src="legendas-pt.vtt" srclang="pt" label="Português" default>
  <track kind="descriptions" src="audiodescricao.vtt" srclang="pt" label="Audiodescrição">
</video>
```

Legendas automáticas do YouTube não cumprem o critério: erram termos técnicos e não
identificam quem fala. Revise sempre.

### 7.3 Contraste

| Contexto | Mínimo (AA) |
| --- | --- |
| Texto normal (< 18pt / < 14pt negrito) | 4.5:1 |
| Texto grande (≥ 18pt / ≥ 14pt negrito) | 3:1 |
| Ícones, bordas de campo, componentes | 3:1 |

```css
/* ✅ 8.6:1 — passa AA e AAA */
body { background: #ffffff; color: #0057b8; }

/* ✅ 4.5:1 — passa AA */
.btn { background: #0d6efd; color: #ffffff; }

/* ❌ 1.6:1 — reprovado; problema clássico em placeholders */
.placeholder { color: #cccccc; }

/* ✅ 4.5:1 — o cinza mais claro que ainda passa sobre branco */
.metadados { color: #767676; }
```

**Cor nunca pode ser o único indicador** (critério 1.4.1). Um campo com borda vermelha e
nada mais não comunica erro para quem tem daltonismo — cerca de 8% dos homens.

```html
<!-- ❌ Só a cor comunica -->
<input style="border-color: red">

<!-- ✅ Cor + ícone + texto -->
<input aria-invalid="true" aria-describedby="erro">
<span id="erro" role="alert">⚠ E-mail inválido</span>
```

Ferramentas: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) e o
próprio DevTools (Elements → Styles → clique no quadrado de cor).

---

## 8. Como testar

### 8.1 Ferramentas automáticas

| Ferramenta | Como usar |
| --- | --- |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/) | Já vem no Chrome: DevTools → Lighthouse → Accessibility |
| [axe DevTools](https://www.deque.com/axe/devtools/) | Extensão; o motor mais preciso |
| [WAVE](https://wave.webaim.org/) | Extensão ou site; mostra os problemas sobre a página |
| [Accessibility Insights](https://accessibilityinsights.io/) | Extensão da Microsoft; guia testes manuais |

> **Ferramentas automáticas detectam de 30% a 40% dos problemas.** Elas sabem dizer que
> falta um `alt`, mas não que o `alt` diz "imagem1". Teste manual é obrigatório.

### 8.2 Teste com teclado — 5 minutos, alto retorno

Guarde o mouse e percorra a página inteira só com o teclado:

1. Consigo alcançar **todos** os elementos interativos com Tab?
2. Consigo **ver** onde o foco está o tempo todo?
3. A ordem do Tab segue a ordem visual?
4. O foco fica preso em algum lugar?
5. Consigo fechar menus e diálogos com `Esc`?
6. Ao fechar um diálogo, o foco volta ao botão que o abriu?
7. Existe link de "pular para o conteúdo"?
8. O elemento focado fica escondido atrás do cabeçalho fixo? (WCAG 2.4.11)

Se algum item falhar, existe um bug de acessibilidade — sem precisar de ferramenta alguma.

### 8.3 Teste com leitor de tela

| Leitor | Sistema | Custo |
| --- | --- | --- |
| **NVDA** | Windows | Gratuito — recomendado para começar |
| JAWS | Windows | Pago |
| VoiceOver | macOS / iOS | Nativo (`Cmd + F5`) |
| TalkBack | Android | Nativo |
| Orca | Linux | Gratuito |

Comandos básicos do NVDA: `Insert + seta para baixo` lê tudo, `H` pula entre títulos, `D`
entre landmarks, `F` entre campos de formulário, `Insert + F7` lista todos os elementos.

Escute a sua própria página de olhos fechados. É desconfortável e é o teste mais revelador
que existe.

### 8.4 Árvore de acessibilidade no DevTools

Chrome → Elements → painel **Accessibility**. Mostra como cada elemento é exposto à
tecnologia assistiva: nome acessível, papel e estados. É onde você descobre que o seu
botão de ícone não tem nome nenhum.

---

## Erros comuns

| Sintoma | Causa | Correção |
| --- | --- | --- |
| Leitor de tela lê "botão" sem dizer qual | Botão só com ícone | Adicione `aria-label` |
| Usuário de teclado se perde | `outline: none` | Estilize `:focus-visible` |
| Erro de formulário não é anunciado | Contêiner criado só na hora do erro | Deixe o `role="alert"` vazio no HTML |
| Tab pula elemento visível | Ordem do DOM difere da visual | Corrija a ordem no HTML, não com `tabindex` |
| Modal deixa navegar por trás | Falta prender o foco | Use `<dialog>` com `showModal()` |
| "Asterisco" lido no meio do rótulo | Asterisco visível sem `aria-hidden` | `<span aria-hidden="true">*</span>` |
| Lighthouse dá 100 mas o site é inusável | Só testou o automático | Faça o teste de teclado e leitor de tela |
| Elemento focado some sob o cabeçalho | Cabeçalho `sticky` (WCAG 2.4.11) | `scroll-padding-top` no `:root` |
| Ícone clicável difícil de acertar | Alvo < 24px (WCAG 2.5.8) | `min-width` e `min-height` de 24px |

---

## Checklist de autoavaliação

- [ ] Explicar os quatro princípios POUR com um exemplo de cada
- [ ] Dizer o que significa conformidade AA e por que é a meta
- [ ] Citar três critérios novos da WCAG 2.2
- [ ] Escrever `alt` adequado para imagem informativa, funcional, decorativa e complexa
- [ ] Explicar a primeira regra do ARIA e dar um exemplo de ARIA prejudicial
- [ ] Navegar uma página inteira só com teclado e relatar as falhas
- [ ] Implementar um link de "pular para o conteúdo"
- [ ] Construir formulário com erros anunciados por `role="alert"` e `aria-describedby`
- [ ] Verificar contraste e corrigir uma combinação reprovada
- [ ] Abrir um diálogo com `<dialog>` e explicar o que ele resolve sozinho
- [ ] Usar NVDA ou VoiceOver para percorrer uma página

---

## Práticas

| # | Arquivo | Foco | Objetivos trabalhados |
| --- | --- | --- | --- |
| 01 | [ARIA e roles](praticas/01-aria-roles.html) | Landmarks, roles e estados | 3 |
| 02 | [Formulário acessível](praticas/02-formulario-acessivel.html) | Erros anunciados e foco | 4 |
| 03 | [Componentes acessíveis](praticas/03-componentes-acessiveis.html) | Diálogo, menu e abas | 6 |

---

## Exercícios

### Nível 1 — Fixação

1. Classifique cada critério em P, O, U ou R: contraste mínimo; navegação por teclado;
   idioma da página; texto alternativo; rótulos de formulário; foco visível.
2. Escreva o `alt` adequado para: a logomarca dentro do link do topo; uma foto ilustrativa
   de artigo; um ícone de lixeira dentro de um botão; uma linha decorativa; um gráfico de barras.
3. Aponte o erro em cada trecho e corrija:

```html
<div role="button" onclick="enviar()">Enviar</div>
<img src="foto.jpg">
<input type="text" placeholder="Seu nome">
<button><svg>…</svg></button>
<a href="/relatorio.pdf">Clique aqui</a>
```

### Nível 2 — Aplicação

4. Pegue uma página que você fez no Módulo 02 e torne-a acessível: link de pular conteúdo,
   estilos de `:focus-visible`, contraste verificado, `alt` revisado e hierarquia de títulos
   correta. Documente cada mudança.
5. Construa um formulário de inscrição com validação acessível: `role="alert"` para cada
   campo, `aria-describedby` ligando erro e campo, `aria-invalid` atualizado por JavaScript
   e foco movido ao primeiro campo inválido no envio.
6. Rode o Lighthouse e o axe DevTools em uma página sua. Corrija todos os apontamentos.
   Depois faça o teste de teclado da seção 8.2 e registre quantos problemas as ferramentas
   **não** encontraram.

### Nível 3 — Desafio

7. **Componente acessível do zero.** Implemente um menu suspenso com: abertura por Enter e
   Espaço, navegação entre itens por setas, fechamento por `Esc`, foco devolvido ao botão,
   `aria-expanded` atualizado corretamente e fechamento ao clicar fora. Teste com NVDA ou
   VoiceOver e descreva o que foi anunciado em cada interação.
8. **Auditoria com laudo.** Escolha um site de serviço público brasileiro (matrícula,
   agendamento, emissão de documento). Produza um laudo com: cinco violações identificadas,
   o critério WCAG correspondente de cada uma, a gravidade, o código atual, o código
   corrigido e uma estimativa de quantos usuários são impedidos de concluir a tarefa.

---

## Referências

- [WCAG 2.2 — W3C](https://www.w3.org/TR/WCAG22/)
- [Como atender à WCAG 2.2 (Quick Reference)](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [Acessibilidade — MDN](https://developer.mozilla.org/pt-BR/docs/Web/Accessibility)
- [web.dev — Learn Accessibility](https://web.dev/learn/accessibility/)
- [WebAIM](https://webaim.org/)
- [The A11y Project](https://www.a11yproject.com/)
- [Inclusive Components — Heydon Pickering](https://inclusive-components.design/)
- [eMAG — Modelo de Acessibilidade em Governo Eletrônico](https://emag.governoeletronico.gov.br/)
- [Lei 13.146/2015 — Lei Brasileira de Inclusão](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm)

---

**Navegação:** [◀ Módulo 03](../03-css-moderno/README.md) · [Índice](../../README.md) · [Módulo 05 ▶](../05-javascript/README.md)
