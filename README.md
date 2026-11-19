# Progetto Next.js

Progetto Next.js con App Router, TypeScript, Tailwind CSS e il client Supabase.

## Avvio locale

```bash
npm ci
npm run dev
```

## Avvio con Docker

```bash
docker compose up --build
```

Apri [http://localhost:3000](http://localhost:3000). Le modifiche ai file vengono
sincronizzate nel container; le dipendenze vengono installate all'avvio in un
volume dedicato. Per fermare il server usa `docker compose down`.

Il server di sviluppo usa `.next-dev`, separata da `.next` usata dalle build,
per evitare conflitti se vengono eseguiti contemporaneamente.

La palette Tailwind include `primary-blue`, `light-blue` e `dark-blue`.
Fraunces viene usato per `h1`, `h2` e gli elementi con classe `logo`; DM Sans
è il font predefinito. Sono disponibili anche le utility `font-display` e
`font-sans`.

## Supabase

Crea un file `.env.local` nella cartella del progetto con i valori del progetto
Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=URL_DEL_PROGETTO
NEXT_PUBLIC_SUPABASE_ANON_KEY=CHIAVE_ANON
SUPABASE_SERVICE_ROLE_KEY=CHIAVE_SERVICE_ROLE
ADMIN_PASSWORD=PASSWORD_AMMINISTRATORE_LUNGA_E_CASUALE
```

Non condividere né pubblicare la service role key. Riavvia il server dopo aver
modificato le variabili. Le variabili `NEXT_PUBLIC_` non sono segrete e possono
essere incluse nel codice destinato al browser durante la build.

Usa `getSupabase()` da `@/lib/supabase` per le operazioni pubbliche e
`getSupabaseAdmin()` da `@/lib/supabase-admin` esclusivamente nel codice server,
durante la gestione della richiesta. Su Cloudflare Pages configurare tutte e tre
le variabili Supabase come binding per ogni ambiente (produzione e anteprima):
i client le leggono a runtime dai binding della richiesta, senza incorporare
valori di build. Se mancanti a runtime, viene segnalato un errore; i valori
segnaposto sono ammessi solo durante la build.
Entrambi i client usano il `fetch` globale del runtime e non persistono né
aggiornano automaticamente le sessioni.
Il client admin ignora le policy RLS: usalo solo per operazioni autorizzate.
Configura le policy RLS del database e di Storage per il client pubblico e
crea separatamente gli eventuali bucket necessari.

`Event` in `types/database.ts` descrive una riga di `events`.
`formatDate` in `lib/utils.ts` richiede un timestamp con fuso esplicito, come
quelli restituiti da `timestamptz`, e lo visualizza in `Europe/Rome`.
Per verificare la formattazione con Node.js 22:

```bash
node --experimental-strip-types --test tests/utils.test.mjs
```

### Gestione spettacoli

Apri `/inserimento-spettacoli` e accedi con `ADMIN_PASSWORD`. Usa una password
lunga e casuale, HTTPS in produzione e configura un rate limit condiviso sul
login presso il provider o un reverse proxy: l'app non limita i tentativi.
La sessione dura 8 ore; cambiare la password invalida le sessioni esistenti.

La tabella `events` deve corrispondere al tipo `Event` e permettere la lettura
pubblica tramite RLS. La colonna `location` è di tipo `text` e può essere nulla;
il luogo è opzionale e viene mostrato nel calendario e nelle prossime date.
Crea un bucket pubblico `event-images` in Supabase Storage:
gli upload autenticati avvengono sul server con la service role key, senza
richiedere policy di scrittura pubbliche. Sono accettati JPEG, PNG, WebP e GIF
fino a 5 MB (verifica anche i limiti di upload del provider). Le immagini non
sono rimosse automaticamente quando si modifica o elimina un evento; un upload
seguito da un salvataggio fallito può lasciare un file inutilizzato nel bucket.
L'ora inserita usa il fuso del dispositivo e la lista mostra l'ora di Roma.
Il calendario pubblico `/calendario` mostra gli eventi futuri leggibili tramite
le policy RLS, aggiornati a ogni richiesta, con gli orari in `Europe/Rome`.
La pagina `/lezioni-spettacolo` conta le date future per `show_reference` a
ogni richiesta. Il limite di righe dell'API Supabase deve coprire tutti gli
eventi futuri: se la risposta è incompleta, la pagina segnala il problema
anziché mostrare conteggi parziali.
L'archivio in `data/spettacoli.ts` contiene 29 spettacoli, inclusa
«La vita invisibile», non numerata nel testo sorgente. Le descrizioni mancanti
sono segnalate con un testo provvisorio. Le schede sono mostrate sei per
pagina; i badge e i dettagli comprendono le date associate allo slug o al
relativo `legacy_ref`. La gestione eventi accetta entrambi i riferimenti; le
righe esistenti non vengono migrate automaticamente.

## Componenti UI

`components/ui` contiene `Button`, utilizzabile come pulsante o link tramite
`href`, e `Hero`, configurabile con `title`, `subtitle` opzionale, `bgImage` e
`videoUrl` opzionale. L'immagine resta il fallback per il video e per chi
preferisce ridurre le animazioni.
`Header` e `Footer` sono inclusi nel layout globale. Le icone social nel footer
sono segnaposto senza collegamenti finché non vengono forniti gli indirizzi.
I link di navigazione indicano percorsi previsti, alcune delle cui pagine devono
ancora essere create. L'header e la pagina contatti rimandano al canale WhatsApp ufficiale.
La pagina `/libri-e-scritti` mostra i libri in `data/libri.ts`, con descrizioni
espandibili e immagini provvisorie. I link di acquisto sono segnaposto (`#`).
La ricerca copre titoli e descrizioni degli spettacoli e dei libri e collega
ogni risultato alla relativa scheda; i corsi non sono ancora inclusi.
