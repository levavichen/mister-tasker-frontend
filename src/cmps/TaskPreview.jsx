import { Link } from 'react-router-dom'

export function TaskPreview({ task }) {
    return (
        <article className="preview">
            <header>
                <Link to={`/task/${task._id}`}>{task.title}</Link>
            </header>

            {/* <p>Speed: <span>{task.speed.toLocaleString()} Km/h</span></p>
            {task.owner && <p>Owner: <Link to={`/user/${task.owner._id}`}>{task.owner.fullname}</Link></p>} */}

        </article>
    )
}