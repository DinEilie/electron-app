import { z } from 'zod'
const TaskSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  completed_at: z.string(),
  deleted_at: z.string(),
  title: z.string(),
  isCompleted: z.boolean(),
  isDeleted: z.boolean()
})

const TasksSchema = TaskSchema.array()
export { TaskSchema, TasksSchema }
