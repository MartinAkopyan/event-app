<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { http } from '@/services/http'
import type { EventItem } from '@/types'

const props = defineProps({
  id: { type: Number, required: true }
})
const event: Ref<EventItem | null> = ref(null)
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
