<script setup lang="ts">
import { ref, Ref, computed, ComputedRef, onMounted, watch } from 'vue'
import { writeLocalStorage, readLocalStorage } from '@/services/local-storage'
import type { TodoItem, TodoFilter } from '@/types.ts'
import TodoForm from '@/components/TodoForm.vue'
import TodoCard from '@/components/TodoCard.vue'

let todos = ref<TodoItem[]>([])
let newTask = ref<TodoItem>({
  label: '',
  type: 'personal',
  isCompleted: false,
  id: null
})
let todosFilter = ref<TodoFilter>('all')

let fielteredTodos: ComputedRef<TodoItem[]> = computed(() => {
  if (todosFilter.value === 'incomplete') {
    return todos.value.filter((todo: TodoItem) => !todo.isCompleted)
  } else if (todosFilter.value === 'complete') {
    return todos.value.filter((todo: TodoItem) => todo.isCompleted)
  } else {
    return todos.value
  }
})

function addTask() {
  if (newTask.value.label.trim()) {
    newTask.value.id = Math.random() * Math.random() + 1
    todos.value.unshift({ ...newTask.value })
    newTask.value.label = ''
    newTask.value.type = 'personal'
  }
}

function removeTask(idx: number): void {
  todos.value.splice(idx, 1)
}

onMounted(() => {
  let localTodos = readLocalStorage('todos')
  if (localTodos) {
    todos.value = JSON.parse(localTodos)
  }
})

watch(
  todos,
  (val) => {
    writeLocalStorage('todos', val)
  },
  { deep: true }
)
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
        v-for="(todo, idx) in fielteredTodos"
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
