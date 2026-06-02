import { cursos, renderCatalogo } from './catalogo.js'
import './styles.css'

const catalogo = document.querySelector('#catalogo')

catalogo.innerHTML = renderCatalogo(cursos)