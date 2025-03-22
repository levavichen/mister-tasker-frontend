import { httpService } from '../http.service'

export const taskService = {
    query,
    getById,
    save,
    remove,
    addTaskMsg,
    start,
    toggleWorker
}

async function query(filterBy = { txt: '' }) {
    console.log('filter by:', filterBy)
    return httpService.get(`task`, filterBy)
}

function getById(taskId) {
    return httpService.get(`task/${taskId}`)
}

async function remove(taskId) {
    return httpService.delete(`task/${taskId}`)
}

async function save(task) {
    var savedTask
    if (task._id) {
        savedTask = await httpService.put(`task/${task._id}`, task)
    } else {
        savedTask = await httpService.post('task', task)
    }
    return savedTask
}

async function start(task) {
    const startedTask = await httpService.post(`task/${task._id}/start`)
    return startedTask
}

async function toggleWorker(isWorkerRunning) {
    console.log('isWorkerRunning', isWorkerRunning)
    return httpService.post('task/worker/toggle', { isWorkerRunning })
}

async function addTaskMsg(taskId, txt) {
    const savedMsg = await httpService.post(`task/${taskId}/msg`, { txt })
    return savedMsg
}