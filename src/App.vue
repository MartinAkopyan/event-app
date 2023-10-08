<script setup lang="ts">
import { toRefs } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useTodoStore } from '@/stores/TodoStore'

const TodoStore = useTodoStore();
TodoStore.initializeStore();
const { numberOfTodos } = toRefs(TodoStore);

</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'event-list' }">Events</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink> | 
          <RouterLink :to="{ name: 'todo' }" :data-list="numberOfTodos">Todo</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

[data-list] {
	position: relative;

	&::before {
		content: attr(data-list);
		width: 18px;
		height: 18px;
		font-size: 10px;
		line-height: 18px;
		background-color: red;
		color: #fff;
		border-radius: 9px;
		position: absolute;
		top: -10px;
		right: -10px;

	}
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h2 {
  font-size: 20px;
}
</style>
