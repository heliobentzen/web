# Módulo 07 – Ferramentas de Desenvolvedor (DevTools)

## Objetivos

Ao final deste módulo você será capaz de:

- Navegar pelos painéis do DevTools com eficiência
- Inspecionar e modificar o DOM em tempo real
- Depurar CSS e layout com as ferramentas visuais
- Usar o console JavaScript com profundidade
- Depurar JavaScript com breakpoints e call stack
- Analisar performance e requisições de rede
- Auditar acessibilidade e performance com Lighthouse

---

## 1. Abrindo o DevTools

| Atalho | Ação |
|--------|------|
| `F12` | Abrir/fechar DevTools |
| `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac) | Abrir DevTools |
| `Ctrl+Shift+C` / `Cmd+Option+C` | Abrir e ativar seleção de elemento |
| `Ctrl+Shift+J` / `Cmd+Option+J` | Abrir no Console |
| `Ctrl+[` / `Ctrl+]` | Navegar entre painéis |
| `Ctrl+Shift+M` | Ativar/desativar modo responsivo |
| `Ctrl+P` (dentro do DevTools) | Abrir arquivo rapidamente |
| `Ctrl+Shift+P` (dentro do DevTools) | Abrir paleta de comandos |

---

## 2. Painel Elements (Inspector)

### 2.1 Inspecionar e Editar HTML

- **Clicar com botão direito → Inspecionar**: abre o DevTools com o elemento selecionado
- **Duplo clique em um atributo**: edita inline
- **Tecla `H`** com elemento selecionado: alterna `visibility: hidden`
- **Tecla `Delete`** com elemento selecionado: remove o elemento do DOM
- **Drag & Drop** de elementos na árvore HTML: move o elemento
- `$0` no console: referencia o último elemento selecionado

### 2.2 Painel Styles (CSS)

```
┌──────────────────────────────────────────────────────┐
│ Styles  Computed  Layout  Event Listeners  Properties │
├──────────────────────────────────────────────────────┤
│ Filter                              :hov  .cls  + ⊕  │
│                                                       │
│ element.style { }                                     │
│                                                       │
│ h1 {                          styles.css:23           │
│   font-size: 2rem;                                    │
│   ~~color: red;~~  ← tachado = sobrescrito            │
│ }                                                     │
│                                                       │
│ * {                           user-agent              │
│   box-sizing: border-box;                             │
│ }                                                     │
└──────────────────────────────────────────────────────┘
```

**Dicas:**
- Clique em qualquer valor para editar
- Use as setas ↑↓ para aumentar/diminuir valores numéricos (Shift: ±10, Ctrl: ±100)
- Clique no ícone de cor para abrir o color picker
- `:hov` – força estados como `:hover`, `:focus`, `:active`
- `.cls` – gerencia classes CSS
- `+` – adiciona nova regra CSS

### 2.3 Painel Computed

Mostra os **valores finais calculados** pelo navegador, após toda a cascata CSS.

- Útil para entender herança e especificidade
- Mostra o valor computado real (ex: `16px` em vez de `1rem`)
- Clique em uma propriedade para ver de onde ela veio

### 2.4 Box Model Visual

No painel **Layout** (ou parte do Computed), você vê:

```
┌────────────────────────────────────┐
│         MARGIN  (24px top)         │
│  ┌──────────────────────────────┐  │
│  │      BORDER  (2px)           │  │
│  │  ┌────────────────────────┐  │  │
│  │  │    PADDING  (16px)     │  │  │
│  │  │  ┌──────────────────┐  │  │  │
│  │  │  │  CONTENT         │  │  │  │
│  │  │  │  400px × 200px   │  │  │  │
│  │  │  └──────────────────┘  │  │  │
│  │  └────────────────────────┘  │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

---

## 3. Painel Console

### 3.1 Métodos do console

```javascript
// Básicos
console.log('Mensagem', variavel, objeto)
console.info('Info')
console.warn('Aviso')
console.error('Erro')

// Tabela (para arrays de objetos)
console.table([
  { nome: 'Alice', idade: 30 },
  { nome: 'Bob',   idade: 25 },
])

// Grupos (para organizar logs)
console.group('Detalhes do usuário')
  console.log('Nome:', usuario.nome)
  console.log('E-mail:', usuario.email)
console.groupEnd()

console.groupCollapsed('Logs internos')  // inicia colapsado
  console.log('Debug 1')
console.groupEnd()

// Tempo
console.time('operação')
for (let i = 0; i < 1_000_000; i++) {}
console.timeEnd('operação')  // 'operação: 3.2ms'

// Contar chamadas
console.count('clique')  // clique: 1
console.count('clique')  // clique: 2
console.countReset('clique')

// Asserção (só loga se falso)
console.assert(1 === 2, 'Isso não deveria acontecer')

// Rastreio de chamadas
console.trace('De onde vim?')

// Limpar
console.clear()
```

### 3.2 Variáveis de conveniência no console

```javascript
// Seleção rápida (como jQuery)
$('h1')         // document.querySelector('h1')
$$('a')         // document.querySelectorAll('a') → Array
$x('//h2')      // XPath

// Último elemento selecionado no Elements
$0              // elemento selecionado
$1              // penúltimo selecionado

// Último resultado avaliado
$_

// Histórico de requisições
copy(objeto)    // copia para clipboard

// Monitorar eventos
monitorEvents($0, 'click')   // loga cada clique
unmonitorEvents($0, 'click')

// Inspecionar objeto detalhadamente
dir(objeto)
```

---

## 4. Painel Sources – Depuração de JavaScript

### 4.1 Tipos de Breakpoints

```javascript
// ── Breakpoint de linha ──
// Clique no número da linha no painel Sources

// ── Debugger statement (no código) ──
function calcular(x, y) {
  debugger  // execução pausa aqui quando DevTools está aberto
  return x + y
}

// ── Breakpoint condicional ──
// Clique com botão direito no número da linha → "Add conditional breakpoint"
// Expressão: i === 50 || x > 100

// ── Logpoint ──
// Clique com botão direito → "Add logpoint"
// Expressão: `Iteração ${i}: valor = ${x}`
// (Loga sem parar a execução)

// ── Breakpoint em exceções ──
// Painel Sources → ícone de "pause on exceptions"
// Marca "Pause on caught exceptions" para pegar todos os erros
```

### 4.2 Controles de Depuração

| Botão | Atalho | Ação |
|-------|--------|------|
| ▶ Resume | `F8` | Continuar até próximo breakpoint |
| ⏭ Step over | `F10` | Próxima linha (sem entrar em funções) |
| ⬇ Step into | `F11` | Entrar na função chamada |
| ⬆ Step out  | `Shift+F11` | Sair da função atual |
| ↺ Restart frame | — | Reiniciar o frame atual |

### 4.3 Painéis de Depuração

- **Scope**: variáveis locais, closure e globais
- **Call Stack**: pilha de chamadas atual
- **Watch**: expressões para monitorar (`usuario.nome`, `array.length`)
- **Breakpoints**: lista todos os breakpoints

---

## 5. Painel Network

### 5.1 Visão Geral

```
┌──────────────────────────────────────────────────────────┐
│ ⃝ Preserve log  ☐ Disable cache  ▼ No throttling        │
│                                                           │
│ Filter: [         ] XHR/Fetch  JS  CSS  Img  Media  Font │
│                                                           │
│ Name          Status  Type    Initiator  Size   Time      │
│ ─────────────────────────────────────────────────────    │
│ users         200     fetch   app.js:42  2.1kB  145ms     │
│ style.css     200     css     index.html 8.4kB  23ms      │
│ logo.png      200     png     index.html 12kB   89ms      │
│ posts?user=1  200     fetch   app.js:78  4.2kB  210ms     │
└──────────────────────────────────────────────────────────┘
```

### 5.2 Analisando uma Requisição

Clique em uma requisição para ver:

**Headers:**
- Request URL, Method, Status Code
- Request Headers (Content-Type, Authorization, Cookie)
- Response Headers (Cache-Control, Content-Type, CORS headers)

**Preview/Response:**
- Corpo da resposta (JSON formatado, HTML, imagem, etc.)

**Timing:**
```
Queueing:         2ms   ← aguardando slot de conexão
DNS Lookup:       0ms   ← já em cache
Initial connection: 15ms
SSL:              8ms   ← handshake TLS
Request sent:     0.5ms
Waiting (TTFB):   85ms  ← Time To First Byte (tempo do servidor)
Content Download: 14ms  ← download do corpo
```

### 5.3 Throttling (Simular conexão lenta)

No menu dropdown "No throttling":
- **Slow 3G**: 400kb/s download, 400ms latência
- **Fast 3G**: 1.6Mb/s download, 150ms latência
- Criar perfil personalizado

### 5.4 Copiar como cURL

Clique com botão direito em uma requisição → **Copy → Copy as cURL**

```bash
# Resultado (exemplo)
curl 'https://api.example.com/users' \
  -H 'Authorization: Bearer abc123' \
  -H 'Content-Type: application/json' \
  --compressed
```

---

## 6. Painel Performance

```
┌──────────────────────────────────────────────────────────┐
│ ⃝ Record  📷 Screenshots  💾 Import/Export               │
│                                                           │
│ [    Linha do tempo visual    ]                           │
│                                                           │
│ FPS  ████████████████████████ 60fps                       │
│ CPU  ███░░░░░████░░░░░░░░░░░░                             │
│ NET  ██░░░░░░░░░░░░░░░░░░░░░░                             │
│                                                           │
│ Main Thread:                                              │
│ Parse HTML █ Evaluate Script ██ Layout ░ Paint ░          │
└──────────────────────────────────────────────────────────┘
```

**Métricas-chave:**
- **FPS**: frames por segundo (< 60fps = janking)
- **LCP** (Largest Contentful Paint): deve ser < 2.5s
- **CLS** (Cumulative Layout Shift): deve ser < 0.1
- **FID** (First Input Delay): deve ser < 100ms
- **Long Tasks**: tarefas que bloqueiam > 50ms a thread principal

---

## 7. Lighthouse – Auditoria Automatizada

```
Painel Lighthouse → Selecionar: Performance, Accessibility, Best Practices, SEO
→ Analyze page load

Resultado (0-100 por categoria):

Performance     87  ★★★★☆
Accessibility   94  ★★★★★
Best Practices  95  ★★★★★
SEO             98  ★★★★★
```

**Principais métricas de Performance:**
| Métrica | Bom | Precisa melhorar | Ruim |
|---------|-----|------------------|------|
| FCP | < 1.8s | 1.8-3s | > 3s |
| LCP | < 2.5s | 2.5-4s | > 4s |
| TBT | < 200ms | 200-600ms | > 600ms |
| CLS | < 0.1 | 0.1-0.25 | > 0.25 |
| Speed Index | < 3.4s | 3.4-5.8s | > 5.8s |

---

## 8. Dicas e Atalhos Avançados

```javascript
// Snippets: Scripts reutilizáveis
// Sources → Snippets → New snippet
// Execute com Ctrl+Enter

// Exemplo de snippet para testar performance
const inicio = performance.now()
// ... código a medir ...
console.log(`Tempo: ${(performance.now() - inicio).toFixed(2)}ms`)

// Checar uso de memória
performance.memory // Chrome only
// { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize }

// Localizar fonte de event listeners
getEventListeners(document.querySelector('button'))

// Ver estilos computados
window.getComputedStyle(document.querySelector('h1'))

// Medir elemento
const rect = document.querySelector('header').getBoundingClientRect()
// { top, left, right, bottom, width, height }
```

### 8.1 Atalhos no Console

| Atalho | Ação |
|--------|------|
| `↑` / `↓` | Navegar no histórico de comandos |
| `Tab` | Auto-completar |
| `Ctrl+L` | Limpar console |
| `Ctrl+Enter` | Executar bloco multilinha |
| `Esc` | Abrir/fechar console drawer (em qualquer painel) |

---

## 9. Depurando Problemas Comuns

### CSS não está aplicando
1. Inspecione o elemento → Styles
2. Verifique se a regra está tachada (sobrescrita)
3. Verifique a especificidade no Computed
4. Verifique se a regra existe (Filter por seletor)

### JavaScript com erro
1. Verifique o Console para a mensagem e stack trace
2. Clique no link do arquivo no console para ir ao código
3. Coloque um breakpoint na linha indicada
4. Inspecione o Scope para ver os valores das variáveis

### Requisição de rede falhando
1. Painel Network → filtre por XHR/Fetch
2. Clique na requisição → Headers → verifique URL e method
3. Response → verifique o corpo do erro
4. Console → TypeError de CORS?

---

## Prática

| Arquivo | Descrição |
|---------|-----------|
| [devtools-lab.html](praticas/devtools-lab.html) | Página com bugs para encontrar e corrigir usando DevTools |

---

## Referências

- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/)
- [Firefox Developer Tools](https://firefox-source-docs.mozilla.org/devtools-user/index.html)
- [Debugging JavaScript – MDN](https://developer.mozilla.org/en-US/docs/Tools/Debugger)
- [DevTools Tips – devtoolstips.org](https://devtoolstips.org/)
