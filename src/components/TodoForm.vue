<script setup lang="ts">
import type { TodoItem } from '@/types';
type PropShape = {
	task: TodoItem
}
const props = defineProps<PropShape>()

const emit = defineEmits<{
	(e: 'add-task', task: TodoItem): void
}>()


const addTask = () => {
	emit('add-task', props.task)
}

</script>
<template lang="">
  <div>
    <form @submit.prevent="addTask">
      <div class="form-control">
        <label>Task Label: </label>
        <input type="text" v-model="props.task.label" />
      </div>
      <div class="form-control">
        <label>Task Type: </label>
        <select v-model="props.task.type">
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>
      <button type="submit">Add task</button>
    </form>
  </div>
</template>
