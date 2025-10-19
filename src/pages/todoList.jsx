import { useEffect, useState } from "react";
// importo la hook per filtrare i termini di ricerca
import useFilteredTodos from "./useFilteredTodos";

import { useDispatch, useSelector } from "react-redux";
/*
useSelector serve a leggere lo stato dallo store
Immagina lo store come un grande contenitore globale.
useSelector ti permette di prendere solo la parte di stato che ti serve dentro un componente. 
*/

import { fetchTodos } from "../store/features/todoSlice"; 
// fetchTodos è un thunk creato con createAsyncThunk per fare fetch dei to-do

const ToDoList = () => {
   
    const dispatch = useDispatch(); // serve per chiamare le azioni/reducer dello store

    // prendo dallo store: items (lista dei to-do), loading e error
    const { items: todos, loading, error } = useSelector(state => state.todos);
    // useSelector ti permette di prendere solo la parte di stato
    // che ti serve dentro un componente. 


    // creo lo state per i termini di ricerca
    const [search, setSearch] = useState("");

    // utlizzo l'hook per ottenere la lista filtrata
    const filteredTodos = useFilteredTodos(todos || [], search);
    // || = Se todos è falso, null, undefined o [] vuoto → usa un array vuoto al posto di todos
    // Serve per evitare errori nel caso in cui i dati non siano ancora arrivati dal fetch.

    // uso useEffect per fare il fetch dei to-do all'avvio del componente
    useEffect(() => {
        dispatch(fetchTodos()); 
        // dispatch chiama il thunk fetchTodos, che farà la chiamata all'API
        // e popolerà lo store con i to-do ricevuti
    }, [dispatch]);


    // mostro i msg di loading e di errore
    if (loading) return <p>Caricamento lista To-Do...</p>; 
    // se loading = true, mostra il messaggio

    if (error) return <p>Errore: {error}</p>; 
    // se c'è un errore nella fetch, mostra il messaggio


    return ( // utilizzo map per ciclare e poter utilizzare i dati che mi servono 
        // da ogni elemento dell'array scaricato
        <>

            <input
                // Il valore dell'input è legato allo stato "search"
                // Questo lo rende un "controlled component": React controlla cosa viene mostrato
                value={search}

                // onChange: Funzione che viene chiamata ogni volta che l'utente digita qualcosa
                // "e" è l'evento generato dall'input
                // setSearch aggiorna lo stato "search" con il valore attuale dell'input
                onChange={(e) => setSearch(e.target.value)}
                /*
                Perchè serve onChange? perché senza onChange:
                L’input diventa readonly, perché React mostra sempre il valore di search 
                ma non c’è modo di aggiornarlo. Risultato: non puoi digitare nulla dentro.
                */

                // Testo che compare dentro l'input quando è vuoto
                // Serve da indicazione per l'utente su cosa scrivere
                placeholder="Cerca un to-do..."
            />

            <ul>
                {filteredTodos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
                {/* Per ogni todo filtrato creo un <li> con titolo
       key={todo.id} serve a React per sapere quale elemento è quale quando aggiorna il DOM */}
            </ul>

        </>
    )
}

export default ToDoList;
