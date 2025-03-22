import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadTask, addTaskMsg } from '../store/task.actions'


export function TaskDetails({ task, onRemoveTask, onStartTaskWorker }) {

  // const { taskId } = useParams()
  // const task = useSelector(storeState => storeState.taskModule.task)
  const isWorkerRunning = useSelector(storeState => storeState.taskModule.isWorkerRunning)


  // useEffect(() => {
  //   loadTask(taskId)
  // }, [taskId])

  async function onAddTaskMsg(taskId) {
    try {
      await addTaskMsg(taskId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Task msg added`)
    } catch (err) {
      showErrorMsg('Cannot add task msg')
    }

  }

  return <tr key={task._id}>
    <td>{task.title}</td>
    <td>{task.importance}</td>
    <td>{task.status}</td>
    <td>{task.triesCount}</td>
    {!isWorkerRunning && (
      <td>
        {task.status === 'done' && <button onClick={() => onRemoveTask(task._id)}> Remove</button>}
        {task.status === 'failed' && <button onClick={() => onStartTaskWorker(task)}>Retry</button>}
        {task.status === 'new' && <button onClick={() => onStartTaskWorker(task)}>Start</button>}
      </td>
    )}
  </tr>
}

