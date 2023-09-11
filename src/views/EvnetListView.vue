<script setup>
import { ref, onMounted } from 'vue'
import { http } from '@/services/http'
import EventCard from '@/components/EventCard.vue'

const events = ref(null)

// onMounted(() => {
// 	axios.get('https://my-json-server.typicode.com/Code-Pop/Real-World_vue-3/events')
// 	.then((response) => {
// 		console.log(response);
// 	}).catch((error) => {
// 		console.log(error);
// 	})
// })

onMounted(async () => {
  try {
    const res = await http.get('/events')
    events.value = res.data
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div class="home">
    <h1>Events For Good</h1>
    <div class="container">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}
</style>
