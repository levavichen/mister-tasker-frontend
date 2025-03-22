import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { loadTasks, addTask, updateTask, removeTask, addTaskMsg, startTaskWorker, toggleIsWorkerRunning } from '../store/task.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { taskService } from '../services/task/'
import { userService } from '../services/user'

import { TaskList } from '../cmps/TaskList'
import { TaskFilter } from '../cmps/TaskFilter'

import { socketService, SOCKET_EVENT_TASK_UPDATED } from '../services/socket.service'

export function TaskIndex() {

    const [filterBy, setFilterBy] = useState(taskService.getDefaultFilter())
    const tasks = useSelector(storeState => storeState.taskModule.tasks)
    const isWorkerRunning = useSelector(storeState => storeState.taskModule.isWorkerRunning)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     loadTasks(filterBy)
    // }, [filterBy])

    useEffect(() => {
        loadTasks()
    }, [])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_TASK_UPDATED, handleTaskUpdate)
        return () => {
            socketService.off(SOCKET_EVENT_TASK_UPDATED, handleTaskUpdate)
        }
    }, [])

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function handleTaskUpdate(updatedTask) {
        const idx = tasks.findIndex(task => task._id === updatedTask._id)
        console.log('idx', idx)

        if (idx === -1) {
            dispatch({
                type: "ADD_TASK",
                task: updatedTask
            })
        } else {
            dispatch({
                type: "UPDATE_TASK",
                task: updatedTask
            })
        }
    }

    async function onRemoveTask(taskId) {
        try {
            await removeTask(taskId)
            showSuccessMsg('Task removed')
        } catch (err) {
            showErrorMsg('Cannot remove task')
        }
    }

    async function onAddTask() {
        const task = taskService.getEmptyTask()
        task.title = prompt('title?')
        task.importance = prompt('importance?')
        try {
            const savedTask = await addTask(task)
            showSuccessMsg(`Task added (id: ${savedTask._id})`)
        } catch (err) {
            showErrorMsg('Cannot add task')
        }
    }

    // async function onUpdateTask(task) {
    //     const speed = +prompt('New speed?', task.speed)
    //     if (!speed) return
    //     const taskToSave = { ...task, speed }
    //     try {
    //         const savedTask = await updateTask(taskToSave)
    //         showSuccessMsg(`Task updated, new speed: ${savedTask.speed}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update task')
    //     }
    // }

    async function onStartTaskWorker(task) {
        // dispatch(toggleIsWorkerRunning())

        const taskToSave = { ...task, status: 'running' }
        try {
            const updatedTask = await updateTask(taskToSave)
            const startedTask = await startTaskWorker(updatedTask)

            showSuccessMsg(`Task updated, new status is: ${startedTask.status}`)
        } catch (err) {
            showErrorMsg('Cannot update task')
        }
    }

    async function onToggleWorker() {
        const currIsWorkerRunning = !isWorkerRunning
        try {
            await taskService.toggleWorker(currIsWorkerRunning)
            dispatch(toggleIsWorkerRunning())
        } catch (err) {
            showErrorMsg('Error toggeling worker')
        }
    }

    return (
        <main className="task-index">
            <header>
                <h2>Mister Tasker</h2>
                {/* {userService.getLoggedinUser() && <button onClick={onAddTask}>Add a Task</button>} */}
            </header>
            <section className='actions'>
                {/* <button>Generate Tasks</button> */}
                {/* <button>Clear Tasks</button> */}
                <button onClick={onAddTask}>Create new task</button>
                <button onClick={onToggleWorker}>
                    {isWorkerRunning ? 'Stop task worker' : 'Start task worker'}
                </button>
            </section>
            {/* <TaskFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
            <TaskList
                tasks={tasks}
                onRemoveTask={onRemoveTask}
                onStartTaskWorker={onStartTaskWorker} />
        </main>
    )
}