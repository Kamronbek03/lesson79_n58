const { createStore } = require("redux");

const initialState = {
  todos: [],
};

const ADD_TODO = "ADD_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SET_TODOS = "SET_TODOS";

const addTodo = (task) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), task },
});

const updateTodo = (id, task) => ({
  type: UPDATE_TODO,
  payload: { id, task },
});

const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

const setTodos = (todos) => ({
  type: SET_TODOS,
  payload: todos,
});

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, task: action.payload.task }
            : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(todoReducer);

const createTodo = (task) => {
  store.dispatch(addTodo(task));
};

const modifyTodo = (id, task) => {
  store.dispatch(updateTodo(id, task));
};

const removeTodo = (id) => {
  store.dispatch(deleteTodo(id));
};

const setInitialTodos = (todos) => {
  store.dispatch(setTodos(todos));
};

const getTodos = () => {
  console.log(store.getState().todos);
};

const initialTodos = [
  { id: 1, task: "Buy groceries" },
  { id: 2, task: "Read a book" },
];

setInitialTodos(initialTodos);

createTodo("Learn Redux");

getTodos();

const todoToUpdateId = store.getState().todos[0].id;
modifyTodo(todoToUpdateId, "Buy groceries and cook dinner");

getTodos();

const todoToRemoveId = store.getState().todos[1].id;
removeTodo(todoToRemoveId);

getTodos();
