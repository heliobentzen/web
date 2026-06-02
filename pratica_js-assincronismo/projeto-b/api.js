const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function fetchTasksByUser(userId) {
    const response = await fetch(`${BASE_URL}/todos?userId=${userId}`)

    if (!response.ok) {
        throw new Error(`Falha na consulta: HTTP ${response.status}`)
    }

    const tasks = await response.json()
    return tasks.slice(0, 5)
}