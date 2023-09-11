<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { http } from '@/services/http'

const props = defineProps({
  id: { required: true }
})
console.log(props);
const event = ref(null)
const route = useRoute()
onMounted(async () => {
  try {
    const res = await http.get(`events/${props.id}`)
    event.value = res.data
  } catch (e) {
    console.log(e)
  }
})
</script>
<template>
  <div v-if="event">
    <h2>Event #{{ route.params.id }}</h2>
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
<style></style>
