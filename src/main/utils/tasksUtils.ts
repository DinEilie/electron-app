import { IpcMainInvokeEvent } from 'electron'
import TaskType from '../types/TaskType'

// Returns the dates differences
function dateDiff(a_date: string, b_date: string) {
  const date_a = new Date(a_date)
  const date_b = new Date(b_date)
  const timeDiff = date_a.getTime() - date_b.getTime()
  return timeDiff
}

// Returns an array of tasks sorted by creation date
async function sortByCreate(event: IpcMainInvokeEvent, tasks: TaskType[]) {
  console.log('Event: ' + event.frameId)
  return tasks.toSorted((a, b) => dateDiff(a.created_at, b.created_at)).reverse()
}

// Returns an array of tasks sorted by deletion date
async function sortByDelete(event: IpcMainInvokeEvent, tasks: TaskType[]) {
  console.log('Event: ' + event.frameId)
  const deletedTasks = tasks.filter((t) => t.isDeleted)
  return deletedTasks.toSorted((a, b) => dateDiff(a.deleted_at, b.deleted_at)).reverse()
}

// Returns an array of tasks sorted by completion date
async function sortByComplete(event: IpcMainInvokeEvent, tasks: TaskType[]) {
  console.log('Event: ' + event.frameId)
  const completedTasks = tasks.filter((t) => t.isCompleted && !t.isDeleted)
  return completedTasks.toSorted((a, b) => dateDiff(a.completed_at, b.completed_at)).reverse()
}

// Returns an array of tasks added by a new task
async function addTask(event: IpcMainInvokeEvent, tasks: TaskType[], title: string) {
  console.log('Event: ' + event.frameId)
  const newTask: TaskType = {
    id: Date.now(),
    created_at: new Date().toLocaleString(),
    completed_at: '',
    deleted_at: '',
    title: title,
    isCompleted: false,
    isDeleted: false
  }
  const newTasksArray = [...tasks, newTask]
  return newTasksArray
}

// Returns an array of tasks deleted by task index
async function deleteTask(event: IpcMainInvokeEvent, tasks: TaskType[], index: number) {
  console.log('Event: ' + event.frameId)
  let newTasks = [...tasks]
  newTasks[index].isDeleted = true
  newTasks[index].deleted_at = new Date().toLocaleString()
  return newTasks
}

// Returns an array of tasks completed by a new task
async function completeTask(event: IpcMainInvokeEvent, tasks: TaskType[], index: number) {
  console.log('Event: ' + event.frameId)
  let newTasks = [...tasks]
  newTasks[index].isCompleted = true
  newTasks[index].completed_at = new Date().toLocaleString()
  return newTasks
}

export { sortByCreate, sortByDelete, sortByComplete, addTask, deleteTask, completeTask }
