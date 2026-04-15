/**
 * PRÁTICA 01 – Promises e async/await
 * Módulo 06 – Assincronismo em JavaScript
 *
 * Como executar: node 01-promises-async.js
 */

console.log('=== PRÁTICA 01: Promises e async/await ===\n')

// ══════════════════════════════════════════════════
// UTILITÁRIOS DE SIMULAÇÃO
// ══════════════════════════════════════════════════

// Simula uma operação assíncrona com delay
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Simula uma requisição que pode falhar
function simularRequisicao(url, { falharEm = null, delayMs = 300 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (falharEm && url.includes(falharEm)) {
        reject(new Error(`404 Not Found: ${url}`))
      } else {
        resolve({ url, dados: `Dados de ${url}`, timestamp: Date.now() })
      }
    }, delayMs)
  })
}

// ══════════════════════════════════════════════════
// 1. PROMISES: CRIAÇÃO E CONSUMO
// ══════════════════════════════════════════════════

console.log('--- 1. Criando e consumindo Promises ---\n')

function buscarUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuarios = {
        1: { id: 1, nome: 'Alice',  email: 'alice@ex.com',  admin: true  },
        2: { id: 2, nome: 'Bob',    email: 'bob@ex.com',    admin: false },
        3: { id: 3, nome: 'Carlos', email: 'carlos@ex.com', admin: false },
      }
      const usuario = usuarios[id]
      if (usuario) resolve(usuario)
      else reject(new Error(`Usuário ${id} não encontrado`))
    }, 200)
  })
}

// Cadeia de .then
buscarUsuario(1)
  .then(usuario => {
    console.log('Usuário encontrado:', usuario.nome)
    return usuario.email  // passa para o próximo .then
  })
  .then(email => {
    console.log('E-mail:', email)
  })
  .catch(erro => {
    console.error('Erro:', erro.message)
  })
  .finally(() => {
    console.log('Promise finalizada\n')
  })

// ══════════════════════════════════════════════════
// 2. ASYNC / AWAIT
// ══════════════════════════════════════════════════

console.log('--- 2. async/await ---\n')

async function carregarDados() {
  try {
    console.log('Buscando usuário 1...')
    const usuario = await buscarUsuario(1)
    console.log('Usuário:', usuario.nome, '(admin:', usuario.admin + ')')

    // Requisição condicional
    if (usuario.admin) {
      console.log('Usuário é admin, buscando dados extras...')
      await esperar(100) // simula busca adicional
      console.log('Dados extras carregados')
    }

    return usuario
  } catch (erro) {
    console.error('Erro em carregarDados:', erro.message)
    throw erro
  }
}

// Executar a função assíncrona
carregarDados().then(() => console.log('carregarDados() concluído\n'))

// ══════════════════════════════════════════════════
// 3. PROMISSE.ALL – EXECUÇÃO PARALELA
// ══════════════════════════════════════════════════

async function demonstrarParalelo() {
  console.log('--- 3. Promise.all – Paralelo ---\n')

  console.time('sequencial')
  // ❌ Sequencial: 600ms total
  const u1 = await buscarUsuario(1)
  const u2 = await buscarUsuario(2)
  const u3 = await buscarUsuario(3)
  console.timeEnd('sequencial')
  console.log('Sequencial:', [u1.nome, u2.nome, u3.nome])

  console.time('paralelo')
  // ✅ Paralelo: ~200ms total
  const [ua, ub, uc] = await Promise.all([
    buscarUsuario(1),
    buscarUsuario(2),
    buscarUsuario(3),
  ])
  console.timeEnd('paralelo')
  console.log('Paralelo:', [ua.nome, ub.nome, uc.nome])
  console.log()
}

// ══════════════════════════════════════════════════
// 4. PROMISE.ALLSETTLED
// ══════════════════════════════════════════════════

async function demonstrarAllSettled() {
  console.log('--- 4. Promise.allSettled – Nunca rejeita ---\n')

  const resultados = await Promise.allSettled([
    buscarUsuario(1),
    buscarUsuario(999),  // vai falhar
    buscarUsuario(3),
  ])

  resultados.forEach((resultado, i) => {
    if (resultado.status === 'fulfilled') {
      console.log(`✅ Usuário ${i + 1}: ${resultado.value.nome}`)
    } else {
      console.log(`❌ Usuário ${i + 1}: ${resultado.reason.message}`)
    }
  })

  const sucessos = resultados
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)
  console.log('Apenas sucessos:', sucessos.map(u => u.nome))
  console.log()
}

// ══════════════════════════════════════════════════
// 5. PROMISE.RACE – TIMEOUT
// ══════════════════════════════════════════════════

async function demonstrarRace() {
  console.log('--- 5. Promise.race – Timeout ---\n')

  function comTimeout(promise, ms, mensagem = 'Timeout') {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error(mensagem)), ms)
    )
    return Promise.race([promise, timeoutPromise])
  }

  // Requisição rápida (vai ganhar)
  try {
    const resultado = await comTimeout(
      simularRequisicao('/api/dados', { delayMs: 200 }),
      500,
      'Timeout de 500ms!'
    )
    console.log('✅ Resposta rápida:', resultado.url)
  } catch (e) {
    console.log('❌', e.message)
  }

  // Requisição lenta (vai perder pro timeout)
  try {
    const resultado = await comTimeout(
      simularRequisicao('/api/lento', { delayMs: 1000 }),
      500,
      'Timeout de 500ms!'
    )
    console.log('✅ Resposta lenta:', resultado.url)
  } catch (e) {
    console.log('❌', e.message)
  }
  console.log()
}

// ══════════════════════════════════════════════════
// 6. TRATAMENTO AVANÇADO DE ERROS
// ══════════════════════════════════════════════════

async function demonstrarErros() {
  console.log('--- 6. Tratamento de Erros ---\n')

  // Erros em Promise.all são propagados
  try {
    await Promise.all([
      buscarUsuario(1),
      buscarUsuario(999),  // rejeita!
      buscarUsuario(3),
    ])
  } catch (erro) {
    console.log('Promise.all falhou:', erro.message)
  }

  // Re-throw com contexto
  async function buscarComContexto(id) {
    try {
      return await buscarUsuario(id)
    } catch (erro) {
      throw Object.assign(
        new Error(`Falha ao buscar usuário ${id}: ${erro.message}`),
        { causa: erro, userId: id }
      )
    }
  }

  try {
    await buscarComContexto(999)
  } catch (erro) {
    console.log('Erro com contexto:', erro.message)
    console.log('userId:', erro.userId)
  }
  console.log()
}

// ══════════════════════════════════════════════════
// 7. PADRÃO: RETRY COM BACKOFF
// ══════════════════════════════════════════════════

async function demonstrarRetry() {
  console.log('--- 7. Retry com Backoff Exponencial ---\n')

  async function comRetry(fn, { tentativas = 3, delayBase = 100 } = {}) {
    let ultimoErro
    for (let i = 0; i < tentativas; i++) {
      try {
        const resultado = await fn()
        if (i > 0) console.log(`  ✅ Sucesso na tentativa ${i + 1}`)
        return resultado
      } catch (erro) {
        ultimoErro = erro
        const delay = delayBase * Math.pow(2, i) + Math.random() * 50
        console.log(`  ❌ Tentativa ${i + 1} falhou (aguardando ${delay.toFixed(0)}ms)...`)
        if (i < tentativas - 1) await esperar(delay)
      }
    }
    throw new Error(`Todas ${tentativas} tentativas falharam: ${ultimoErro.message}`)
  }

  let tentativaCont = 0
  async function apiInstavel() {
    tentativaCont++
    if (tentativaCont < 3) throw new Error('Erro temporário')
    return { dados: 'Sucesso após retries!' }
  }

  try {
    console.log('Chamando API instável...')
    tentativaCont = 0
    const result = await comRetry(apiInstavel, { tentativas: 5 })
    console.log('Resultado:', result.dados)
  } catch (e) {
    console.log('Falha definitiva:', e.message)
  }
  console.log()
}

// ══════════════════════════════════════════════════
// 8. GENERATORS ASSÍNCRONOS (async iterators)
// ══════════════════════════════════════════════════

async function demonstrarAsyncGenerator() {
  console.log('--- 8. Async Generators (for await...of) ---\n')

  // Simula paginação de API
  async function* paginarUsuarios(totalPaginas = 3) {
    for (let pagina = 1; pagina <= totalPaginas; pagina++) {
      await esperar(50)  // simula delay de rede
      yield {
        pagina,
        dados: Array.from({ length: 3 }, (_, i) => ({
          id: (pagina - 1) * 3 + i + 1,
          nome: `Usuário ${(pagina - 1) * 3 + i + 1}`,
        }))
      }
    }
  }

  // Consumir o async generator
  for await (const { pagina, dados } of paginarUsuarios(3)) {
    console.log(`Página ${pagina}:`, dados.map(u => u.nome).join(', '))
  }
  console.log()
}

// ══════════════════════════════════════════════════
// 9. EXERCÍCIOS
// ══════════════════════════════════════════════════

console.log('--- 9. Exercícios ---\n')

/**
 * EXERCÍCIO 1:
 * Implemente `buscarPerfilCompleto(userId)` que:
 * 1. Busca o usuário (use a função buscarUsuario acima)
 * 2. Simula buscar os pedidos do usuário em paralelo com as configurações
 * 3. Retorna { usuario, pedidos, configuracoes }
 */
async function buscarPerfilCompleto(userId) {
  // Simule: buscarPedidos e buscarConfiguracoes com esperar()
  // TODO: implementar
}

/**
 * EXERCÍCIO 2:
 * Implemente `executarEmLote(itens, fn, limite)` que executa
 * fn(item) para cada item, mas no máximo `limite` em paralelo.
 */
async function executarEmLote(itens, fn, limite = 3) {
  // TODO: implementar sem usar uma lib externa
  // Dica: processe em chunks de `limite` elementos
}

/**
 * EXERCÍCIO 3:
 * Implemente `debounceAsync(fn, ms)` – versão assíncrona do debounce
 * que cancela chamadas anteriores pendentes e retorna a última Promise.
 */
function debounceAsync(fn, ms) {
  // TODO: implementar
}

// Gabarito:
/*
async function buscarPerfilCompleto(userId) {
  const usuario = await buscarUsuario(userId)
  const [pedidos, configuracoes] = await Promise.all([
    esperar(150).then(() => [{ id: 1, produto: 'Notebook' }]),
    esperar(100).then(() => ({ tema: 'escuro', idioma: 'pt-BR' })),
  ])
  return { usuario, pedidos, configuracoes }
}

async function executarEmLote(itens, fn, limite = 3) {
  const resultados = []
  for (let i = 0; i < itens.length; i += limite) {
    const chunk = itens.slice(i, i + limite)
    const parcial = await Promise.all(chunk.map(fn))
    resultados.push(...parcial)
  }
  return resultados
}

function debounceAsync(fn, ms) {
  let timer, rejeicaoPendente
  return (...args) => new Promise((resolve, reject) => {
    if (rejeicaoPendente) rejeicaoPendente(new Error('Cancelado por nova chamada'))
    rejeicaoPendente = reject
    clearTimeout(timer)
    timer = setTimeout(async () => {
      try { resolve(await fn(...args)) }
      catch (e) { reject(e) }
      finally { rejeicaoPendente = null }
    }, ms)
  })
}
*/

// Executar as demonstrações em sequência
;(async () => {
  await esperar(300)  // aguardar as Promises anteriores iniciarem
  await demonstrarParalelo()
  await demonstrarAllSettled()
  await demonstrarRace()
  await demonstrarErros()
  await demonstrarRetry()
  await demonstrarAsyncGenerator()
  console.log('✅ Prática 01 concluída!')
})()
