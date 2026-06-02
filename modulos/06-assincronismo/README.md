# Módulo 06 – Assincronismo e Fetch

## Prática Integrada Relacionada

- [Prática Integrada - Módulos 05 e 06](../../pratica_js-assincronismo/README.md)

## Objetivo do Módulo

Aprender a lidar com operações que não acontecem de forma imediata no navegador, como requisições HTTP, leitura de dados externos e espera por resultados. O foco é entender Promises, `async/await`, `fetch`, tratamento de erros e padrões úteis para aplicações reais.

## Como Praticar

1. Execute os exemplos no console do navegador ou em um arquivo HTML simples.
2. Quando o trecho envolver API, comece com a versão mais simples e depois adicione tratamento de erro.
3. Compare o comportamento do código com e sem `await` para entender o fluxo assíncrono.

---

## 1. O que é Assincronismo

Assincronismo é a forma de lidar com tarefas que demoram para terminar sem travar a interface do usuário.

```javascript
console.log('A')

setTimeout(() => {
  console.log('B')
}, 1000)

console.log('C')
```

Observe que `A` aparece imediatamente, `C` aparece antes de `B` e o navegador continua responsivo enquanto espera o `setTimeout`.

---

## 2. Callback

Callbacks são funções recebidas por outra função e executadas depois. Esse padrão é útil, mas pode ficar difícil de ler quando há muitas etapas.

```javascript
function carregarUsuario(callback) {
  setTimeout(() => {
    callback({ nome: 'João', ativo: true })
  }, 1000)
}

carregarUsuario((usuario) => {
  console.log(usuario)
})
```

Rode este trecho no seu ambiente antes de seguir. Altere o objeto retornado e veja a mudança na saída. Depois, crie uma segunda função que receba o resultado e o exiba em outro formato.

---

## 3. Promise

Promise representa um valor que ainda será resolvido ou rejeitado no futuro.

```javascript
function carregarUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error('ID inválido'))
        return
      }

      resolve({ id, nome: `Usuário ${id}` })
    }, 1000)
  })
}

carregarUsuario(1)
  .then((usuario) => console.log(usuario))
  .catch((erro) => console.error(erro.message))
```

Rode este trecho no seu ambiente antes de seguir. Chame `carregarUsuario(0)` e observe o `catch`. Em seguida, encadeie um novo `then` para transformar o objeto retornado.

---

## 4. `async/await`

`async/await` deixa o código assíncrono mais próximo da leitura linear.

```javascript
async function mostrarUsuario() {
  try {
    const usuario = await carregarUsuario(2)
    console.log(usuario)
  } catch (erro) {
    console.error('Erro:', erro.message)
  }
}

mostrarUsuario()
```

Rode este trecho no seu ambiente antes de seguir. Troque o `id` passado para `carregarUsuario` e compare a leitura deste bloco com a versão usando `then`.

---

## 5. Promises em Paralelo

Quando operações independentes podem ser feitas ao mesmo tempo, `Promise.all` reduz o tempo total de espera.

```javascript
function buscarPerfil() {
  return Promise.resolve({ nome: 'Ana' })
}

function buscarPedidos() {
  return Promise.resolve(['pedido 1', 'pedido 2'])
}

async function carregarPainel() {
  const [perfil, pedidos] = await Promise.all([
    buscarPerfil(),
    buscarPedidos(),
  ])

  console.log(perfil)
  console.log(pedidos)
}

carregarPainel()
```

Rode este trecho no seu ambiente antes de seguir. Adicione uma terceira Promise ao array e teste `Promise.allSettled` para comparar o comportamento quando uma das Promises falha.

---

## 6. Fetch API

`fetch` é a API padrão do navegador para fazer requisições HTTP.

```javascript
async function listarUsuarios() {
  const resposta = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`)
  }

  const usuarios = await resposta.json()
  console.log(usuarios)
}

listarUsuarios().catch((erro) => console.error(erro.message))
```

Rode este trecho no seu ambiente antes de seguir. Troque a URL por outra rota pública da mesma API e abra a aba Network do DevTools para observar a requisição.

---

## 7. Enviando Dados com `fetch`

Além de ler dados, você também pode enviar informações para uma API.

```javascript
async function criarPost() {
  const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Novo Post',
      body: 'Conteúdo de teste',
      userId: 1,
    }),
  })

  const post = await resposta.json()
  console.log(post)
}

criarPost().catch((erro) => console.error(erro.message))
```

Rode este trecho no seu ambiente antes de seguir. Altere os campos do corpo da requisição e compare o envio com `GET` e `POST`.

---

## 8. Tratamento de Erros

Operações assíncronas precisam de uma resposta clara quando algo falha.

```javascript
async function carregarComTratamento(url) {
  try {
    const resposta = await fetch(url)

    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`)
    }

    return await resposta.json()
  } catch (erro) {
    console.error('Falha na requisição:', erro.message)
    return []
  }
}

carregarComTratamento('https://jsonplaceholder.typicode.com/users')
```

Rode este trecho no seu ambiente antes de seguir. Passe uma URL inválida e observe o `catch`; depois, troque o retorno padrão para um objeto com mensagem de erro.

---

## 9. Cancelamento com `AbortController`

Em alguns casos, a requisição precisa ser interrompida antes de terminar.

```javascript
async function buscarComTimeout(url, ms = 3000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)

  try {
    const resposta = await fetch(url, { signal: controller.signal })
    return await resposta.json()
  } catch (erro) {
    if (erro.name === 'AbortError') {
      throw new Error('Tempo esgotado')
    }

    throw erro
  } finally {
    clearTimeout(timer)
  }
}

buscarComTimeout('https://jsonplaceholder.typicode.com/users', 1)
  .catch((erro) => console.error(erro.message))
```

Rode este trecho no seu ambiente antes de seguir. Aumente o tempo limite para ver a diferença e use uma URL lenta ou incorreta para simular falha.

---

## 10. JSON e APIs

JSON é o formato mais comum de troca de dados entre front-end e back-end.

```javascript
const texto = '{"nome":"João","idade":30}'
const objeto = JSON.parse(texto)

console.log(objeto.nome)

const convertido = JSON.stringify({ ativo: true, tags: ['js', 'api'] })
console.log(convertido)
```

Rode este trecho no seu ambiente antes de seguir. Altere a string JSON e observe quando o parse falha; depois, converta um array de objetos para JSON e volte para objeto.

---

## 11. Cliente HTTP Reutilizável

Quando a aplicação faz várias requisições, vale centralizar a lógica de acesso à API.

```javascript
class ApiCliente {
  #baseUrl

  constructor(baseUrl) {
    this.#baseUrl = baseUrl.replace(/\/$/, '')
  }

  async get(path) {
    const resposta = await fetch(`${this.#baseUrl}${path}`)

    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`)
    }

    return resposta.json()
  }
}

const cliente = new ApiCliente('https://jsonplaceholder.typicode.com')
cliente.get('/users').then((dados) => console.log(dados))
```

Rode este trecho no seu ambiente antes de seguir. Adicione métodos `post` e `delete` e teste com outra API pública.

---

## 12. Retry Simples

Às vezes uma requisição falha por instabilidade temporária. Uma estratégia de retry pode ajudar.

```javascript
async function comRetry(fn, tentativas = 3) {
  let ultimoErro

  for (let i = 0; i < tentativas; i++) {
    try {
      return await fn()
    } catch (erro) {
      ultimoErro = erro
    }
  }

  throw ultimoErro
}

comRetry(() => fetch('https://jsonplaceholder.typicode.com/users').then((r) => r.json()))
  .then((dados) => console.log(dados))
  .catch((erro) => console.error(erro.message))
```

Rode este trecho no seu ambiente antes de seguir. Reduza o número de tentativas e compare o resultado; depois, troque a função por uma chamada que falhe de propósito.

---

## 13. Códigos de Status HTTP

Os códigos HTTP ajudam a identificar o resultado de uma requisição.

| Código | Significado |
| --- | --- |
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

Rode este trecho no seu ambiente antes de seguir. Relacione cada código com uma situação real de API e identifique quais deles pedem ação do usuário e quais indicam falha do servidor.

---

## 14. Mini Exercício Integrado

Monte uma tela com um formulário, um status e uma lista. Ao submeter, faça uma chamada `fetch`, exiba o estado de carregamento, trate erro e renderize os resultados.

### Roteiro

1. Crie um arquivo HTML com formulário e lista vazia.
2. Capture os elementos com `querySelector`.
3. Use `submit` com `preventDefault()`.
4. Mostre uma mensagem de carregamento.
5. Faça a requisição com `fetch`.
6. Atualize a interface com os dados ou com uma mensagem de erro.

---

## Próximo Passo

Depois de dominar os tópicos acima, siga para a [Prática Integrada - Módulos 05 e 06](../../pratica_js-assincronismo/README.md) para aplicar esses conceitos em uma atividade comparativa de duas versões de aplicação.
