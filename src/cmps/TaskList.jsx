import { userService } from '../services/user'
import { TaskDetails } from './TaskDetails'

export function TaskList({ tasks, onRemoveTask, onStartTaskWorker }) {

    return <section>
        <table className='table'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Importance</th>
                    <th>Status</th>
                    <th>Tries Count</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task =>
                    <TaskDetails
                        task={task}
                        onRemoveTask={onRemoveTask}
                        onStartTaskWorker={onStartTaskWorker}
                    />
                )}
            </tbody>
        </table>
    </section >
}