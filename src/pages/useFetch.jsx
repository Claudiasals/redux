import { useEffect, useState } from "react"

/* ESERCIZIO USEFETCH: Crea un hook personalizzato chiamato useFetch che recupera dati da una URL 
passata come argomento. L'hook dovrebbe restituire i dati recuperati, uno stato di caricamento 
e uno stato di errore. */

const useFetch = (url) => { //creo la hook riutilizzabile (il nome va scritto in camelCase)
    const [data, setData] = useState(null); // gestisco lo stato dei dati
    const [loading, setLoading] = useState(true);  // gestisco lo stato del loading
    const [error, setError] = useState(null);  // gestisco lo stato degli errori

    const fetchData = async () => { // funzione che fa la fetch

        try { // codice che potrebbe causare errori di risposta o di rete 
            const response = await fetch(url); // chiamata fetch
            if (!response.ok) { // se la chiamata non è ok esegui questo codice
                throw new Error(`Errore HTTP: ${response.status}`); // lanciamo l'errore 
            };

            const fetchedData = await response.json(); // converto json in valori js
            setData(fetchedData);

        } catch (error) { // cattura e gestisce gli errori generati nel try e f ail modo che il codice possa proseguire
            console.log(error) // loggo l'errore
            setError(error.message); // aggiorno lo state di error

        } finally {
            setLoading(false); // il fetch è terminato quindi setto loadign a false per interrompere il messaggio di loading
            // Senza il setLoading(false), il tuo componente resterebbe per sempre con loading = true, 
            //quindi nella UI vedresti sempre la scritta “Loading…” e non vedresti mai i dati o l’errore.
        };
    };

    useEffect(() => { // esegui fetchData (il fetch dei dati) solo dopo il render e solo quando cambia url
        fetchData();
    }, [url]); // DEPENDENCY ARRAY: in questo caso mettiamo "url" come variabile del dependensy array per far si che ogni volta
    //che cambia l'url riparta la funzione useFetch.


    return { data, loading, error }; // restituisce i dati, loading e error, da utilizzare

};
export default useFetch;