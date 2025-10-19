import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// stato iniziale
const initialState = {
    items: [],        // contiene la lista dei to-do (inizialmente vuota)
    loading: false,   // serve per sapere se la richiesta fetch è in corso
    error: null,      // serve a memorizzare eventuali messaggi di errore provenienti dal fetch
};

/*
- items: contiene la lista dei to-do (inizialmente vuota).
- loading: inizialmente è false perché non abbiamo ancora iniziato a caricare i dati.
Quando parte il fetch, lo impostiamo a true.
Quando il fetch termina (successo o errore), lo riportiamo a false.
- error: inizialmente è null perché non c’è ancora nessun errore.
Se il fetch fallisce, qui salviamo il messaggio di errore, così il componente può mostrarlo.
*/

// thunk per fare il fetch dei to-do
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
        const data = await res.json();
        return data; // questo sarà action.payload nel reducer
    }
);

const todoSlice = createSlice({
    name: "todos",
    initialState, // è nella const initialState
    reducers: {
        addTodo: (state, action) => {
            /*
            state → è lo stato corrente solo di questo slice (cioè { items: [...] }).
            action → è l’oggetto dell’azione che hai dispatchato.
            com'è action ---> {
                type: "todos/addTodo",
                payload: { id: 1, title: "Comprare il pane" }
            }
            */
            state.items.push(action.payload);
            /*
            Quando facciamo dispatch(addTodo(...)) nel componente,
            Redux chiama il reducer addTodo con action.payload.
            */
        },

        removeTodo: (state, action) => {
            // rimuove un to-do per id
            state.items = state.items.filter(todo => todo.id !== action.payload);
            /*
            filter crea un nuovo array contenente i todo con id diversi 
            da quello presente in action.payload 
            */
        },

        editTodo: (state, action) => {
            // modifica un to-do per id
            const index = state.items.findIndex(todo => todo.id === action.payload.id);
            // findIndex() cerca nell'array il to-do con lo stesso id di quello che vogliamo modificare
            if (index !== -1) { 
                // Solo se ho trovato un elemento con quell’id, allora prosegui
                state.items[index] = action.payload;
                /* Sostituisci l’elemento in quella posizione (indice) con i nuovi dati (action.payload) */
            }
        }
    },

    extraReducers: (builder) => {
        /*
        extraReducers serve a gestire gli stati del thunk asincrono (createAsyncThunk) 
        senza scrivere tutto dentro i reducer normali.
        */
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
        /*
        In pratica:
        - loading serve a mostrare “Caricamento…” nel componente.
        - error serve a mostrare eventuali messaggi di errore.
        - items è la vera lista dei to-do che visualizziamo e filtriamo.
        */
    }
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
