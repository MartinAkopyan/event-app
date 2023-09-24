import { defineStore } from 'pinia'
import { TodoItem } from '@/types'

type StateShape = {
	todoList: TodoItem[]
}

export const useTodoStore = defineStore('TodoStore', {
	state: (): StateShape => ({
		todoList: []
	}),

	getters: {

	},

	actions: {

	}
})