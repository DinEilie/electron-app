import TaskType from './TaskType'
type APIType = {
  sortByCreate: (tasks: TaskType[]) => Promise<TaskType[]>
  sortByDelete: (tasks: TaskType[]) => Promise<TaskType[]>
  sortByComplete: (tasks: TaskType[]) => Promise<TaskType[]>
  addTask: (tasks: TaskType[], title: string) => Promise<TaskType[]>
  deleteTask: (tasks: TaskType[], index: number) => Promise<TaskType[]>
  completeTask: (tasks: TaskType[], index: number) => Promise<TaskType[]>
}

export default APIType
