import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron/renderer'
import TaskType from './types/TaskType'

// Custom APIs for renderer
const api = {
  sortByCreate: (tasks: TaskType[]) => ipcRenderer.invoke('main:sortByCreate', tasks),
  sortByDelete: (tasks: TaskType[]) => ipcRenderer.invoke('main:sortByDelete', tasks),
  sortByComplete: (tasks: TaskType[]) => ipcRenderer.invoke('main:sortByComplete', tasks),
  addTask: (tasks: TaskType[], title: string) => ipcRenderer.invoke('main:addTask', tasks, title),
  deleteTask: (tasks: TaskType[], index: number) =>
    ipcRenderer.invoke('main:deleteTask', tasks, index),
  completeTask: (tasks: TaskType[], index: number) =>
    ipcRenderer.invoke('main:completeTask', tasks, index)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
