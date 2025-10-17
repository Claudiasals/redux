
/* ES. 22: Utilizza Fetch in una componente
Crea una componente chiamata TodoList che utilizza useFetch 
per recuperare una lista di to-do da un'API 
(puoi usare un endpoint fittizio come https://jsonplaceholder.typicode.com/todos). 
Visualizza i to-do in una lista, 
mostrando un messaggio di caricamento finché i dati non sono disponibili 
e un messaggio di errore se qualcosa va storto. */

import { useState } from "react";
import useFetch from "./useFetch";
// importo la hook per filtrare i termini di ricerca
import useFilteredTodos from "./useFilteredTodos";

const ToDoList = () => {
    // Chiamo l'hook useFetch per recuperare i dati dall'API.
    // L'hook restituisce tre valori: 
    // data = i dati ricevuti dall'API
    // loading = true se la fetch è in corso, false se terminata
    // error = eventuale messaggio di errore se la fetch fallisce    
    const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/todos");
    console.log(loading)
    console.log(error)
    console.log(data)

    // creo lo state per i termini di ricerca
    const [search, setSearch] = useState("");

    // utlizzo l'hook per ottenere la lista filtrata
    const filteredTodos = useFilteredTodos(data || [], search);
    // || = Se todos è falso, null, undefined o [] vuoto → usa un array vuoto al posto di todos
    // Serve per evitare errori nel caso in cui i dati non siano ancora arrivati dal fetch.


    // mostro i msg di loading e di errore, perché dal useFetch 
    // prende soltanto i valori e non i msg html
    if (loading) return <p>Caricamento lista To-Do...</p>;
    if (error) return <p>Errore: {error}</p>;



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
