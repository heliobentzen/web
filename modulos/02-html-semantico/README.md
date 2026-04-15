# Módulo 02 – HTML Semântico: Estruturação e Boas Práticas para SEO

## Objetivos

Ao final deste módulo você será capaz de:

- Estruturar documentos HTML usando elementos semânticos corretos
- Compreender o impacto da semântica na acessibilidade e no SEO
- Configurar corretamente os metadados de uma página
- Criar formulários acessíveis e funcionais
- Trabalhar com mídias (imagens, vídeo, áudio) de forma responsiva

---

## 1. Estrutura Básica de um Documento HTML5

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <!-- Metadados: não são exibidos na página -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título da Página – Nome do Site</title>
  <meta name="description" content="Descrição concisa da página com 150-160 caracteres.">
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="/favicon.ico">
</head>
<body>
  <!-- Conteúdo visível -->

  <script src="app.js" defer></script>
</body>
</html>
```

**Elementos essenciais do `<head>`:**

| Tag | Propósito |
|-----|-----------|
| `<meta charset="UTF-8">` | Define a codificação de caracteres (suporta acentos, emojis, etc.) |
| `<meta name="viewport" ...>` | Controla o viewport em dispositivos móveis |
| `<title>` | Título na aba do navegador e nos resultados de busca |
| `<meta name="description">` | Descrição exibida nos resultados de busca |
| `<link rel="stylesheet">` | Vincula arquivo CSS |
| `<link rel="icon">` | Ícone da aba (favicon) |
| `<link rel="canonical">` | URL canônica (evita conteúdo duplicado) |

---

## 2. Elementos Semânticos de Layout

HTML5 introduziu elementos que descrevem o **significado** do conteúdo, não apenas sua aparência:

```html
<body>

  <header>
    <!-- Cabeçalho do site ou de uma seção -->
    <nav aria-label="Navegação principal">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/sobre">Sobre</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <!-- Conteúdo principal – ÚNICO por página -->

    <article>
      <!-- Conteúdo independente e redistribuível (post, notícia, card) -->
      <header>
        <h1>Título do Artigo</h1>
        <time datetime="2024-01-15">15 de janeiro de 2024</time>
      </header>
      <p>Conteúdo do artigo...</p>
      <footer>
        <p>Autor: <address>João Silva</address></p>
      </footer>
    </article>

    <section>
      <!-- Seção temática com título próprio -->
      <h2>Seção de Exemplos</h2>
      <p>Conteúdo relacionado...</p>
    </section>

  </main>

  <aside>
    <!-- Conteúdo complementar: sidebar, publicidade, links relacionados -->
    <h2>Artigos Relacionados</h2>
  </aside>

  <footer>
    <!-- Rodapé do site -->
    <p>&copy; 2024 Meu Site. Todos os direitos reservados.</p>
  </footer>

</body>
```

### Guia de Uso: `<article>` vs `<section>` vs `<div>`

| Elemento | Quando usar |
|----------|-------------|
| `<article>` | Conteúdo que faz sentido sozinho (post de blog, notícia, comentário, card de produto) |
| `<section>` | Agrupamento temático que precisa de um `<h2>`–`<h6>` associado |
| `<div>` | Agrupamento puramente visual, sem significado semântico |

> **Regra prática:** Prefira elementos semânticos. Use `<div>` e `<span>` apenas quando nenhum elemento semântico se encaixa.

---

## 3. Hierarquia de Títulos (Headings)

Os títulos (`<h1>` a `<h6>`) criam o **outline** do documento e são cruciais para acessibilidade (leitores de tela) e SEO:

```html
<h1>Nome do Site ou Título Principal da Página</h1>
  <h2>Seção Principal</h2>
    <h3>Subseção</h3>
      <h4>Tópico Específico</h4>
  <h2>Outra Seção Principal</h2>
    <h3>Outra Subseção</h3>
```

**Regras:**
- Apenas **um `<h1>` por página** (embora HTML5 permita mais, é melhor prática)
- Não pule níveis (de `<h2>` para `<h4>` sem `<h3>`)
- Escolha headings pelo significado hierárquico, **não** pelo tamanho visual (use CSS para o visual)

---

## 4. Elementos de Texto Semânticos

```html
<!-- Ênfase e importância -->
<p>Este é um <strong>elemento crítico</strong> e este é <em>enfatizado</em>.</p>

<!-- Citações -->
<blockquote cite="https://www.w3.org/">
  <p>A web é para todos.</p>
  <footer>— <cite>Tim Berners-Lee</cite></footer>
</blockquote>

<p>Como disse <q cite="https://example.com">alguém importante</q>.</p>

<!-- Código -->
<p>Use a função <code>querySelector()</code> para selecionar elementos.</p>
<pre><code>
const el = document.querySelector('.minha-classe')
</code></pre>

<!-- Abreviações -->
<p>O <abbr title="Hyper Text Markup Language">HTML</abbr> é a linguagem da web.</p>

<!-- Dados e tempo -->
<p>Publicado em <time datetime="2024-01-15T10:30:00">15 de janeiro de 2024</time>.</p>

<!-- Definições -->
<p><dfn>Semântica</dfn> é o estudo do significado nas linguagens.</p>

<!-- Texto marcado/destacado -->
<p>Encontramos <mark>3 resultados</mark> para sua busca.</p>

<!-- Texto deletado e inserido (histórico de revisões) -->
<p>O preço era <del>R$ 100,00</del> e agora é <ins>R$ 75,00</ins>.</p>

<!-- Subíndice e sobrescrito -->
<p>H<sub>2</sub>O e E=mc<sup>2</sup></p>

<!-- Texto pequeno (avisos legais, copyright) -->
<small>&copy; 2024 Todos os direitos reservados.</small>
```

---

## 5. Listas

```html
<!-- Lista não ordenada -->
<ul>
  <li>Item A</li>
  <li>Item B</li>
  <li>Item C</li>
</ul>

<!-- Lista ordenada -->
<ol>
  <li>Primeiro passo</li>
  <li>Segundo passo</li>
  <li>Terceiro passo</li>
</ol>

<!-- Lista de definições (glossário) -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language – linguagem de marcação da web</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets – linguagem de estilos</dd>

  <dt>JavaScript</dt>
  <dd>Linguagem de programação para web</dd>
</dl>
```

---

## 6. Links e Navegação

```html
<!-- Link básico -->
<a href="https://example.com">Texto do link</a>

<!-- Link em nova aba (sempre inclua rel para segurança) -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Abrir em nova aba
</a>

<!-- Link para email -->
<a href="mailto:contato@example.com">Enviar email</a>

<!-- Link para telefone (mobile) -->
<a href="tel:+5511999999999">+55 (11) 99999-9999</a>

<!-- Link para âncora na mesma página -->
<a href="#secao-contato">Ir para Contato</a>

<!-- Link de download -->
<a href="/arquivos/curriculo.pdf" download="curriculo-joao.pdf">
  Baixar Currículo (PDF)
</a>

<!-- Navegação semântica -->
<nav aria-label="Paginação">
  <a href="/pagina/1" aria-label="Página anterior">&laquo; Anterior</a>
  <a href="/pagina/3" aria-label="Próxima página">Próxima &raquo;</a>
</nav>
```

---

## 7. Imagens e Mídias

### 7.1 Imagens

```html
<!-- Imagem básica: src e alt são OBRIGATÓRIOS -->
<img src="foto-produto.jpg" alt="Camiseta azul tamanho M">

<!-- Imagem decorativa: alt vazio (não descritivo) -->
<img src="divider.png" alt="">

<!-- Figure com legenda -->
<figure>
  <img src="grafico-vendas.png" alt="Gráfico de vendas do 1º trimestre 2024">
  <figcaption>Crescimento de 23% nas vendas comparado ao mesmo período do ano anterior.</figcaption>
</figure>

<!-- Imagem responsiva com srcset (diferentes resoluções) -->
<img
  src="hero-800.jpg"
  srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1600.jpg 1600w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  alt="Banner principal do site"
  loading="lazy"
  width="800"
  height="450"
>

<!-- Picture: diferentes imagens para diferentes condições -->
<picture>
  <!-- WebP para navegadores modernos -->
  <source srcset="hero.webp" type="image/webp">
  <!-- AVIF para navegadores que suportam -->
  <source srcset="hero.avif" type="image/avif">
  <!-- Fallback JPEG -->
  <img src="hero.jpg" alt="Imagem principal">
</picture>
```

**Boas práticas de imagem:**
- Sempre inclua `alt` (descritivo para imagens informativas, vazio `alt=""` para decorativas)
- Defina `width` e `height` para evitar layout shift (CLS)
- Use `loading="lazy"` para imagens abaixo do fold
- Prefira formatos modernos: WebP ou AVIF (menor tamanho, mesma qualidade)

### 7.2 Vídeo

```html
<video
  controls
  width="800"
  poster="thumbnail.jpg"
  preload="metadata"
>
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  <track kind="subtitles" src="legendas-pt.vtt" srclang="pt" label="Português">
  <p>Seu navegador não suporta vídeo HTML5. <a href="video.mp4">Baixe o vídeo</a>.</p>
</video>
```

### 7.3 Áudio

```html
<audio controls preload="metadata">
  <source src="podcast.ogg" type="audio/ogg">
  <source src="podcast.mp3" type="audio/mpeg">
  <p>Seu navegador não suporta áudio HTML5.</p>
</audio>
```

---

## 8. Tabelas

```html
<table>
  <caption>Vendas por Região – 2024</caption>
  <thead>
    <tr>
      <th scope="col">Região</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Sudeste</th>
      <td>R$ 120k</td>
      <td>R$ 145k</td>
      <td>R$ 265k</td>
    </tr>
    <tr>
      <th scope="row">Sul</th>
      <td>R$ 80k</td>
      <td>R$ 95k</td>
      <td>R$ 175k</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>R$ 200k</td>
      <td>R$ 240k</td>
      <td>R$ 440k</td>
    </tr>
  </tfoot>
</table>
```

> 💡 Use tabelas **apenas para dados tabulares**. Nunca para layout de página.

---

## 9. Formulários

```html
<form action="/contato" method="post" novalidate>

  <!-- Agrupamento de campos relacionados -->
  <fieldset>
    <legend>Dados Pessoais</legend>

    <div>
      <label for="nome">Nome completo *</label>
      <input
        type="text"
        id="nome"
        name="nome"
        required
        autocomplete="name"
        placeholder="Ex: Maria Silva"
        minlength="3"
      >
    </div>

    <div>
      <label for="email">E-mail *</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        autocomplete="email"
        placeholder="exemplo@dominio.com"
      >
    </div>

    <div>
      <label for="telefone">Telefone</label>
      <input
        type="tel"
        id="telefone"
        name="telefone"
        autocomplete="tel"
        pattern="[0-9]{10,11}"
        placeholder="11999999999"
      >
    </div>

    <div>
      <label for="data-nascimento">Data de nascimento</label>
      <input type="date" id="data-nascimento" name="data_nascimento">
    </div>
  </fieldset>

  <fieldset>
    <legend>Mensagem</legend>

    <div>
      <label for="assunto">Assunto *</label>
      <select id="assunto" name="assunto" required>
        <option value="">Selecione...</option>
        <option value="suporte">Suporte técnico</option>
        <option value="vendas">Vendas</option>
        <option value="outro">Outro</option>
      </select>
    </div>

    <div>
      <label for="mensagem">Mensagem *</label>
      <textarea
        id="mensagem"
        name="mensagem"
        required
        rows="5"
        minlength="20"
        maxlength="1000"
        placeholder="Descreva sua mensagem..."
      ></textarea>
    </div>

    <!-- Radio buttons -->
    <fieldset>
      <legend>Como prefere ser contactado?</legend>
      <label>
        <input type="radio" name="contato_preferido" value="email" checked>
        E-mail
      </label>
      <label>
        <input type="radio" name="contato_preferido" value="telefone">
        Telefone
      </label>
    </fieldset>

    <!-- Checkbox -->
    <label>
      <input type="checkbox" name="newsletter" value="1">
      Quero receber novidades por e-mail
    </label>

  </fieldset>

  <button type="submit">Enviar mensagem</button>
  <button type="reset">Limpar formulário</button>

</form>
```

**Tipos de input importantes:**

| `type` | Uso |
|--------|-----|
| `text` | Texto genérico |
| `email` | E-mail (valida formato) |
| `password` | Senha (oculta caracteres) |
| `number` | Números |
| `tel` | Telefone |
| `url` | URL |
| `date` | Data |
| `time` | Hora |
| `datetime-local` | Data e hora |
| `search` | Campo de busca |
| `range` | Slider numérico |
| `color` | Seletor de cor |
| `file` | Upload de arquivo |
| `checkbox` | Caixa de seleção |
| `radio` | Seleção exclusiva |
| `hidden` | Campo oculto |

---

## 10. SEO com HTML

### 10.1 Metadados Essenciais

```html
<head>
  <title>Título da Página – Nome do Site</title>
  <!-- 50–60 caracteres ideais; inclua a palavra-chave principal -->

  <meta name="description" content="Descrição atrativa da página com 150-160 caracteres que aparece nos resultados de busca.">

  <link rel="canonical" href="https://example.com/pagina-atual">
  <!-- Indica a URL preferida para evitar conteúdo duplicado -->

  <meta name="robots" content="index, follow">
  <!-- index = pode indexar | follow = pode seguir links -->
</head>
```

### 10.2 Open Graph (Facebook, LinkedIn, WhatsApp)

```html
<head>
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://example.com/pagina">
  <meta property="og:title" content="Título ao compartilhar nas redes sociais">
  <meta property="og:description" content="Descrição ao compartilhar nas redes sociais.">
  <meta property="og:image" content="https://example.com/og-image.jpg">
  <!-- Imagem: mínimo 1200×630px, proporção 1.91:1 -->
  <meta property="og:locale" content="pt_BR">

  <!-- Twitter/X Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@meusite">
  <meta name="twitter:title" content="Título ao compartilhar no Twitter">
  <meta name="twitter:description" content="Descrição ao compartilhar no Twitter.">
  <meta name="twitter:image" content="https://example.com/twitter-image.jpg">
</head>
```

### 10.3 Dados Estruturados (JSON-LD / Schema.org)

Ajuda o Google a entender o conteúdo e exibir *rich results*:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Título do Artigo",
  "description": "Descrição do artigo",
  "author": {
    "@type": "Person",
    "name": "João Silva"
  },
  "datePublished": "2024-01-15",
  "image": "https://example.com/imagem-artigo.jpg"
}
</script>
```

Outros tipos comuns: `Organization`, `Product`, `FAQPage`, `BreadcrumbList`, `LocalBusiness`.

---

## Práticas

| # | Arquivo | Descrição |
|---|---------|-----------|
| 01 | [Estrutura Semântica Básica](praticas/01-estrutura-basica.html) | Página completa usando elementos semânticos |
| 02 | [Formulário Completo](praticas/02-formulario-completo.html) | Formulário com todos os tipos de input e validação |
| 03 | [SEO e Metatags](praticas/03-seo-metatags.html) | Página com metadados completos para SEO |

---

## Referências

- [HTML Living Standard – WHATWG](https://html.spec.whatwg.org/)
- [HTML – MDN Web Docs](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [HTML Semântico – web.dev](https://web.dev/learn/html/semantic-html/)
- [Google Search Central – Metadados](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Open Graph Protocol](https://ogp.me/)
- [Schema.org](https://schema.org/)
- [Testador de Dados Estruturados do Google](https://search.google.com/structured-data/testing-tool)
