# Padrão do material didático

Este documento descreve como cada módulo da disciplina é organizado. Use-o como
referência ao revisar um módulo existente ou ao criar um novo.

## Estrutura de pastas

```text
modulos/NN-nome-do-modulo/
├── README.md      apostila: o texto de estudo do aluno
├── slides.md      deck Marp para a aula expositiva (opcional)
└── praticas/      exercícios executáveis, numerados em ordem crescente
```

Regras:

- `README.md` é a fonte de verdade. O aluno consegue estudar o módulo inteiro só por ele.
- `slides.md` é o recorte da aula, não uma cópia da apostila. Ele resume; a apostila explica.
- Cada arquivo em `praticas/` recebe um número único. Não existem dois `02-` na mesma pasta.
- Todo arquivo de prática precisa estar listado na seção "Práticas" do `README.md`.

## Seções obrigatórias do `README.md`

Nesta ordem:

1. **Título** — `# Módulo NN — Nome`
2. **Cartão de identificação** — tabela com carga horária, pré-requisito, prática integrada e slides
3. **Objetivos de aprendizagem** — lista numerada com verbos observáveis ("explicar", "construir", "depurar"). Evite "entender" e "conhecer": não dá para avaliar.
4. **Roteiro** — mapa da sequência do módulo, para o aluno se localizar
5. **Conteúdo** — seções numeradas (`## 1.`, `## 2.` …), em ordem de dependência
6. **Erros comuns** — tabela sintoma → causa → correção
7. **Checklist de autoavaliação** — caixas marcáveis, uma por objetivo de aprendizagem
8. **Práticas** — tabela ligando cada arquivo de `praticas/` a um objetivo
9. **Exercícios** — três níveis: fixação, aplicação e desafio
10. **Referências** — links vivos, priorizando MDN, especificações e web.dev
11. **Navegação** — linha final com módulo anterior, índice e próximo módulo

## Como escrever uma seção de conteúdo

Cada seção segue o mesmo ritmo, do concreto para o abstrato:

1. **Uma frase** dizendo para que serve o conceito e que problema ele resolve.
2. **Exemplo mínimo** que roda sem preparação.
3. **Exemplo evoluído**, acrescentando uma preocupação real de cada vez (validação,
   erro, acessibilidade, performance).
4. **Bloco "Experimente"** — instrução curta de modificação, para o aluno mexer no código
   antes de seguir adiante.

Nunca introduza um conceito que dependa de algo ainda não apresentado. Se precisar
antecipar, cite o módulo em que o assunto será aprofundado e use a forma mais simples possível.

## Convenções de código

- HTML sempre com `lang="pt-BR"`, `charset` e `viewport`.
- CSS com `box-sizing: border-box` no reset e unidades relativas (`rem`, `%`, `clamp()`).
- JavaScript moderno: `const` por padrão, `async/await` em vez de cadeias de `.then()`,
  sem `var` e sem `innerHTML` com dados vindos do usuário ou de API.
- Nomes de variáveis, funções e comentários em português; palavras-chave da linguagem
  em inglês, como a linguagem exige.
- Todo exemplo é executável. Nada de pseudocódigo apresentado como código real.
