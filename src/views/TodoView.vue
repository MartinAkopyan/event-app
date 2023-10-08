<script setup lang="ts">
import { ref, Ref, computed, ComputedRef, onMounted, watch } from 'vue'
import type { TodoItem, TodoFilter } from '@/types.ts'
import { useTodoStore } from '@/stores/TodoStore'
import TodoForm from '@/components/TodoForm.vue'
import TodoCard from '@/components/TodoCard.vue'

const store = useTodoStore()

let todos = store.todoList

let newTask = store.newTask;

let todosFilter = ref<TodoFilter>('all')

let filteredTodos: ComputedRef<TodoItem[]> = computed(() => {
  if (todosFilter.value === 'incomplete') {
    return todos.filter((todo: TodoItem) => !todo.isCompleted)
  } else if (todosFilter.value === 'complete') {
    return todos.filter((todo: TodoItem) => todo.isCompleted)
  } else {
    return todos
  }
})


const addTask = () => {
	store.addTask()
}

const removeTask = (idx: number) => {
	store.removeTask(idx)
}

</script>

<template lang="">
  <div class="todo-page">
    <h1>Todo</h1>
    <TodoForm :task="newTask" @add-task="addTask" />
    <h2>Task List</h2>
    <div>
      <button @click="todosFilter = 'all'">All</button> |
      <button @click="todosFilter = 'incomplete'">Incomplete</button> |
      <button @click="todosFilter = 'complete'">Complete</button>
    </div>

    <ul v-auto-animate>
      <TodoCard
        v-for="(todo, idx) in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @delete-task="removeTask(idx)"
      />
    </ul>
  </div>
</template>

<style lang="css">
.todo-page {
  max-width: 800px;
  margin: 0 auto;
}
.form-control {
  margin-block: 10px;
}

.card {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 400px;
  margin-inline: auto;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  transition: all 0.2s ease-in;
}

.card.completed {
  opacity: 0.5;
  background-color: rgb(193, 247, 226);
}

button.card__button {
  margin-left: auto;
  border: none;
  cursor: pointer;
  height: 100%;
  font-size: 20px;
  margin-top: unset;
  color: #fff;
  background-color: rgb(255, 45, 87);
  height: 43px;
  width: 43px;
  transition: all 0.2s ease-in;
}

input[type='checkbox'] {
  cursor: pointer;
}

button.card__button:hover {
  background-color: rgba(255, 45, 87, 0.642);
}

button {
  margin-top: 20px;
  padding: 10px;
}

h2 {
  margin-top: 50px;
}

ul {
  list-style: none;
  text-align: left;
}
</style>
