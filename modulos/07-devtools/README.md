# Módulo 07 — DevTools

> Todo desenvolvedor escreve código com defeito. A diferença entre o iniciante e o profissional é o tempo que leva para encontrar o defeito — e isso depende de saber usar as ferramentas.

| | |
| --- | --- |
| **Carga horária** | 8 h (3 h expositivas + 5 h de prática) |
| **Pré-requisito** | [Módulo 06 — Assincronismo](../06-assincronismo/README.md) |
| **Práticas** | [`praticas/`](praticas/) |

---

## Objetivos de aprendizagem

Ao final deste módulo, você será capaz de:

1. **Localizar** a origem de um problema de layout usando os painéis Elements, Styles e Computed.
2. **Depurar** JavaScript com breakpoints, inspecionando escopo e pilha de chamadas.
3. **Diagnosticar** falhas de requisição pelo painel Network, distinguindo erro de rede, de CORS e de aplicação.
4. **Medir** o desempenho de uma página pelas Core Web Vitals e identificar o gargalo.
5. **Auditar** uma página com Lighthouse e priorizar as correções por impacto.
6. **Aplicar** um método sistemático de depuração, em vez de tentativa e erro.

---

## Roteiro

```text
1. Abrindo e organizando o DevTools
        ↓
2. Elements + Styles     ← problemas visuais
        ↓
3. Console               ← inspeção rápida
        ↓
4. Sources               ← depuração de lógica
        ↓
5. Network               ← problemas de dados
        ↓
6. Performance e Core Web Vitals
        ↓
7. Lighthouse            ← auditoria consolidada
        ↓
8. Método de depuração   ← como juntar tudo
```

---

## 1. Abrindo e organizando o DevTools

| Atalho (Windows/Linux) | macOS | Ação |
| --- | --- | --- |
| `F12` ou `Ctrl+Shift+I` | `Cmd+Option+I` | Abrir/fechar DevTools |
| `Ctrl+Shift+C` | `Cmd+Option+C` | Inspecionar elemento |
| `Ctrl+Shift+J` | `Cmd+Option+J` | Abrir direto no Console |
| `Ctrl+Shift+M` | `Cmd+Option+M` | Alternar modo dispositivo |
| `Ctrl+Shift+P` | `Cmd+Shift+P` | **Menu de comandos** |
| `Esc` | `Esc` | Abrir a gaveta do Console em qualquer painel |

O **menu de comandos** (`Ctrl+Shift+P`) é o atalho mais útil de todos: digite o que você
quer e ele encontra. Experimente `screenshot` (captura de tela em tamanho real),
`coverage` (mostra o CSS e o JS não utilizados) ou `rendering`.

> **Experimente:** abra o menu de comandos e digite "Capture full size screenshot". Ele
> fotografa a página inteira, inclusive o que está fora da tela.

Modo dispositivo (`Ctrl+Shift+M`): simula tamanhos de tela, densidade de pixel e
`User-Agent`. Útil, mas não substitui teste em aparelho real — o desempenho é diferente.

---

## 2. Elements e Styles — problemas visuais

### 2.1 Painel Elements

Mostra o **DOM ao vivo**, não o HTML original. Se o JavaScript alterou a página, você vê o
resultado atual — inclusive elementos que não existem no arquivo-fonte.

Ações principais:

- Duplo clique em tag, atributo ou texto para editar
- `Delete` remove o elemento selecionado
- Arrastar reposiciona na árvore
- Botão direito → **Force state** força `:hover`, `:focus`, `:active`
- Botão direito → **Break on** pausa a execução quando o elemento é modificado por script
- `$0` no Console referencia o último elemento selecionado

### 2.2 Painel Styles

Lista as regras que atingem o elemento, **em ordem de prioridade**:

```text
element.style { }              ← estilo inline, vence quase tudo

.card.destaque {               styles.css:42
  border: 2px solid gold;
}

.card {                        styles.css:23
  ~~color: red;~~              ← tachado = perdeu para outra regra
  padding: 1rem;
}

div {                          user agent stylesheet
  display: block;              ← padrão do navegador
}
```

**Texto tachado significa que a declaração perdeu.** Essa é a informação mais valiosa do
painel: se a sua regra aparece riscada, o problema não é a sintaxe, é a especificidade
(veja o [Módulo 03](../03-css-moderno/README.md)).

Recursos do painel:

- Clique em qualquer valor para editar ao vivo
- Setas `↑` `↓` alteram números (com `Shift`: ±10; com `Alt`: ±0,1)
- `:hov` força estados sem precisar do mouse
- `.cls` adiciona ou remove classes
- `+` cria uma regra nova

### 2.3 Painel Computed

Mostra o **valor final** de cada propriedade, depois de resolvida toda a cascata. É onde
você descobre que `1rem` virou `16px` e, clicando na seta, de qual arquivo e linha aquele
valor veio.

Use o Styles para entender **por que** uma regra perdeu; use o Computed para saber **qual
valor venceu**.

### 2.4 Box model visual

No fim do Computed (ou no painel Layout) aparece o diagrama:

```text
┌────────────────────────────────────┐
│         margin   (24px)            │
│  ┌──────────────────────────────┐  │
│  │      border   (2px)          │  │
│  │  ┌────────────────────────┐  │  │
│  │  │    padding   (16px)    │  │  │
│  │  │  ┌──────────────────┐  │  │  │
│  │  │  │  content         │  │  │  │
│  │  │  │  400 × 200       │  │  │  │
│  │  │  └──────────────────┘  │  │  │
│  │  └────────────────────────┘  │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

Passar o mouse sobre cada camada a destaca na página. Resolve na hora a dúvida "de onde
vem esse espaço".

### 2.5 Painel Accessibility

Dentro de Elements, mostra como o elemento é exposto à tecnologia assistiva: nome
acessível, papel e estados. É onde você confirma o que foi visto no
[Módulo 04](../04-acessibilidade/README.md) — por exemplo, que o seu botão de ícone está
sem nome nenhum.

---

## 3. Console

### 3.1 Além do `console.log`

```javascript
console.log('Mensagem', variavel)
console.info('Informação')
console.warn('Aviso')
console.error('Erro')            // inclui a pilha de chamadas

// Array de objetos em formato de tabela — muito melhor que log
console.table(alunos)
console.table(alunos, ['nome', 'nota'])   // só as colunas escolhidas

// Agrupamento
console.group('Dados do usuário')
console.log('Nome:', usuario.nome)
console.groupEnd()
console.groupCollapsed('Detalhes')        // começa fechado
console.groupEnd()

// Medição de tempo
console.time('processamento')
processarDados()
console.timeEnd('processamento')          // 'processamento: 3.2ms'

// Contagem de chamadas
console.count('render')                   // render: 1, render: 2...
console.countReset('render')

// Só registra se a condição for falsa
console.assert(total > 0, 'Total deveria ser positivo')

// De onde esta função foi chamada?
console.trace('rastreio')

// Estilo (útil para destacar em log volumoso)
console.log('%cAtenção', 'color: red; font-size: 16px; font-weight: bold')
```

`console.table` é subutilizado. Para qualquer array de objetos, é imediatamente mais
legível que `console.log`.

### 3.2 Atalhos exclusivos do Console

Funcionam apenas no DevTools, não no código da página:

```javascript
$('h1')            // = document.querySelector('h1')
$$('a')            // = querySelectorAll, já como Array
$x('//h2')         // seleção por XPath

$0                 // último elemento selecionado no Elements
$1, $2, $3, $4     // seleções anteriores
$_                 // resultado da última expressão avaliada

copy(objeto)       // copia para a área de transferência
dir(elemento)      // mostra o objeto em vez do HTML renderizado

monitorEvents($0, 'click')      // registra cada evento no elemento
unmonitorEvents($0)

getEventListeners($0)           // lista os listeners registrados

queryObjects(Promise)           // instâncias vivas de uma classe
```

`monitorEvents` e `getEventListeners` são a forma mais rápida de descobrir por que um
clique não funciona.

### 3.3 Filtros

Em páginas com muito log, use a caixa de filtro e o seletor de nível (Errors, Warnings,
Info, Verbose). Marque **Preserve log** para manter as mensagens entre navegações.

---

## 4. Sources — depuração de JavaScript

`console.log` mostra um valor por vez. Um breakpoint pausa a execução e mostra **todos** os
valores ao mesmo tempo, no ponto exato.

### 4.1 Tipos de breakpoint

| Tipo | Como criar | Quando usar |
| --- | --- | --- |
| **Linha** | Clique no número da linha | Uso geral |
| **Condicional** | Botão direito → *Add conditional breakpoint* | Pausar só quando `id === 42` |
| **Logpoint** | Botão direito → *Add logpoint* | Registrar valores sem parar e sem sujar o código |
| **`debugger`** | Escrever `debugger` no código | Pausar em código gerado dinamicamente |
| **Em exceções** | Ícone de pausa no painel | Descobrir onde um erro nasce |
| **Em evento** | Event Listener Breakpoints | Pausar em qualquer `click` |
| **Em alteração do DOM** | Elements → botão direito → Break on | Descobrir que script mexeu no elemento |

O **logpoint** é o recurso mais subestimado: registra uma expressão sem pausar a execução
e sem editar o arquivo — nenhum `console.log` esquecido no commit.

```text
Botão direito na linha → Add logpoint → `Iteração ${i}, valor ${x}`
```

O breakpoint **condicional** salva tempo em laços grandes: em vez de apertar "continuar"
duzentas vezes, pause só no caso problemático.

### 4.2 Controles

| Botão | Atalho | Ação |
| --- | --- | --- |
| ▶ Resume | `F8` | Continuar até o próximo breakpoint |
| ⤼ Step over | `F10` | Próxima linha, sem entrar na função |
| ⤓ Step into | `F11` | Entrar na função chamada |
| ⤒ Step out | `Shift+F11` | Sair da função atual |
| ↺ Restart frame | — | Reexecutar a função atual desde o início |

*Restart frame* permite repetir a mesma função com valores diferentes, sem recarregar a página.

### 4.3 Painéis laterais

- **Scope** — variáveis locais, do closure e globais no ponto atual. Substitui vários `console.log`.
- **Call Stack** — quem chamou quem até chegar aqui. Clique em qualquer nível para inspecioná-lo.
- **Watch** — expressões monitoradas continuamente (`usuario.nome`, `lista.length`).
- **Breakpoints** — lista de todos, com opção de desativar temporariamente.

### 4.4 Snippets

Sources → Snippets: scripts reutilizáveis que rodam em qualquer página com `Ctrl+Enter`.
Útil para verificações repetidas:

```javascript
// Snippet: auditoria rápida de acessibilidade
const semAlt = [...document.querySelectorAll('img:not([alt])')]
const camposSemLabel = [...document.querySelectorAll('input, select, textarea')]
  .filter(c => !c.labels?.length && !c.getAttribute('aria-label'))

console.table({
  'Imagens sem alt': semAlt.length,
  'Campos sem label': camposSemLabel.length,
  'Quantidade de h1': document.querySelectorAll('h1').length,
  'Tem <main>': !!document.querySelector('main'),
})
```

---

## 5. Network — problemas de dados

### 5.1 Configuração antes de medir

Antes de qualquer análise, marque:

- **Preserve log** — mantém o registro após redirecionamentos
- **Disable cache** — simula a experiência do primeiro acesso

### 5.2 Colunas

| Coluna | Informa |
| --- | --- |
| Name | Recurso solicitado |
| Status | Código HTTP ([Módulo 01](../01-arquitetura-web/README.md)) |
| Type | Tipo do recurso (`fetch`, `script`, `css`, `img`) |
| Initiator | **Qual arquivo e linha originou a requisição** |
| Size | Transferido / tamanho real (revela a compressão) |
| Time | Duração total |
| Waterfall | Distribuição no tempo |

A coluna **Initiator** é a que mais economiza tempo: clicando nela você vai direto à linha
de código que fez a chamada.

Adicione a coluna **Protocol** (botão direito no cabeçalho) para ver se o servidor usa
`h2` ou `h3`.

### 5.3 Analisando uma requisição

Clicando em uma requisição:

- **Headers** — URL, método, status, cabeçalhos de envio e resposta
- **Payload** — o que foi enviado
- **Preview / Response** — o corpo da resposta, com JSON já formatado
- **Timing** — a decomposição do tempo:

```text
Queueing            2 ms   ← aguardando slot de conexão
DNS Lookup          0 ms   ← já estava em cache
Initial connection 15 ms
SSL                 8 ms   ← handshake TLS
Request sent      0.5 ms
Waiting (TTFB)     85 ms   ← tempo de processamento do servidor
Content Download   14 ms   ← download do corpo
```

**TTFB alto** aponta lentidão no servidor. **Content Download alto** aponta resposta
grande demais. O diagnóstico muda completamente conforme qual dos dois domina.

### 5.4 Diagnosticando os três tipos de falha

| O que você vê | Diagnóstico | Onde resolver |
| --- | --- | --- |
| Status `(failed)`, sem resposta | Falha de rede: sem conexão, DNS, servidor fora | Infraestrutura |
| Status `(blocked)` + erro de CORS no Console | O servidor não autorizou sua origem | Back-end — não há solução no front-end |
| Status `4xx` ou `5xx` com corpo | Erro de aplicação | Ler o corpo da resposta em Preview |

O erro de CORS é o que mais confunde: a requisição **chegou** ao servidor e voltou, mas o
navegador impediu o JavaScript de ler a resposta, por faltar o cabeçalho
`Access-Control-Allow-Origin`. Nenhuma mudança no seu `fetch` resolve isso.

### 5.5 Throttling

Simule conexões lentas no seletor "No throttling":

| Perfil | Download | Latência |
| --- | --- | --- |
| Slow 4G | ~400 kb/s | 400 ms |
| Fast 4G | ~1,6 Mb/s | 150 ms |
| Offline | — | — |

Teste sempre em "Slow 4G". Boa parte do Brasil navega em condição pior que a sua rede de
desenvolvimento.

### 5.6 Copiar como cURL

Botão direito → Copy → Copy as cURL. Reproduz a requisição fora do navegador, útil para
isolar se o problema está no front-end ou no servidor:

```bash
curl 'https://api.exemplo.br/alunos' \
  -H 'Authorization: Bearer abc123' \
  -H 'Content-Type: application/json' \
  --compressed
```

---

## 6. Performance e Core Web Vitals

### 6.1 As três métricas atuais

As **Core Web Vitals** são as métricas que o Google usa para avaliar a experiência real do
usuário. Desde **março de 2024**, o **INP substituiu o FID** — material anterior a essa
data está desatualizado neste ponto.

| Métrica | Mede | Bom | Precisa melhorar | Ruim |
| --- | --- | --- | --- | --- |
| **LCP** (*Largest Contentful Paint*) | Quando o maior elemento visível termina de carregar | ≤ 2,5 s | 2,5 – 4 s | > 4 s |
| **INP** (*Interaction to Next Paint*) | Latência de resposta às interações do usuário | ≤ 200 ms | 200 – 500 ms | > 500 ms |
| **CLS** (*Cumulative Layout Shift*) | Quanto o conteúdo se desloca durante o carregamento | ≤ 0,1 | 0,1 – 0,25 | > 0,25 |

Por que a troca de FID por INP: o FID media apenas o atraso da **primeira** interação, e
apenas até o início do processamento. O INP considera **todas** as interações da visita e
mede até a tela ser efetivamente atualizada. É uma medida muito mais fiel do que o usuário
percebe como travamento.

### 6.2 Causas e correções

| Métrica | Causa comum | Correção |
| --- | --- | --- |
| LCP alto | Imagem grande sem otimização | Formato moderno (AVIF/WebP), dimensionar corretamente, `fetchpriority="high"` |
| LCP alto | CSS ou fonte bloqueando a renderização | Reduzir o CSS crítico, `font-display: swap` |
| INP alto | Tarefa longa na thread principal | Quebrar o trabalho, adiar o que não é essencial |
| INP alto | Listener pesado a cada evento | *Debounce*, delegação de eventos |
| CLS alto | Imagem sem `width`/`height` | Declarar as dimensões no HTML |
| CLS alto | Banner ou anúncio inserido no meio | Reservar o espaço com `min-height` |
| CLS alto | Fonte customizada trocando o texto | `font-display: optional` ou pré-carregar |

### 6.3 Gravando um perfil

1. Painel **Performance** → ícone de recarregar (grava desde o início do carregamento)
2. Interaja com a página
3. Pare a gravação

O que observar no resultado:

- **Long tasks** — blocos vermelhos, tarefas acima de 50 ms bloqueando a thread principal.
  São a causa principal de INP ruim.
- **Main thread** — a distribuição entre interpretar HTML, executar script, calcular
  layout e pintar.
- **Layout shifts** — marcações que apontam exatamente o elemento que se deslocou.
- **Screenshots** — a evolução visual quadro a quadro.

### 6.4 Medindo no código

```javascript
// Marcações personalizadas — aparecem no painel Performance
performance.mark('inicio-render')
renderizarLista(dados)
performance.mark('fim-render')
performance.measure('render', 'inicio-render', 'fim-render')

// Observando métricas reais
new PerformanceObserver((lista) => {
  for (const entrada of lista.getEntries()) {
    console.log(entrada.name, entrada.startTime, entrada.duration)
  }
}).observe({ type: 'largest-contentful-paint', buffered: true })
```

Para medir usuários reais em produção, a biblioteca
[web-vitals](https://github.com/GoogleChrome/web-vitals) é o caminho padrão.

---

## 7. Lighthouse

Auditoria automatizada em cinco categorias, com nota de 0 a 100 e lista de correções
ordenada por impacto estimado.

```text
Performance      87
Accessibility    94
Best Practices   95
SEO             100
```

Como usar bem:

1. Rode em **janela anônima** — extensões distorcem o resultado.
2. Escolha o modo **Mobile**: é o padrão de indexação do Google e a condição mais restrita.
3. Rode três vezes e considere a mediana; a variação entre execuções é significativa.
4. Leia a seção **Opportunities**: ela estima quantos milissegundos cada correção economiza.

Duas limitações que você precisa conhecer:

- É um teste de **laboratório**, em condição simulada. O desempenho de usuários reais
  (dados de campo) pode ser diferente. Consulte o
  [PageSpeed Insights](https://pagespeed.web.dev/), que mostra os dois.
- A nota de acessibilidade detecta de 30% a 40% dos problemas. **Nota 100 não significa
  página acessível** ([Módulo 04](../04-acessibilidade/README.md)).

---

## 8. Método de depuração

Ferramenta sem método vira tentativa e erro. Este é o roteiro:

```text
1. REPRODUZIR   Quais passos exatos provocam o erro? Acontece sempre?
        ↓
2. ISOLAR       Em que camada está: HTML, CSS, JS ou rede?
        ↓
3. OBSERVAR     Qual é o valor real, e não o que você supõe que seja?
        ↓
4. FORMULAR     "Acho que X acontece porque Y." Uma hipótese testável.
        ↓
5. TESTAR       Uma mudança por vez. Duas mudanças juntas não provam nada.
        ↓
6. CORRIGIR     Trate a causa, não o sintoma.
        ↓
7. VERIFICAR    O bug sumiu? Algo mais quebrou?
```

O passo 3 é o que separa depuração de adivinhação. Não presuma o valor de uma variável:
olhe para ele.

### 8.1 Problemas frequentes e onde olhar

**O CSS não aplica**

1. Elements → Styles: a regra aparece? Se não, o seletor não casa.
2. Aparece tachada? Perdeu na especificidade — veja quem venceu.
3. Aparece normal mas sem efeito? Confira o Computed: outra propriedade pode estar
   anulando (`display`, `position`, `overflow`).
4. A regra nem aparece no arquivo? Confira em Network se o CSS carregou (`200`, não `404`).

**JavaScript com erro**

1. Console: leia a mensagem inteira, não só a primeira linha.
2. Clique no link do arquivo à direita — vai direto à linha.
3. Coloque um breakpoint uma linha **antes** e inspecione o Scope.
4. `Cannot read properties of null` quase sempre significa que o elemento ainda não
   existia. Verifique se o script tem `defer`.

**A requisição falha**

1. Network → filtre por Fetch/XHR.
2. Status `(failed)`? Rede. `(blocked)` + CORS no Console? Back-end. `4xx`/`5xx`? Leia o
   corpo em Preview.
3. Confira a URL em Headers: o erro mais comum é uma barra a mais ou a menos.
4. Copie como cURL e teste fora do navegador para isolar a camada.

**A página está lenta**

1. Performance → grave o carregamento.
2. O tempo está em rede ou em script? O waterfall responde.
3. Procure long tasks (blocos vermelhos).
4. Rode o Lighthouse e siga as Opportunities em ordem de impacto.

---

## Erros comuns

| Sintoma | Causa | Correção |
| --- | --- | --- |
| "Alterei o CSS no DevTools e sumiu" | Alterações no DevTools são temporárias | Leve a mudança para o arquivo-fonte |
| Alteração no arquivo não aparece | Cache do navegador | Marque *Disable cache* com o DevTools aberto |
| Console cheio de log de extensão | Extensões ativas | Use janela anônima |
| Breakpoint não pausa | O arquivo é minificado ou é outro build | Ative os source maps |
| Nota do Lighthouse muda a cada execução | Variação normal de medição | Rode três vezes e use a mediana |
| "Meu site é rápido" | Testou em máquina boa com boa internet | Use throttling Slow 4G e CPU 4× |
| Ainda mede FID | Métrica descontinuada em março de 2024 | Use INP |
| Nota 100 em acessibilidade, site inusável | Só o teste automático foi feito | Teste com teclado e leitor de tela |
| Erro de CORS que "some" ao mudar o fetch | Não some: o problema é do servidor | Ajuste no back-end |

---

## Checklist de autoavaliação

- [ ] Abrir o menu de comandos e usar dois recursos por ele
- [ ] Descobrir por que uma regra CSS está tachada e corrigir
- [ ] Usar o Computed para achar a origem de um valor herdado
- [ ] Usar `console.table` e três atalhos exclusivos do Console
- [ ] Criar um breakpoint condicional e um logpoint
- [ ] Inspecionar Scope e Call Stack em uma pausa
- [ ] Identificar, pelo Network, se a falha é de rede, CORS ou aplicação
- [ ] Interpretar o Timing e dizer se o gargalo é servidor ou tamanho da resposta
- [ ] Citar as três Core Web Vitals com seus limites de "bom"
- [ ] Explicar por que o INP substituiu o FID
- [ ] Rodar o Lighthouse corretamente e priorizar as correções
- [ ] Aplicar as sete etapas do método de depuração em um bug real

---

## Práticas

| # | Arquivo | Foco | Objetivos trabalhados |
| --- | --- | --- | --- |
| 01 | [DevTools guiado](praticas/01-devtools-guiado.md) | Percorrer os painéis com roteiro | 1, 2, 3 |
| 02 | [Caça aos bugs](praticas/02-caca-aos-bugs.html) | Página com defeitos propositais | 1, 2, 3, 6 |

---

## Exercícios

### Nível 1 — Fixação

1. Use o menu de comandos para: capturar a página inteira em imagem, abrir o painel
   Coverage e ativar a simulação de daltonismo. Registre o que cada um mostrou.
2. Em um site à sua escolha, encontre uma declaração CSS tachada. Explique qual regra
   venceu e por quê, usando o cálculo de especificidade do [Módulo 03](../03-css-moderno/README.md).
3. Escreva um snippet que liste, para a página atual: número de imagens sem `alt`, número
   de campos sem `label`, quantidade de `h1` e se existe `<main>`.

### Nível 2 — Aplicação

4. Complete a prática [Caça aos bugs](praticas/02-caca-aos-bugs.html). Para cada defeito,
   registre: o sintoma, o painel usado, a causa e a correção.
5. Escolha uma função com laço no seu código. Coloque um breakpoint condicional que pause
   só na quinta iteração e um logpoint registrando duas variáveis. Descreva o que apareceu
   no Scope.
6. Rode o Lighthouse em modo Mobile e janela anônima, três vezes, em um site brasileiro
   popular. Registre a mediana das quatro categorias, liste as cinco principais
   Opportunities e estime o ganho total em segundos.

### Nível 3 — Desafio

7. **Diagnóstico de desempenho.** Escolha um site pesado (portal de notícias ou loja).
   Grave um perfil de Performance com throttling Slow 4G e CPU 4× mais lenta. Produza um
   laudo com: LCP, INP e CLS medidos; qual elemento é o LCP; as três maiores long tasks e
   o que executam; qual elemento causa o maior layout shift; e cinco recomendações
   ordenadas por impacto estimado, cada uma justificada pela métrica que melhora.
8. **Depuração cega.** Peça a um colega que introduza três defeitos no seu projeto — um de
   CSS, um de JavaScript e um de rede — sem lhe dizer quais. Encontre os três usando o
   método da seção 8. Cronometre cada um e escreva, para cada defeito, qual passo do método
   levou à solução. Depois inverta os papéis.

---

## Referências

- [Chrome DevTools — documentação oficial](https://developer.chrome.com/docs/devtools/)
- [Firefox DevTools](https://firefox-source-docs.mozilla.org/devtools-user/index.html)
- [Core Web Vitals — web.dev](https://web.dev/articles/vitals)
- [INP — Interaction to Next Paint](https://web.dev/articles/inp)
- [Otimizando o LCP](https://web.dev/articles/optimize-lcp)
- [Otimizando o CLS](https://web.dev/articles/optimize-cls)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [DevTools Tips](https://devtoolstips.org/)

---

**Navegação:** [◀ Módulo 06](../06-assincronismo/README.md) · [Índice](../../README.md) · [Módulo 08 ▶](../08-ecossistema-frontend/README.md)
