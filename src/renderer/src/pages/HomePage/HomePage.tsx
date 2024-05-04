import { useEffect, useRef, useState } from 'react'
import TaskType from '../../types/TaskType'
import { TasksSchema } from '@renderer/types/TaskSchema'
import Task from './components/Task'
import Navbar from '../../shared/Navbar'
import APIType from '../../types/APIType'

export default function HomePage() {
  const windowAPI = window.api as APIType
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const inputField = useRef<HTMLInputElement>(null)

  // Tasks functions through Electron API
  async function addTask() {
    if (inputField.current && inputField.current.value) {
      const newTasks: TaskType[] = await windowAPI.addTask(tasks, inputField.current.value)
      if (TasksSchema.safeParse(newTasks).success) setTasks(newTasks)
      inputField.current.focus()
      inputField.current.value = ''
    }
  }
  async function deleteTask(index: number) {
    const newTasks = await windowAPI.deleteTask(tasks, index)
    if (TasksSchema.safeParse(newTasks).success) setTasks(newTasks)
  }
  async function completeTask(index: number) {
    const newTasks: TaskType[] = await windowAPI.completeTask(tasks, index)
    if (TasksSchema.safeParse(newTasks).success) setTasks(newTasks)
  }

  // On mounting load tasks from localStorage
  useEffect(() => {
    const tasks = localStorage.getItem('tasks')
    if (tasks) {
      setTasks(JSON.parse(tasks))
    }
  }, [])

  useEffect(() => {
    // Update the current index
    let newCurrentIndex = tasks.findIndex((t) => t.isCompleted === false && t.isDeleted === false)
    if (newCurrentIndex === -1) newCurrentIndex = 0
    setCurrentIndex(newCurrentIndex)

    // Update localStorage
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  return (
    <main className="w-5/6 mx-auto relative top-10">
      <Navbar />
      <h1 className="text-4xl font-bold">Tasks list</h1>
      <p className="text-2xl my-2">Add tasks to your liking.</p>
      <div className="bg-slate-300 rounded-3xl focus-within:ring-2 focus-within:ring-orange-400">
        <input
          className="w-5/6 px-5 py-2 focus:outline-none placeholder:text-zinc-500 placeholder:font-medium bg-slate-300 rounded-s-3xl"
          type="text"
          id="task_input"
          name="task_input"
          placeholder="Add a new task"
          autoComplete="off"
          ref={inputField}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask()
            }
          }}
        />
        <button
          className="w-1/6 rounded-3xl py-2 bg-red-500 text-gray-100 text-lg"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ul className="mt-5">
        {tasks.map((task, index) =>
          !task.isCompleted && !task.isDeleted ? (
            <li key={`${index}_${task.id}`}>
              <Task
                task={task}
                colored={index % 2 === 1}
                disabled={index !== currentIndex}
                handleTaskCompletion={() => completeTask(index)}
                deleteTask={() => deleteTask(index)}
              />
              <hr />
            </li>
          ) : (
            <></>
          )
        )}
      </ul>
    </main>
  )
}
