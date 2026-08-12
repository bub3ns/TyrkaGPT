const punches = [
    { "titles": ["cwelu"], "responses": ["ale nie cwelu tylko twoj stary ma dyche w portfelu synu kurwy i pedala", "ale nie cwelu tylko twojego starego gwalca na helu"] },
    { "titles": ["cwela"], "responses": ["cwela i twojego starego zajebala mela frajerze jebany bez zebow"] },
    { "titles": ["frajerze"], "responses": ["ale nie frajerze tylko twoj stary sie wyjebal na skuterze zamknij pizde"] },
    { "titles": ["pisal"], "responses": ["pisal i twoj stary podloge w publicznym kiblu lizal wypierdalaj brudasie jebany"] },
    { "titles": ["wypisywal"], "responses": ["pisywal a twoj stary zolty snieg z podworka zlizywal wypierdalaj"] },
    { "titles": ["krzywo", "krzywe", "krzywych", "krzywemu", "krzywa"], "responses": ["no krzywe to masz kurwo jebana przegrody nosowe jak ci stary cwelu jebany do pokoju jak ballerina cappucina wparowal uposledzencu wypierdalaj"] },
    { "titles": ["menelu"], "responses": ["ale nie menelu tylko twoja stara przynosi 2500 z burdelu synu kurwy"] },
    { "titles": ["weselu", "wesele", "weselach", "wesela"], "responses": ["pedale ale na weselu to twoj stary matke poderwal jak do niej z kubkiem pelnym kapslow podbil w garniturze z muszka pedale zamknij ryj"] },
    { "titles": ["wgryzl"], "responses": ["wgryzl to sie twoj stary kurwo jebana w puszke konserwy jak pies w kosc piszczelowa matki dziwki jebanej ze az pisknela na pol wsi biedaku rozjebalbym cie"] },
    { "titles": ["profilu", "profil", "profilach", "profile", "profilowe"], "responses": ["na profilu to twoja matka wypisuje socialmedia 18+ cwelu garbaty z komornikiem zeby troche litosci dostala"] },
    { "titles": ["komplement", "komplementy", "komplementuje", "komplementach", "komplementow", "komplementowac"], "responses": ["ale komplementuje to listonosz broche twojej matki cwelu uposledzony wypierdalaj"] },
    { "titles": ["gacie", "gaci", "gaciach"], "responses": ["cwelu jebany gacie a wy z matka choroby weneryczne macie zamknij ryj", "synu dziwki nie gacie tylko w rodzinie choroby weneryczne macie", "ty ale nie gacie tylko do matki ze starym sie w nocy dobieracie zamykasz pizde"] },
    { "titles": ["ryj", "ryja", "ryju"], "responses": ["ty kurwa ryj twoj stary postura jak strachowyj przycwelona mysia mordo"] },
    { "titles": ["wypierdalaj"], "responses": ["kurwo wypierdalaj a stary ci nad talerzem gada szybciej to gowno wpierdalaj"] },
    { "titles": ["czajnik", "czajniki", "czajnikiem", "czajnika", "czajniku"], "responses": ["czajnikiem i twoj stary jest cwelu jebany moim podlokietnikiem pedale jebany z wlosami na dziewice"] },
    { "titles": ["pedale"], "responses": ["pedale a twoj stary ma gowno na grzale smieciu jebany zamknij ryj", "pedale i twoj stary pajeczak chodzi po regale owlosiony smiec jebany uposledzony "] },
    { "titles": ["wpierdolil"], "responses": ["wpierdolil to sie twoj stary do rowu jak ukrainka mu dupe wystawila cwelu jebany na A5"] },
    { "titles": ["zacinaj", "zacina", "zacinasz"], "responses": ["zacial to sie twojemu staremu gramofon pedale jebany uposledzony to matka na nosie zaczela plyty odtwarzac wypierdalaj"] },
    { "titles": ["zjebany", "zjebana", "zjebanym", "zjebanej", "zjebanych"], "responses": ["ale nie zjebany tylko twoj stary w McDonaldzie na stoliku sie wyjebal i matke z dupy obslizgal"] },
    { "titles": ["lootuje", "zlootuje", "lootowal", "zlootowal"], "responses": ["zlootowal to twoj stary cala lodowke z kielbasy skolima przed wizyta komornika cwelu jebany uposledzony"] },
    { "titles": ["gowno", "gówno", "gownie", "gównie", "gownem", "gównem", "gowna", "gówna", "gowniany", "gówniany"], "responses": ["ej pedale gowno a przycwelone mysie mordy macie pod sufitem nie rowno spierdolone przychlasty zamknij ryj", "ty pedale gowno to wy wpierdalacie na blacie ze smakiem jak stary wam glowe z matka noga dopycha synu kurwy zamknij ryj"] }
];

const offtops = [
    "ty ale zeszmacony cwelu jak twoja matka sie na chate wpierdala a tam stary z karaluchem na laptopie z urzedu uposledzona kurwo tapeta fsociety a na pasku zadan zminimalizowany ddos.py na gofrownice matki zamknij pizde",
    "zamknij pizde twoj stary po robocie wlazi do tej lepianki waszej a stara plytki ze scian zdziera szmata jebana zamknij pizde",
    "ty kurwo jebana pa to, twoj stary wchodzi na chate i mowi lokiec pieta my nachalni zaraz pedale wypierdolisz do kopalni o chuj tu chodzi cymbale?",
    "ale zamknij ryj twój stary w McDonaldzie po wiesmaku wszedł na stolik, macal sie po brzuchu i spiewal Pan McDonald farmę miał, ija-ija-o",
    "zamknij pizde twoja matka jak komornik do drzwi puka to ze starym swiatla gasza i pod stol pizde daja to staremu pies nasikal do mordy cwelu upośledzony",
    "ty jak twoja matka prysznica brala to się na spermie ojca poslizgnela na butelke od szamponu przysiad zrobila jak kulturysta ze sztanga",
    "twoja matka w warzywniaku poprosila pomidory obrac bo staremu ostatnio się skorka osadzila na zoladku to 3 tygodnie w lozku jak zabity lezal to sprzedawczyni weselniaka wyjebala zamknij pizde",
    "ty twój stary się z poduszka victoria secret przelizal o chuj tu chodzi kurwa jebana?",
    "ty cwelu twój stary puscil bona w nocy to koldra zaczela latac gora dol jak sanie swietego mikolaja z matka na przodzie kurwo uposledzona",
    "twój stary ksywa kurwa grzebien pedale jebany bo mu zeby powypierdalali na osiedlu przycwelona mysia mordo zamknij ryj",
    "no pedale wam matka szklanki w domu pogryzła to jej żeby z porcelany się polamaly jak staremu nogi gdy go ze schodow zrzucili w wiezieniu cwela",
    "jest taka sytuacja wyobraz sobie prima prilis a twoj stary nasral bobki zawinal w papierek od cukierka i dal matce do buta to go gonila dziwka wyjebal w futryne od drzwi i pisknal",
    "ty cwelu jebany jak twoja matka w pracy na magazynie sie na paletach przewrocila i zeby jej wypadly z geby to stary je zbieral z podlogi i do mordy wkladal zamknij pizde",
    "no twoja matka kurwa jebana ksywa wozek sklepowy 2 zlote i sie ja popycha ile chce",
    "ale nie wychylaj sie pedale jak po twojej matce bezdomni skacza jak po trampolinie",
    "twoj stary cwelu jebany sie bawi w kubusia puchatka wylizal matce miodek z uszu rodzina uposledzonych przykurwi"

];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { punches, offtops };
}

