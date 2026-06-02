export const cursos = [
    { titulo: 'Node.js e NPM', cargaHoraria: '4h', nivel: 'Inicial' },
    { titulo: 'Módulos ES', cargaHoraria: '6h', nivel: 'Inicial' },
    { titulo: 'Vite para projetos front-end', cargaHoraria: '8h', nivel: 'Intermediário' },
]

export function renderCatalogo(items) {
    return items
        .map(
            (curso) => `
        <article class="card">
          <h2>${curso.titulo}</h2>
          <p>Carga horária: ${curso.cargaHoraria}</p>
          <p>Nível: ${curso.nivel}</p>
        </article>
      `,
        )
        .join('')
}