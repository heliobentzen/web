# Módulo 06 – Assincronismo e Fetch

## O que você vai aprender

- Promises e async/await
- Fetch API para requisições HTTP
- Tratamento de erros
- JSON parse/stringify

---

## 1. Promises e Async/Await

```javascript
// Callback antigo (evite!)
function buscarDados(callback) {
  setTimeout(() => callback({ nome: 'João' }), 1000)
}

// Promise
function buscarDados() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ nome: 'João' }), 1000)
  })
}
buscarDados().then(data => console.log(data))

// Async/await (melhor!)
async function teste() {
  const data = await buscarDados()
  console.log(data)
}
```

---

## 2. Fetch API

```javascript
// GET
const response = await fetch('https://api.example.com/users')
const data = await response.json()

// POST
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome: 'João', email: 'joao@example.com' })
})

// Tratamento de erro
try {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const data = await response.json()
  console.log(data)
} catch (erro) {
  console.error('Erro:', erro.message)
}
```

---

## 3. JSON

```javascript
// String → Objeto
const obj = JSON.parse('{"nome":"João"}')

// Objeto → String
const json = JSON.stringify({ nome: 'João' })
```

Próximo: fazer as práticas!

```javascript
// Convenção: primeiro parâmetro é o erro (error-first callback)
function buscarUsuario(id, callback) {
  setTimeout(() => {
    if (id <= 0) {
      callback(new Error('ID inválido'), null)
      return
    }
    callback(null, { id, nome: `Usuário ${id}` })
  }, 500)
}

buscarUsuario(1, (erro, usuario) => {
  if (erro) { console.error('Erro:', erro.message); return }
  console.log('Usuário:', usuario)
})
```

---

## 3. Promises

```javascript
function buscarUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error('ID inválido'))
      else resolve({ id, nome: `Usuário ${id}` })
    }, 500)
  })
}

buscarUsuario(1)
  .then(usuario => { console.log(usuario); return usuario.id })
  .then(id => console.log('ID:', id))
  .catch(erro => console.error('Erro:', erro.message))
  .finally(() => console.log('Sempre executa'))

// Promise.all – aguarda TODAS
const [a, b] = await Promise.all([fetch('/api/a').then(r => r.json()), fetch('/api/b').then(r => r.json())])

// Promise.allSettled – nunca rejeita
const resultados = await Promise.allSettled([fetch('/a'), fetch('/b')])

// Promise.race – retorna a PRIMEIRA
const dados = await Promise.race([fetch('/api/dados'), timeoutPromise])

// Promise.any – retorna a PRIMEIRA com sucesso
const rapido = await Promise.any([fetch('/cdn1'), fetch('/cdn2'), fetch('/cdn3')])
```

---

## 4. async / await

```javascript
async function carregarDados(id) {
  try {
    const usuario = await buscarUsuario(id)
    const pedidos = await buscarPedidos(usuario.id)
    return { usuario, pedidos }
  } catch (erro) {
    console.error('Erro:', erro.message)
    throw erro
  } finally {
    esconderLoading()
  }
}

// Paralelo com async/await
async function carregarPainel() {
  // ✅ Paralelo (rápido)
  const [usuario, pedidos, config] = await Promise.all([
    buscarUsuario(1),
    buscarPedidos(1),
    buscarConfig(),
  ])
}
```

---

## 5. Fetch API

```javascript
// GET
const usuarios = await fetch('https://jsonplaceholder.typicode.com/users')
  .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })

// POST
const novo = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  body: JSON.stringify({ title: 'Novo Post', body: 'Conteúdo', userId: 1 }),
}).then(r => r.json())

// AbortController – cancelar requisição
async function buscarComTimeout(url, ms = 5000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timer)
    return res.json()
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('Timeout!')
    throw e
  }
}
```

---

## 6. Padrões Avançados

### Cliente HTTP Reutilizável

```javascript
class ApiCliente {
  #baseUrl; #headers

  constructor(baseUrl, token = null) {
    this.#baseUrl = baseUrl.replace(/\/$/, '')
    this.#headers = { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) }
  }

  async #req(method, path, body) {
    const res = await fetch(`${this.#baseUrl}${path}`, {
      method, headers: this.#headers,
      ...(body && { body: JSON.stringify(body) }),
    })
    if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status })
    return res.status === 204 ? null : res.json()
  }

  get    = (p)    => this.#req('GET',    p)
  post   = (p, b) => this.#req('POST',   p, b)
  put    = (p, b) => this.#req('PUT',    p, b)
  patch  = (p, b) => this.#req('PATCH',  p, b)
  delete = (p)    => this.#req('DELETE', p)
}
```

### Retry com Backoff Exponencial

```javascript
async function comRetry(fn, { tentativas = 3, delayBase = 1000 } = {}) {
  let ultimoErro
  for (let i = 0; i < tentativas; i++) {
    try { return await fn() }
    catch (e) {
      ultimoErro = e
      if (i < tentativas - 1) {
        await new Promise(r => setTimeout(r, delayBase * 2 ** i + Math.random() * 500))
      }
    }
  }
  throw ultimoErro
}
```

---

## 7. Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

## Práticas

| # | Arquivo | Descrição |
|---|---------|-----------|
| 01 | [Promises e async/await](praticas/01-promises-async.js) | Exercícios com Promises |
| 02 | [Fetch API](praticas/02-fetch-api.html) | Consumo de APIs REST interativo |

---

## Referências

- [Fetch API – MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- [Promise – MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [async/await – MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function)
- [Event Loop (In the Loop) – Jake Archibald](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
- [JavaScript.info – Promises](https://javascript.info/promise-basics)
- [JSONPlaceholder – API de testes](https://jsonplaceholder.typicode.com/)
