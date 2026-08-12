# Módulo 02 — HTML Semântico

> HTML não é sobre aparência. É sobre dizer o que cada pedaço da página **é**. Quem entende isso escreve menos código e ganha acessibilidade e SEO de graça.

| | |
| --- | --- |
| **Carga horária** | 8 h (4 h expositivas + 4 h de prática) |
| **Pré-requisito** | [Módulo 01 — Arquitetura da Web](../01-arquitetura-web/README.md) |
| **Slides da aula** | [`slides.md`](slides.md) |
| **Práticas** | [`praticas/`](praticas/) |

---

## Objetivos de aprendizagem

Ao final deste módulo, você será capaz de:

1. **Construir** a estrutura base de um documento HTML válido e explicar cada elemento do `<head>`.
2. **Escolher** o elemento semântico correto para cada trecho de conteúdo, justificando a escolha.
3. **Organizar** títulos em hierarquia consistente, sem saltos de nível.
4. **Montar** formulários com rótulos associados, agrupamento e validação nativa.
5. **Aplicar** metatags de SEO e Open Graph em uma página real.
6. **Auditar** uma página existente e apontar onde a semântica está errada.

---

## Roteiro

```text
1. Estrutura do documento         ← a fundação
       ↓
2. Semântica de layout            ← header, main, footer...
       ↓
3. Conteúdo textual               ← títulos, parágrafos, ênfase
       ↓
4. Listas, links, mídia, tabelas
       ↓
   ── Prática 01 e 02 ──
       ↓
5. Formulários                    ← a parte que mais erra na prática
       ↓
6. SEO e compartilhamento social
       ↓
   ── Prática 03 e 04 ──
```

---

## 1. Estrutura do documento

Todo documento HTML começa igual. Não é burocracia: cada linha resolve um problema concreto.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título da Página</title>
  <meta name="description" content="Resumo curto do conteúdo da página.">
</head>
<body>
  <main>Conteúdo principal</main>
</body>
</html>
```

| Linha | Por que existe | O que acontece sem ela |
| --- | --- | --- |
| `<!DOCTYPE html>` | Ativa o modo padrão de renderização | O navegador entra em *quirks mode* e o CSS se comporta de forma imprevisível |
| `lang="pt-BR"` | Informa o idioma | Leitores de tela leem com pronúncia errada; tradução automática falha |
| `charset="UTF-8"` | Define a codificação | Acentos viram `Ã§Ã£o` |
| `viewport` | Adapta ao tamanho do dispositivo | No celular a página aparece minúscula, como se fosse desktop |
| `<title>` | Nome da aba e título no Google | Aparece a URL crua nos resultados de busca |
| `description` | Resumo no resultado de busca | O buscador inventa um trecho qualquer da página |

> **Experimente:** salve o exemplo acima como `teste.html`, remova a linha do `charset`,
> escreva "Informação" no corpo e abra no navegador. Depois recoloque a linha.

---

## 2. Semântica de layout

Antes do HTML5, tudo era `<div class="header">`. Hoje existem elementos com significado próprio:

```html
<body>
  <header>
    <nav aria-label="Navegação principal">
      <a href="/">Início</a>
      <a href="/cursos">Cursos</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Título do artigo</h1>
      <p>Conteúdo...</p>
    </article>

    <aside>
      <h2>Leia também</h2>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 IFPE</p>
  </footer>
</body>
```

```text
┌─────────────────────────────────┐
│ header  (topo, logo, nav)       │
├─────────────────┬───────────────┤
│ main            │ aside         │
│ ├─ article      │ (complementar)│
│ └─ section      │               │
├─────────────────┴───────────────┤
│ footer                          │
└─────────────────────────────────┘
```

### 2.1 `article`, `section` ou `div`?

| Elemento | Use quando | Teste rápido |
| --- | --- | --- |
| `article` | O conteúdo faz sentido sozinho | Daria para publicar isso isolado num feed RSS? |
| `section` | Agrupamento temático **com título** | Esse bloco tem um `h2` próprio? |
| `div` | Não há significado, só necessidade de estilo | Sobrou alguma alternativa semântica? |

```html
<!-- ✅ Um post de blog é independente: article -->
<article>
  <h2>Como funciona o DNS</h2>
  <p>...</p>
</article>

<!-- ✅ Um bloco temático da página: section -->
<section>
  <h2>Depoimentos</h2>
  <article>...</article>
  <article>...</article>
</section>

<!-- ✅ div é legítimo quando serve só para layout -->
<div class="grid-container">
  <article>...</article>
</div>
```

**Regra prática:** tente `article` ou `section` antes de `div`. Se nenhum couber, `div` está correto — ele não é proibido, só não deve ser a primeira opção.

### 2.2 Landmarks e navegação assistiva

Os elementos semânticos criam *landmarks*: pontos de referência que leitores de tela usam para pular direto ao conteúdo. Um usuário de NVDA pressiona `D` e navega entre eles. Uma página feita só de `div` não tem nenhum.

Regras que valem sempre:

- **Um único `<main>`** por página, contendo o conteúdo principal.
- `<nav>` só para navegação estrutural, não para qualquer grupo de links.
- Se houver mais de um `<nav>`, diferencie com `aria-label`.

```html
<nav aria-label="Navegação principal">...</nav>
<nav aria-label="Navegação do rodapé">...</nav>
```

---

## 3. Conteúdo textual

### 3.1 Hierarquia de títulos

Títulos formam o índice da página. A ordem importa mais que o tamanho.

```html
<h1>Desenvolvimento Web</h1>       <!-- um por página -->
  <h2>Módulo 02</h2>
    <h3>Formulários</h3>
    <h3>SEO</h3>
  <h2>Módulo 03</h2>
```

| Regra | Motivo |
| --- | --- |
| Um `h1` por página | É o assunto da página; dois confundem buscador e leitor de tela |
| Nunca pular níveis (`h2` → `h4`) | O usuário de leitor de tela percebe um "buraco" na estrutura |
| Tamanho visual é responsabilidade do CSS | Escolha o nível pela hierarquia, não pela aparência |

> **Experimente:** no DevTools, abra o painel Elements de um site grande e use
> `document.querySelectorAll('h1').length` no console. Muitos sites reais erram isso.

### 3.2 Elementos de texto

```html
<p>Parágrafo comum com <strong>importância</strong> e <em>ênfase</em>.</p>

<blockquote cite="https://exemplo.com">
  <p>Citação longa, em bloco.</p>
</blockquote>

<p>Ele disse <q>uma citação curta</q> e saiu.</p>

<p><abbr title="HyperText Markup Language">HTML</abbr> define a estrutura.</p>

<p>Publicado em <time datetime="2026-04-23">23 de abril de 2026</time>.</p>

<p>Use <code>document.querySelector()</code> para selecionar.</p>

<p>Pressione <kbd>Ctrl</kbd> + <kbd>C</kbd> para copiar.</p>
```

**`strong` e `em` não são `b` e `i`.** `strong` significa importância, `em` significa ênfase — e leitores de tela mudam a entonação. `b` e `i` são apenas visuais e devem ser evitados.

---

## 4. Listas, links, mídia e tabelas

### 4.1 Listas

```html
<ul>                          <!-- ordem não importa -->
  <li>HTML</li>
  <li>CSS</li>
</ul>

<ol>                          <!-- ordem importa -->
  <li>Instalar o Node</li>
  <li>Rodar npm install</li>
</ol>

<dl>                          <!-- termo e definição -->
  <dt>DOM</dt>
  <dd>Representação da página em árvore, na memória.</dd>
</dl>
```

### 4.2 Links

```html
<!-- ✅ O texto do link descreve o destino -->
<a href="/ementa">Ver a ementa da disciplina</a>

<!-- ❌ Fora de contexto, não diz nada -->
<a href="/ementa">Clique aqui</a>

<!-- Link externo em nova aba: rel é obrigatório por segurança -->
<a href="https://mdn.io" target="_blank" rel="noopener noreferrer">
  MDN Web Docs
</a>

<!-- Download e âncora interna -->
<a href="/plano.pdf" download>Baixar plano de ensino</a>
<a href="#formularios">Ir para a seção de formulários</a>
```

### 4.3 Imagens e mídia

```html
<!-- width e height evitam o "pulo" do layout durante o carregamento -->
<img src="campus.jpg" alt="Fachada do campus do IFPE ao amanhecer"
     width="640" height="360" loading="lazy">

<!-- Imagem com legenda visível -->
<figure>
  <img src="grafico.png" alt="Matrículas cresceram de 120 para 190 entre 2024 e 2026">
  <figcaption>Evolução das matrículas no curso de ADS.</figcaption>
</figure>

<!-- Formatos modernos com fallback -->
<picture>
  <source srcset="foto.avif" type="image/avif">
  <source srcset="foto.webp" type="image/webp">
  <img src="foto.jpg" alt="Descrição da foto">
</picture>

<!-- Vídeo com legendas -->
<video controls width="640">
  <source src="aula.mp4" type="video/mp4">
  <track kind="subtitles" src="legendas-pt.vtt" srclang="pt" label="Português" default>
</video>
```

Sobre `alt`: descreva a **função** da imagem no contexto, não a aparência.
Imagem puramente decorativa recebe `alt=""` — vazio, mas presente. Isso é aprofundado no [Módulo 04](../04-acessibilidade/README.md).

### 4.4 Tabelas

Tabela é para **dados tabulares**, nunca para layout.

```html
<table>
  <caption>Notas do primeiro bimestre</caption>
  <thead>
    <tr>
      <th scope="col">Aluno</th>
      <th scope="col">Nota</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Ana Souza</th>
      <td>9.0</td>
    </tr>
  </tbody>
</table>
```

`scope="col"` e `scope="row"` dizem ao leitor de tela qual cabeçalho descreve cada célula. Sem isso, o usuário ouve números soltos.

---

## 5. Formulários

Esta é a área onde mais se erra em projetos reais.

### 5.1 A regra inegociável: todo campo tem um rótulo

```html
<!-- ✅ Correto: for do label = id do input -->
<label for="email">E-mail</label>
<input type="email" id="email" name="email" required>

<!-- ✅ Alternativa: label envolvendo o campo -->
<label>
  E-mail
  <input type="email" name="email" required>
</label>

<!-- ❌ Errado: placeholder não é rótulo -->
<input type="email" placeholder="E-mail">
```

Por que o `placeholder` não serve: ele **desaparece** quando o usuário digita, tem contraste baixo por padrão, e nem todo leitor de tela o anuncia. Quem se distrai no meio do preenchimento perde a referência do campo.

O atributo `name` também é obrigatório: é ele que nomeia o dado quando o formulário é enviado.

### 5.2 Tipos de campo

Escolher o `type` certo muda o teclado no celular e ativa validação nativa.

| Tipo | Uso | Ganho prático |
| --- | --- | --- |
| `text` | Texto livre | — |
| `email` | E-mail | Teclado com `@`; valida o formato |
| `tel` | Telefone | Teclado numérico |
| `url` | Endereço web | Valida o formato |
| `number` | Quantidade | Aceita `min`, `max`, `step` |
| `date` | Data | Abre o seletor de calendário |
| `password` | Senha | Oculta os caracteres |
| `search` | Busca | Mostra o botão de limpar |
| `checkbox` | Múltipla escolha | — |
| `radio` | Escolha única (mesmo `name`) | — |
| `file` | Upload | Aceita `accept` |
| `range` | Valor aproximado | Controle deslizante |

### 5.3 Agrupamento e validação

```html
<form action="/inscricao" method="post">
  <fieldset>
    <legend>Dados pessoais</legend>

    <label for="nome">Nome completo</label>
    <input type="text" id="nome" name="nome" required autocomplete="name">

    <label for="email">E-mail</label>
    <input type="email" id="email" name="email" required autocomplete="email">

    <label for="nascimento">Data de nascimento</label>
    <input type="date" id="nascimento" name="nascimento">
  </fieldset>

  <fieldset>
    <legend>Turno de preferência</legend>
    <label><input type="radio" name="turno" value="manha" required> Manhã</label>
    <label><input type="radio" name="turno" value="noite"> Noite</label>
  </fieldset>

  <label for="curso">Curso</label>
  <select id="curso" name="curso" required>
    <option value="">Selecione…</option>
    <option value="ads">Análise e Desenvolvimento de Sistemas</option>
    <option value="redes">Redes de Computadores</option>
  </select>

  <label for="mensagem">Mensagem</label>
  <textarea id="mensagem" name="mensagem" rows="5" maxlength="500"></textarea>

  <button type="submit">Enviar inscrição</button>
</form>
```

Pontos importantes:

- `fieldset` + `legend` agrupam campos relacionados — essencial para grupos de `radio`,
  em que o leitor de tela precisa anunciar a pergunta antes das opções.
- A primeira `<option>` vazia faz `required` funcionar no `select`.
- `autocomplete` permite que o navegador preencha dados salvos. Isso é um critério de
  acessibilidade (WCAG 1.3.5), não apenas conveniência.
- `<button type="submit">` é diferente de `<button>` dentro de um form? Não — `submit` é o
  padrão. Mas seja explícito: em botões que **não** enviam, use `type="button"`.

### 5.4 Validação nativa

O navegador valida antes de enviar, sem uma linha de JavaScript:

```html
<input type="text" id="matricula" name="matricula"
       required
       minlength="8" maxlength="8"
       pattern="[0-9]{8}"
       title="A matrícula tem exatamente 8 dígitos numéricos">
```

O atributo `title` aparece na mensagem de erro quando o `pattern` falha — sem ele, o
usuário só vê "Corresponda ao formato solicitado", que não ajuda ninguém.

> **Experimente:** monte esse campo, tente enviar vazio, depois com 5 dígitos, depois com
> letras. Observe as três mensagens diferentes do navegador.

---

## 6. SEO e compartilhamento social

### 6.1 Metatags essenciais

```html
<title>Curso de ADS — IFPE</title>
<meta name="description" content="Conheça o curso de Análise e Desenvolvimento de Sistemas do IFPE: matriz curricular, formas de ingresso e mercado de trabalho.">
<link rel="canonical" href="https://ifpe.edu.br/cursos/ads">
<meta name="robots" content="index, follow">
```

| Tag | Regra prática |
| --- | --- |
| `title` | 50–60 caracteres; o mais específico primeiro |
| `description` | 150–160 caracteres; é o texto que convence o clique |
| `canonical` | Aponta a versão oficial quando a mesma página tem várias URLs |
| `robots` | `noindex` esconde a página do buscador |

O `title` e a `description` não influenciam diretamente a posição no ranking, mas
determinam quantas pessoas clicam no resultado — o que influencia.

### 6.2 Open Graph

Controla como o link aparece ao ser compartilhado no WhatsApp, LinkedIn ou Discord:

```html
<meta property="og:title" content="Curso de ADS — IFPE">
<meta property="og:description" content="Matriz curricular, ingresso e mercado.">
<meta property="og:image" content="https://ifpe.edu.br/img/og-ads.jpg">
<meta property="og:url" content="https://ifpe.edu.br/cursos/ads">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

A imagem deve ter **1200 × 630 px** e URL absoluta (com `https://`). Caminho relativo não funciona aqui.

### 6.3 Dados estruturados (JSON-LD)

Descrevem o conteúdo em formato legível por máquina, habilitando resultados enriquecidos:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Análise e Desenvolvimento de Sistemas",
  "description": "Curso superior de tecnologia com duração de 3 anos.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "IFPE — Instituto Federal de Pernambuco"
  }
}
</script>
```

Valide em [validator.schema.org](https://validator.schema.org/).

---

## Erros comuns

| Sintoma | Causa | Correção |
| --- | --- | --- |
| Acentos aparecem como `Ã§` | Falta `<meta charset="UTF-8">` | Adicione como primeira linha do `<head>` |
| Página minúscula no celular | Falta a meta `viewport` | Adicione a linha do viewport |
| Formulário envia campos vazios | Falta `name` no input | `name` é o que nomeia o dado enviado |
| `required` não funciona no `select` | Primeira opção tem valor | Use `<option value="">Selecione…</option>` |
| Leitor de tela não anuncia o campo | Só há `placeholder` | Adicione `<label for>` |
| Imagem no Open Graph não aparece | URL relativa | Use URL absoluta com `https://` |
| Página é um mar de `div` | Escolha por hábito | Reveja cada `div`: cabe `article`, `section`, `nav`? |
| Dois `h1` na mesma página | Escolha pelo tamanho da fonte | Escolha pelo nível hierárquico; ajuste o tamanho no CSS |

---

## Checklist de autoavaliação

- [ ] Escrever a estrutura base do documento de memória e explicar cada linha
- [ ] Justificar a escolha entre `article`, `section` e `div` para um conteúdo dado
- [ ] Montar uma hierarquia de títulos sem saltos
- [ ] Escrever um `alt` adequado para imagem informativa, funcional e decorativa
- [ ] Construir um formulário com `label`, `fieldset`, `legend` e validação nativa
- [ ] Explicar por que `placeholder` não substitui `label`
- [ ] Escolher o `type` de input adequado para cada dado
- [ ] Aplicar `title`, `description`, `canonical` e Open Graph
- [ ] Auditar uma página existente e listar três problemas de semântica

---

## Práticas

| # | Arquivo | Foco | Objetivos trabalhados |
| --- | --- | --- | --- |
| 01 | [Estrutura básica](praticas/01-estrutura-basica.html) | Layout semântico e títulos | 1, 2, 3 |
| 02 | [Formulário completo](praticas/02-formulario-completo.html) | Campos, agrupamento, validação | 4 |
| 03 | [SEO e metatags](praticas/03-seo-metatags.html) | `head`, Open Graph, JSON-LD | 5 |
| 04 | [Formulário intermediário](praticas/04-formulario-intermediario.html) | Formulário aplicado a caso real | 4, 6 |

---

## Exercícios

### Nível 1 — Fixação

1. Escreva a estrutura base de um documento HTML de memória. Confira e liste o que esqueceu.
2. Para cada conteúdo, indique o elemento correto e justifique: um post de blog; o menu do
   topo; o rodapé com contatos; uma lista de passos de instalação; uma citação de livro; a
   data de publicação.
3. Corrija a hierarquia: `h1` → `h3` → `h2` → `h5`. Explique o problema de cada salto.

### Nível 2 — Aplicação

4. Construa uma página de perfil profissional com: layout semântico completo, hierarquia de
   títulos correta, uma `figure` com legenda, uma lista de habilidades e uma tabela de
   formação acadêmica com `caption` e `scope`.
5. Construa um formulário de matrícula com pelo menos oito campos de tipos diferentes,
   dois `fieldset` com `legend`, um `select` obrigatório e validação por `pattern` na
   matrícula. Não use JavaScript.
6. Adicione à página do exercício 4 o conjunto completo de metatags: SEO, Open Graph e
   JSON-LD do tipo `Person`. Valide o JSON-LD no validator.schema.org.

### Nível 3 — Desafio

7. **Auditoria.** Escolha o site de uma prefeitura ou órgão público brasileiro. Usando o
   painel Elements, produza um relatório de uma página com: quantos `h1` existem; se há
   `<main>`; quantas imagens estão sem `alt`; quantos campos de formulário estão sem
   `label`; se há tabela usada para layout. Para cada problema, escreva o HTML corrigido.
8. **Refatoração.** Pegue este trecho e reescreva usando semântica adequada, sem alterar o
   texto exibido:

```html
<div class="topo">
  <div class="menu"><span onclick="ir('/')">Home</span></div>
</div>
<div class="conteudo">
  <div class="titulo-grande">Notícia importante</div>
  <div class="texto">Publicado em 10/03/2026</div>
  <div class="texto">Conteúdo da notícia...</div>
</div>
<div class="rodape">Contato: contato@exemplo.br</div>
```

---

## Referências

- [HTML — MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [Elementos HTML — referência completa](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element)
- [HTML Living Standard](https://html.spec.whatwg.org/)
- [Formulários — MDN](https://developer.mozilla.org/pt-BR/docs/Learn/Forms)
- [web.dev — Learn HTML](https://web.dev/learn/html/)
- [web.dev — Learn Forms](https://web.dev/learn/forms/)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

---

**Navegação:** [◀ Módulo 01](../01-arquitetura-web/README.md) · [Índice](../../README.md) · [Módulo 03 ▶](../03-css-moderno/README.md)
