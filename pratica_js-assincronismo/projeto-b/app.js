import { fetchTasksByUser } from './api.js'

const form = document.querySelector('#search-form')
const userIdInput = document.querySelector('#user-id')
const status = document.querySelector('#status')
const taskList = document.querySelector('#task-list')

function renderEmpty() {
    taskList.innerHTML = '<li>Nenhuma tarefa encontrada.</li>'
}

function renderTasks(tasks) {
    if (tasks.length === 0) {
        renderEmpty()
        return
    }

    taskList.innerHTML = tasks
        .map(
            (task) => `
        <li>
          <strong>${task.title}</strong>
          <div class="task-meta ${task.completed ? 'done' : 'pending'}">
            ${task.completed ? 'Concluída' : 'Pendente'}
          </div>
        </li>
      `,
        )
        .join('')
}

function setStatus(message) {
    status.textContent = message
}

async function handleLoadTasks(userId) {
    setStatus('Carregando tarefas...')
    taskList.innerHTML = ''

    try {
        const tasks = await fetchTasksByUser(userId)
        renderTasks(tasks)
        setStatus(`Consulta finalizada com ${tasks.length} tarefas.`)
    } catch (error) {
        setStatus(error.message)
        renderEmpty()
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    handleLoadTasks(userIdInput.value)
})

handleLoadTasks(userIdInput.value)