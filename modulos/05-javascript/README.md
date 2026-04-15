# Módulo 05 – JavaScript: Escopo, Estruturas de Dados, JSON, DOM e Eventos

## Objetivos

Ao final deste módulo você será capaz de:

- Compreender escopo de variáveis, hoisting e closures
- Usar estruturas de dados (arrays, objetos, Map, Set)
- Trabalhar com JSON
- Manipular o DOM com eficiência
- Gerenciar eventos e event delegation

---

## 1. Variáveis e Escopo

```javascript
// ── var, let, const ──

var varivel = 'var'      // escopo de função, hoisted, pode redeclarar
let mutavel  = 'let'     // escopo de bloco, não redeclarável no mesmo escopo
const imutavel = 'const' // escopo de bloco, não reatribuível (mas objetos são mutáveis)

// Regra geral: use const por padrão, let quando precisar reatribuir, evite var

// ── Escopo de bloco ──
{
  let dentro = 'bloco'
  const tambem = 'bloco'
  // var fora = 'vaza!' // var vaza do bloco
}
// console.log(dentro)   // ReferenceError
// console.log(tambem)   // ReferenceError

// ── Escopo de função ──
function minhaFuncao() {
  var local = 'só aqui'
  let tambemLocal = 'só aqui'
}
// console.log(local)  // ReferenceError

// ── Hoisting ──
console.log(x)      // undefined (var é "elevado" mas não o valor)
var x = 5
console.log(x)      // 5

// console.log(y)   // ReferenceError (let/const não são inicializadas = TDZ)
let y = 10

// ── Closures ──
function criarContador() {
  let count = 0
  return {
    incrementar: () => ++count,
    decrementar: () => --count,
    valor: () => count,
  }
}
const contador = criarContador()
contador.incrementar()  // 1
contador.incrementar()  // 2
contador.valor()        // 2
// A variável `count` persiste na closure mesmo após `criarContador` retornar
```

---

## 2. Funções

```javascript
// ── Declaração (hoisted) ──
function saudacao(nome) {
  return `Olá, ${nome}!`
}

// ── Expressão (não hoisted) ──
const cumprimento = function(nome) {
  return `Bom dia, ${nome}!`
}

// ── Arrow Function ──
const dobrar = (n) => n * 2
const somar = (a, b) => a + b
const criarObjeto = (nome) => ({ nome, ativo: true })  // parênteses necessários para objeto literal

// ── Parâmetros padrão ──
function conectar(host = 'localhost', porta = 3000) {
  return `${host}:${porta}`
}
conectar()           // 'localhost:3000'
conectar('api.io')   // 'api.io:3000'

// ── Rest parameters ──
function somar(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0)
}
somar(1, 2, 3, 4, 5)  // 15

// ── Spread operator ──
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const combinado = [...arr1, ...arr2]   // [1, 2, 3, 4, 5, 6]

const obj1 = { a: 1, b: 2 }
const obj2 = { c: 3, d: 4 }
const fusao = { ...obj1, ...obj2 }     // { a: 1, b: 2, c: 3, d: 4 }

// ── IIFE (Immediately Invoked Function Expression) ──
;(function() {
  const privado = 'não vaza para o escopo global'
})()
```

---

## 3. Tipos de Dados

```javascript
// Primitivos (imutáveis)
typeof 42           // 'number'
typeof 3.14         // 'number'
typeof NaN          // 'number' (curiosidade!)
typeof 'texto'      // 'string'
typeof true         // 'boolean'
typeof undefined    // 'undefined'
typeof null         // 'object' (bug histórico!)
typeof Symbol()     // 'symbol'
typeof 9007199254740991n // 'bigint'

// Referência (mutáveis)
typeof {}           // 'object'
typeof []           // 'object' (array é objeto!)
typeof function(){} // 'function'

// Verificação de array (correto)
Array.isArray([])   // true

// Conversão de tipos
Number('42')        // 42
Number('')          // 0
Number(null)        // 0
Number(undefined)   // NaN
Number(true)        // 1
Number('abc')       // NaN

String(42)          // '42'
Boolean(0)          // false
Boolean('')         // false
Boolean(null)       // false
Boolean(undefined)  // false
Boolean(NaN)        // false
Boolean({})         // true (qualquer objeto é truthy)
Boolean([])         // true

// Igualdade: SEMPRE use === (não ==)
0 == ''        // true  (coerção)
0 === ''       // false (correto)
null == undefined  // true  (exceção aceitável)
NaN === NaN    // false (NaN nunca é igual a si mesmo)
Number.isNaN(NaN) // true (forma correta de checar)
```

---

## 4. Strings

```javascript
const nome = 'Maria'
const sobrenome = 'Silva'

// Template literals (prefira sempre)
const mensagem = `Olá, ${nome} ${sobrenome}!`
const multilinea = `
  Linha 1
  Linha 2
  Linha 3
`

// Métodos importantes
'Olá Mundo'.toUpperCase()      // 'OLÁ MUNDO'
'Olá Mundo'.toLowerCase()      // 'olá mundo'
'  espaços  '.trim()           // 'espaços'
'  espaços  '.trimStart()      // 'espaços  '
'  espaços  '.trimEnd()        // '  espaços'
'a,b,c'.split(',')             // ['a', 'b', 'c']
['a', 'b', 'c'].join(' - ')    // 'a - b - c'
'Olá Mundo'.includes('Mundo')  // true
'Olá Mundo'.startsWith('Olá')  // true
'Olá Mundo'.endsWith('Mundo')  // true
'Olá Mundo'.indexOf('Mundo')   // 4
'ha'.repeat(3)                  // 'hahaha'
'5'.padStart(3, '0')            // '005'
'5'.padEnd(3, '-')              // '5--'
'Olá Mundo'.slice(4, 9)        // 'Mundo'
'Olá Mundo'.replace('Mundo', 'Web') // 'Olá Web'
'a,b,a'.replaceAll('a', 'X')   // 'X,b,X'

// Regular Expressions (básico)
/\d+/.test('abc123')           // true
'abc123'.match(/\d+/)          // ['123', index:3, ...]
'a1b2c3'.replace(/\d/g, '#')   // 'a#b#c#'
```

---

## 5. Arrays

```javascript
const frutas = ['maçã', 'banana', 'laranja']

// ── Acesso ──
frutas[0]           // 'maçã'
frutas.at(-1)       // 'laranja' (último elemento)
frutas.length       // 3

// ── Mutação (modificam o array original) ──
frutas.push('uva')            // adiciona ao final, retorna novo length
frutas.pop()                  // remove do final, retorna o elemento
frutas.unshift('morango')     // adiciona ao início
frutas.shift()                // remove do início
frutas.splice(1, 1)           // remove 1 elemento a partir do índice 1
frutas.splice(1, 0, 'kiwi')   // insere 'kiwi' no índice 1
frutas.sort()                 // ordena in-place (lexicográfico)
frutas.sort((a, b) => a.localeCompare(b, 'pt-BR'))  // ordena com locale
frutas.reverse()              // inverte in-place

// ── Não-mutação (retornam novo array) ──
const numeros = [3, 1, 4, 1, 5, 9, 2, 6]

numeros.slice(1, 4)           // [1, 4, 1] – subarray
numeros.concat([10, 11])      // [...numeros, 10, 11]
[...numeros].sort((a, b) => a - b)  // cópia ordenada (sem mutar)

// ── Iteração ──
numeros.forEach(n => console.log(n))

const dobrados = numeros.map(n => n * 2)           // [6, 2, 8, 2, ...]
const pares    = numeros.filter(n => n % 2 === 0)  // [4, 2, 6]
const soma     = numeros.reduce((acc, n) => acc + n, 0)  // 31
const primeiro = numeros.find(n => n > 5)          // 9
const indice   = numeros.findIndex(n => n > 5)     // 5
const todos    = numeros.every(n => n > 0)          // true
const algum    = numeros.some(n => n > 8)           // true
const achatado = [[1,2],[3,4]].flat()              // [1,2,3,4]
const mapeado  = [[1,2],[3,4]].flatMap(x => x.map(n => n * 2))  // [2,4,6,8]

// ── Desestruturação de array ──
const [primeiro2, segundo, ...resto] = numeros
// primeiro2 = 3, segundo = 1, resto = [4,1,5,9,2,6]

// ── Array de objetos ──
const produtos = [
  { id: 1, nome: 'Notebook', preco: 3500, categoria: 'Tech' },
  { id: 2, nome: 'Mouse', preco: 80, categoria: 'Tech' },
  { id: 3, nome: 'Cadeira', preco: 800, categoria: 'Móveis' },
]

// Ordenar por preço
produtos.sort((a, b) => a.preco - b.preco)

// Filtrar por categoria
const tech = produtos.filter(p => p.categoria === 'Tech')

// Mapear apenas nomes
const nomes = produtos.map(p => p.nome)

// Reduzir a um objeto { id -> produto }
const porId = produtos.reduce((acc, p) => {
  acc[p.id] = p
  return acc
}, {})
```

---

## 6. Objetos

```javascript
// ── Criação ──
const pessoa = {
  nome: 'Carlos',
  idade: 30,
  endereco: {
    cidade: 'São Paulo',
    estado: 'SP',
  },
  saudar() {
    return `Olá, meu nome é ${this.nome}`
  }
}

// ── Acesso ──
pessoa.nome              // 'Carlos' (dot notation)
pessoa['nome']           // 'Carlos' (bracket notation)
pessoa['endereco']['cidade']  // 'São Paulo'

// ── Desestruturação ──
const { nome, idade, endereco: { cidade } } = pessoa
const { nome: apelido = 'Desconhecido' } = pessoa  // renomear e valor padrão

// ── Shorthand ──
const x = 10, y = 20
const ponto = { x, y }  // equivale a { x: x, y: y }

// ── Computed property names ──
const chave = 'status'
const config = { [chave]: 'ativo' }  // { status: 'ativo' }

// ── Métodos de Object ──
Object.keys(pessoa)     // ['nome', 'idade', 'endereco', 'saudar']
Object.values(pessoa)   // ['Carlos', 30, {...}, f]
Object.entries(pessoa)  // [['nome','Carlos'], ['idade',30], ...]

// Copiar propriedades
const copia = { ...pessoa }          // shallow copy
const mesclado = Object.assign({}, pessoa, { ativo: true })

// Congelar objeto (imutável)
const CONSTANTE = Object.freeze({ PI: 3.14159 })

// Verificar se propriedade existe
'nome' in pessoa                     // true
pessoa.hasOwnProperty('nome')        // true
Object.hasOwn(pessoa, 'nome')        // true (moderno, preferir)

// Iterar sobre entradas
for (const [chave, valor] of Object.entries(pessoa)) {
  if (typeof valor !== 'function') {
    console.log(`${chave}: ${valor}`)
  }
}
```

---

## 7. Map e Set

```javascript
// ── Map: chave-valor, qualquer tipo como chave ──
const mapa = new Map()
mapa.set('nome', 'Alice')
mapa.set(42, 'número como chave')
mapa.set({ id: 1 }, 'objeto como chave')

mapa.get('nome')        // 'Alice'
mapa.has('nome')        // true
mapa.size               // 3
mapa.delete('nome')
mapa.clear()

// Iterar
for (const [chave, valor] of mapa) {
  console.log(chave, valor)
}

// Map vs Objeto:
// Map: chaves de qualquer tipo, preserva ordem de inserção, melhor performance em inserções/remoções frequentes
// Objeto: chaves strings/Symbol, acesso por propriedade (dot notation), melhor para dados estruturados

// ── Set: coleção de valores únicos ──
const set = new Set([1, 2, 3, 2, 1])  // {1, 2, 3}
set.add(4)
set.has(2)  // true
set.size    // 4
set.delete(1)

// Remover duplicatas de array
const semDuplicatas = [...new Set([1, 2, 2, 3, 3, 4])]  // [1, 2, 3, 4]
```

---

## 8. JSON

JSON (JavaScript Object Notation) é o formato padrão para troca de dados na web.

```javascript
// ── Regras do JSON ──
// Strings com aspas DUPLAS
// Sem comentários
// Sem vírgula no final (trailing comma)
// Chaves são sempre strings (com aspas)
// Valores: string, number, boolean, null, array, object

// Exemplo de JSON válido:
const jsonString = `{
  "usuario": {
    "id": 1,
    "nome": "Maria Silva",
    "email": "maria@example.com",
    "ativo": true,
    "pontuacao": 98.5,
    "tags": ["admin", "editor"],
    "perfil": null
  }
}`

// ── Parsing: string JSON → objeto JS ──
const dados = JSON.parse(jsonString)
dados.usuario.nome         // 'Maria Silva'
dados.usuario.tags[0]      // 'admin'

// ── Serialização: objeto JS → string JSON ──
const objeto = { nome: 'João', idade: 25, ativo: true }
const json = JSON.stringify(objeto)
// '{"nome":"João","idade":25,"ativo":true}'

// Com formatação legível:
JSON.stringify(objeto, null, 2)
// {
//   "nome": "João",
//   "idade": 25,
//   "ativo": true
// }

// Filtrar propriedades:
JSON.stringify(objeto, ['nome', 'ativo'])  // '{"nome":"João","ativo":true}'

// Replacer para transformar:
JSON.stringify(objeto, (chave, valor) => {
  if (typeof valor === 'number') return valor * 2
  return valor
})

// ── O que JSON.stringify ignora ──
const comIgnorados = {
  nome: 'Teste',
  funcao: () => 'sou ignorada',   // funções são ignoradas
  indefinido: undefined,           // undefined é ignorado
  simbolo: Symbol('x'),           // symbols são ignorados
}
JSON.stringify(comIgnorados)  // '{"nome":"Teste"}'

// ── Clone profundo via JSON (limitado) ──
const original = { a: 1, b: { c: 2 } }
const clone = JSON.parse(JSON.stringify(original))
// Não copia: funções, undefined, Date (vira string), Map, Set, etc.

// ── structuredClone (moderno, mais completo) ──
const cloneModerno = structuredClone(original)
```

---

## 9. Manipulação do DOM

```javascript
// ── Seleção ──
const titulo = document.querySelector('h1')
const botoes = document.querySelectorAll('button')
const form   = document.getElementById('meu-form')

// ── Leitura ──
titulo.textContent          // texto puro
titulo.innerHTML            // HTML interno
titulo.getAttribute('class')
titulo.dataset.id           // data-id="123"
window.getComputedStyle(titulo).color  // estilo computado

// ── Modificação ──
titulo.textContent = 'Novo título'
titulo.innerHTML = '<em>Novo</em> título'
titulo.setAttribute('data-id', '42')
titulo.classList.add('ativo')
titulo.classList.remove('ativo')
titulo.classList.toggle('ativo')
titulo.classList.replace('ativo', 'inativo')

// Estilo inline (prefira classes CSS)
titulo.style.color = 'red'
titulo.style.setProperty('--cor', 'blue')  // variável CSS

// ── Criação e inserção ──
const novo = document.createElement('p')
novo.textContent = 'Parágrafo criado via JS'
novo.classList.add('destaque')

document.body.appendChild(novo)                    // no final do body
document.body.prepend(novo)                        // no início do body
titulo.insertAdjacentElement('afterend', novo)     // após o título
titulo.insertAdjacentHTML('beforebegin', '<hr>')   // antes do título

// ── Remoção ──
novo.remove()
titulo.removeChild(novo)  // alternativa legada

// ── Navegação na árvore ──
titulo.parentElement
titulo.children           // HTMLCollection de filhos
titulo.firstElementChild
titulo.lastElementChild
titulo.nextElementSibling
titulo.previousElementSibling
titulo.closest('section') // sobe procurando um ancestor que combine

// ── Fragment (performance: uma única operação no DOM) ──
const fragment = document.createDocumentFragment()
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li')
  li.textContent = `Item ${i + 1}`
  fragment.appendChild(li)
}
document.querySelector('ul').appendChild(fragment)  // uma inserção no DOM
```

---

## 10. Eventos

```javascript
// ── addEventListener ──
const btn = document.querySelector('#meu-botao')

function manipularClique(event) {
  console.log('Tipo:', event.type)
  console.log('Target:', event.target)
  console.log('CurrentTarget:', event.currentTarget)
  console.log('Coordenadas:', event.clientX, event.clientY)
}

btn.addEventListener('click', manipularClique)
btn.removeEventListener('click', manipularClique)

// Opções do addEventListener
btn.addEventListener('click', fn, {
  once: true,      // dispara apenas uma vez
  passive: true,   // nunca chama preventDefault (melhor performance em scroll)
  capture: true,   // captura na fase de descida
})

// ── Tipos de eventos ──
// Mouse
element.addEventListener('click', fn)
element.addEventListener('dblclick', fn)
element.addEventListener('mousedown', fn)
element.addEventListener('mouseup', fn)
element.addEventListener('mousemove', fn)
element.addEventListener('mouseenter', fn)   // não borbulha
element.addEventListener('mouseleave', fn)   // não borbulha
element.addEventListener('mouseover', fn)    // borbulha
element.addEventListener('mouseout', fn)     // borbulha
element.addEventListener('contextmenu', fn)  // botão direito

// Teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { /* Enter */ }
  if (e.key === 'Escape') { /* Esc */ }
  if (e.ctrlKey && e.key === 's') { /* Ctrl+S */ }
  if (e.key === 'ArrowLeft') { /* Seta esquerda */ }
})
document.addEventListener('keyup', fn)
document.addEventListener('keypress', fn)   // deprecated, usar keydown

// Formulários
form.addEventListener('submit', (e) => e.preventDefault())
input.addEventListener('change', fn)   // quando perde foco com mudança
input.addEventListener('input', fn)    // cada digitação
input.addEventListener('focus', fn)
input.addEventListener('blur', fn)

// Janela / Documento
window.addEventListener('load', fn)          // página totalmente carregada
document.addEventListener('DOMContentLoaded', fn)  // DOM pronto (preferível)
window.addEventListener('resize', fn)
window.addEventListener('scroll', fn)
window.addEventListener('hashchange', fn)
window.addEventListener('online', fn)
window.addEventListener('offline', fn)

// ── Event Delegation ──
// Em vez de adicionar listener em cada elemento filho,
// adiciona no pai e verifica o target:
document.querySelector('#lista').addEventListener('click', (e) => {
  const item = e.target.closest('li')   // sobe até o <li>
  if (!item) return

  if (e.target.matches('.btn-excluir')) {
    item.remove()
  } else if (e.target.matches('.btn-editar')) {
    item.contentEditable = 'true'
    item.focus()
  }
})

// ── Propagação de eventos ──
// Captura (de cima para baixo) → Target → Borbulhamento (de baixo para cima)

child.addEventListener('click', (e) => {
  e.stopPropagation()   // impede borbulhamento para elementos pai
  e.preventDefault()    // cancela comportamento padrão (ex: submit, link)
})

// ── Custom Events ──
const eventoCustom = new CustomEvent('pedido:criado', {
  detail: { id: 42, produto: 'Notebook' },
  bubbles: true,
})
document.dispatchEvent(eventoCustom)

document.addEventListener('pedido:criado', (e) => {
  console.log('Pedido criado:', e.detail)
})
```

---

## Práticas

| # | Arquivo | Descrição |
|---|---------|-----------|
| 01 | [Escopo e Closures](praticas/01-escopo-closures.js) | Variáveis, escopo, hoisting, closures |
| 02 | [Arrays e Objetos](praticas/02-arrays-objetos.js) | Métodos, desestruturação, Map, Set |
| 03 | [JSON](praticas/03-json.js) | Parsing, serialização e manipulação de JSON |
| 04 | [DOM e Eventos](praticas/04-dom-eventos.html) | Manipulação do DOM e gerenciamento de eventos |

---

## Referências

- [JavaScript – MDN Web Docs](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [ECMAScript 2024 – tc39.es](https://tc39.es/ecma262/)
- [JavaScript.info](https://javascript.info/)
- [Eloquent JavaScript (livro gratuito)](https://eloquentjavascript.net/)
- [You Don't Know JS (livro gratuito)](https://github.com/getify/You-Dont-Know-JS)
