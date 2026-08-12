# Prática 01 – DevTools Guiado

Use DevTools para debugar e analisar uma página web real.

## Exercício 1: Inspecionar e Editar Elementos

1. Abra qualquer página (ex: wikipedia.org)
2. Pressione **F12** para abrir DevTools
3. Vá para aba **Elements**
4. Clique direito em um parágrafo → "Inspecionar"
5. Duplo clique no texto do parágrafo para editar
6. Mude um título e veja a mudança na página (nota: é temporário!)

## Exercício 2: Debugar CSS

1. Selecione um elemento no Inspector
2. Vá para aba **Styles** (painel direito)
3. Localize uma regra CSS
4. Altere valores (cor, tamanho, margem)
5. Desmaque propriedades para ver o efeito

## Exercício 3: Console - Executar JavaScript

```javascript
// Teste estes comandos no Console (F12 → Console tab):

// Contar elementos
document.querySelectorAll('p').length

// Mudar background da página
document.body.style.background = 'blue'

// Encontrar todos os links
document.querySelectorAll('a').forEach(a => console.log(a.href))

// Listar todos os event listeners de um elemento
getEventListeners(document.querySelector('h1'))
```

## Exercício 4: Network - Monitorar Requisições HTTP

1. Abra DevTools → aba **Network**
2. Recarregue a página (F5)
3. Veja as requisições listadas:
   - Nome do arquivo/API
   - Tipo (xhr, fetch, image, script, etc)
   - Status (200, 404, 500)
   - Tempo de resposta
4. Clique em um request para ver headers e resposta

## Exercício 5: Performance - Medir Velocidade

1. DevTools → aba **Performance**
2. Clique em **Record** (círculo)
3. Interaja com a página (scroll, clicks)
4. Clique em **Stop**
5. Analise o Timeline:
   - Quando elementos são renderizados
   - Quanto tempo cada operação demora
   - Gargalos de performance

## Exercício 6: Lighthouse - Auditoria Automática

1. DevTools → aba **Lighthouse**
2. Selecione categorias (Performance, Accessibility, Best Practices)
3. Clique **Analyze page load**
4. Veja recomendações para melhorar

## Dicas Avançadas

```javascript
// Console Commands úteis:

// $0 = elemento selecionado no Inspector
$0.textContent

// $$ = querySelectorAll
$$('p').length

// copy() = copiar para clipboard
copy(document.body.innerHTML)

// monitorar função
monitor(fetch)

// desmonitorar
unmonitor(fetch)

// medir tempo
console.time('teste')
// ... código ...
console.timeEnd('teste')
```
