import Navbar from '@renderer/shared/Navbar'
import TaskType from '@renderer/types/TaskType'
import { TasksSchema } from '@renderer/types/TaskSchema'
import { useEffect, useState } from 'react'
import TaskTable from './components/TaskTable'
import APIType from '@renderer/types/APIType'

export default function ResultsPage() {
  const windowAPI = window.api as APIType
  const [addedTasks, setAddedTasks] = useState<TaskType[]>([])
  const [deletedTasks, setDeletedTasks] = useState<TaskType[]>([])
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([])

  // Fetch sorted set of tasks
  async function setTasks(tasks: TaskType[]) {
    const newAddedTasks = await windowAPI.sortByCreate(tasks)
    const newDeletedTasks = await windowAPI.sortByDelete(tasks)
    const newCompletedTasks = await windowAPI.sortByComplete(tasks)
    if (TasksSchema.safeParse(newAddedTasks).success) setAddedTasks(newAddedTasks)
    if (TasksSchema.safeParse(newDeletedTasks).success) setDeletedTasks(newDeletedTasks)
    if (TasksSchema.safeParse(newCompletedTasks).success) setCompletedTasks(newCompletedTasks)
  }

  // On mounting load tasks from localStorage
  useEffect(() => {
    const tasks = localStorage.getItem('tasks')
    if (tasks) {
      setTasks(JSON.parse(tasks))
    }
  }, [])

  return (
    <main className="w-5/6 mx-auto relative top-10">
      <Navbar />
      <h1 className="text-4xl font-bold">Results</h1>
      <p className="text-2xl my-2">Tasks results timeline.</p>
      <div className="flex gap-5">
        <TaskTable type="A" tasks={addedTasks} />
        <TaskTable type="D" tasks={deletedTasks} />
      </div>
      <TaskTable type="C" tasks={completedTasks} />
    </main>
  )
}
