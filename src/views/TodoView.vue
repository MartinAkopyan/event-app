<script setup lang="ts">
import { ref, Ref, computed, ComputedRef } from 'vue'
import type { TodoItem, TodoFilter } from '@/types'
let todos: Ref<TodoItem[]> = ref([])
let newTask: Ref<TodoItem> = ref({
  label: '',
  type: 'personal',
  isCompleted: false,
  id: null
})
let todosFilter: Ref<TodoFilter> = ref('all')

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
  if (newTask.value.label) {
    newTask.value.id = Math.random() * Math.random() + 1
    todos.value.push({ ...newTask.value })
    console.log(newTask.value.id)

    newTask.value.label = ''
    newTask.value.type = 'personal'
  }
}
</script>

<template lang="">
  <div class="todo-page">
    <h1>Todo</h1>
    <form @submit.prevent="addTask">
      <div class="form-control">
        <label>Task Label: </label>
        <input type="text" v-model="newTask.label" />
      </div>
      <div class="form-control">
        <label>Task Type: </label>
        <select v-model="newTask.type">
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>
      <button type="submit">Add task</button>
    </form>
    <h2>Task List</h2>
    <div>
      <button @click="todosFilter = 'all'">All</button> |
      <button @click="todosFilter = 'incomplete'">Incomplete</button> |
      <button @click="todosFilter = 'complete'">Complete</button>
    </div>

    <ul v-if="todos.length">
      <li
        class="card"
        :class="{ completed: todo.isCompleted }"
        v-for="todo in fielteredTodos"
        :key="todo.id"
      >
        <input type="checkbox" v-model="todo.isCompleted" />
        <h3>{{ todo.label }}</h3>
        | ({{ todo.type }})
        <button class="card__button">&times;</button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="css">
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
