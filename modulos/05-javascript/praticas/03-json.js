/**
 * PRÁTICA 03 – JSON
 * Módulo 05 – JavaScript
 *
 * Como executar:
 *   node 03-json.js
 *   OU: cole trechos no console do navegador
 */

console.log('=== PRÁTICA 03: JSON ===\n')

// ══════════════════════════════════════════════════
// 1. SINTAXE E REGRAS DO JSON
// ══════════════════════════════════════════════════

console.log('--- 1. Sintaxe do JSON ---')

// JSON válido (string)
const jsonValido = `{
  "nome": "Maria Silva",
  "idade": 28,
  "ativa": true,
  "pontuacao": 98.5,
  "perfil": null,
  "tags": ["admin", "editor", "moderador"],
  "endereco": {
    "cidade": "Curitiba",
    "estado": "PR",
    "cep": "80010-000"
  }
}`

// Tipos suportados em JSON:
// string (aspas duplas), number, boolean, null, array, object
// NÃO suportados: undefined, function, Symbol, Date, Map, Set, RegExp

// ══════════════════════════════════════════════════
// 2. JSON.parse – String JSON → Objeto JavaScript
// ══════════════════════════════════════════════════

console.log('--- 2. JSON.parse ---')

const usuario = JSON.parse(jsonValido)

console.log('Nome:', usuario.nome)
console.log('Ativa:', usuario.ativa)
console.log('Pontuação:', usuario.pontuacao)
console.log('Perfil:', usuario.perfil)
console.log('Primeira tag:', usuario.tags[0])
console.log('Cidade:', usuario.endereco.cidade)

// Erro ao parsear JSON inválido
try {
  JSON.parse("{ nome: 'sem aspas' }")  // chave sem aspas → inválido
} catch (erro) {
  console.log('Erro de parsing:', erro.message)
}

// Verificar antes de parsear
function parsearSeguro(jsonStr) {
  try {
    return { dados: JSON.parse(jsonStr), erro: null }
  } catch (e) {
    return { dados: null, erro: e.message }
  }
}

const resultado = parsearSeguro('{"válido": true}')
console.log('Parse seguro:', resultado)

const resultadoInvalido = parsearSeguro('{invalido}')
console.log('Parse seguro (inválido):', resultadoInvalido)

// ══════════════════════════════════════════════════
// 3. JSON.stringify – Objeto JS → String JSON
// ══════════════════════════════════════════════════

console.log('\n--- 3. JSON.stringify ---')

const objeto = {
  nome: 'João Alves',
  idade: 35,
  ativo: true,
  saldo: 1500.75,
}

// Básico
console.log(JSON.stringify(objeto))

// Com indentação (legível)
console.log(JSON.stringify(objeto, null, 2))

// Filtrar propriedades com allowlist
console.log(JSON.stringify(objeto, ['nome', 'saldo']))

// Replacer como função
const jsonTransformado = JSON.stringify(objeto, (chave, valor) => {
  if (chave === 'saldo') return Number(valor.toFixed(2))
  if (typeof valor === 'number' && chave === 'idade') return undefined // remove
  return valor
})
console.log('Transformado:', jsonTransformado)

// O que JSON.stringify ignora/transforma:
const problemático = {
  funcao: () => 'ignorada',          // ignorado
  indefinido: undefined,              // ignorado
  simbolo: Symbol('x'),              // ignorado
  data: new Date('2024-01-15'),      // convertido para string ISO
  regex: /abc/,                       // vira {}
  nan: NaN,                           // vira null
  infinito: Infinity,                 // vira null
  nome: 'visível',
}
console.log('Problemáticos:', JSON.stringify(problemático, null, 2))

// toJSON: controlar serialização personalizada
class Produto {
  constructor(nome, preco) {
    this.nome = nome
    this.preco = preco
    this._interno = 'não exportar'
  }

  toJSON() {
    return {
      nome: this.nome,
      preco: this.preco,
      precoFormatado: `R$ ${this.preco.toFixed(2)}`,
    }
  }
}

const prod = new Produto('Notebook', 3499.99)
console.log('Com toJSON:', JSON.stringify(prod))

// ══════════════════════════════════════════════════
// 4. CLONE PROFUNDO
// ══════════════════════════════════════════════════

console.log('\n--- 4. Clone Profundo ---')

const original = {
  nome: 'Original',
  config: { debug: false, nivel: 3 },
  tags: ['a', 'b'],
}

// Problema com shallow copy (spread ou Object.assign)
const rascunho = { ...original }
rascunho.config.debug = true   // MUTA o original!
console.log('Original (corrompido):', original.config.debug) // true (problema!)

// Clone via JSON (limitado mas funcional para dados simples)
const original2 = {
  nome: 'Original 2',
  config: { debug: false, nivel: 3 },
  tags: ['a', 'b'],
}
const clone = JSON.parse(JSON.stringify(original2))
clone.config.debug = true    // NÃO muta o original
clone.tags.push('c')
console.log('Original (intacto):', original2.config.debug) // false ✅
console.log('Clone:', clone.config.debug, clone.tags)

// structuredClone (moderno, mais completo)
const original3 = { data: new Date(), mapa: new Map([['a', 1]]), lista: [1, 2, 3] }
// JSON.parse(JSON.stringify(original3)) não copia corretamente Date e Map!
const clone3 = structuredClone(original3)
console.log('structuredClone preserva Date:', clone3.data instanceof Date) // true

// ══════════════════════════════════════════════════
// 5. CENÁRIOS REAIS
// ══════════════════════════════════════════════════

console.log('\n--- 5. Cenários Reais ---')

// Simular resposta de API
const respostaApi = `{
  "status": "success",
  "total": 3,
  "pagina": 1,
  "dados": [
    { "id": 1, "nome": "Alice", "departamento": "Eng", "salario": 8500 },
    { "id": 2, "nome": "Bob",   "departamento": "Mkt", "salario": 6200 },
    { "id": 3, "nome": "Carol", "departamento": "Eng", "salario": 9100 }
  ]
}`

const resposta = JSON.parse(respostaApi)

console.log('Status:', resposta.status)
console.log('Total de registros:', resposta.total)

// Processar dados
const engenheiros = resposta.dados
  .filter(p => p.departamento === 'Eng')
  .map(({ id, nome, salario }) => ({ id, nome, salario }))

const mediaSalarial = resposta.dados
  .reduce((soma, p) => soma + p.salario, 0) / resposta.dados.length

console.log('Engenheiros:', engenheiros)
console.log('Média salarial: R$', mediaSalarial.toFixed(2))

// localStorage com JSON (só no navegador)
// localStorage.setItem('usuario', JSON.stringify({ id: 1, nome: 'Alice' }))
// const salvo = JSON.parse(localStorage.getItem('usuario') ?? 'null')

// Configuração com JSON
const configPadrao = {
  tema: 'claro',
  idioma: 'pt-BR',
  notificacoes: {
    email: true,
    push: false,
  },
  atualizadoEm: null,
}

// Mesclar configuração do usuário com os padrões
const configUsuario = { tema: 'escuro', notificacoes: { push: true } }
const configFinal = {
  ...configPadrao,
  ...configUsuario,
  notificacoes: {
    ...configPadrao.notificacoes,
    ...configUsuario.notificacoes,
  },
  atualizadoEm: new Date().toISOString(),
}
console.log('\nConfig final:', JSON.stringify(configFinal, null, 2))

// ══════════════════════════════════════════════════
// 6. VALIDAÇÃO DE SCHEMA JSON (manual)
// ══════════════════════════════════════════════════

console.log('\n--- 6. Validação Manual ---')

function validarUsuario(dados) {
  const erros = []

  if (typeof dados.nome !== 'string' || dados.nome.trim().length < 2) {
    erros.push('nome: deve ser uma string com pelo menos 2 caracteres')
  }
  if (typeof dados.email !== 'string' || !dados.email.includes('@')) {
    erros.push('email: deve ser um e-mail válido')
  }
  if (!Number.isInteger(dados.idade) || dados.idade < 0 || dados.idade > 150) {
    erros.push('idade: deve ser um número inteiro entre 0 e 150')
  }

  return erros.length === 0
    ? { valido: true }
    : { valido: false, erros }
}

console.log(validarUsuario({ nome: 'Ana', email: 'ana@ex.com', idade: 25 }))
console.log(validarUsuario({ nome: 'A', email: 'invalido', idade: -5 }))

// ══════════════════════════════════════════════════
// 7. EXERCÍCIOS
// ══════════════════════════════════════════════════

console.log('\n--- 7. Exercícios ---')

/**
 * EXERCÍCIO 1:
 * Dado o JSON de usuários abaixo, filtre usuários ativos,
 * ordene por pontuação (descendente) e retorne apenas nome e pontuação.
 */
const jsonUsuarios = `[
  {"id":1,"nome":"Alice","ativo":true,"pontuacao":95},
  {"id":2,"nome":"Bob","ativo":false,"pontuacao":88},
  {"id":3,"nome":"Carol","ativo":true,"pontuacao":100},
  {"id":4,"nome":"Dave","ativo":true,"pontuacao":72},
  {"id":5,"nome":"Eve","ativo":false,"pontuacao":91}
]`

function top3Ativos(jsonStr) {
  // TODO: implementar
  // Resultado esperado: [{ nome: 'Carol', pontuacao: 100 }, { nome: 'Alice', pontuacao: 95 }, { nome: 'Dave', pontuacao: 72 }]
}

/**
 * EXERCÍCIO 2:
 * Serialize o objeto abaixo para JSON ocultando campos
 * que começam com _ (underscore – convenção de privado).
 */
const objetoComPrivados = {
  id: 42,
  nome: 'Produto X',
  preco: 99.90,
  _hashInterno: 'abc123',
  _versao: 2,
  ativo: true,
}

function serializarSemPrivados(obj) {
  // TODO: usar replacer de JSON.stringify
}

/**
 * EXERCÍCIO 3:
 * Implemente `mesclaProfunda(obj1, obj2)` que mescla dois objetos,
 * incluindo propriedades aninhadas (sem perder campos de obj1 não sobrescritos).
 */
function mesclaProfunda(obj1, obj2) {
  // TODO: implementar
}

// Gabarito:
/*
function top3Ativos(jsonStr) {
  return JSON.parse(jsonStr)
    .filter(u => u.ativo)
    .sort((a, b) => b.pontuacao - a.pontuacao)
    .map(({ nome, pontuacao }) => ({ nome, pontuacao }))
}

function serializarSemPrivados(obj) {
  return JSON.stringify(obj, (chave, valor) => {
    if (chave.startsWith('_')) return undefined
    return valor
  }, 2)
}

function mesclaProfunda(obj1, obj2) {
  const resultado = { ...obj1 }
  for (const [chave, valor] of Object.entries(obj2)) {
    if (valor && typeof valor === 'object' && !Array.isArray(valor)) {
      resultado[chave] = mesclaProfunda(obj1[chave] ?? {}, valor)
    } else {
      resultado[chave] = valor
    }
  }
  return resultado
}
*/

console.log('\n✅ Prática 03 concluída!')
