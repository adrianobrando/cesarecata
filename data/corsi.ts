type CourseSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type Course = {
  title: string;
  subtitle?: string;
  audience?: string;
  paragraphs: string[];
  sections?: CourseSection[];
};

export const corsi: Course[] = [
  {
    title: "Le Parole degli Eroi",
    subtitle: "Percorso didattico",
    audience: "Per gli alunni della V Elementare",
    paragraphs: [
      "Il percorso didattico mira a un potenziamento linguistico ed espressivo degli alunni partecipanti, attraverso un una scoperta delle fiabe e dei miti di diverse tradizioni. Il percorso si propone di portare gli alunni a una acquisizione consapevole di nuovi vocaboli, fornendo altresì una conoscenza di base della struttura delle parole attraverso l'incontro con le etimologie greche e latine dei termini italiani.",
      "Il percorso possiede una struttura multidisciplinare, in cui allo studio e alla conoscenza della lingua italiana con le sue etimologie si affiancano approfondimenti negli ambiti della intercultura, della geostoria, della filosofia, della lingua francese e della lingua inglese. Concentrandosi su miti e fiabe e dunque sulle strutture narrative alla base dei racconti tradizionali, il percorso costituisce inoltre una introduzione all'arte dello storytelling, utile per gli alunni al fine di apprendere le forme tramite cui comunicare concetti complessi e declinare in forma scritta e orale il proprio stato interiore ed emotivo.",
    ],
    sections: [
      {
        title: "Struttura e calendarizzazione degli incontri",
        paragraphs: [
          "Il percorso prevede un totale di 20 ore di didattica, suddivise in dieci incontri. Il monte ore è organizzato in cinque moduli tematici, ognuno dedicato a una specifica tematica mitologico-fiabesca.",
          "Nella parte finale di ogni incontro gli alunni saranno chiamati, con esercizi ludici, a utilizzare le 20 parole nuove acquisite nel corso della lezione. Al termine del percorso, saranno stati acquisiti 100 nuovi vocaboli. Oltre all'ambito linguistico, verrà dato particolare risalto a quello ermeneutico, favorendo e stimolando domande e curiosità dei partecipanti in merito ai racconti proposti, in una continua comparazione tra le avventure degli eroi che vengono narrate e gli stati psicologici soggettivi degli alunni.",
          "L'intero percorso è concepito e calibrato, in termini cognitivi e didattici, appositamente per gli alunni delle classi V del ciclo elementare.",
        ],
      },
    ],
  },
  {
    title: "Amici, prestatemi orecchio",
    subtitle: "Corso di Arte oratoria",
    paragraphs: [
      "Il corso è un’introduzione alle forme e alle tecniche di base del parlare in pubblico, con uno specifico focus sui temi correlati alla Psicologia della Comunicazione Interpersonale, dello Storytelling, e della retorica. I partecipanti sono invitati a un viaggio verso la scoperta dei motivi che rendono funzionale e piacevole un discorso di fronte a una platea. Nel percorso, verranno affrontati specialmente i difetti, le paure, le difficoltà del “prendere la parola”, al fine di comprendere come fare i conti con i propri limiti personali e caratteriali, migliorando la propria espressività. Obiettivo formativo del corso è rendere i partecipanti consapevoli del linguaggio che essi utilizzano in ambito lavorativo e interpersonale in contesti di relazioni interpersonali, al fine di migliorare le proprie capacità comunicative.",
      "Il corso si caratterizza per due fondamentali peculiarità didattiche. A differenza della maggior parte dei percorsi dedicati al public speaking, nel presente progetto formativo non vengono trasmesse delle tecniche standard; all’inverso, il corso prende le mosse dalla persona, dalle sue peculiarità vocali, fisiche, caratteriali, per trovare la sua specifica forma espressiva più efficace. Non si tratta di uniformarsi a un modello, ma di trovare la propria voce. Inoltre, il presente progetto propone tecniche di comunicazione per il mondo odierno analizzando le grandi lezioni degli autori classici (Aristotele, Cicerone, Shakespeare, tra gli altri); un’eredità preziosa per chi sappia utilizzare tale conoscenza nel contesto del parlare in pubblico.",
    ],
    sections: [
      {
        title: "Topiche",
        items: [
          "Introduzione alla Retorica Classica",
          "Tecniche retoriche ed espressive",
          "Filosofia dello Storytelling",
          "Elementi di dizione e di prossemica",
          "Analisi delle fonti letterarie sull’oratoria",
          "Analisi di celebri discorsi pubblici nel mondo contemporaneo",
          "Introduzione alla Psicologia della Comunicazione",
        ],
      },
      {
        title: "Obiettivi",
        items: [
          "Osservazione dei mezzi base per parlare efficacemente di fronte a una platea",
          "Conoscenza e utilizzo di strategie retoriche e narrative nel discorso pubblico",
          "Analisi e comprensione di blocchi e problemi espressivi",
          "Potenziamento delle capacità linguistiche, retoriche ed espressive",
          "Scoperta e valorizzazione delle personali capacità comunicative",
        ],
      },
    ],
  },
  {
    title: "C’era una volta dunque vi sarà",
    subtitle: "Corso di Storytelling",
    paragraphs: [
      "L’antica arte del narrare storie affonda le sue radici nell’epica di Omero e ancor più lontano; oggi, sotto il nome di storytelling, essa è al centro del dibattito per le sue nuove applicazioni nei campi più importanti della comunicazione contemporanea: dalle dinamiche aziendali ai social network, dalle pubblicità alle strategie politiche. Questo corso conduce i partecipanti in un viaggio alla scoperta delle strutture e dei significati che sono alla base dell’invenzione e della costruzione delle storie; e di come queste possano applicarsi ai linguaggi della contemporaneità e nella vita di ognuno. Il Corso si caratterizza per tre peculiarità didattiche.",
    ],
    sections: [
      {
        title: "Le peculiarità didattiche",
        items: [
          "Si parte da lontano per arrivare molto vicino: osservando come la letteratura fornisca gli strumenti fondamentali per la costruzione di una storia, anche nell’ambito della comunicazione contemporanea.",
          "Ci si soffermerà in modo particolare, sul rapporto tra persona e racconto, con giochi ed esercizi pratici volti a mettere in luce i personali elementi di ognuno nell’invenzione narrativa.",
          "Si interrogheranno l’epica antica, il cinema e le fiction, per capire alcuni tratti comuni delle grandi storie, e come questi vengano utilizzati per la comunicazione pubblica, privata e aziendale dei nostri giorni.",
        ],
      },
      {
        title: "Topiche",
        items: [
          "Elementi di narratologia nell’epica classica e nella letteratura moderna: come funzionano i racconti",
          "Uso della narrazione nella comunicazione aziendale",
          "Tecniche di narrazione efficace",
          "Uso della narrazione tra letteratura e pubblicità",
          "Personal branding attraverso il racconto di sé",
          "Forme della narrazione tra letteratura e fiction",
        ],
      },
      {
        title: "Obiettivi",
        items: [
          "Conoscenza e acquisizione delle tecniche fondamentali del racconto nel discorso pubblico e nella comunicazione interpersonale e digitale",
          "Conoscenza delle modalità di storytelling nelle pubblicità e nel branding",
          "Capacità analitica di comprensione delle sovrastrutture narrative nella comunicazione contemporanea",
        ],
      },
    ],
  },
  {
    title: "Il Fuoco della Parola",
    subtitle: "(per)Corso di Filosofia e Scienze Umane alla riscoperta del linguaggio",
    paragraphs: [
      "Il corso si struttura come un viaggio avventuroso attraverso alcuni termini-chiave della tradizione filosofica. Nella ferma convinzione di una correlazione essenziale tra mente e linguaggio, l'esplorazione di nuove parole viene intesa nel presente percorso didattico come un ampliamento della coscienza personale del singolo soggetto partecipante.",
      "Attraverso un approfondimento analitico di ogni termine, verranno osservati i suoi significati, le sue radici etimologiche, l'utilizzo che ne hanno fatto i grandi autori in ambito umanistico e, infine, l'utilizzo che possiamo farne noi nella nostra esistenza quotidiana. Attraverso l'analisi delle parole, i partecipanti sono sia condotti a un arricchimento del proprio universo linguistico e comunicativo, sia messi a confronto con un quadro generale alla storia della filosofia e delle scienze umane nelle sue tappe fondamentali. Il (per)corso si svolge in forma seminariale, con dibattiti che accompagnano costantemente la lezione frontale.",
    ],
  },
  {
    title: "“How stand I then?”",
    subtitle:
      "Alla scoperta del linguaggio e dell'intelligenza emotiva con il teatro di Shakespeare",
    audience: "Percorso Didattico per le Classi IV e V dei Licei",
    paragraphs: [
      "Il percorso didattico mira a un potenziamento linguistico ed espressivo degli alunni partecipanti, per una (ri)scoperta delle capacità di analisi e comprensione di un testo complesso in relazione alla gestione della propria intelligenza emotiva. In questa prospettiva, viene proposto ai partecipanti un incontro con alcuni testi del teatro shakespeariano e con i concetti e i termini in esso contenuti, sia in in lingua italiana che in in lingua inglese, e sempre in relazione alle etimologie dei vari vocaboli presi in esame.",
      "La sfera emotiva rappresenta un punto focale dell'attività formativa in chiave umanistica: il riconoscimento, l'accettazione, la consapevolezza e la capacità di esprimere e condividere i moti interiori dello spirito sono infatti alcuni tra i traguardi più alti dell'educazione umanistica. In questo senso, il teatro di William Shakespeare può fungere come un'importante e intrigante chiave per veicolare le capacità di riconoscimento e comunicazione dei propri sentimenti, fornendo quegli strumenti espressivi e di autonalisi che divengono sempre più deficitaria nella nuova realtà contemporanea. Mancando infatti i termini-concetti essenziali in una sempre crescente penuria verborum, ciò che non viene espresso rimane pericolosamente nebuloso, per una sorta di alessitimia globale, nei confronti della quale la letteratura e la filosofia possono fornire un prezioso antidoto.",
      "Nel suo corpus teatrale, Shakespeare ha fissato una serie di archetipi relativi alla psiche umana, che oggi, nella forma plastica e godibile delle storie teatrali, può avere nei confronti delle relazioni umane una funzione di specchio emotivo: riconoscendo, cioè, in alcuni grandi personaggi del teatro shakespeariano elementi comuni con il proprio sentire, il soggetto può altresì imparare a osservare, gestire e comunicare i medesimi stadi interiori – spesso estremi, corrosivi, potenzialmente distruttivi– della propria sfera emotiva. Fine formativo del presente progetto è infatti fornire ai ragazzi partecipanti una suggestione di utilizzo del teatro e della letteratura in termini comunicativi e interrelazionali. I testi shakespeariani possono infatti essere utilizzati quale chiave per decifrare, mettere a fuoco e condividere stati interiori, altrimenti sovente incomprensibili e ineffabili.",
      "L'acquisizione di tale; la scoperta consapevole del mondo dell'emotività è in grado di fornire quei mezzi – espressivi, simbolici, logici – con i quali il soggetto diviene in grado di fare i conti con i propri sentimenti, declinandoli all'interno della propria esistenza e della società in cui si trova ad essere. In un tale percorso, l'arricchimento lessicale e psicologico che il teatro shakespeariano è in grado di offrire può porsi come un scrigno di straordinaria utilità.",
    ],
    sections: [
      {
        title: "Calendario tematico degli incontri",
        paragraphs: [
          "Il percorso si svolge in cinque incontri di 3 h ciascuno, nei quali, in un format originale, viene raccontato il teatro shakespeariano nelle sue possibili declinazioni didattiche relativamente alla sfera della educazione emotiva; in ogni incontro, si alternano momenti di approfondimento ermeneutico del testo con suggestioni formative e didattiche.",
        ],
        items: [
          "I incontro — Amare da morire: Romeo e Giulietta e la scoperta dell'amore",
          "II incontro — Il giorno più brutto: Macbeth e la scoperta della violenza e dell'orrore",
          "III incontro — Pensieri di sangue: Amleto e la scoperta della della disperazione",
          "IV incontro — Tutto per un fazzoletto: Otello e la scoperta della rabbia e dell'ansia",
          "V incontro — Purché non si chiami Beatrice: Molto rumore per nulla e la scoperta della felicità",
        ],
      },
      {
        title: "Obiettivi del percorso didattico",
        items: [
          "Potenziamento delle capacità espressive tramite un percorso ragionato nelle tecniche dello storytelling",
          "Acquisizione di nuovi vocaboli in una prospettiva comparativa e interdisciplinare tra la lingua inglese, italiana, e le radici etimologiche latine e greche dei termini",
          "Approfondimento delle tecniche di comprensione e analisi logico-ermeneutica di un testo complesso, in relazione alle proprie emozioni e al proprio universo emotivo",
          "Affinamento delle capacità comunicative, relazionali e introspettive, tramite interpretazioni e analisi delle storie narrate, in una costante comparazione tra le caratteristiche dei protagonisti dei copioni e gli alunni partecipanti",
          "Miglioramento delle capacità mnemoniche e creative",
        ],
      },
    ],
  },
];
