# Módulo 01 — Arquitetura da Web

> Antes de escrever a primeira linha de HTML, é preciso saber o que acontece entre digitar um endereço e a página aparecer. Este módulo abre essa caixa-preta.

| | |
| --- | --- |
| **Carga horária** | 8 h (4 h expositivas + 4 h de prática) |
| **Pré-requisito** | Nenhum — este é o ponto de partida da disciplina |
| **Práticas** | [`praticas/`](praticas/) |

---

## Objetivos de aprendizagem

Ao final deste módulo, você será capaz de:

1. **Descrever** as etapas entre digitar uma URL e ver a página renderizada.
2. **Interpretar** um código de status HTTP e decidir de quem é o problema: cliente ou servidor.
3. **Explicar** por que HTTPS é obrigatório e o que ele garante.
4. **Percorrer** o pipeline de renderização e apontar em que etapa um problema visual nasce.
5. **Navegar** a árvore do DOM pelo console do navegador.
6. **Consultar** uma especificação e verificar o suporte de um recurso antes de usá-lo.

---

## Roteiro

```text
1. O que acontece ao abrir uma página   ← o mapa geral
        ↓
2. HTTP: o idioma da web                ← verbos, status, headers
        ↓
3. HTTPS: por que tudo é criptografado
        ↓
4. Dentro do navegador                  ← pipeline de renderização
        ↓
5. DOM: a página como árvore            ← base para os Módulos 05 e 07
        ↓
6. Web Standards e compatibilidade
        ↓
7. APIs do navegador                    ← catálogo de referência
```

---

## 1. O que acontece ao abrir uma página

Quando você digita `https://ifpe.edu.br` e pressiona Enter, o navegador executa uma
sequência de etapas em milissegundos:

```text
1. URL          você digita o endereço
      ↓
2. DNS          "ifpe.edu.br" é traduzido para um endereço IP (ex.: 200.17.98.10)
      ↓
3. TCP + TLS    o navegador abre uma conexão e negocia a criptografia
      ↓
4. Requisição   o navegador pede o documento: GET / HTTP/2
      ↓
5. Resposta     o servidor devolve status, headers e o HTML
      ↓
6. Renderização o navegador transforma HTML, CSS e JS em pixels na tela
```

Cada etapa é um ponto onde algo pode dar errado — e cada uma tem uma ferramenta de
diagnóstico própria, que você vai usar no [Módulo 07](../07-devtools/README.md).

### Anatomia de uma URL

```text
https://www.ifpe.edu.br:443/cursos/ads?turma=2026#ementa
└─┬─┘   └──────┬───────┘└┬┘└────┬────┘└────┬────┘└──┬──┘
protocolo    domínio    porta  caminho   query   fragmento
```

| Parte | Função |
| --- | --- |
| Protocolo | Como conversar (`https`, `http`, `file`) |
| Domínio | Com quem conversar — traduzido em IP pelo DNS |
| Porta | Qual serviço no servidor (443 para HTTPS, 80 para HTTP — omitida por padrão) |
| Caminho | Qual recurso dentro do servidor |
| Query | Parâmetros extras, no formato `chave=valor` separados por `&` |
| Fragmento | Âncora dentro da própria página — **não é enviado ao servidor** |

> **Experimente:** abra o console do navegador (F12 → Console) em qualquer site e
> digite `location`. Compare os campos do objeto com a tabela acima.

---

## 2. HTTP: o idioma da web

HTTP é um protocolo de **requisição e resposta**: o cliente pergunta, o servidor
responde, a conexão pode ser reaproveitada. Ele é *stateless* — cada requisição é
independente, e o servidor não lembra da anterior. É por isso que existem cookies e
tokens: para carregar contexto de uma requisição para a próxima.

### 2.1 Verbos

| Verbo | Uso | Tem corpo? | Seguro? |
| --- | --- | --- | --- |
| `GET` | Buscar um recurso | Não | Sim — não altera nada |
| `POST` | Criar um recurso ou enviar dados | Sim | Não |
| `PUT` | Substituir um recurso inteiro | Sim | Não |
| `PATCH` | Atualizar parte de um recurso | Sim | Não |
| `DELETE` | Remover um recurso | Opcional | Não |

Um verbo *seguro* não muda o estado do servidor. Um verbo *idempotente* (`GET`, `PUT`,
`DELETE`) produz o mesmo resultado se repetido — por isso é seguro reenviar um `PUT`
que falhou, mas arriscado reenviar um `POST`.

### 2.2 Códigos de status

O primeiro dígito já indica de quem é a responsabilidade:

| Faixa | Significado | Quem resolve |
| --- | --- | --- |
| `1xx` | Informativo | — |
| `2xx` | Sucesso | — |
| `3xx` | Redirecionamento | Navegador (automático) |
| `4xx` | Erro **do cliente** | Você, no front-end |
| `5xx` | Erro **do servidor** | Equipe de back-end |

Os que você mais vai encontrar:

| Código | Significado | Situação típica |
| --- | --- | --- |
| `200 OK` | Sucesso | Requisição normal |
| `201 Created` | Recurso criado | Depois de um `POST` bem-sucedido |
| `204 No Content` | Sucesso sem corpo | Depois de um `DELETE` |
| `301 Moved Permanently` | Mudou de endereço para sempre | Site migrou de domínio |
| `304 Not Modified` | Use o que está em cache | Recurso não mudou desde a última visita |
| `400 Bad Request` | Requisição malformada | JSON inválido no corpo |
| `401 Unauthorized` | Falta autenticação | Token ausente ou expirado |
| `403 Forbidden` | Autenticado, mas sem permissão | Usuário comum acessando área de admin |
| `404 Not Found` | Recurso não existe | URL digitada errada |
| `422 Unprocessable Entity` | Formato certo, dados inválidos | E-mail sem `@` |
| `429 Too Many Requests` | Excedeu o limite de chamadas | API com *rate limit* |
| `500 Internal Server Error` | Erro não tratado no servidor | Exceção no back-end |
| `503 Service Unavailable` | Servidor fora do ar ou sobrecarregado | Manutenção |

> **Regra prática:** recebeu `4xx`? Revise sua requisição. Recebeu `5xx`? O problema não
> é seu — mas seu código ainda precisa tratar o erro com elegância. Isso é assunto do
> [Módulo 06](../06-assincronismo/README.md).

### 2.3 Headers

Headers são metadados que acompanham requisição e resposta:

```http
GET /api/cursos HTTP/2
Host: exemplo.ifpe.edu.br
Accept: application/json
Authorization: Bearer eyJhbGciOi...
User-Agent: Mozilla/5.0 ...
```

```http
HTTP/2 200
Content-Type: application/json; charset=utf-8
Content-Length: 1842
Cache-Control: max-age=3600
Access-Control-Allow-Origin: https://ifpe.edu.br
```

| Header | Papel |
| --- | --- |
| `Content-Type` | Formato do corpo (`application/json`, `text/html`) |
| `Accept` | Formatos que o cliente aceita receber |
| `Authorization` | Credencial de acesso |
| `Cache-Control` | Por quanto tempo a resposta pode ser reaproveitada |
| `Access-Control-Allow-Origin` | Quais origens podem ler a resposta (CORS) |

### 2.4 Versões do protocolo

| Versão | Ano | Característica principal |
| --- | --- | --- |
| HTTP/1.1 | 1997 | Uma requisição por vez na conexão; *keep-alive* reaproveita a conexão |
| HTTP/2 | 2015 | Multiplexação: várias requisições simultâneas numa conexão; headers comprimidos |
| HTTP/3 | 2022 | Roda sobre QUIC (UDP); elimina o bloqueio de fila do TCP; melhor em rede instável |

Na prática, HTTP/2 e HTTP/3 tornaram obsoletas otimizações antigas como juntar todas as
imagens num *sprite* ou concatenar arquivos JS a qualquer custo.

> **Experimente:** na aba Network do DevTools, clique com o botão direito no cabeçalho
> das colunas e ative a coluna **Protocol**. Veja quais sites já servem por `h3`.

---

## 3. HTTPS: por que tudo é criptografado

HTTPS é HTTP dentro de um túnel TLS. Ele garante três coisas:

| Garantia | O que significa |
| --- | --- |
| **Confidencialidade** | Ninguém no caminho lê o conteúdo trafegado |
| **Integridade** | Os dados não foram alterados em trânsito |
| **Autenticidade** | O certificado prova que o servidor é mesmo quem diz ser |

Desde 2018 o Chrome marca páginas HTTP como "Não seguro". Hoje, além disso, vários
recursos do navegador só funcionam em contexto seguro (HTTPS ou `localhost`):
geolocalização, câmera e microfone, Service Workers, notificações e a Clipboard API.

Isso tem consequência direta para você: um projeto aberto com duplo clique no arquivo
(`file://`) não roda tudo. A partir do [Módulo 08](../08-ecossistema-frontend/README.md)
você usará um servidor local, que resolve isso.

---

## 4. Dentro do navegador

O navegador transforma texto em pixels seguindo um caminho fixo, o **Critical Rendering Path**:

```text
HTML  →  tokens  →  DOM  ┐
                          ├→  Render Tree  →  Layout  →  Paint  →  Composite
CSS   →  tokens  →  CSSOM ┘
```

| Etapa | O que acontece | Erro típico nessa etapa |
| --- | --- | --- |
| **Parsing HTML** | Bytes viram a árvore DOM | Tag não fechada bagunça a estrutura |
| **Parsing CSS** | Bytes viram o CSSOM | Seletor inválido derruba a regra inteira |
| **Render Tree** | DOM + CSSOM, só o que é visível (`display: none` fica de fora) | Elemento "sumiu" |
| **Layout** | Calcula posição e tamanho de cada caixa | Layout quebrado, deslocamento de conteúdo |
| **Paint** | Desenha pixels em camadas | Cores e sombras erradas |
| **Composite** | Junta as camadas na tela | Animação travada |

Alterar geometria (largura, altura, posição) força um novo **Layout** — caro. Alterar só
`transform` e `opacity` fica no **Composite** — barato. É por isso que animações
performáticas usam `transform` em vez de `left`/`top`.

### 4.1 Scripts bloqueiam a renderização

Ao encontrar um `<script>` sem atributos, o parser **para** e espera o download e a
execução do JavaScript:

```html
<!-- Bloqueia o parsing: evite no <head> -->
<script src="app.js"></script>

<!-- Baixa em paralelo, executa após o HTML estar pronto, na ordem declarada -->
<script src="app.js" defer></script>

<!-- Baixa em paralelo, executa assim que chegar, fora de ordem -->
<script src="analytics.js" async></script>

<!-- Módulos ES já são defer por padrão -->
<script type="module" src="main.js"></script>
```

**Padrão recomendado:** `defer` para o código da sua aplicação, `async` só para scripts
independentes como métricas.

### 4.2 Arquitetura em processos

Navegadores modernos isolam responsabilidades em processos separados. Se uma aba trava,
as outras continuam vivas — e um site malicioso não alcança a memória dos demais.

| Processo | Responsabilidade |
| --- | --- |
| Browser | Janela, abas, barra de endereço, permissões |
| Renderer | Um por site: executa HTML, CSS e JS dentro de uma *sandbox* |
| GPU | Composição das camadas |
| Network | Requisições de rede |
| Extensões | Isolado por segurança |

---

## 5. DOM: a página como árvore

O **DOM** (*Document Object Model*) é a representação do documento em memória, em forma de
árvore, exposta ao JavaScript como uma API. Um ponto importante: **o DOM não é o seu
arquivo HTML**. É o resultado da interpretação dele — com tags implícitas adicionadas,
erros corrigidos e alterações feitas por script.

Dado este HTML:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <title>Exemplo</title>
  </head>
  <body>
    <h1 id="titulo">Olá, Web!</h1>
    <p class="intro">Parágrafo de exemplo.</p>
  </body>
</html>
```

A árvore correspondente:

```text
Document
└── html (Element)
    ├── head (Element)
    │   └── title (Element)
    │       └── "Exemplo" (Text)
    └── body (Element)
        ├── h1#titulo (Element)
        │   └── "Olá, Web!" (Text)
        └── p.intro (Element)
            └── "Parágrafo de exemplo." (Text)
```

### 5.1 Tipos de nó

| Tipo | Constante | Exemplo |
| --- | --- | --- |
| Element | `Node.ELEMENT_NODE` (1) | `<div>`, `<p>` |
| Text | `Node.TEXT_NODE` (3) | O conteúdo textual entre as tags |
| Comment | `Node.COMMENT_NODE` (8) | `<!-- comentário -->` |
| Document | `Node.DOCUMENT_NODE` (9) | O objeto `document` |
| DocumentType | `Node.DOCUMENT_TYPE_NODE` (10) | `<!DOCTYPE html>` |

### 5.2 Explorando pelo console

Abra qualquer página, pressione F12 e experimente:

```javascript
document.title                      // título da aba
document.documentElement            // o elemento <html>
document.body.children              // filhos diretos do body
document.querySelector('h1')        // primeiro h1
document.querySelectorAll('a')      // todos os links
document.querySelectorAll('a').length

const titulo = document.querySelector('h1')
titulo.textContent                  // lê o texto
titulo.textContent = 'Alterado!'    // altera na hora
titulo.parentElement                // sobe um nível na árvore
titulo.nextElementSibling           // irmão seguinte
```

A alteração é imediata na tela e desaparece ao recarregar: você mexeu no DOM em memória,
não no arquivo do servidor.

> **Experimente:** entre em um site de notícias e rode
> `document.querySelectorAll('img').length`. Depois
> `[...document.querySelectorAll('img')].filter(img => !img.alt).length` — quantas imagens
> estão sem texto alternativo? Guarde esse número para o [Módulo 04](../04-acessibilidade/README.md).

A manipulação sistemática do DOM é o assunto do [Módulo 05](../05-javascript/README.md).

---

## 6. Web Standards e compatibilidade

A web funciona em navegadores diferentes porque é definida por especificações abertas,
e não pelo produto de uma empresa.

| Organização | Cuida de |
| --- | --- |
| **WHATWG** | HTML Living Standard, DOM, Fetch, Streams |
| **W3C** | CSS, WAI-ARIA, SVG, WebVTT |
| **TC39 / ECMA** | ECMAScript (a linguagem JavaScript) |
| **IETF** | HTTP, TLS, QUIC, WebSockets |

Especificações de referência:

- [HTML Living Standard](https://html.spec.whatwg.org/)
- [CSS Specifications](https://www.w3.org/Style/CSS/)
- [ECMAScript](https://tc39.es/ecma262/)
- [Fetch Standard](https://fetch.spec.whatwg.org/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

### 6.1 Antes de usar um recurso, verifique o suporte

Duas ferramentas resolvem a pergunta "posso usar isto hoje?":

- **[Baseline](https://web.dev/baseline)** — classifica recursos em *newly available*
  (funciona nos navegadores atuais) e *widely available* (disponível há 30 meses em todos
  os navegadores principais). É o critério mais direto para decidir.
- **[caniuse.com](https://caniuse.com/)** — tabela detalhada por navegador e versão,
  útil quando você precisa suportar versões antigas específicas.

Neste curso usamos apenas recursos *Baseline widely available*, salvo aviso explícito.

---

## 7. APIs do navegador

O navegador entrega um conjunto grande de funcionalidades prontas ao JavaScript. Você não
precisa decorar esta tabela — use-a como referência ao longo do curso.

| API | Função | Módulo em que aparece |
| --- | --- | --- |
| `document` | Acesso ao DOM | 05 |
| `window` | Objeto global, dimensões, navegação | 05 |
| `location` | URL atual e redirecionamento | 01 |
| `navigator` | Informações do dispositivo e do navegador | — |
| `history` | Histórico de navegação (`pushState`) | — |
| `localStorage` / `sessionStorage` | Armazenamento local no navegador | 05 |
| `fetch()` | Requisições HTTP | 06 |
| `AbortController` | Cancelamento de requisições | 06 |
| `setTimeout` / `setInterval` | Temporizadores | 06 |
| `requestAnimationFrame` | Animações sincronizadas com a tela | — |
| `IntersectionObserver` | Detecta quando um elemento entra na tela | — |
| `ResizeObserver` | Detecta mudança de tamanho de um elemento | — |
| `MutationObserver` | Observa alterações no DOM | — |
| `structuredClone()` | Cópia profunda de objetos | 05 |
| `ServiceWorker` | Cache offline e PWA | — |

---

## Erros comuns

| Sintoma | Causa provável | Correção |
| --- | --- | --- |
| "Meu JS não acha o elemento" | O script rodou antes do HTML existir | Use `defer` ou `<script type="module">` |
| Alteração no console some ao recarregar | Você editou o DOM em memória, não o arquivo | Edite o arquivo-fonte |
| `404` num arquivo CSS que existe | Caminho relativo errado | Confira o caminho na aba Network |
| Câmera/geolocalização não funciona | Página aberta via `file://` | Use um servidor local (Módulo 08) |
| Erro de CORS no console | O servidor não autorizou sua origem | Ajuste no back-end — não dá para contornar pelo front |
| Confundir `404` com `403` | — | `404`: não existe. `403`: existe, mas você não pode ver |

---

## Checklist de autoavaliação

Marque quando conseguir fazer **sem consultar o material**:

- [ ] Explicar as seis etapas entre digitar a URL e ver a página
- [ ] Identificar as partes de uma URL e dizer qual delas não vai ao servidor
- [ ] Dizer, olhando um código de status, se o problema é do cliente ou do servidor
- [ ] Explicar as três garantias do HTTPS
- [ ] Citar as etapas do pipeline de renderização em ordem
- [ ] Justificar por que `transform` anima melhor que `left`
- [ ] Explicar a diferença entre `defer` e `async`
- [ ] Desenhar a árvore DOM de um HTML simples
- [ ] Selecionar e alterar um elemento pelo console
- [ ] Verificar o suporte de um recurso antes de usá-lo

---

## Práticas

| # | Arquivo | Foco | Objetivo trabalhado |
| --- | --- | --- | --- |
| 01 | [Primeiro contato com o DevTools](praticas/01-primeiro-contato-devtools.md) | Abrir e navegar pelos painéis | 5 |
| 02 | [Rede e carregamento de página](praticas/02-rede-e-carregamento.md) | Requisições, headers, tempos | 1, 2 |
| 03 | [Explorando o DOM](praticas/03-explorando-dom.html) | Seleção e alteração de nós | 5 |
| 04 | [DOM intermediário](praticas/04-dom-intermediario.html) | Percorrer e modificar a árvore | 5 |

Faça na ordem: cada prática assume a anterior.

---

## Exercícios

### Nível 1 — Fixação

1. Descreva, em até 10 linhas, tudo o que acontece entre digitar `ifpe.edu.br` e a página aparecer.
2. Classifique cada código como erro do cliente ou do servidor: `401`, `500`, `404`, `503`, `422`, `403`.
3. Quebre a URL `https://api.exemplo.com:8443/v2/alunos?curso=ads&ano=2026#historico` em suas seis partes.

### Nível 2 — Aplicação

4. Abra três sites diferentes com a aba Network aberta. Para cada um, registre: número de
   requisições, peso total transferido, tempo até o `DOMContentLoaded` e protocolo usado
   (`h2` ou `h3`). Monte uma tabela comparativa e escreva um parágrafo sobre qual é o mais leve e por quê.
5. Escolha uma página e desenhe à mão a árvore DOM dos três primeiros níveis. Depois
   confira sua resposta no painel Elements.
6. Usando só o console, altere o título, o primeiro parágrafo e a cor de fundo de uma
   página real. Registre os comandos usados.

### Nível 3 — Desafio

7. Use o *throttling* do DevTools em "Slow 3G" e recarregue um site pesado. Identifique
   qual recurso mais atrasa a exibição do conteúdo e proponha duas mudanças concretas para
   melhorar. Justifique cada uma citando a etapa do pipeline de renderização afetada.
8. Escolha um recurso moderno da web (por exemplo `<dialog>`, `:has()` ou View Transitions),
   consulte o Baseline e o caniuse, e escreva um parágrafo respondendo: dá para usar em
   produção hoje? Em que condições?

---

## Referências

- [Como os navegadores funcionam — web.dev](https://web.dev/articles/howbrowserswork)
- [Visão geral do HTTP — MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview)
- [Códigos de status HTTP — MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status)
- [Introdução ao DOM — MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model/Introduction)
- [Critical Rendering Path — web.dev](https://web.dev/learn/performance/understanding-the-critical-path)
- [Baseline — web.dev](https://web.dev/baseline)
- [Can I Use](https://caniuse.com/)

---

**Navegação:** [Índice da disciplina](../../README.md) · **Próximo:** [Módulo 02 — HTML Semântico](../02-html-semantico/README.md)
