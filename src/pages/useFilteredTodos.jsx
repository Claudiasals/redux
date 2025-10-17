/* React
Crea un hook per filtrare i to-do
Crea un hook personalizzato chiamato useFilteredTodos che accetta 
una lista di to-do e un termine di ricerca. Utilizza useEffect per filtrare 
i to-do in base al termine di ricerca e restituisci i to-do filtrati. */

/*
input: todos (array) e searchTerm (string)
effetto: al cambiare di todos o searchTerm, filtrare
output: array dei to-do filtrati
*/

// importo gli hook che mi servono
import { useState, useEffect } from "react";

// creo la hook e gli passo come parametri: todos per ricevere i dati dalla lista; 
// searchterm per i termini di ricerca che andremo a filtrare
// [] e "" significano: se nessuno passa un valore per todos e searchTerm passa un array o una stringa vuota.
function useFilteredTodos(todos = [], searchTerm = "") { // così non esce undefine in assenza di valori

  // creiamo lo stato interno per i todo filtrati.
  const [filteredTodos, setFilteredTodos] = useState(todos); //useState per salvare lista filtrata

  //usiamo useEffect per aggiornare la lista quando cambia qualcosa
  useEffect(() => {
    // prepara il termine di ricerca in minuscolo
    const term = String(searchTerm ?? "").trim().toLowerCase(); // con String ci assicuriamo che esca sempre una stringa
    // ?? operatore di coalescienza => evita che vengano accettati undefine e null, in questi casi passa una strigna vuota


    /*
    JS di defalt escluderebbe termini di ricerca con lettere maiuscole o minuscole diverse da come
    sono scritte nella lista, per fargli trovare più intelligentemente i termini risolviamo 
    trasformando tutte el parole in minuscolo prima del controllo, sia nella lista che nella ricerca, 
    in modo che siano sempre scritte uguali durante il controllo. 
    .toLowerCase() → rende tutto minuscolo;
    .trim() → elimina eventuali spazi vuoti all’inizio o alla fine (es. " pane " → "pane").
    */


    // se il termine è vuoto → mostra tutti i todo
    if (!term) {
      setFilteredTodos(todos ?? []); 
      return;
    }
    // altrimenti filtra i todo
    const filtered = (todos ?? []).filter((todo) =>
      String(todo.title ?? "").toLowerCase().includes(term)
    );


    // aggiorna lo stato
    setFilteredTodos(filtered);
    /* React:
    cambia internamente lo stato di filteredTodos,
    fa “rieseguire” il componente (o l’hook) con il nuovo valore,
    e di conseguenza la lista visualizzata si aggiorna automaticamente. 
    */

  }, [todos, searchTerm]); //dipendenze


return filteredTodos; // quando viene utilizzato l'hook, questo restituisce la lista filtrata dei Todo
};


export default useFilteredTodos;
/* ora andiamo a: 

1) importare questa hook nel file TodoList 
import useFilteredTodos from "./useFilteredTodos";

2) creare lo stato per la ricerca: 
const [search, setSearch] = useState("");

3) utilizzare l'hook per ottenere la lista filtrata:
const filteredTodos = useFilteredTodos(todos || [], search);

4) aggiungere l'input per la ricerca
<input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Cerca un to-do..."
/>

5) Cambia il .map che usava todos in modo che usi filteredTodos:
<ul>
  {filteredTodos.map((todo) => (
    <li key={todo.id}>{todo.title}</li>
  ))}
</ul>

6) Avvia l’app:
npm start

E verifica:
quando scrivi nel campo di ricerca, la lista si filtra;
se svuoti il campo, tornano tutti i to-do.
*/
