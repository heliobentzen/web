# Tema Marp da disciplina

Todos os arquivos `slides.md` desta disciplina usam o mesmo front matter, para que
os decks tenham identidade visual única. Ao criar um novo deck, copie o bloco
abaixo integralmente e altere apenas o título da capa.

## Como usar

1. Instale a extensão [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode).
2. Abra o `slides.md` do módulo e use *Marp: Export Slide Deck* para gerar PDF ou HTML.
3. Pela linha de comando: `npx @marp-team/marp-cli@latest modulos/02-html-semantico/slides.md --pdf`.

O caminho do logo é relativo ao arquivo do deck. Como todo `slides.md` fica em
`modulos/NN-nome/`, o caminho correto é sempre `../../assets/ifpe-logo.svg`.

## Front matter padrão

```yaml
---
marp: true
theme: default
size: 16:9
paginate: true
footer: 'Desenvolvimento Web · ADS · IFPE'
style: |
  section {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: #ffffff;
    color: #1f2937;
    font-size: 28px;
    line-height: 1.35;
    padding: 56px 64px;
  }
  footer {
    color: #666;
    font-size: 0.52em;
    border-top: 2px solid #0f7a3f;
    padding-top: 4px;
  }
  h1 {
    color: #0b5f31;
    font-size: 1.7em;
    border-bottom: 3px solid #df2b2f;
    padding-bottom: 6px;
    margin-bottom: 0.4em;
  }
  h2 { color: #0b5f31; font-size: 1.2em; margin-bottom: 0.3em; }
  h3 { font-size: 1em; margin-bottom: 0.2em; }
  ul, ol { margin-top: 0.3em; }
  li { margin: 0.22em 0; }
  strong { color: #df2b2f; }
  em { color: #0f7a3f; font-style: normal; }
  table { font-size: 0.72em; border-collapse: collapse; width: 100%; }
  th { background: #0f7a3f; color: #fff; padding: 6px 8px; }
  td { border: 1px solid #ddd; padding: 5px 8px; background: #fafafa; }
  code { background: #f0f0f0; color: #b91c1c; padding: 1px 5px; border-radius: 4px; font-size: 0.9em; }
  pre { background: #f7f7f7 !important; border-radius: 8px; border: 1px solid #ddd; padding: 12px; margin: 0.4em 0; }
  pre code { color: #333; background: none; font-size: 0.8em; line-height: 1.25; }
  blockquote { border-left: 4px solid #0f7a3f; background: #f0faf0; padding: 8px 14px; border-radius: 0 8px 8px 0; color: #333; }
  a { color: #0f7a3f; }
  section::after { color: #999; font-size: 0.65em; }
  .card { background: #fff; border: 2px solid #b7e4c7; border-radius: 14px; padding: 14px 18px; margin: 8px 0; }
  .pill { display: inline-block; margin: 4px 6px 4px 0; padding: 4px 10px; border-radius: 999px; border: 1px solid #95d5b2; background: #ecfdf3; color: #166534; font-size: 0.8em; }
  .ok { color: #0f766e; font-weight: 700; }
  .bad { color: #b91c1c; font-weight: 700; }
  section.capa { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
  section.capa h1 { border: none; font-size: 1.55em; margin-bottom: 0.15em; }
  section.capa h2 { margin-top: 0; }
---
```

## Slide de capa padrão

```markdown
<!-- _class: capa -->
<!-- _paginate: false -->
<!-- _footer: '' -->

![w:220](../../assets/ifpe-logo.svg)

# Desenvolvimento Web

## Módulo NN · Título do Módulo

**Prof. Hélio Bentzen**
IFPE · Análise e Desenvolvimento de Sistemas
```

## Cores institucionais

| Uso | Cor |
| --- | --- |
| Verde principal | `#0b5f31` |
| Verde claro (destaques) | `#0f7a3f` |
| Vermelho (ênfase) | `#df2b2f` |
| Texto | `#1f2937` |
