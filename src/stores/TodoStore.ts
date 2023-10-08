import { defineStore } from 'pinia'
import { TodoItem } from '@/types'
import { readLocalStorage, writeLocalStorage } from '@/services/local-storage'

type StateShape = {
	todoList: TodoItem[],
	newTask: TodoItem,
}

export const useTodoStore = defineStore('TodoStore', {
	state: (): StateShape => ({
		todoList: [],
		newTask: {
			label: '',
			type: 'personal',
			isCompleted: false,
			id: null
		}
	}),

	getters: {
		numberOfTodos(): number {
			return this.todoList.length
		}
	},

	actions: {
		initializeStore(): void {
      const storedTodos = readLocalStorage('todos');
      if (storedTodos) {
        this.todoList = JSON.parse(storedTodos);
      }
    },


		removeTask(idx: number): void {
			this.todoList.splice(idx, 1)
			writeLocalStorage('todos', this.todoList);		
		},

		addTask() {
			if (this.newTask.label.trim()) {
				this.newTask.id = Math.random() * Math.random() + 1
				this.todoList.unshift({ ...this.newTask })
				this.newTask.label = ''
				this.newTask.type = 'personal'
				writeLocalStorage('todos', this.todoList)
			}
		}
	}
})