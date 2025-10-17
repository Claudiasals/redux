import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const todoSlice = createSlice({
    name: "todos",
    initialState, // è nella const initialState. altrimenti qui sarebbe --> initialState: { items: [] }
    reducers: {
        addTodo: (state, action) => {
            state.items.push(action.payload);
        }
    }

    
});


export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;

/*
(state, action) => { ... } --> È una funzione reducer.
state: è lo stato attuale dello slice (qui initialState), che Redux Toolkit ti passa automaticamente.
action: è l’oggetto dell’azione che contiene di solito due cose:
type: il tipo dell’azione (qui sarà "todos/addTodo").
payload: i dati che vuoi aggiungere allo stato (qui il nuovo to-do).

state.items: è l’array che abbiamo definito nello initialState.
.push(action.payload): aggiunge il valore passato nell’azione (payload) alla fine dell’array.

In Redux normale non puoi modificare direttamente lo stato, 
ma Redux Toolkit usa Immer dietro le quinte, 
quindi scrivere state.items.push(...) è sicuro: Immer traduce questa “mutazione”
in un aggiornamento immutabile.

ESEMPIO PRATICO:

dispatch(addTodo("Comprare il pane"));

action.payload sarà "Comprare il pane".

La funzione reducer farà state.items.push("Comprare il pane").
Lo stato diventa:

{
  items: ["Comprare il pane"]
}
*/