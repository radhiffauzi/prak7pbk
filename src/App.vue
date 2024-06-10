<template>
  <div id="app">
    <header>
      <h1>Masukkan Vespa Terbaikmu</h1>
    </header>
    <main>
      <div class="input-container">
        <input v-model="newTodo" placeholder="Tambahkan Vespa baru" @keyup.enter="addTodo" />
        <button @click="addTodo">Tambah</button>
      </div>
      <ul>
        <li v-for="(todo, index) in todos" :key="index" class="todo-item">
          <input type="checkbox" v-model="todo.completed" @change="toggleTodoCompletion(index)" />
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
          <button @click="removeTodo(index)" class="remove-button">Hapus</button>
        </li>
      </ul>
      <p>Vespa terbaik versi kamu: {{ incompleteTodosCount }}</p>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTodoStore } from './stores/todoStores.js';

export default {
  setup() {
    const todoStore = useTodoStore();
    const newTodo = ref('');

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value.trim());
        newTodo.value = '';
      }
    };

    const removeTodo = (index) => {
      todoStore.removeTodo(index);
    };

    const toggleTodoCompletion = (index) => {
      todoStore.toggleTodoCompletion(index);
    };

    return {
      newTodo,
      todos: todoStore.todos,
      addTodo,
      removeTodo,
      toggleTodoCompletion,
      incompleteTodosCount: todoStore.incompleteTodosCount,
    };
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

header {
  margin-bottom: 20px;
}

h1 {
  color: #2c3e50;
  font-size: 2.5em;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 10px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 60%;
  max-width: 300px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  border: none;
  background-color: #3498db;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 500px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}

.todo-item:hover {
  background-color: #f9f9f9;
}

input[type="checkbox"] {
  margin-right: 10px;
}

span {
  flex-grow: 1;
  text-align: left;
}

span.completed {
  text-decoration: line-through;
  color: #7f8c8d;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #c0392b;
}
</style>
