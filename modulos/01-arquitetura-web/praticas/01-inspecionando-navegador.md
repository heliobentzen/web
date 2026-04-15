# Prática 01 – Inspecionando o Navegador

**Módulo:** 01 – Arquitetura da Web  
**Duração estimada:** 30 minutos  
**Ferramentas:** Chrome, Firefox ou Edge (qualquer navegador moderno)

---

## Objetivo

Usar o DevTools do navegador para observar em tempo real o processo de carregamento de uma página: requisições HTTP, headers, tamanhos e tempo de resposta.

---

## Parte 1 – Observando Requisições HTTP

1. Abra uma nova aba no navegador
2. Pressione **F12** (ou `Ctrl+Shift+I` / `Cmd+Option+I` no Mac) para abrir o DevTools
3. Clique na aba **Network**
4. Marque a opção **Preserve log** (para não perder os logs ao navegar)
5. Acesse `https://example.com`
6. Observe as requisições que aparecem na lista

### Perguntas para responder:

- Quantas requisições foram feitas?
- Qual o código de status da requisição principal?
- Qual o tamanho total transferido?
- Quanto tempo levou para carregar?

---

## Parte 2 – Analisando Headers HTTP

1. Clique na primeira requisição da lista (geralmente `example.com` ou `www.example.com`)
2. Clique na aba **Headers** (dentro do painel de detalhes da requisição)
3. Observe:

### Request Headers (o que o navegador envia)

```
GET / HTTP/2
Host: example.com
User-Agent: Mozilla/5.0 ...
Accept: text/html,application/xhtml+xml,...
Accept-Language: pt-BR,pt;q=0.9
```

| Header | Significado |
|--------|-------------|
| `Host` | Domínio solicitado |
| `User-Agent` | Identificação do navegador |
| `Accept` | Tipos de conteúdo aceitos |
| `Accept-Language` | Idiomas preferidos |
| `Cookie` | Cookies enviados ao servidor |

### Response Headers (o que o servidor retorna)

```
HTTP/2 200
content-type: text/html; charset=UTF-8
cache-control: max-age=86400
```

| Header | Significado |
|--------|-------------|
| `content-type` | Tipo de conteúdo retornado |
| `cache-control` | Política de cache |
| `content-encoding` | Compressão usada (gzip, br) |
| `strict-transport-security` | Forçar HTTPS |

---

## Parte 3 – Timing de uma Requisição

1. Clique em uma requisição
2. Vá na aba **Timing**
3. Observe as fases:

| Fase | O que representa |
|------|-----------------|
| **Queueing** | Aguardando fila de conexões |
| **DNS Lookup** | Resolução do domínio |
| **Initial connection** | TCP handshake |
| **SSL** | TLS handshake |
| **Waiting (TTFB)** | Time to First Byte – tempo até o servidor começar a responder |
| **Content Download** | Tempo de download do conteúdo |

> 📌 **TTFB** (Time to First Byte) é um indicador importante de performance do servidor.

---

## Parte 4 – Simulando Conexão Lenta

1. Na aba **Network**, localize o seletor de throttling (geralmente mostra "No throttling")
2. Selecione **Slow 3G**
3. Pressione `Ctrl+Shift+R` para recarregar sem cache
4. Observe como o carregamento muda

### Reflita:
- Quais recursos carregaram primeiro?
- Quais bloquearam a renderização?
- O que pode ser otimizado?

---

## Parte 5 – Inspecionando o DOM

1. Acesse `https://example.com`
2. Abra o DevTools e vá para a aba **Elements**
3. Observe a árvore HTML
4. Passe o mouse sobre os elementos na aba Elements e veja o destaque na página
5. Clique com o botão direito em algum texto na página e selecione **Inspecionar**
6. Modifique temporariamente o texto de um elemento:
   - Dê duplo clique no nó de texto
   - Digite algo diferente
   - Pressione Enter

> 💡 As mudanças no DevTools são **temporárias** e desaparecem ao recarregar a página. O DevTools edita o DOM em memória, não o arquivo fonte.

---

## Parte 6 – Console e o Objeto `window`

1. Abra o DevTools e vá para a aba **Console**
2. Digite os seguintes comandos e observe os resultados:

```javascript
// Dimensões da janela
window.innerWidth
window.innerHeight

// URL atual
window.location.href

// User Agent
navigator.userAgent

// Idioma configurado
navigator.language

// Cookies da página
document.cookie

// Título da página
document.title

// Todos os links da página
document.querySelectorAll('a').length
```

---

## Desafio

Acesse qualquer site de sua escolha e responda:

1. Quantas requisições são feitas no carregamento inicial?
2. Qual é o TTFB do documento principal?
3. Existe compressão gzip ou brotli nos responses?
4. O site usa HTTP/2 ou HTTP/3?
5. Quais cookies são definidos pelo servidor?

---

## Referências

- [DevTools Network Panel – Chrome Developers](https://developer.chrome.com/docs/devtools/network/)
- [HTTP Headers – MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers)
- [Timing breakdown phases explained](https://developer.chrome.com/docs/devtools/network/reference/#timing-explanation)
