import BooksCarousel from "@/components/ui/BooksCarousel";
import Hero from "@/components/ui/Hero";
import { libri } from "@/data/libri";

const curatele = [
  "P.L. Travers, La sapienza segreta delle api (Liberilibri, 2018)",
  "N. Cusano, Sermoni sul Dio Inconcepibile (Il Nuovo Melangolo, 2009)",
  "H.D. Thoreau, Una passeggiata d'inverno (Il Nuovo Melangolo, 2013)",
  "Per sempre Romantici. Antologia della poesia inglese e tedesca ad uso di spiriti ribelli (Liberilibri, 2022)",
  "Libertini libertine. Avventure e filosofie del libero amore da Lord Byron a George Best (Liberilibri, 2018)",
  "A caccia dell'Infinito. L'Umano e il Divino nell'opera di Nicola Cusano (Aracne, 2010)",
  "Gottfried W. Leibniz, Consilium Aegyptiacum. (Il Cerchio, 2011)",
];

const articoliAccademici = [
  "Perspicere Deum: Nicholas of Cusa and European Art of the Fifteenth Century, in “Viator. Medieval and Renaissance Studies”, UCLA University, Volume 39, No.1 (2008), pp. 285-305.",
  "Viewed Through the Looking Glass: Human Nature as a Mystical Mirror in the Conception of “sapientia” of Charles de Bovelles, in “Intellectual History Review”, vol. 21, 3, (2011), pp. 307-316.",
  "Il Cardinale e l’Eretico. Il problema della eredità “eterodossa” di Meister Eckhart nel pensiero di Nicola Cusano, in “Viator. Medieval and Renaissance Studies”, UCLA University, Volume 41, No. 2 (2010), pp. 269-291.",
  "Forking Paths in Sixteenth Century Philosophy. Charles de Bovelles and Giordano Bruno, in “Viator. Medieval and Renaissance Studies”, UCLA University, Volume 40, No. 2 (2009), pp. 381-392.",
  "L’idea di “anima stellata” nel Quattrocento fiorentino. Andrea da Barberino e la teoria psico-astrologica in Marsilio Ficino, in “Bruniana & Campanelliana”, XVI, 2 (2010), pp. 629-639.",
  "Il Rinascimento sulla via di Damasco. Il ruolo della teologia di San Paolo in Marsilio Ficino e Nicola Cusano, in “Bruniana & Campanelliana”, XIV (2008), No. 2, pp. 523-534.",
  "Su di una stessa barca: Nicola Cusano e Giorgio Gemisto Pletone, in “Bruniana & Campanelliana”, XII (2007), No. 1, pp. 43-56.",
  "In pellegrinaggio verso il Sé. La Sapientia come conoscenza interiore in Charles de Bovelles, in “Lo Sguardo - Rivista di Filosofia”, N. 10 (2012) III, pp. 221-235.",
  "Lumen requirunt lumine. Marsilio Ficino, Nicola Cusano e l’iconografia dei Magi nel Rinascimento, in “Philosophical Readings”, VII.1 (2015), pp. 110-132.",
  "Die paradoxale Frage der Drei Weisen. Die Idee des Unum infinitum im Sermo CCXVI des Nikolaus von Kues, in “Coincidentia. Zeitschrift für europäische Geistesgeschichte”, 1/2 (2010), pp. 319-328.",
  "Il lapsus della critica italiana novecentesca: il caso letterario “Amelia Rosselli”, in “Italianistica. Rivista di letteratura italiana”, XXXVIII, 1 (2009), pp. 149-174.",
  "Le pagine, le ore, le falene. Confessione e dissimulazione del Sé nel Diario e nei romanzi di Virginia Woolf, in “Lo Sguardo - Rivista di Filosofia”, n. 11, 2013, pp. 317-339.",
  "Downton Abbey, o dell’armonia perduta nella cultura inglese del Novecento. In “Lo Sguardo - Rivista di Filosofia”, N. 16, 2014 (III), pp. 85-100.",
  "L’Irlanda e i suoi simboli. W.B. Yeats lettore occulto di Giovanni Scoto l’Eriugena, in “Studi Irlandesi. A Journal of Irish Studies”, 3 (2013), pp. 309-322.",
  "Pacifico, Frate, in “Dizionario Biografico degli Italiani” (Istituto della Enciclopedia Italiana Treccani).",
  "L’infini comme non-altérité: La Psychologie des Profondeurs dans la pensée de Nicolas de Cues, in “Infini et Altérité dans l'oeuvre de Nicolas de Cues”, Paris-Leuven-Bristol, Peeters Publishers, 2017, pp. 173-184.",
  "L’infinito nella mente. Il Dio di Cusano e Carl Gustav Jung, in “Niccolò Cusano. L’uomo i libri, l’opera. Atti del LII Convegno storico internazionale Todi, 11-14 ottobre 2015”, Spoleto, CISAM, pp. 537-546.",
  "Cusanus’ Revival of Eriugena as a Renaissance Redefinition of Christian Orthodoxy?, in A. Kijewska, R. Majeran, H. Schwaetzer (editors), “Eriugena Cusanus”, Lublin, 2011, pp. 59-72.",
  "Il Cavaliere cristiano medievale e il Samurai nipponico. Per una proposta di approccio interculturale come philosophia actualis, in M. Ghilardi (a cura di), “Vie per un'estetica interculturale”, Mimesis, Milano 2008, pp. 43-86.",
  "Nicola Cusano e una tradizione neoplatonica abscondita, in C. Catà (editor), “A caccia dell’infinito. L’Umano e la ricerca del Divino nell’opera di Nicola Cusano”, Aracne Editrice, Roma 2010, pp. 213-252.",
  "Scempio del tempo. Lo smarrimento metafisico del Soggetto nel Riccardo II di William Shakespeare, in M. Tempera (a cura di), “Richard II dal testo alla scena”, EMIL, 2015, pp. 51-73.",
  "Con l’alloro sotto il saio. Ipotesi su Fra Pacifico, Re dei Versi, in “Picenum Seraphicum. Rivista di studi storici e francescani”, n. XXV (2006-2008), pp. 355-395.",
  "Un Rinascimento tra Petrarca e passione. Il Neoplatonismo “corporeo” della poesia di Veronica Franco, in “La Parola del testo. Semestrale di filologia e letteratura europea dalle origini al Rinascimento”, No. 2 (2009), pp. 357-373.",
  "Raccontando tristi storie della morte dei re. Testo, contesto e rappresentazioni del Riccardo II di William Shakespeare, in “Testi e linguaggi. Rivista di studi letterari, linguistici e filologici”, 7/2013, pp. 243-256.",
  "Beatificatio, Baraka, Contractio, Tzimtzum. Nicola Cusano e la leggenda dei Tre Anelli, in “Quaderni di Studi Indo-Mediterranei”, VI (2013), pp. 161-180.",
  "“Before Ireland was made”. Il Nazionalismo Neoplatonico di William Butler Yeats, in “Studi Interculturali”, 1 (2013), pp. 13-38.",
  "Eretico Potere Ieratico. Il Liber Augustalis di Federico II di Svevia e il Riccardo II di Shakespeare, in “Tabulae. Rivista del Centro Studi Federiciani”, XXIII (Dicembre 2012), pp. 137-158.",
  "La Corona e il Fantastico. Origini filosofiche e risvolti della leggenda di Federico II come Anticristo, in “Tabulae. Rivista del Centro Studi Federiciani”, XXIII (Dicembre 2011), n. 45, pp. 159-188.",
  "La relazione medico-paziente nella letteratura: Thomas Mann e Virginia Woolf, in L. Capezzani (a cura di), “La relazione di cura medico-paziente. Cosa c'è ancora da sapere”, Linea Edizioni, Padova 2018, pp. 427-438.",
  "Giulietta come aporia. William Shakespeare e l'idea di Amore nel Platonismo del Rinascimento, in “Proceedings of the ‘Shakespeare and His Contemporaries’ Graduate Conference 2009, 2010, 2011”, edited by M. Roberts, The British Institute of Florence, Firenze, 2012, pp. 55-64.",
  "La vera statura di Titania. J.R.R. Tolkien lettore ostile di William Shakespeare, in “Itinerari”, n. 2 -2014, pp. 108-121.",
  "Una Santiago chiamata Mordor. L’idea di Homo Viator ne Il Signore degli Anelli di J. R. R. Tolkien, in “Compostella. Rivista del Centro Italiano di Studi Compostellani”, n. 34 (2012), pp. 32-41.",
  "Il Potere come ultimo Arcano. Tangenze tra il pensiero di Nicola Cusano e Elèmire Zolla, in “Conoscenza Religiosa”, 1 (2010), pp. 26-43.",
  "Essere in cammino. Tolkien e lo statuto filosofico del concetto medievale di “Uomo pellegrino”, in “Minas Tirith. Rivista della Società Tolkeniana Italiana”, I (2010), pp. 25-44.",
  "Prima del terrore per le nostre mani vuote. Lou May Alcott e l’eredità. Prefazione a “Lou May Alcott, L'Eredità”, a cura di V. Mastroianni, L. Ricci, Edizioni Jo March, Perugia, 2015.",
  "I preziosi limites della Contea. Le Piccole Patrie nel Rinascimento Europeo e il rinascimento delle Piccole Patrie nell’Europa Unita, in A. Morganti (a cura di), “Europa: il ritorno dei Piccoli Stati”, Il Cerchio, Rimini, 2012, pp. 30-42.",
  "Jane Austen e la Merrie England. Le radici profonde di un successo, in “Due pollici d’avorio. Rivista della Jane Austen Society of Italy”, N. 1 (Febbraio 2015), pp. 32-38.",
  "L’Umanesimo Europeo e l’Umanismo della Modernità. Per uno sguardo “diverso” sul Post Moderno, in “Il Nodo. Rivista di Storia della Pedagogia”, 2 (2008), pp. 45-52.",
];

function getLatestPublicationYear(year: string) {
  return Number(year.match(/\d{4}/g)?.at(-1) ?? 0);
}

const libriRecenti = [...libri].sort(
  (first, second) => getLatestPublicationYear(second.year) - getLatestPublicationYear(first.year),
);

type PublicationSectionProps = {
  title: string;
  items: string[];
  visibleCount: number;
};

function PublicationSection({ title, items, visibleCount }: PublicationSectionProps) {
  const visibleItems = items.slice(0, visibleCount);
  const hiddenItems = items.slice(visibleCount);

  return (
    <article className="flex h-full flex-col bg-white p-6 sm:p-8">
      <h2 className="font-display text-3xl font-normal text-dark-blue">{title}</h2>
      <ol className="mt-5 list-decimal space-y-3 pl-5 text-slate-700">
        {visibleItems.map((item) => <li key={item}>{item}</li>)}
      </ol>
      {hiddenItems.length > 0 && (
        <details className="mt-3">
          <summary className="min-h-11 cursor-pointer py-2 font-semibold text-primary-blue underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue">
            Leggi di più
          </summary>
          <ol start={visibleCount + 1} className="list-decimal space-y-3 pl-5 text-slate-700">
            {hiddenItems.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </details>
      )}
    </article>
  );
}

export default function LibriEScrittiPage() {
  return (
    <main>
      <Hero title="Libri e Scritti" />
      <section aria-label="Libri e Scritti" className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8 sm:pb-28">
        <BooksCarousel books={libriRecenti} />
        <section aria-label="Altri scritti" className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <PublicationSection title="Curatele e Traduzioni" items={curatele} visibleCount={curatele.length} />
          <PublicationSection title="Articoli Accademici" items={articoliAccademici} visibleCount={3} />
        </section>
      </section>
    </main>
  );
}
