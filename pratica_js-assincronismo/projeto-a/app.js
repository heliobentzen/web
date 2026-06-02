const form = document.querySelector('#search-form')
const userIdInput = document.querySelector('#user-id')
const status = document.querySelector('#status')
const taskList = document.querySelector('#task-list')

function renderTasks(tasks) {
    taskList.innerHTML = ''

    tasks.forEach((task) => {
        const item = document.createElement('li')
        item.innerHTML = `
      <strong>${task.title}</strong>
      <div class="${task.completed ? 'done' : ''}">
        ${task.completed ? 'Concluída' : 'Pendente'}
      </div>
    `
        taskList.appendChild(item)
    })
}

async function loadTasks(userId) {
    status.textContent = 'Carregando tarefas...'
    taskList.innerHTML = ''

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()
        renderTasks(data.slice(0, 5))
        status.textContent = `Foram carregadas ${Math.min(data.length, 5)} tarefas.`
    } catch (error) {
        status.textContent = `Erro ao carregar tarefas: ${error.message}`
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    loadTasks(userIdInput.value)
})

loadTasks(userIdInput.value)