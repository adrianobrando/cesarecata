export type Spettacolo = {
  id: string;
  title: string;
  description: string;
  image: string;
  legacy_ref?: string;
};

export const spettacoli: Spettacolo[] = [
  {
    id: "odissea-juke-box",
    title: "Odissea Juke-Box",
    description: `Lezione-spettacolo interattiva sul poema omerico.

Lo spettacolo invita gli spettatori a una riscoperta originale del poema omerico, raccontato nei suoi significati simbolici e filosofici in un'alternanza di storytelling e letture sceniche. Temi letterari e mitologici si alternano naturalmente a spunti di stand-up comedy, mescolando registri linguistici e toni teatrali differenti. Il monologo si svolge in maniera interattiva con il pubblico: attraverso una vela-mappa dove sono rappresentate le diverse tappe del percorso di Odisseo e un pallino raffigurante l'eroe stesso, sono i lanci degli spettatori a determinare il cammino, differente ogni volta, del protagonista nel suo ritorno a Itaca. Particolare attenzione è riservata alle figure femminili della storia – Penelope, Circe, Calypso, Nausicaa, Anticlea – ognuna delle quali incarna una tappa del viaggio dell'eroe e uno stadio del suo sviluppo evolutivo. Le avventure di Odisseo sono narrate attraverso i paradossi, le ansie e le caratteristiche del mondo contemporaneo, fino a trovare nella nostra esistenza le stesse passioni e le stesse ossessioni cantate dagli antichi aedi.`,
    image: "/images/ls_odisseajukebox.webp",
  },
  {
    id: "se-giasone-fosse-rimasto-single",
    title: "Se Giasone fosse rimasto Single",
    description: `Lezione-spettacolo su Medea e gli Argonauti

Mescolando i linguaggi della filosofia e della stand-up comedy, la lezione-spettacolo si presenta come un anomalo monologo nel quale la storia di Medea, di Giasone e degli Argonauti è narrata con costanti riferimenti all'universo delle relazioni amorose nel mondo contemporaneo e della vita “da single”.

Lo storytelling dell'epica antica si interseca con le contraddizioni dei tempi moderni, alternando registri e idiomi differenti, dai testi in greco antico sino al vernacolo marchigiano.

Gli spettatori sono invitati a un viaggio mirabolante come quello degli Argonauti, in un percorso che ricerca i significati simbolici nascosti dei testi classici, tra ironia e indagine filosofica.`,
    image: "/images/ls_giasonefosserimastosingle.webp",
  },
  {
    id: "shakespeare-juke-box",
    title: "Shakespeare Juke-box",
    description: `Lezione-spettacolo tarologica sul teatro shakespeariano

Questo spettacolo propone un viaggio originale e interattivo nel teatro di William Shakespeare. Il pubblico può determinare un percorso scegliendo tra 22 diversi personaggi delle opere del Bardo. La performance, che utilizza carte speciali, si richiama direttamente alla teoria e alla iconologia dei Tarocchi, per un percorso affascinante tra i drammi shakespeariani che è al contempo un'esplorazione negli archetipi dell’anima umana. Storytelling, recitazione e analisi dei significati dei monologhi proposti (in italiano e in inglese) compongono così uno spettacolo unico nel suo genere, fitto di di spunti di comicità e cabaret che si mescolano naturalmente a riflessioni filosofiche. Ogni messa in scena vede un percorso irripetibile tra i testi scelti dal pubblico tramite le carte, per cui ogni replica dello spettacolo comporrà un viaggio diverso, mai uguale al precedente.`,
    image: "/images/ls_shakspearejukebox.webp",
  },
  {
    id: "ginevra-ne-vale-la-pena",
    title: "Ginevra ne vale la pena",
    description: `Lezione-spettacolo su Corteggiamento & Cavalleria

Lo spettacolo racconta e ripercorre il mito arturiano di Lancillotto e Ginevra per osservare il concetto di corteggiamento tra l'antico amor cortese e la disincantata modalità dei rapporti amorosi nella società contemporanea. Alternando i registri del teatro di narrazione e della stand-up comedy, la lezione spettacolo tocca alcuni antichi affascinanti archetipi come il simbolo del Graal, la città ideale di Camelot, il Cavaliere con la sua missione d'onore, la donna vista quale dama divina angelicata. Al centro del racconto c'è il concetto di corteggiamento e il suo destino: dalle ammalianti storie cavalleresche fino al mondo odierno funestato da molestie e digitalizzazione delle relazioni umane`,
    image: "/images/ls_ginevranevalelapena.webp",
  },
  {
    id: "prestatemi-orecchio",
    title: "Prestatemi orecchio",
    description: `Lezione-spettacolo sul Giulio Cesare e l'arte della retorica

Analizzando il capolavoro di William Shakespeare, la lezione-spettacolo, in cui si alternano i registri del teatro di narrazione, della filosofia e della stand-up comedy, racconta l'arte della retorica e il potere della parola, la bellezza del linguaggio e il suo potere ammaliante in grado di mutare la storia, attraverso uno dei momenti fondamentali della civiltà occidentale. La storia raccontata da Shakespeare viene ripercorsa per comprendere l’idea stessa di comunicazione e scambio interumano.`,
    image: "/images/spettacolo-placeholder.svg",
  },
  {
    id: "orfeo-le-selkies-e-mi-nonnu",
    title: "Orfeo, le Selkies e mi Nonnu",
    description: `Lezione-spettacolo sulle discese nell'Abisso

Lo spettacolo intreccia le narrazioni di tre storie mitologiche provenienti da tre bacini folklorici differenti: quello ellenico, quello celtico e quello marchigiano. Si snoda così un racconto che, attorno al tema del viaggio tra i morti, tocca il mito greco di Orfeo, la leggenda delle magiche fanciulle-foca delle isole dei mari del nord dette Selkie, e una fiaba del focolare della tradizione fermano-maceratese narrata in versi. La lezione-spettacolo si svolge alternando letture sceniche e uno storytelling originale in cui si alternano approfondimenti filosofici e letterari e momenti di stand-up comedy`,
    image: "/images/ls_orfeo.webp",
  },
  {
    id: "fate-caprine-cavalieri-erranti",
    title: "Fate Caprine & Cavalieri Erranti",
    description: `Lezione-spettacolo su Miti e Leggende dei Monti Sibillini.

I Sibillini sono culla di antichi e preziosi miti, dalla figura della Sibilla Appenninica sino a quelle, non meno enigmatiche, delle Fate dai piedi di capra e dei folletti chiamati “Mazzamurelli”. Partendo dalle vicende narrate da Antoine de La Sale e da Andrea Barberino, lo spettacolo racconta e interpreta la storia dell’eroe noto come Guerrin Meschino – il suo peregrinare in tutto il mondo conosciuto, dall'Asia all’Irlanda, passando per i Monti Sibillini –, per confrontare la sua icona con quella di altri grandi eroi delle tradizioni leggendarie greche, celtiche e norrene. Lo spettatore è coinvolto in un viaggio affascinante nella tradizione folklorica marchigiana ed europea, attraverso un sorprendente mescolarsi di teatro di narrazione, divulgazione filosofica e stand-up comedy.`,
    image: "/images/ls_fatecaprineecavalierierranti.webp",
    legacy_ref: "fate-caprine",
  },
  {
    id: "cercasi-silvia-disperatamente",
    title: "Cercasi Silvia disperatamente",
    description: `Lezione-spettacolo su Giacomo Leopardi.

Lo spettacolo racconta in modo alternativo la vita e l’opera del poeta Giacomo Leopardi, presentandolo non come lo sfortunato gobbo di provincia che ci viene descritto da tanta tradizione, bensì come un supereroe del pensiero contemporaneo, un giovane ribelle che scelse la via disperata della letteratura per sfidare il mondo in nome della verità. Con un percorso che mescola l’ironia del cabaret e la divulgazione filosofica, il monologo alterna letture sceniche e storytelling, sottolineando il carattere veracemente “marchigiano” di Leopardi, tra vizi e virtù tipiche di questa terra e del suo parlato. Possono accompagnare lo spettacolo musiche originali eseguite dal vivo che sottolineano aspetti della filosofia e dell'esistenza del poeta marchigiano.`,
    image: "/images/spettacolo-placeholder.svg",
  },
  {
    id: "se-sei-perseo",
    title: "Se Sei Perseo",
    description: `Lezione-spettacolo su Medusa e il concetto di coscienza

Lo spettacolo narra il mito di Perseo e la sua caccia a Medusa, evocandone il profondo portato metaforico nel rapporto tra l'idea di coscienza soggettiva e i suoi terrori più originari. Seguendo il viaggio dell'eroe compiuto da Perseo, gli spettatori incontrano l'antico mito greco per scorgerne i significati filosofici e psicologici profondamente vivi nel mondo contemporaneo. Mescolando i linguaggi del teatro di narrazione e della stand-up comedy, il monologo propone una lettura vibrante e affascinante di un'antica storia, sempre nuova.`,
    image: "/images/ls_seseiperseo.webp",
  },
  {
    id: "il-labirinto-e-l-abbandono",
    title: "Il Labirinto e l'Abbandono",
    description: `Lezione-spettacolo sul mito di Arianna e Teseo.

Lo spettacolo, narrando il mito di Arianna e Tese si muove attorno all'archetipo dell'abbandono tra la cultura classica e quella contemporanea. Viene esplorato il simbolo del labirinto nei suoi molteplici rimandi filosofici e letterari, invitando il pubblico a un cammino simile a quello dell'eroe della storia. Mescolando i linguaggi del teatro di narrazione e della stand-up comedy, il monologo propone una rilettura originale e vibrante di una delle storie fondative della tradizione occidentale`,
    image: "/images/ls_labirintoeabbandono.webp",
    legacy_ref: "labirinto",
  },
  {
    id: "l-urlo-della-farfalla",
    title: "L'Urlo della Farfalla",
    description: `Lezione-spettacolo su Jim Morrison e il mito di Dioniso

Attraverso un racconto della vita e della figura del poeta rock-star Jim Douglas Morrison, lo spettacolo propone un'esplorazione filosofica e culturale dell'antico mito di Dioniso che, in forma post-moderna, ebbe in qualche modo a rivivere nella figura luminosa e maledetta del frontman dei Doors. Nella lezione-spettacolo, che vede la presenza di un attore-narratore e di una cantante polistrumentista, si alternano letture drammatizzate dei testi di Morrison, canzoni riarrangiate del repertorio dei Doors, e uno storytelling originale in cui la narrazione del mito ellenico si intreccia con quella della biografia del poeta-cantante americano.`,
    image: "/images/ls_urlodellafarfalla.webp",
    legacy_ref: "urlo-farfalla",
  },
  {
    id: "giura-che-senza-me-mai-piu-godrai",
    title: "Giura che senza me mai più godrai",
    description: `Lezione-spettacolo sulle Eroidi di Ovidio

Un'attrice diventa, nel tempo sospeso della lezione-spettacolo, Fillide, Briseide, Laodamia, Fedra, ripercorrendo le parole, gli entusiasmi e i terrori delle immortali Heroides, le Lettere in distici elegiaci che Ovidio immaginò essere inviate da alcune eroine abbandonate ai rispettivi uomini lontani. Con un approccio devoto al testo latino, un'inedita traduzione- riscrittura trasforma le Lettere delle eroine ovidiane in affreschi-monologhi per portare sulla scena le scompaginanti tinte emotive del testo. Mescolando un recupero della cultura e della recitazione classiche con l'ironia della stand-up comedy, la lezione-spettacolo vede alternarsi recitazione, letture sceniche, musiche dal vivo e uno storytelling critico originale in cui gli spettatori sono accompagnati negli aspetti simbolici, filosofici e letterari del mito. Vengono così evocati archetipi profondi della psiche umana, quali l'amore e la mancanza, la rabbia e la tenerezza, affrescati stupendamente da Ovidio e ancora presenti prepotentemente nella società globale contemporanea`,
    image: "/images/spettacolo-placeholder.svg",
  },
  {
    id: "gangs-or-love",
    title: "Gangs Or Love",
    description: `Lezione-spettacolo su Romeo&Juliet e l'adolescenza

Alternando uno storytelling critico e letture sceniche, la lezione-spettacolo propone al pubblico un viaggio interattivo nei significati letterari e filosofici di Romeo e Giulietta di William Shakespeare, raccontando altresì la genesi e le fonti che sono alla base della tragedia del Bardo. Con rimandi comparativi ad altri miti di amore infranto e totalizzante, la lezione spettacolo prende in esame i vari personaggi del copione e il loro profilo psicologico, per offrire una visione d'insieme dell'opera in riferimento al lettore/spettatore odierno. Nella lezione-spettacolo si alternano registri differenti, in un mescolarsi di divulgazione umanistica e ironia da stand-up comedy. La lezione-spettacolo prevede la presenza in scena di un attore-storyteller e di un'attrice. I dialoghi sono proposti sia in lingua originale inglese che in traduzione originale italiana.`,
    image: "/images/spettacolo-placeholder.svg",
  },
  {
    id: "pasticci-di-puck",
    title: "Pasticci di Puck",
    description: `Lezione-spettacolo su Shakespeare e la follie d'amore

Descrizione in arrivo. Contattaci per maggiori informazioni su questo spettacolo.`,
    image: "/images/spettacolo-placeholder.svg",
  },
  {
    id: "la-vuota-corona",
    title: "La vuota corona",
    description: `Lezione-spettacolo sui re matti shakespeariani

Il teatro di William Shakespeare tocca centralmente il tema del valore ieratico della regalità, che ebbe la sua più piena definizione e si incarnò, storicamente, in vari sovrani. Shakespeare descrisse profondamente il carattere e le vicende di vari regnanti, da Riccardo II a Enrico V, da MacBeth a Riccardo III. Lo spettacolo ripercorre la vicende raccontate da Shakespeare e si sofferma sul senso stesso della regalità sacra, proponendo una serie di parallelismi tra i Re shakespeariani e specifiche sindromi psicologiche, nonché un percorso storico atto a sottolineare i legami profondi tra l'epoca medievale e quella moderna. Mescolando il teatro di narrazione e l’ironia della stand-up comedy, lo spettacolo si struttura attraverso una serie di letture sceniche che si alternano a musiche originali realizzate dal vivo da due musicisti, e a uno storytelling che guida il pubblico nelle riflessioni svolte e nelle vicende narrate.`,
    image: "/images/ls_lavuotacorona.webp",
  },
  {
    id: "le-streghe-e-il-destino",
    title: "Le Streghe e il Destino",
    description: `lezione spettacolo sul Macbeth

Descrizione in arrivo. Contattaci per maggiori informazioni su questo spettacolo.`,
    image: "/images/ls_stregheedestino.webp",
  },
  {
    id: "tue-so-le-laudi",
    title: "Tue so' le laudi",
    description: `Lezione-spettacolo su Fra Pacifico e il Cantico di Frate Sole

Partendo dai significati mistici, letterari e simbolici del Cantico di Frate Sole , lo spettacolo apre una suggestione sulla problematica genesi del testo, percorrendo l'ipotesi secondo la quale un ruolo determinante, nella composizione del Cantico, possa essere stato svolto dal trobadore ascolano Guglielmo Divini, noto come “Rex Versuum”, il quale divenne, nella seconda parte della sua esistenza, uno dei più stretti compagni di Francesco assumendo il nome di Frate Pacifico. Lo spettacolo esplora e racconta, tra storia e fantasia, la vita di Pacifico/Guglielmo, ripercorrendone le tracce e osservando, tra le righe, il messaggio francescano inteso non come mera rinuncia alla vita, ma come massima scoperta di essa. La figura di Francesco e il senso del Cantico narrati nel monologo si mescolano così alla trama fiabesca e affascinante di questo poeta marchigiano. Mescolando naturalmente i registri del teatro letterario di narrazione e della stand-up comedy, questo monologo, partendo dalle Fonti Francescane, conduce il pubblico a un viaggio affascinante e romantico nella vita incredibile di Pacifico, rivelando uno squarcio su un momento fondamentale della storia culturale dell'Europa. Lo spettacolo è accompagnato da musiche dal vivo originali, eseguite con strumenti etnici, ispirate al racconto del monologo`,
    image: "/images/ls_tuesolelaudi.webp",
  },
  {
    id: "contro-il-morire-della-luce",
    title: "Contro il morire della luce",
    description: `Lezione-spettacolo su Dylan Thomas

Il leggendario poeta gallese Dylan Thomas viene raccontato in questo spettacolo ripercorrendo il tumultuoso e romantico amore che lo legò all’attrice, ballerina e pittrice Caitlin MacNamara. Attraverso gli occhi di Caitlin, moglie di Dylan Thomas sino alla prematura morte dello scrittore, il pubblico incontra la genialità visionaria di questo poeta sconvolgente, la cui vita fu segnata dagli eccessi e dall’alcool e i cui versi magici sono stati in grado di ispirare generazioni di artisti, fino ed oltre Bob Dylan. Lettere originali di Dylan e Caitlin, poesie in italiano e inglese, storytelling e analisi critica si alternano agilmente nello spettacolo, accompagnato da musiche della tradizione celtica. Un attore-narratore, un’attrice e una musicista danno vita alla scena`,
    image: "/images/spettacolo-placeholder.svg",
  },
  {
    id: "l-importanza-di-essere-wild-e",
    title: "L'importanza di essere Wild(e)",
    description: `Lezione-spettacolo su Oscar Wilde

La lezione-spettacolo racconta la vita e l'opera di Oscar Wilde soffermandosi, in modo particolare, sulla vicenda del suo processo e sul portato culturale di tale vicen da. La narrazione si svolge in un alternarsi di letture sceniche, storytelling critico e una musica originale realizzata con strumenti etnici irlandesi. Nel racconto gli spet tatori sono invitati a un incontro con la personalità e lo stile letterario di Wilde, alla scoperta dei significati più profondi e toccanti dei suoi scritti.`,
    image: "/images/spettacolo-placeholder.svg",
  },
  {
    id: "la-vita-invisibile",
    title: "La vita invisibile",
    description: `Lezione-spettacolo su WB Yeats e i miti d'Irlanda

Lo spettacolo propone un viaggio ideale e magico attraverso le fiabe e la storia d’Irlanda, con particolare attenzione alla vicenda della sua indipendenza; il tutto, attraverso gli occhi delle donne che hanno amato e stimato il poeta più celebre e controverso dell’Isola, il bardo visionario W.B. Yeats. Un viaggio ideale nei luoghi più affascinati e magici della terra d’Irlanda, in una sorta di esplorazione letteraria di questa nazione, della sua magia e della sua storia. Per la durata lo spettacolo si è magicamente trasportati tra la gente e i paesaggi incantati d’Irlanda, tra pinte di birra scura, folletti chiamati Leprechaun, fate e trifogli magici. Musiche originali dal vivo della tradizione irlandese, con strumenti etnici, accompagno lo storytelling e la recitazione`,
    image: "/images/ls_irlandaevitainvisibile.webp",
  },
  {
    id: "la-musa-nel-bicchiere",
    title: "La mUSA nel bicchiere",
    description: `Lezione-spettacolo su 3 scrittori americani e i loro cocktail.

Lo spettacolo racconta le vite le opere di cinque scrittori americani del XX secolo e la loro passione, talvolta fatale, per i cocktail. Il famoso Daiquiri di Hemingway; il Gin Rickey di F.S. Fitzgerald; il Ramos Fizz adorato da Tennesse Williams; il Martini Cocktail sorseggiato da Anne Sexton; il Mint Julep amato da Faulker, celano le storie dietro ai grandi libri di questi autori. Gli spettatori sono condotti in una sorta di viaggio eno-letterario tra le strade e la cultura d'America, in un alternarsi di narrazioni originali e letture sceniche, in un incontro di registri differenti in cui si mescolano la critica, il teatro di narrazione e la stand-up comedy. Accompagna la lezione-spettacolo una colonna sonora dal vivo, ispirata ai più grandi successi di Joni Mitchell rivisitati in un arrangiamento originale.`,
    image: "/images/ls_lamusanelbicchiere.webp",
  },
  {
    id: "rien-de-rien",
    title: "Rien de Rien",
    description: `Lezione-spettacolo su Arthur Rimbaud e Edith Piaf.

La Lezione-spettacolo racconta le vite di Arthur Rimbaud e di Edith Piaf, mescolandone le vicende in una sorta di destino comune segnato dal loro essere artisti “maledetti” dalla benedizione stupenda e insopportabile del loro talento. Alternando sotrytelling, musica dal vivo e letture sceniche, lo spettacolo porta gli spettatori in un viaggio nella Francia moderna, attraverso analisi letterarie, canti a cappella, approfondimenti filosofici e spunti di stand-up comedy`,
    image: "/images/ls_rienderien.webp",
    legacy_ref: "rien-de-rien",
  },
  {
    id: "frankenstein-love",
    title: "Frankenstein Love",
    description: `Lezione-spettacolo su Mary e Percy Shelley.

Attraverso un racconto della vita della sua autrice, Mary Shelley, e del grande amore della sua vita, il poeta ribelle Percy Bysshe, lo spettacolo racconta la genesi, i significati simbolici e filosofici del romanzo di Frankenstein, immaginato e composto dalla scrittrice quando era una ragazza giovanissima. Letture drammatizzate, musiche originali e uno storytelling criticano guidano il lettore tra i misteri e la bellezza di uno dei grandi classici della letteratura europea, per un'immersione coinvolgente nello spirito e nell'età del Romanticismo letterario`,
    image: "/images/spettacolo-placeholder.svg",
  },
  {
    id: "la-geniale-cortigiana",
    title: "La geniale cortigiana",
    description: `Lezione-spettacolo su Veronica Franco

Lo spettacolo racconta la storia della vita di Veronica Franco, poetessa e cortigiana nella Venezia del Cinquecento. Forse la poetessa più complessa e profonda del suo tempo, esercitò inoltre il mestiere di cortigiana divenendo celeberrima in tutta Europa. La vicenda di Veronica è quella, a tratti scabrosa, di una donna quanto mai moderna, che sacrifica ogni cosa in nome della sua indipendenza, del suo talento e della sua libertà. Lo spettacolo vede alternarsi interventi critici, letture sceniche, momenti di recitazione, e le musiche originali di Fabio Capponi al pianoforte-tastiera. Uno storytelling originale, in cui la divulgazione filosofica si mescola all’ironia del cabaret, accompagna lo spettatore alla scoperta della figura di Veronica Franco: scrittrice e intellettuale a lungo sottovalutata, ma tra gli autori più interessanti della Rinascimento; donna che lottò, in nome della propria indipendenza e libertà, contro i pregiudizi e le prevaricazioni sociali della sua società.`,
    image: "/images/ls_lagenialecortigiana.webp",
  },
  {
    id: "in-terribile-stato",
    title: "In Terribile Stato",
    description: `Lezione-spettacolo su Pier Paolo Pasolini

Lo spettacolo racconta la vita e l'opera di Pier Paolo Pasolini, intrecciando uno storytelling originale, letture sceniche dei testi del poeta, testi di interviste rilasciati da Pasolini stesso nel corso della sua vita, esecuzioni dal vivo di canzoni folk italiane. L'esplorazione dell'opera pasoliniana diventa un viaggio nella coscienza civile e sociale dell'Italia e nelle sue tragiche crepe. Particolare importanza assume, nel racconto, il rapporto tra il poeta e sua madre Susanna, narrato al pubblico nel suo cruciale significato all'interno del percorso pasoliniano tra cinema e letteratura.`,
    image: "/images/ls_interribilestato.webp",
  },
  {
    id: "lezione-spettacolo-su-heidegger-e-il-nazismo-esoterico",
    title: "Lezione-spettacolo su Heidegger e il Nazismo esoterico",
    description: `Descrizione in arrivo. Contattaci per maggiori informazioni su questo spettacolo.`,
    image: "/images/spettacolo-placeholder.svg",
  },
  {
    id: "per-profondersi-in-un-bacio",
    title: "Per profondersi in un bacio",
    description: `Lezione-spettacolo su Hölderlin e Keats

Descrizione in arrivo. Contattaci per maggiori informazioni su questo spettacolo.`,
    image: "/images/spettacolo-placeholder.svg",
  },
  {
    id: "ma-tu-sei-la-pianta",
    title: "Ma tu sei la pianta",
    description: `Lezione-spettacolo sulla mistica di Maria di Nazareth

Descrizione in arrivo. Contattaci per maggiori informazioni su questo spettacolo.`,
    image: "/images/spettacolo-placeholder.svg",
  },
  {
    id: "mai-figli-per-questo-mondo",
    title: "Mai figli per questo mondo",
    description: `Lezione-spettacolo sui Catari, Peter Pan e l'antinatalismo

Descrizione in arrivo. Contattaci per maggiori informazioni su questo spettacolo.`,
    image: "/images/spettacolo-placeholder.svg",
  },
];
