<script setup lang="ts">
import type { TodoItem } from '@/types';


type PropShape = {
	todo: TodoItem,
}

const props = defineProps<PropShape>()
const emit = defineEmits<{
	(e: 'delete-task'): void
}>()

const removeTask = () => {
	emit('delete-task')
}

</script>

<template>
  <li
    class="card"
    :class="{ completed: todo.isCompleted }"
  >
    <input type="checkbox" v-model="todo.isCompleted" />
    <h3>{{ todo.label }}</h3>
    | ({{ todo.type }})
    <button class="card__button" @click="removeTask">&times;</button>
  </li>
</template>
