import { cursos } from './data.js'

const catalogo = document.querySelector('#catalogo')

catalogo.innerHTML = cursos
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