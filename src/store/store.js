
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todoSlice';

// Qui creiamo lo store globale con il nostro slice todos
const store = configureStore ({
reducer: {
    todos: todosReducer,
}
});

/* 
Chiave: todos → identifica la “fetta” di stato nello store dedicata ai to-do.
Valore: todosReducer → è il reducer che gestisce tutte le azioni relative ai to-do. */

/*  COS'è UN REDUCER? 
    Il reducer è solo una funzione che prende lo stato corrente e un’azione 
    e restituisce un nuovo stato. 

  ESEMPIO:
    addTodo: (state, action) => {
  state.items.push(action.payload);
}

Questo dice: “quando ricevo l’azione addTodo, 
aggiungo action.payload all’array items nello stato”.

  */
 export default store;