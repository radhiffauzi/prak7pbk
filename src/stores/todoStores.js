import { reactive, computed } from 'vue';

export const useTodoStore = () => {
  const state = reactive({
    todos: [],
  });

  const addTodo = (text) => {
    state.todos.push({ text, completed: false });
  };

  const removeTodo = (index) => {
    state.todos.splice(index, 1);
  };

  const toggleTodoCompletion = (index) => {
    state.todos[index].completed = !state.todos[index].completed;
  };

  const incompleteTodosCount = computed(() => {
    return state.todos.filter(todo => !todo.completed).length;
  });

  return {
    todos: state.todos,
    addTodo,
    removeTodo,
    toggleTodoCompletion,
    incompleteTodosCount,
  };
};
