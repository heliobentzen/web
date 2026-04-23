# Prática 02 – Inspecionando o Navegador (Básico)

Abra o DevTools com **F12** e explore:

## Exercício 1: Inspector

1. Vá para aba **Elements**
2. Clique em "Inspecionar elemento" (Ctrl+Shift+C)
3. Aponte para títulos, parágrafos, links da página
4. Veja o HTML gerado

## Exercício 2: Console

1. Vá para aba **Console**
2. Digite comandos e veja o resultado:

```javascript
document.title              // nome da página
document.body.innerHTML    // HTML do body
document.querySelectorAll('p')  // todos os parágrafos
```

## Exercício 3: Network

1. Vá para aba **Network**
2. Recarregue a página (F5)
3. Veja as requisições HTTP listadas
4. Clique em cada um para ver headers e resposta
