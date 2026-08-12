# Módulo 06 — Assincronismo e Consumo de APIs

> Toda aplicação real espera por algo: rede, arquivo, resposta do usuário. Este módulo ensina a esperar sem travar a interface e a lidar com o que dá errado.

| | |
| --- | --- |
| **Carga horária** | 10 h (5 h expositivas + 5 h de prática) |
| **Pré-requisito** | [Módulo 05 — JavaScript](../05-javascript/README.md) |
| **Prática integrada** | [Módulos 05 e 06 — JS e Assincronismo](../../pratica_js-assincronismo/README.md) |
| **Práticas** | [`praticas/`](praticas/) |

---

## Objetivos de aprendizagem

Ao final deste módulo, você será capaz de:

1. **Explicar** por que JavaScript é de thread única e como ele executa código assíncrono.
2. **Prever** a ordem de execução de um trecho com código síncrono e assíncrono misturado.
3. **Escrever** e consumir Promises com `async/await`.
4. **Consumir** APIs REST com `fetch`, tratando corretamente erros de rede e de HTTP.
5. **Executar** requisições em paralelo escolhendo entre `Promise.all`, `allSettled` e `any`.
6. **Cancelar** requisições e aplicar timeout.
7. **Construir** uma interface que comunica os estados de carregando, sucesso, vazio e erro.

---

## Roteiro

```text
1. Por que assincronismo existe   ← o modelo de execução
        ↓
2. Callbacks                      ← como era antes
        ↓
3. Promises                       ← o contrato
        ↓
4. async/await                    ← a forma que você vai usar
        ↓
5. Paralelismo
        ↓
6. fetch e APIs REST
        ↓
7. Tratamento de erros            ← a parte que mais se esquece
        ↓
8. Cancelamento e timeout
        ↓
9. Estados de interface           ← o que o usuário vê
```

---

## 1. Por que assincronismo existe

JavaScript executa em **uma única thread**. Se uma operação demorasse parada, a página
inteira congelaria: nada de rolar, clicar ou digitar.

```javascript
console.log('A')

setTimeout(() => console.log('B'), 1000)

console.log('C')

// Saída: A, C, B
```

O `setTimeout` não pausa nada. Ele registra a função para ser chamada depois e o programa
continua. Esse é o modelo assíncrono.

### 1.1 Event loop, em uma explicação

```text
  Call Stack          Web APIs              Filas
 ┌──────────┐      ┌──────────────┐    ┌─────────────────┐
 │ código   │ ───▶ │ setTimeout   │───▶│ microtarefas    │ ← Promises
 │ rodando  │      │ fetch        │    │ (prioridade)    │
 │ agora    │      │ eventos      │    ├─────────────────┤
 └──────────┘      └──────────────┘    │ macrotarefas    │ ← setTimeout
       ▲                                └─────────────────┘
       └──── event loop: quando a pilha esvazia, puxa da fila ────┘
```

O **event loop** só move algo da fila para a pilha quando a pilha está **vazia**. E
microtarefas (Promises) têm prioridade sobre macrotarefas (`setTimeout`).

```javascript
console.log('1 — síncrono')

setTimeout(() => console.log('2 — macrotarefa'), 0)

Promise.resolve().then(() => console.log('3 — microtarefa'))

console.log('4 — síncrono')

// Saída: 1, 4, 3, 2
```

Mesmo com `0` de espera, o `setTimeout` sai por último: síncrono primeiro, depois
microtarefas, depois macrotarefas.

> **Experimente:** cole esse trecho no console e confirme a ordem. Depois acrescente um
> `queueMicrotask(() => console.log('5'))` e preveja onde ele aparece.

---

## 2. Callbacks: como era antes

A primeira solução foi passar uma função para ser chamada quando o trabalho terminasse:

```javascript
function buscarUsuario(id, callback) {
  setTimeout(() => callback(null, { id, nome: 'Ana' }), 500)
}

buscarUsuario(1, (erro, usuario) => {
  if (erro) return console.error(erro)
  console.log(usuario)
})
```

Funciona para um passo. Para vários passos dependentes, vira o *callback hell*:

```javascript
buscarUsuario(1, (erro, usuario) => {
  if (erro) return trataErro(erro)
  buscarPedidos(usuario.id, (erro, pedidos) => {
    if (erro) return trataErro(erro)
    buscarItens(pedidos[0].id, (erro, itens) => {
      if (erro) return trataErro(erro)
      console.log(itens)          // aninhamento crescente
    })                            // erro tratado três vezes
  })
})
```

Callbacks ainda são usados em eventos do DOM (`addEventListener`) — ali o padrão faz
sentido, porque o evento pode ocorrer muitas vezes. Para operações que terminam uma vez,
use Promises.

---

## 3. Promises

Uma Promise é um **objeto que representa um valor que ainda não existe**. Ela tem três estados:

```text
        ┌──────────────┐
        │   pending    │  (pendente)
        └──────┬───────┘
         ┌─────┴─────┐
         ▼           ▼
  ┌────────────┐ ┌──────────┐
  │ fulfilled  │ │ rejected │
  │ (resolvida)│ │(rejeitada)│
  └────────────┘ └──────────┘
```

Uma vez resolvida ou rejeitada, ela não muda mais de estado.

```javascript
function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buscarUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, nome: 'Ana' })
      else reject(new Error('ID inválido'))
    }, 500)
  })
}

buscarUsuario(1)
  .then(usuario => console.log(usuario))
  .catch(erro => console.error(erro.message))
  .finally(() => console.log('Terminou, com sucesso ou não'))
```

O encadeamento resolve o aninhamento dos callbacks — o `catch` no fim captura o erro de
qualquer etapa anterior:

```javascript
buscarUsuario(1)
  .then(usuario => buscarPedidos(usuario.id))
  .then(pedidos => buscarItens(pedidos[0].id))
  .then(itens => console.log(itens))
  .catch(erro => console.error(erro.message))   // um só tratamento
```

---

## 4. `async/await`

`async/await` é açúcar sintático sobre Promises: o mesmo comportamento, com a aparência de
código sequencial.

```javascript
async function carregar() {
  try {
    const usuario = await buscarUsuario(1)
    const pedidos = await buscarPedidos(usuario.id)
    const itens = await buscarItens(pedidos[0].id)
    console.log(itens)
  } catch (erro) {
    console.error(erro.message)
  } finally {
    console.log('Terminou')
  }
}
```

Duas regras:

- `await` só funciona dentro de função `async` (ou no nível superior de um módulo ES).
- Toda função `async` **retorna uma Promise**, mesmo que você retorne um valor simples.

```javascript
async function valor() {
  return 42
}
valor().then(v => console.log(v))   // 42 — não é 42 direto, é uma Promise
```

### 4.1 O erro clássico: esquecer o `await`

```javascript
// ❌ Retorna a Promise, não o dado
const dados = buscarUsuario(1)
console.log(dados.nome)         // undefined

// ✅
const dados = await buscarUsuario(1)
console.log(dados.nome)         // 'Ana'
```

---

## 5. Paralelismo

`await` em sequência **espera cada um por vez**. Quando as requisições são independentes,
isso desperdiça tempo:

```javascript
// ❌ Sequencial: 3 requisições de 1s = 3s
const a = await buscar('/a')
const b = await buscar('/b')
const c = await buscar('/c')

// ✅ Paralelo: 3 requisições de 1s = 1s
const [a, b, c] = await Promise.all([
  buscar('/a'),
  buscar('/b'),
  buscar('/c'),
])
```

### 5.1 Escolhendo o combinador certo

| Método | Resolve quando | Rejeita quando | Use para |
| --- | --- | --- | --- |
| `Promise.all` | **Todas** resolvem | **Qualquer uma** falha | Tudo é obrigatório |
| `Promise.allSettled` | **Todas** terminam | Nunca | Falha parcial é aceitável |
| `Promise.any` | A **primeira** resolve | **Todas** falham | Vários espelhos, quer o mais rápido |
| `Promise.race` | A **primeira** termina | A primeira que falhar | Corrida contra timeout |

```javascript
// all: um painel em que todos os blocos são obrigatórios
const [perfil, cursos] = await Promise.all([
  buscar('/perfil'),
  buscar('/cursos'),
])

// allSettled: cada bloco falha de forma independente
const resultados = await Promise.allSettled([
  buscar('/noticias'),
  buscar('/eventos'),
  buscar('/avisos'),
])

for (const r of resultados) {
  if (r.status === 'fulfilled') renderizar(r.value)
  else mostrarErroNoBloco(r.reason)
}
```

**Regra prática:** se o usuário ainda consegue usar a página quando um dos blocos falha,
use `allSettled`. Com `all`, uma falha derruba tudo.

---

## 6. `fetch` e APIs REST

```javascript
const resposta = await fetch('https://jsonplaceholder.typicode.com/users')
const usuarios = await resposta.json()
console.log(usuarios)
```

São duas etapas assíncronas: primeiro chegam status e headers, depois o corpo é lido e
convertido.

### 6.1 A pegadinha mais importante do `fetch`

```javascript
// ❌ Errado: não detecta 404 nem 500
try {
  const r = await fetch('/api/inexistente')
  const dados = await r.json()      // erro de parse, mensagem confusa
} catch (erro) {
  console.error(erro)
}
```

**`fetch` só rejeita em falha de rede** — sem conexão, DNS não resolvido, CORS bloqueado.
Um `404` ou um `500` são respostas HTTP válidas: a Promise **resolve** normalmente.

```javascript
// ✅ Correto: verifique response.ok
const resposta = await fetch('/api/usuarios')

if (!resposta.ok) {
  throw new Error(`HTTP ${resposta.status}: ${resposta.statusText}`)
}

const dados = await resposta.json()
```

`response.ok` é `true` para status de 200 a 299. Verificar isso é obrigatório em toda chamada.

### 6.2 Propriedades da resposta

```javascript
resposta.ok           // true se status entre 200 e 299
resposta.status       // 200, 404, 500...
resposta.statusText   // 'OK', 'Not Found'
resposta.headers.get('content-type')

await resposta.json()  // corpo como objeto
await resposta.text()  // corpo como texto
await resposta.blob()  // corpo binário (imagem, PDF)
```

O corpo só pode ser lido **uma vez**. Chamar `.json()` duas vezes lança erro.

### 6.3 Enviando dados

```javascript
async function criarAluno(dados) {
  const resposta = await fetch('https://api.exemplo.br/alunos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  })

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}))
    throw new Error(erro.mensagem ?? `HTTP ${resposta.status}`)
  }

  return resposta.json()
}
```

Três pontos: o `body` precisa ser **string** (daí o `JSON.stringify`); o `Content-Type`
informa o formato ao servidor; e o `.catch(() => ({}))` protege contra resposta de erro
que não vem em JSON.

Enviando arquivo, é diferente:

```javascript
const dados = new FormData()
dados.append('foto', arquivo)
dados.append('descricao', 'Foto do campus')

await fetch('/upload', { method: 'POST', body: dados })
// NÃO defina Content-Type: o navegador precisa gerar o boundary
```

### 6.4 Códigos de status e o que fazer com cada um

| Código | Significado | Ação no front-end |
| --- | --- | --- |
| `200` / `201` / `204` | Sucesso | Seguir o fluxo |
| `304` | Não modificado | Usar o cache |
| `400` | Requisição malformada | Revisar o que foi enviado |
| `401` | Não autenticado | Redirecionar para login |
| `403` | Sem permissão | Mensagem clara; não adianta tentar de novo |
| `404` | Não existe | Mostrar estado vazio, não erro genérico |
| `422` | Dados inválidos | Exibir o erro **no campo** correspondente |
| `429` | Excedeu o limite | Aguardar e tentar de novo, com espera crescente |
| `500` / `503` | Erro do servidor | Mensagem genérica + opção de tentar de novo |

`401` e `403` são diferentes: no primeiro, fazer login resolve; no segundo, não.

---

## 7. Tratamento de erros

### 7.1 Distinga o tipo de falha

```javascript
async function carregar(url) {
  try {
    const resposta = await fetch(url)

    if (!resposta.ok) {
      // Erro de aplicação: o servidor respondeu, mas não com sucesso
      throw new ErroHttp(resposta.status, `HTTP ${resposta.status}`)
    }

    return await resposta.json()

  } catch (erro) {
    if (erro instanceof ErroHttp) {
      throw erro                                     // repassa com o status
    }
    if (erro.name === 'AbortError') {
      throw new Error('A requisição foi cancelada.')
    }
    if (erro instanceof SyntaxError) {
      throw new Error('O servidor devolveu um formato inesperado.')
    }
    // Sobrou: falha de rede
    throw new Error('Sem conexão com o servidor. Verifique sua internet.')
  }
}

class ErroHttp extends Error {
  constructor(status, mensagem) {
    super(mensagem)
    this.name = 'ErroHttp'
    this.status = status
  }
}
```

Mensagens distintas importam: "Sem conexão" e "Você não tem permissão" pedem ações
completamente diferentes do usuário.

### 7.2 Nunca engula o erro

```javascript
// ❌ O usuário fica olhando para um spinner eterno
try {
  const dados = await carregar('/api')
} catch (erro) {
  console.error(erro)      // só o desenvolvedor vê
}

// ✅ Estado de erro visível e recuperável
try {
  const dados = await carregar('/api')
  renderizar(dados)
} catch (erro) {
  mostrarErro(erro.message)     // o usuário vê
  habilitarBotaoTentarNovamente()
} finally {
  esconderCarregando()          // sempre executa
}
```

### 7.3 Nova tentativa com espera crescente

```javascript
async function comNovaTentativa(fn, tentativas = 3) {
  for (let i = 0; i < tentativas; i++) {
    try {
      return await fn()
    } catch (erro) {
      // Erro do cliente não melhora com repetição
      if (erro.status >= 400 && erro.status < 500 && erro.status !== 429) throw erro
      if (i === tentativas - 1) throw erro

      const espera = 2 ** i * 1000       // 1s, 2s, 4s
      await new Promise(r => setTimeout(r, espera))
    }
  }
}
```

Repetir um `404` é inútil — o recurso continuará não existindo. Repetir um `503` faz
sentido. A espera crescente evita agravar a sobrecarga do servidor.

---

## 8. Cancelamento e timeout

`fetch` não tem timeout embutido: uma requisição pode ficar pendurada indefinidamente.

```javascript
// Timeout em uma linha
const resposta = await fetch(url, { signal: AbortSignal.timeout(5000) })
```

`AbortSignal.timeout()` é Baseline e substitui o padrão manual com `AbortController` e
`setTimeout`.

### 8.1 Cancelando requisição obsoleta

Em um campo de busca, o usuário digita rápido e dispara várias requisições. Sem
cancelamento, a resposta de uma busca antiga pode chegar depois e sobrescrever a atual:

```javascript
let controlador = null

campoBusca.addEventListener('input', async (evento) => {
  controlador?.abort()                  // cancela a busca anterior
  controlador = new AbortController()

  const termo = evento.target.value.trim()
  if (termo.length < 3) return

  try {
    const resposta = await fetch(`/api/busca?q=${encodeURIComponent(termo)}`, {
      signal: controlador.signal,
    })
    renderizar(await resposta.json())
  } catch (erro) {
    if (erro.name === 'AbortError') return    // cancelamento não é erro
    mostrarErro(erro.message)
  }
})
```

Sempre use `encodeURIComponent` ao montar a URL com texto do usuário.

### 8.2 Combinando sinais

```javascript
const sinal = AbortSignal.any([
  controlador.signal,           // cancelamento manual
  AbortSignal.timeout(5000),    // ou timeout
])
await fetch(url, { signal: sinal })
```

---

## 9. Estados de interface

Toda operação assíncrona tem **quatro** estados possíveis na tela. Interface incompleta é
a que só trata o caminho feliz.

```text
       ┌──────────┐
       │  ocioso  │
       └────┬─────┘
            ▼
      ┌────────────┐
      │ carregando │
      └─────┬──────┘
      ┌─────┴──────┬────────────┐
      ▼            ▼            ▼
 ┌─────────┐  ┌────────┐  ┌───────┐
 │ sucesso │  │ vazio  │  │ erro  │
 └─────────┘  └────────┘  └───────┘
```

Exemplo completo:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consulta de usuários</title>
</head>
<body>
  <h1>Usuários</h1>
  <button type="button" id="carregar">Carregar</button>

  <div id="status" role="status" aria-live="polite"></div>
  <ul id="lista"></ul>

  <script type="module">
    const botao = document.querySelector('#carregar')
    const status = document.querySelector('#status')
    const lista = document.querySelector('#lista')

    botao.addEventListener('click', carregarUsuarios)

    async function carregarUsuarios() {
      definirEstado('carregando')

      try {
        const resposta = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: AbortSignal.timeout(8000) }
        )

        if (!resposta.ok) throw new Error(`Não foi possível carregar (HTTP ${resposta.status}).`)

        const usuarios = await resposta.json()

        if (usuarios.length === 0) return definirEstado('vazio')

        renderizar(usuarios)
        definirEstado('sucesso', `${usuarios.length} usuários carregados.`)

      } catch (erro) {
        const mensagem = erro.name === 'TimeoutError'
          ? 'O servidor demorou demais para responder.'
          : erro.message
        definirEstado('erro', mensagem)
      }
    }

    function definirEstado(estado, mensagem = '') {
      botao.disabled = estado === 'carregando'

      const textos = {
        carregando: 'Carregando…',
        vazio: 'Nenhum usuário encontrado.',
        erro: `Erro: ${mensagem}`,
        sucesso: mensagem,
      }
      status.textContent = textos[estado] ?? ''

      if (estado !== 'sucesso') lista.replaceChildren()
    }

    function renderizar(usuarios) {
      const fragmento = document.createDocumentFragment()
      for (const usuario of usuarios) {
        const li = document.createElement('li')
        li.textContent = `${usuario.name} — ${usuario.email}`   // seguro
        fragmento.append(li)
      }
      lista.replaceChildren(fragmento)
    }
  </script>
</body>
</html>
```

Três detalhes que fazem esse exemplo ser correto e não apenas funcional:

- `role="status"` com `aria-live="polite"` faz o leitor de tela **anunciar** a mudança de
  estado. Sem isso, quem não vê a tela não sabe que algo carregou ([Módulo 04](../04-acessibilidade/README.md)).
- O botão fica `disabled` durante o carregamento, evitando requisições duplicadas.
- `textContent` em vez de `innerHTML`: dado de API é dado externo ([Módulo 05](../05-javascript/README.md)).

---

## 10. Organizando o acesso à API

Quando a aplicação cresce, centralize a comunicação em um módulo:

```javascript
// api.js
const BASE = 'https://jsonplaceholder.typicode.com'

async function requisitar(caminho, opcoes = {}) {
  const resposta = await fetch(`${BASE}${caminho}`, {
    signal: AbortSignal.timeout(10000),
    headers: { 'Content-Type': 'application/json', ...opcoes.headers },
    ...opcoes,
  })

  if (!resposta.ok) {
    const erro = new Error(`HTTP ${resposta.status}`)
    erro.status = resposta.status
    throw erro
  }

  return resposta.status === 204 ? null : resposta.json()
}

export const api = {
  listarUsuarios: () => requisitar('/users'),
  buscarUsuario: (id) => requisitar(`/users/${id}`),
  criarPost: (dados) => requisitar('/posts', {
    method: 'POST',
    body: JSON.stringify(dados),
  }),
  removerPost: (id) => requisitar(`/posts/${id}`, { method: 'DELETE' }),
}
```

```javascript
// main.js
import { api } from './api.js'

const usuarios = await api.listarUsuarios()
```

Vantagens: a URL base aparece uma vez só, o tratamento de erro é uniforme, e trocar de API
não obriga a caçar `fetch` espalhado pelo projeto. A organização de projetos em módulos é
o assunto do [Módulo 08](../08-ecossistema-frontend/README.md).

### 10.1 APIs públicas para praticar

| API | Uso | Precisa de chave? |
| --- | --- | --- |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com/) | Dados falsos para testes | Não |
| [ViaCEP](https://viacep.com.br/) | Consulta de CEP brasileiro | Não |
| [Brasil API](https://brasilapi.com.br/) | CEP, CNPJ, DDD, feriados, bancos | Não |
| [PokéAPI](https://pokeapi.co/) | Catálogo com imagens | Não |
| [IBGE](https://servicodados.ibge.gov.br/api/docs) | Municípios, estados, censo | Não |

---

## Erros comuns

| Sintoma | Causa | Correção |
| --- | --- | --- |
| `404` não cai no `catch` | `fetch` só rejeita em erro de rede | Verifique `resposta.ok` |
| `dados.map is not a function` | Faltou `await` — é uma Promise | Adicione `await` |
| `await is only valid in async` | `await` fora de função `async` | Torne a função `async` ou use módulo ES |
| Página demora e nada acontece | Requisições sequenciais | Use `Promise.all` para as independentes |
| Uma falha derruba o painel inteiro | `Promise.all` com blocos opcionais | Use `Promise.allSettled` |
| Resultado antigo sobrescreve o novo | Requisições concorrentes | Cancele com `AbortController` |
| Spinner infinito | Erro capturado só no `console` | Trate no `catch` e limpe no `finally` |
| `Body has already been read` | `.json()` chamado duas vezes | Guarde o resultado em uma variável |
| Erro de CORS | O servidor não autorizou sua origem | Ajuste no back-end; não há solução no front |
| `429` depois de repetir | Nova tentativa sem espera | Espera crescente entre tentativas |

---

## Checklist de autoavaliação

- [ ] Explicar por que JavaScript é de thread única e o que é o event loop
- [ ] Prever a ordem de saída de um trecho com síncrono, Promise e `setTimeout`
- [ ] Criar uma Promise e consumi-la com `async/await`
- [ ] Explicar por que `fetch` não rejeita em `404`
- [ ] Escrever uma chamada `fetch` completa: `ok`, `json`, `try/catch`, timeout
- [ ] Enviar dados com `POST` e cabeçalhos corretos
- [ ] Escolher entre `all`, `allSettled`, `any` e `race` justificando
- [ ] Cancelar uma requisição obsoleta com `AbortController`
- [ ] Implementar timeout com `AbortSignal.timeout()`
- [ ] Implementar os quatro estados de interface, com anúncio acessível
- [ ] Decidir quando repetir uma requisição que falhou e quando não

---

## Práticas

| # | Arquivo | Foco | Objetivos trabalhados |
| --- | --- | --- | --- |
| 01 | [Promises e async/await](praticas/01-promises-async.js) | Estados, encadeamento, ordem | 1, 2, 3 |
| 02 | [Fetch API](praticas/02-fetch-api.html) | Consumo de API e erros | 4, 7 |
| 03 | [API intermediário](praticas/03-api-intermediario.html) | Paralelismo e cancelamento | 5, 6 |

---

## Exercícios

### Nível 1 — Fixação

1. Preveja a ordem de saída antes de rodar:

```javascript
console.log('A')
setTimeout(() => console.log('B'), 0)
Promise.resolve().then(() => console.log('C'))
queueMicrotask(() => console.log('D'))
console.log('E')
```

2. Explique por que este código não detecta um `404` e corrija-o:

```javascript
async function carregar() {
  try {
    const r = await fetch('/api/inexistente')
    return await r.json()
  } catch {
    return []
  }
}
```

3. Reescreva com `async/await`:

```javascript
buscarUsuario(1)
  .then(u => buscarPedidos(u.id))
  .then(p => console.log(p))
  .catch(e => console.error(e))
```

### Nível 2 — Aplicação

4. **Consulta de CEP.** Um campo, um botão e a exibição do endereço. Use a
   [ViaCEP](https://viacep.com.br/). Trate: CEP com formato inválido (sem chamar a API),
   CEP inexistente (a ViaCEP devolve `{ "erro": true }` com status 200), falha de rede e
   timeout de 5 segundos. Implemente os quatro estados de interface.
5. **Busca com cancelamento.** Campo de busca que consulta a
   [PokéAPI](https://pokeapi.co/) enquanto o usuário digita. Aguarde 300 ms após a última
   tecla antes de chamar (*debounce*) e cancele a requisição anterior a cada nova busca.
6. **Painel resiliente.** Monte um painel que carrega três recursos em paralelo da
   [Brasil API](https://brasilapi.com.br/): feriados do ano, lista de bancos e DDDs de um
   estado. Use `Promise.allSettled` para que a falha de um bloco não impeça os outros de
   aparecer, e mostre erro apenas no bloco que falhou.

### Nível 3 — Desafio

7. **Cliente de API completo.** Escreva um módulo `api.js` com: método genérico de
   requisição, timeout configurável, nova tentativa com espera crescente apenas para `5xx`
   e `429`, cancelamento por `AbortController`, cache em memória para `GET` repetido dentro
   de 30 segundos, e erros tipados que preservam o status HTTP. Escreva um `main.js`
   demonstrando cada recurso.
8. **CRUD acessível.** Uma página que lista, cria, edita e remove posts da JSONPlaceholder.
   Requisitos: os quatro estados de interface em cada operação; confirmação antes de
   remover, com `<dialog>`; foco gerenciado ao abrir e fechar o diálogo; mudanças de estado
   anunciadas por região `aria-live`; atualização otimista da lista com reversão se a
   requisição falhar. Justifique, por escrito, cada escolha entre `all` e `allSettled`.

---

## Referências

- [Promise — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [async/await — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function)
- [Fetch API — MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch)
- [AbortController — MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/AbortController)
- [Event loop — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Event_loop)
- [Loupe — visualizador do event loop](http://latentflip.com/loupe/)
- [javascript.info — Promises e async/await](https://javascript.info/async)
- [CORS — MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)

---

**Navegação:** [◀ Módulo 05](../05-javascript/README.md) · [Índice](../../README.md) · [Módulo 07 ▶](../07-devtools/README.md)
