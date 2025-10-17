/*
Per far sì che l’utente possa inviare dati al reducer, servono componenti React.
Esempio: una componente AddTodo con un input e un bottone.
Quando l’utente scrive qualcosa e clicca “Aggiungi”, 
la componente usa dispatch per inviare l’azione al reducer:
*/ 

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./todosSlice";

// useDispatch: per inviare azioni (actions) al Redux store
// useSelector: per leggere valori dallo stato globale di Redux (dallo store)

import { useState } from "react"; // Hook di React per gestire lo stato locale
import { useDispatch, useSelector } from "react-redux"; 

import { addTodo } from "./todosSlice"; 
// importiamo l'action creator `addTodo` generato dallo slice


const AddTodo = () => {

  // Stato locale per tenere il valore dell'input
  const [text, setText] = useState("");

  // Otteniamo la funzione dispatch per inviare azioni al Redux store
  const dispatch = useDispatch();

  // Leggiamo dallo stato globale di Redux i to-do salvati
  // state.todos è la chiave nello store (vedi configureStore)
  const todos = useSelector((state) => state.todos.items);

  // Funzione chiamata quando l'utente clicca "Aggiungi"
  const handleAdd = () => {
    if (text.trim() === "") return; // Questa riga serve a non aggiungere to-do vuoti.
    dispatch(addTodo(text)); // Invio l'azione addTodo al Redux store con il testo come payload
    setText(""); // Reset dell'input dopo l'aggiunta
  };
/*
=== "" significa: se dopo aver tolto gli spazi il testo è una stringa vuota, 
cioè l’utente non ha scritto niente di “vero”.
return; in questo contesto ferma l’esecuzione della funzione.
*/

  return (
    <>
      {/* Input controllato: il valore mostrato nell'input è sempre sincronizzato con lo stato locale */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)} // Aggiorna lo stato locale ogni volta che l'utente scrive
        placeholder="Nuovo to-do" // Testo grigio quando l'input è vuoto
      />

      {/* Bottone per aggiungere il nuovo to-do */}
      <button onClick={handleAdd}>Aggiungi</button>

      {/* Lista dei to-do letti dallo stato globale di Redux */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li> // Mostra ogni to-do
        ))}
      </ul>
    </>
  );
};

export default AddTodo; // Esportiamo il componente per poterlo usare altrove
