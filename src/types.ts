export interface EventItem {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  organizer: string
}

type TodoType = 'personal' | 'work' | 'miscellaneous'

export interface TodoItem {
  label: string
  type: TodoType
  isCompleted: boolean
  id: number | null
}

export type TodoFilter = 'all' | 'incomplete' | 'complete'
