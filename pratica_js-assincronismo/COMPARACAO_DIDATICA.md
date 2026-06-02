# Comparação Didática

## Objetivo da Comparação

Comparar uma implementação mais direta com uma versão mais modular para identificar impactos na leitura, na manutenção e na evolução do código.

## Projeto A

- Leitura inicial mais imediata
- Menor quantidade de arquivos
- Mistura interface, estado e acesso a dados no mesmo fluxo
- Tende a escalar pior quando novas regras aparecem

## Projeto B

- Separa melhor busca de dados e renderização
- Estrutura mais previsível para evolução
- Exige mais familiaridade com módulos e organização por responsabilidade
- Facilita manutenção, testes e refatoração

## Discussão em Sala

Use esta comparação para discutir o custo de escrever rápido em relação ao custo de manter e evoluir o sistema depois.
