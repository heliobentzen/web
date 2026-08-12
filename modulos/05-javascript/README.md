# Módulo 05 — JavaScript

> HTML estrutura, CSS apresenta, JavaScript reage. Este módulo cobre a linguagem e a manipulação da página; o consumo de dados externos fica para o Módulo 06.

| | |
| --- | --- |
| **Carga horária** | 12 h (6 h expositivas + 6 h de prática) |
| **Pré-requisito** | [Módulo 04 — Acessibilidade](../04-acessibilidade/README.md) |
| **Prática integrada** | [Módulos 05 e 06 — JS e Assincronismo](../../pratica_js-assincronismo/README.md) |
| **Práticas** | [`praticas/`](praticas/) |

---

## Objetivos de aprendizagem

Ao final deste módulo, você será capaz de:

1. **Declarar** variáveis com o escopo adequado e prever o resultado de uma coerção de tipos.
2. **Escrever** funções, incluindo arrow functions, parâmetros padrão e rest/spread.
3. **Transformar** coleções com `map`, `filter`, `reduce` e os métodos imutáveis modernos.
4. **Manipular** objetos com desestruturação, spread e encadeamento opcional.
5. **Selecionar e alterar** elementos do DOM com segurança, sem introduzir falhas de XSS.
6. **Tratar** eventos usando delegação e entendendo propagação.
7. **Converter** dados entre JSON e objetos JavaScript.

---

## Roteiro

```text
1. Variáveis e escopo   ─┐
2. Tipos e coerção       ├→ a linguagem
3. Funções               │
4. Arrays                │
5. Objetos              ─┘
        ↓
6. DOM: selecionar e alterar   ─┐
7. Eventos                      ├→ a página
8. Formulários com JavaScript  ─┘
        ↓
9. JSON                    ← ponte para o Módulo 06
10. Armazenamento local
```

**Como estudar:** abra o console do navegador (F12) para os exemplos de JavaScript puro.
Quando o exemplo tiver HTML, salve em um arquivo `.html` e abra no navegador.

---

## 1. Variáveis e escopo

```javascript
const nome = 'Ana'      // padrão: não pode ser reatribuída
let contador = 0        // só quando precisar reatribuir
contador = 1

// var: não use. Escopo de função, comportamento imprevisível.
```

**Use `const` por padrão.** Só troque para `let` quando a reatribuição for necessária. Isso
comunica intenção: quem lê o código sabe de imediato que aquele valor não muda.

### 1.1 `const` não significa imutável

```javascript
const pessoa = { nome: 'Maria' }
pessoa.nome = 'Ana'        // ✅ funciona: o conteúdo mudou
pessoa = { nome: 'Ana' }   // ❌ TypeError: a referência não pode mudar
```

`const` congela a **ligação** entre o nome e o valor, não o conteúdo do objeto. Para
congelar o conteúdo, use `Object.freeze()`.

### 1.2 Escopo de bloco

```javascript
if (true) {
  const dentro = 'só existe aqui'
  var vazado = 'escapa do bloco'
}
console.log(vazado)   // 'escapa do bloco' — comportamento indesejado
console.log(dentro)   // ReferenceError
```

`let` e `const` respeitam o bloco `{}`. `var` não — por isso ele saiu de uso.

### 1.3 Closure

Uma função lembra do escopo onde foi criada, mesmo depois que ele terminou:

```javascript
function criarContador() {
  let total = 0                 // fica preservado entre chamadas
  return () => ++total
}

const contar = criarContador()
console.log(contar())   // 1
console.log(contar())   // 2

const outro = criarContador()
console.log(outro())    // 1 — cada chamada cria um escopo novo
```

Closure é a base de vários padrões: estado privado, memoização e callbacks que carregam contexto.

> **Experimente:** troque `let total = 0` por `var total = 0` no exemplo acima. O
> comportamento muda? Por quê?

---

## 2. Tipos e coerção

```javascript
typeof 42            // 'number'
typeof 'texto'       // 'string'
typeof true          // 'boolean'
typeof undefined     // 'undefined'
typeof Symbol()      // 'symbol'
typeof 10n           // 'bigint'
typeof {}            // 'object'
typeof []            // 'object'  ← array é objeto
typeof null          // 'object'  ← bug histórico da linguagem
typeof function(){}  // 'function'

Array.isArray([])    // true — a forma correta de testar array
```

### 2.1 Valores falsy

Apenas oito valores são falsos em contexto booleano:

```javascript
Boolean(false)      // false
Boolean(0)          // false
Boolean(-0)         // false
Boolean(0n)         // false
Boolean('')         // false
Boolean(null)       // false
Boolean(undefined)  // false
Boolean(NaN)        // false

// Todo o resto é verdadeiro — inclusive estes, que enganam:
Boolean('0')        // true  — string não vazia
Boolean([])         // true  — array vazio
Boolean({})         // true  — objeto vazio
```

### 2.2 `==` versus `===`

```javascript
0 == ''         // true  — converte antes de comparar
0 === ''        // false — compara tipo e valor
null == undefined   // true
null === undefined  // false
```

**Use sempre `===`.** A conversão implícita do `==` produz resultados difíceis de prever
e é fonte constante de bug.

### 2.3 Conversões explícitas

```javascript
Number('42')          // 42
Number('abc')         // NaN
Number('')            // 0     ← cuidado
Number(null)          // 0     ← cuidado
Number(undefined)     // NaN

parseInt('42px', 10)  // 42    — para no primeiro caractere inválido
parseFloat('3.14rem') // 3.14

String(42)            // '42'
(42).toFixed(2)       // '42.00'

Number.isNaN(Number('abc'))  // true — prefira a versão do Number
```

### 2.4 `??` e `?.`

```javascript
// ?? usa o padrão só para null ou undefined
const porta = configuracao.porta ?? 3000

// || usa o padrão para qualquer falsy — inclusive 0, que pode ser válido
const quantidade = entrada.valor || 10   // se valor for 0, vira 10. Bug.
const correto = entrada.valor ?? 10      // se valor for 0, continua 0.

// ?. interrompe o acesso quando encontra null ou undefined
const cidade = usuario?.endereco?.cidade    // undefined, sem erro
usuario.salvar?.()                          // só chama se existir
const primeiro = lista?.[0]
```

---

## 3. Funções

```javascript
// Declaração — sofre hoisting, pode ser chamada antes
function saudacao(nome) {
  return `Olá, ${nome}!`
}

// Expressão
const despedida = function (nome) {
  return `Até logo, ${nome}!`
}

// Arrow — sintaxe curta, sem this próprio
const dobrar = (n) => n * 2
const somar = (a, b) => a + b

// Retorno de objeto precisa de parênteses
const criarUsuario = (nome) => ({ nome, ativo: true })
```

### 3.1 Parâmetros padrão, rest e spread

```javascript
function conectar(host = 'localhost', porta = 3000) {
  return `${host}:${porta}`
}
conectar()                    // 'localhost:3000'
conectar('api.ifpe.br', 443)  // 'api.ifpe.br:443'

// rest: agrupa argumentos em um array
function somarTudo(...numeros) {
  return numeros.reduce((total, n) => total + n, 0)
}
somarTudo(1, 2, 3, 4)   // 10

// spread: espalha um array em argumentos
const valores = [5, 10, 15]
somarTudo(...valores)   // 30
Math.max(...valores)    // 15
```

### 3.2 Desestruturação de parâmetros

```javascript
// ❌ Difícil de ler na chamada: o que significa cada true?
function criarConta(nome, email, true, false) { }

// ✅ Nomeado, ordem livre, valores padrão
function criarConta({ nome, email, ativo = true, admin = false }) {
  return { nome, email, ativo, admin }
}

criarConta({ nome: 'Ana', email: 'ana@ifpe.br', admin: true })
```

---

## 4. Arrays

### 4.1 Acesso e busca

```javascript
const frutas = ['maçã', 'banana', 'laranja']

frutas[0]              // 'maçã'
frutas.at(-1)          // 'laranja' — índice negativo conta do fim
frutas.length          // 3

frutas.includes('uva')             // false
frutas.indexOf('banana')           // 1
frutas.find(f => f.length > 5)     // 'banana' — o elemento
frutas.findIndex(f => f.length > 5)// 1        — a posição
frutas.some(f => f.startsWith('m'))// true     — algum atende?
frutas.every(f => f.length > 3)    // true     — todos atendem?
```

### 4.2 Transformação

Os três métodos que você mais vai usar:

```javascript
const numeros = [1, 2, 3, 4, 5]

// map: transforma cada item — o array de saída tem o MESMO tamanho
numeros.map(n => n * 2)              // [2, 4, 6, 8, 10]

// filter: seleciona itens — o array de saída é MENOR ou igual
numeros.filter(n => n % 2 === 0)     // [2, 4]

// reduce: condensa tudo em um único valor
numeros.reduce((acc, n) => acc + n, 0)   // 15
```

Eles se encadeiam:

```javascript
const alunos = [
  { nome: 'Ana',   nota: 9.0, curso: 'ads' },
  { nome: 'Bruno', nota: 6.5, curso: 'ads' },
  { nome: 'Carla', nota: 8.0, curso: 'redes' },
]

const mediaAds = alunos
  .filter(a => a.curso === 'ads')
  .map(a => a.nota)
  .reduce((soma, nota, _, arr) => soma + nota / arr.length, 0)

console.log(mediaAds.toFixed(1))   // '7.8'
```

### 4.3 Métodos que modificam versus métodos que copiam

Esta distinção causa muito bug. Métodos antigos alteram o array original:

```javascript
const original = [3, 1, 2]

original.sort()      // ⚠️ altera `original`
original.reverse()   // ⚠️ altera `original`
original.splice(0,1) // ⚠️ altera `original`
original.push(4)     // ⚠️ altera `original`
```

Desde 2023 existem versões que retornam um array novo:

```javascript
const original = [3, 1, 2]

const ordenado  = original.toSorted()     // [1,2,3] — original intacto
const invertido = original.toReversed()   // [2,1,3] — original intacto
const trocado   = original.with(0, 99)    // [99,1,2] — original intacto
const removido  = original.toSpliced(0,1) // [1,2]   — original intacto

console.log(original)   // [3, 1, 2] — preservado
```

Cuidado com o `sort` de números:

```javascript
[10, 9, 100].sort()                 // [10, 100, 9] — ordena como texto!
[10, 9, 100].toSorted((a,b) => a-b) // [9, 10, 100] — correto
```

### 4.4 Agrupamento

```javascript
const porCurso = Object.groupBy(alunos, aluno => aluno.curso)
// { ads: [{...}, {...}], redes: [{...}] }
```

---

## 5. Objetos

```javascript
const usuario = {
  nome: 'João',
  idade: 30,
  cidade: 'Recife',
}

usuario.nome              // 'João'  — notação de ponto
usuario['nome']           // 'João'  — notação de colchete
const campo = 'idade'
usuario[campo]            // 30      — chave dinâmica

usuario.email = 'joao@ifpe.br'   // adiciona
delete usuario.cidade            // remove
'nome' in usuario                // true
```

### 5.1 Desestruturação

```javascript
const { nome, idade } = usuario
const { cidade = 'Não informada' } = usuario     // valor padrão
const { nome: nomeCompleto } = usuario           // renomeia
const { nome: n, ...resto } = usuario            // separa o resto

// Aninhada
const config = { servidor: { host: 'localhost', porta: 3000 } }
const { servidor: { host, porta } } = config
```

### 5.2 Cópia

```javascript
const base = { nome: 'Ana', ativo: true }

// Cópia rasa: um nível apenas
const copia = { ...base }
const mesclado = { ...base, ativo: false, curso: 'ads' }

// ⚠️ Objetos aninhados continuam compartilhados
const aluno = { nome: 'Ana', endereco: { cidade: 'Recife' } }
const rasa = { ...aluno }
rasa.endereco.cidade = 'Olinda'
console.log(aluno.endereco.cidade)   // 'Olinda' — alterou o original!

// ✅ Cópia profunda
const profunda = structuredClone(aluno)
profunda.endereco.cidade = 'Jaboatão'
console.log(aluno.endereco.cidade)   // 'Olinda' — preservado
```

### 5.3 Percorrendo objetos

```javascript
Object.keys(usuario)      // ['nome', 'idade', 'email']
Object.values(usuario)    // ['João', 30, 'joao@ifpe.br']
Object.entries(usuario)   // [['nome','João'], ['idade',30], ...]

for (const [chave, valor] of Object.entries(usuario)) {
  console.log(`${chave}: ${valor}`)
}
```

---

## 6. DOM: selecionar e alterar

Retomando o [Módulo 01](../01-arquitetura-web/README.md): o DOM é a página em árvore, na
memória. Agora vamos alterá-la programaticamente.

### 6.1 Selecionar

```javascript
document.querySelector('#titulo')        // primeiro que casar (aceita qualquer seletor CSS)
document.querySelectorAll('.card')       // NodeList com todos
document.getElementById('titulo')        // mais rápido, só por id

// NodeList não é array: converta para usar map, filter...
const cards = [...document.querySelectorAll('.card')]
cards.filter(c => c.dataset.ativo === 'true')

// Busca dentro de um elemento, não no documento inteiro
const form = document.querySelector('#inscricao')
const campos = form.querySelectorAll('input')
```

### 6.2 Ler e alterar conteúdo

```javascript
const titulo = document.querySelector('#titulo')

titulo.textContent = 'Novo título'    // ✅ texto puro, sempre seguro
titulo.innerHTML = '<em>Novo</em>'    // ⚠️ interpreta HTML

titulo.classList.add('destaque')
titulo.classList.remove('oculto')
titulo.classList.toggle('ativo')
titulo.classList.contains('destaque')  // true

titulo.setAttribute('aria-live', 'polite')
titulo.dataset.id = '42'               // vira data-id="42"

titulo.style.color = 'crimson'         // prefira trocar classes
```

### 6.3 A regra de segurança do `innerHTML`

```javascript
// ❌ NUNCA: dado de usuário ou de API dentro de innerHTML
const busca = new URLSearchParams(location.search).get('q')
resultado.innerHTML = `Você buscou: ${busca}`
// Se q = <img src=x onerror="alert(document.cookie)">, o script executa.

// ✅ Use textContent
resultado.textContent = `Você buscou: ${busca}`
```

Isso é **XSS** (*Cross-Site Scripting*) e é uma das falhas mais exploradas na web.
A regra prática: `innerHTML` só com string que você mesmo escreveu, nunca com dado que
veio de fora.

### 6.4 Criar e inserir elementos

```javascript
const item = document.createElement('li')
item.textContent = 'Novo item'
item.classList.add('lista__item')

lista.append(item)          // no fim
lista.prepend(item)         // no início
item.remove()               // remove a si mesmo

// Inserir muitos itens de uma vez: monte fora do DOM
const fragmento = document.createDocumentFragment()
for (const aluno of alunos) {
  const li = document.createElement('li')
  li.textContent = aluno.nome
  fragmento.append(li)
}
lista.append(fragmento)   // um único reflow, em vez de um por item
```

Cada inserção no DOM pode disparar um novo cálculo de layout (veja o pipeline no
[Módulo 01](../01-arquitetura-web/README.md)). Inserir 500 itens um a um é lento; inserir
um fragmento com 500 itens é rápido.

---

## 7. Eventos

```javascript
const botao = document.querySelector('#salvar')

botao.addEventListener('click', (evento) => {
  console.log('Clicou em', evento.target)
})

// Remover exige a mesma referência de função
function aoClicar() { }
botao.addEventListener('click', aoClicar)
botao.removeEventListener('click', aoClicar)

// Executa uma única vez
botao.addEventListener('click', aoClicar, { once: true })
```

### 7.1 Eventos mais usados

| Evento | Disparado quando |
| --- | --- |
| `click` | Clique ou ativação por teclado em elemento focável |
| `input` | A cada tecla digitada em um campo |
| `change` | O campo perde o foco após mudar de valor |
| `submit` | O formulário é enviado |
| `keydown` | Uma tecla é pressionada |
| `focus` / `blur` | Elemento ganha ou perde foco |
| `DOMContentLoaded` | O HTML terminou de ser interpretado |

### 7.2 Propagação e delegação

Um evento sobe do elemento clicado até o `document` (fase de *bubbling*). Isso permite
ouvir em um ancestral em vez de em cada filho:

```javascript
// ❌ Um listener por item — e itens novos não funcionam
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', tratar)
})

// ✅ Um único listener, funciona para itens criados depois
lista.addEventListener('click', (evento) => {
  const item = evento.target.closest('.item')
  if (!item) return
  console.log('Item clicado:', item.dataset.id)
})
```

Isso é **delegação de eventos**. Use sempre que a lista for dinâmica.

```javascript
evento.target          // elemento onde o evento nasceu
evento.currentTarget   // elemento onde o listener está
evento.preventDefault()   // cancela o comportamento padrão
evento.stopPropagation()  // interrompe a subida do evento
```

### 7.3 Formulários

```javascript
const form = document.querySelector('#inscricao')

form.addEventListener('submit', (evento) => {
  evento.preventDefault()      // impede o recarregamento da página

  const dados = Object.fromEntries(new FormData(form))
  console.log(dados)           // { nome: 'Ana', email: 'ana@ifpe.br' }

  if (!form.checkValidity()) {
    form.reportValidity()      // mostra as mensagens nativas
    return
  }

  // envio tratado no Módulo 06
})
```

`FormData` + `Object.fromEntries` lê o formulário inteiro em uma linha, sem precisar
selecionar campo por campo.

---

## 8. Exemplo integrado: lista de tarefas

Junta tudo do módulo — seleção, evento, delegação, criação de elementos e segurança:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lista de tarefas</title>
</head>
<body>
  <h1>Minhas tarefas</h1>

  <form id="form-tarefa">
    <label for="descricao">Nova tarefa</label>
    <input type="text" id="descricao" name="descricao" required>
    <button type="submit">Adicionar</button>
  </form>

  <p id="contador" role="status" aria-live="polite">0 tarefas</p>
  <ul id="lista"></ul>

  <script>
    const form = document.querySelector('#form-tarefa')
    const campo = document.querySelector('#descricao')
    const lista = document.querySelector('#lista')
    const contador = document.querySelector('#contador')

    let tarefas = []

    form.addEventListener('submit', (evento) => {
      evento.preventDefault()
      const descricao = campo.value.trim()
      if (!descricao) return

      tarefas = [...tarefas, { id: crypto.randomUUID(), descricao }]
      renderizar()
      form.reset()
      campo.focus()
    })

    // Delegação: funciona para itens criados depois
    lista.addEventListener('click', (evento) => {
      const botao = evento.target.closest('[data-remover]')
      if (!botao) return
      tarefas = tarefas.filter(t => t.id !== botao.dataset.remover)
      renderizar()
    })

    function renderizar() {
      lista.replaceChildren()      // limpa sem innerHTML

      const fragmento = document.createDocumentFragment()
      for (const tarefa of tarefas) {
        const li = document.createElement('li')

        const texto = document.createElement('span')
        texto.textContent = tarefa.descricao   // seguro contra XSS

        const remover = document.createElement('button')
        remover.type = 'button'
        remover.textContent = 'Remover'
        remover.dataset.remover = tarefa.id
        remover.setAttribute('aria-label', `Remover ${tarefa.descricao}`)

        li.append(texto, remover)
        fragmento.append(li)
      }
      lista.append(fragmento)

      contador.textContent = `${tarefas.length} ${tarefas.length === 1 ? 'tarefa' : 'tarefas'}`
    }
  </script>
</body>
</html>
```

Note três decisões importantes: `textContent` em vez de `innerHTML`, delegação em vez de um
listener por botão, e `aria-label` descritivo em cada botão de remover — porque "Remover"
sozinho não diz ao leitor de tela **o quê** será removido.

> **Experimente:** adicione uma tarefa chamada `<img src=x onerror=alert(1)>`. Nada
> acontece, porque o texto é inserido com `textContent`. Depois troque por `innerHTML` e
> veja a diferença.

---

## 9. JSON

JSON é o formato de troca de dados entre front-end e servidor. É **texto**, não objeto.

```javascript
const usuario = { nome: 'Ana', idade: 25, ativo: true }

const texto = JSON.stringify(usuario)
// '{"nome":"Ana","idade":25,"ativo":true}'

const objeto = JSON.parse(texto)
// { nome: 'Ana', idade: 25, ativo: true }

// Formatado para leitura
JSON.stringify(usuario, null, 2)
```

Limitações que surpreendem:

```javascript
JSON.stringify({ f: () => {}, d: undefined, s: Symbol() })
// '{}' — funções, undefined e símbolos somem

JSON.stringify({ data: new Date() })
// a data vira string ISO e não volta a ser Date no parse
```

`JSON.parse` lança exceção com texto inválido:

```javascript
try {
  const dados = JSON.parse(textoRecebido)
} catch (erro) {
  console.error('JSON inválido:', erro.message)
}
```

O consumo de JSON vindo de APIs é o assunto do [Módulo 06](../06-assincronismo/README.md).

---

## 10. Armazenamento local

```javascript
// localStorage: persiste após fechar o navegador
localStorage.setItem('tema', 'escuro')
localStorage.getItem('tema')        // 'escuro'
localStorage.removeItem('tema')
localStorage.clear()

// sessionStorage: apaga ao fechar a aba
sessionStorage.setItem('rascunho', 'texto')
```

Só armazena **strings** — objetos precisam de JSON:

```javascript
function salvarTarefas(tarefas) {
  localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function carregarTarefas() {
  try {
    return JSON.parse(localStorage.getItem('tarefas')) ?? []
  } catch {
    return []          // dado corrompido não pode derrubar a aplicação
  }
}
```

**Nunca guarde senha, token de acesso ou dado pessoal sensível no `localStorage`:** ele é
legível por qualquer script da página, inclusive um injetado por XSS.

---

## Erros comuns

| Sintoma | Causa | Correção |
| --- | --- | --- |
| `Cannot read properties of null` | O elemento não existe quando o script rodou | Use `defer` no script ou `?.` |
| Formulário recarrega a página | Falta `preventDefault()` no `submit` | Adicione no início do handler |
| `[10, 9, 100].sort()` retorna errado | `sort` compara como texto | `toSorted((a, b) => a - b)` |
| Alterar a cópia altera o original | Spread copia só um nível | `structuredClone()` |
| `map` retorna `[undefined, ...]` | Faltou `return` no corpo com `{}` | Use arrow sem chaves ou adicione `return` |
| Itens novos da lista não respondem ao clique | Listener criado antes do elemento existir | Use delegação de eventos |
| Página quebra com aspas no nome do usuário | `innerHTML` com dado externo | Use `textContent` |
| `0 \|\| 10` retorna 10 quando 0 era válido | `\|\|` trata todo falsy | Use `??` |
| Contador só chega a 1 | `let` recriado a cada chamada | Reveja o escopo/closure |

---

## Checklist de autoavaliação

- [ ] Explicar a diferença entre `const`, `let` e `var`
- [ ] Explicar por que `const` não impede alterar um objeto
- [ ] Listar os oito valores falsy
- [ ] Justificar o uso de `===` em vez de `==`
- [ ] Explicar a diferença entre `??` e `||` com um caso em que ela importa
- [ ] Escrever uma closure e explicar o que ela preserva
- [ ] Encadear `filter`, `map` e `reduce` para responder a uma pergunta sobre dados
- [ ] Dizer quais métodos de array alteram o original e quais retornam cópia
- [ ] Copiar um objeto aninhado sem compartilhar referências
- [ ] Selecionar, criar, inserir e remover elementos do DOM
- [ ] Explicar por que `innerHTML` com dado externo é perigoso
- [ ] Implementar delegação de eventos e justificar quando ela é necessária
- [ ] Ler um formulário inteiro com `FormData`
- [ ] Converter entre JSON e objeto, tratando erro de parse

---

## Práticas

| # | Arquivo | Foco | Objetivos trabalhados |
| --- | --- | --- | --- |
| 01 | [Escopo e closures](praticas/01-escopo-closures.js) | Escopo, closure, hoisting | 1 |
| 02 | [Arrays e objetos](praticas/02-arrays-objetos.js) | `map`, `filter`, `reduce`, spread | 3, 4 |
| 03 | [JSON](praticas/03-json.js) | Serialização e parse | 7 |
| 04 | [DOM e eventos](praticas/04-dom-eventos.html) | Seleção, alteração, listeners | 5, 6 |
| 05 | [DOM intermediário](praticas/05-dom-intermediario.html) | Delegação e renderização | 5, 6 |

---

## Exercícios

### Nível 1 — Fixação

1. Preveja o resultado antes de rodar, depois confira no console:

```javascript
console.log(typeof null, typeof [], Array.isArray([]))
console.log(0 == '', 0 === '', '2' + 1, '2' - 1)
console.log([10, 9, 100].sort())
console.log(Boolean([]), Boolean(''), Boolean('0'))
console.log(null ?? 'padrão', 0 ?? 'padrão', 0 || 'padrão')
```

2. Dado `const notas = [7.5, 9.0, 4.5, 8.0, 6.0]`, calcule sem laço `for`: a média, a maior
   nota, quantas estão acima de 7 e um array só com as aprovadas ordenado do maior para o menor.
3. Escreva uma função `formatarMoeda(valor)` que devolva `'R$ 1.234,56'`. Pesquise
   `Intl.NumberFormat`.

### Nível 2 — Aplicação

4. Construa um contador com botões de somar, subtrair e zerar. O valor não pode ficar
   negativo, e o botão de subtrair deve ficar `disabled` quando o valor for zero.
5. Construa um filtro de lista: um campo de busca e uma lista de 15 cursos. A cada tecla
   digitada, mostre só os que contêm o texto, ignorando maiúsculas e acentos. Exiba
   "Nenhum resultado" quando a lista ficar vazia, usando `role="status"`.
6. Estenda a lista de tarefas da seção 8 com: marcar como concluída (riscando o texto),
   contador de pendentes, persistência em `localStorage` e um botão para limpar as concluídas.

### Nível 3 — Desafio

7. **Painel de notas.** Dado um array de 20 alunos com `nome`, `curso` e `notas` (array de 4
   valores), monte uma página que exiba: a média de cada aluno; a média por curso usando
   `Object.groupBy`; os três melhores; e uma tabela acessível ordenável ao clicar no
   cabeçalho. Use apenas métodos imutáveis (`toSorted`, spread) — nenhum array de origem
   pode ser alterado.
8. **Auditoria de XSS.** Este código tem uma falha de segurança e um bug de acessibilidade.
   Identifique os dois, explique como um atacante exploraria a falha e reescreva o trecho
   corrigido:

```javascript
const termo = new URLSearchParams(location.search).get('busca')
document.querySelector('#resultado').innerHTML =
  '<h2>Resultados para ' + termo + '</h2>'

produtos.forEach(p => {
  const div = document.createElement('div')
  div.innerHTML = `${p.nome} <span onclick="comprar(${p.id})">🛒</span>`
  document.querySelector('#lista').appendChild(div)
})
```

---

## Referências

- [JavaScript — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Guia de JavaScript — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide)
- [Referência de Array — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Manipulando documentos (DOM) — MDN](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
- [web.dev — Learn JavaScript](https://web.dev/learn/javascript/)
- [javascript.info](https://javascript.info/) — referência aprofundada e gratuita
- [OWASP — XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

---

**Navegação:** [◀ Módulo 04](../04-acessibilidade/README.md) · [Índice](../../README.md) · [Módulo 06 ▶](../06-assincronismo/README.md)
