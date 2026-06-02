# Módulo 05 – JavaScript Fundamentals

## Prática Integrada Relacionada

- [Prática Integrada - Módulos 05 e 06](../../pratica_js-assincronismo/README.md)

## Objetivo do Módulo

Dominar os blocos centrais do JavaScript usado no navegador: variáveis, funções, tipos, strings, arrays, objetos, DOM, eventos e leitura de dados. Cada tópico abaixo traz um exemplo que pode ser executado no console do navegador ou em um arquivo HTML simples.

## Como Praticar

1. Abra o DevTools do navegador e use a aba Console para testar os exemplos de JavaScript puro.
2. Quando o exemplo envolver DOM, salve o trecho em um arquivo `.html` e abra a página no navegador.
3. Execute um tópico por vez e altere os valores para observar o resultado.

---

## 1. Variáveis e Mutabilidade

Use `const` por padrão. Troque para `let` apenas quando a variável realmente precisar ser reatribuída.

```javascript
const nome = 'João'
let idade = 30

idade = 31

const pessoa = { nome: 'Maria' }
pessoa.nome = 'Ana'

console.log(nome)
console.log(idade)
console.log(pessoa)
```

Rode este trecho no seu ambiente antes de avançar.

- Troque `idade` para `const` e observe o erro ao reatribuir.
- Adicione novas propriedades em `pessoa` e veja que o objeto continua sendo o mesmo.

---

## 2. Funções e Parâmetros

Funções podem ser declaradas de formas diferentes. O importante é escolher uma forma consistente para o contexto do projeto.

```javascript
function saudacao(nome) {
  return `Olá, ${nome}!`
}

const cumprimento = function (nome) {
  return `Bom dia, ${nome}!`
}

const dobrar = (numero) => numero * 2

function conectar(host = 'localhost', porta = 3000) {
  return `${host}:${porta}`
}

console.log(saudacao('Ana'))
console.log(cumprimento('Bruno'))
console.log(dobrar(4))
console.log(conectar())
```

Rode este trecho no seu ambiente antes de avançar.

- Passe valores diferentes para `conectar`.
- Crie uma função com `...rest` para somar qualquer quantidade de números.

---

## 3. Tipos de Dados e Conversões

JavaScript faz conversões implícitas em alguns casos. Por isso, é importante saber quando o valor está sendo tratado como número, string ou booleano.

```javascript
console.log(typeof 42)
console.log(typeof 'texto')
console.log(typeof true)
console.log(typeof [])

console.log(Number('42'))
console.log(Number('abc'))
console.log(String(42))
console.log(Boolean(0))
console.log(Boolean('qualquer texto'))

console.log(0 == '')
console.log(0 === '')
console.log(Number.isNaN(Number('abc')))
```

Rode este trecho no seu ambiente antes de avançar.

- Compare `==` e `===` com valores diferentes.
- Teste `Number('')`, `Number(null)` e `Number(undefined)`.

---

## 4. Strings e Texto

Strings são muito usadas para montar mensagens, validar entradas e renderizar conteúdo.

```javascript
const nome = 'Maria'
const sobrenome = 'Silva'

const mensagem = `Olá, ${nome} ${sobrenome}!`
console.log(mensagem)

const texto = '  desenvolvimento web  '
console.log(texto.trim())
console.log(texto.toUpperCase())
console.log(texto.includes('web'))
console.log('A,B,C'.split(','))
console.log(['A', 'B', 'C'].join(' - '))
```

Rode este trecho no seu ambiente antes de avançar.

- Troque o conteúdo de `texto` e observe os métodos mudarem o resultado.
- Monte uma mensagem com quebras de linha usando template literal.

---

## 5. Arrays

Arrays guardam listas ordenadas de valores. Eles podem ser mutados ou transformados em novos arrays.

```javascript
const frutas = ['maçã', 'banana', 'laranja']

console.log(frutas[0])
console.log(frutas.at(-1))

frutas.push('uva')
console.log(frutas)

const frutasEmMaiusculo = frutas.map((fruta) => fruta.toUpperCase())
const frutasComA = frutas.filter((fruta) => fruta.includes('a'))
const quantidadeLetras = frutas.reduce((total, fruta) => total + fruta.length, 0)

console.log(frutasEmMaiusculo)
console.log(frutasComA)
console.log(quantidadeLetras)
```

Rode este trecho no seu ambiente antes de avançar.

- Substitua `map` por `forEach` e observe a diferença de retorno.
- Use `sort`, `find` e `every` em um novo array.

---

## 6. Objetos e Desestruturação

Objetos organizam dados por chave. A desestruturação facilita a leitura e reduz repetição.

```javascript
const usuario = {
  nome: 'João',
  idade: 30,
  cidade: 'Recife',
}

const { nome, idade } = usuario
console.log(nome, idade)

usuario.email = 'joao@example.com'
console.log(usuario)

const endereco = {
  rua: 'Avenida Central',
  numero: 100,
}

const perfil = { ...usuario, endereco }
console.log(perfil)
```

Rode este trecho no seu ambiente antes de avançar.

- Crie uma função que receba um objeto e retorne apenas uma parte dele.
- Aplique desestruturação em um array de objetos.

---

## 7. DOM: Ler e Atualizar a Página

O DOM é a representação da página dentro do JavaScript. Com ele você encontra elementos, lê valores e altera o conteúdo exibido.

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOM</title>
  </head>
  <body>
    <h1 id="titulo">Olá</h1>
    <button id="botao">Trocar texto</button>

    <script>
      const titulo = document.querySelector('#titulo')
      const botao = document.querySelector('#botao')

      botao.addEventListener('click', () => {
        titulo.textContent = 'Texto alterado pelo JavaScript'
      })
    </script>
  </body>
</html>
```

Rode este trecho no seu ambiente antes de avançar.

- Troque `textContent` por `innerHTML` e compare o comportamento.
- Adicione outro botão para voltar o texto original.

---

## 8. Eventos de Usuário

Eventos permitem responder a ações como clique, envio de formulário e digitação.

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Eventos</title>
  </head>
  <body>
    <form id="formulario">
      <input id="nome" type="text" placeholder="Digite seu nome" />
      <button type="submit">Enviar</button>
    </form>
    <p id="resultado"></p>

    <script>
      const formulario = document.querySelector('#formulario')
      const nome = document.querySelector('#nome')
      const resultado = document.querySelector('#resultado')

      formulario.addEventListener('submit', (event) => {
        event.preventDefault()
        resultado.textContent = `Olá, ${nome.value}!`
      })
    </script>
  </body>
</html>
```

Rode este trecho no seu ambiente antes de avançar.

- Remova o `preventDefault()` e veja o que acontece no envio.
- Adicione validação para impedir envio com campo vazio.

---

## 9. JSON

JSON é o formato mais comum para troca de dados entre front-end e API.

```javascript
const texto = '{"nome":"João","idade":30}'
const objeto = JSON.parse(texto)

console.log(objeto.nome)

const convertido = JSON.stringify({ ativo: true, tags: ['js', 'web'] })
console.log(convertido)
```

Rode este trecho no seu ambiente antes de avançar.

- Altere o JSON de entrada e veja quando o parse falha.
- Converta um array de objetos para JSON e depois volte para objeto.

---

## 10. Assincronismo: Promises e `async/await`

Quando uma operação depende de tempo de rede, resposta de API ou espera, o código precisa lidar com assincronismo.

```javascript
function carregarDados() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Dados carregados')
    }, 1000)
  })
}

carregarDados().then((mensagem) => console.log(mensagem))

async function executar() {
  const mensagem = await carregarDados()
  console.log(mensagem)
}

executar()
```

Rode este trecho no seu ambiente antes de avançar.

- Troque o tempo do `setTimeout` e observe a ordem de execução.
- Crie um segundo `Promise` e combine os resultados.

---

## 11. Fetch e Consumo de API

Use `fetch` para consultar dados externos e renderizá-los na interface.

```javascript
async function buscarUsuarios() {
  const resposta = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`)
  }

  const usuarios = await resposta.json()
  console.log(usuarios)
}

buscarUsuarios().catch((erro) => console.error(erro.message))
```

### Tente Executar

- Troque a URL por outra rota pública da mesma API.
- Adicione `try/catch` e exiba uma mensagem amigável no console.

---

## 12. Mini Exercício Integrado

Monte uma tela com um formulário, um botão e uma lista. Quando o usuário enviar o formulário, mostre uma mensagem na tela e atualize a lista com base em um array de dados.

### Roteiro

1. Crie um arquivo HTML com um campo de texto e uma lista vazia.
2. Use `querySelector` para capturar os elementos.
3. Escute o evento `submit`.
4. Leia o valor digitado.
5. Atualize a interface com `textContent` e `innerHTML`.

---

## Próximo Passo

Depois de dominar os tópicos acima, siga para o [Módulo 06](../06-assincronismo/README.md) para aprofundar o consumo de APIs e o tratamento de operações assíncronas.
