import TaskType from '@renderer/types/TaskType'

type TaskTableProps = {
  type: 'A' | 'D' | 'C'
  tasks: TaskType[]
}
export default function TaskTable(props: TaskTableProps) {
  return (
    <div className={`mt-5 ${props.type !== 'C' ? 'w-1/2' : 'w-full'}`}>
      <h1 className="text-2xl font-bold">
        {props.type === 'C' ? 'Completed' : props.type === 'D' ? 'Deleted' : 'Added'}
      </h1>
      <ul className={`${props.type === 'C' ? 'h-52' : 'h-40'} overflow-y-auto`}>
        {props.tasks.map((task, index) => (
          <li
            key={`${props.type}_${index}_${props.type === 'C' ? task.completed_at : props.type === 'D' ? task.deleted_at : task.created_at}_${task.id}`}
          >
            <div className={`flex p-2 justify-between items-center hover:bg-red-50`}>
              <span>
                {props.type === 'C'
                  ? task.completed_at
                  : props.type === 'D'
                    ? task.deleted_at
                    : task.created_at}
              </span>
              <span>{task.title}</span>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}
