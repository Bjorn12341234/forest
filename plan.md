in this folder i have copied another game i have made, the orange man. you job is to rewrite the game into this one.

after each sprint you should update the md files so that we can start a new session with fresh tokens and continue with the next sprint. all files in this folder is currently for the orange man game, now we will start to remake it into the new game.

---

# plan.md — Project "SILVA MAXIMUS"
## En satirisk incremental/idle-simulator i Universal Paperclip Simulator-tradition
### Tema: Det Skogsindustriella Komplexet i Sverige

---

## 0. INSTRUKTIONER TILL CLAUDE CODE

Du ska bygga om ett befintligt Trump-temat idle/incremental-spel (liknande Universal Paperclip Simulator) till **SILVA MAXIMUS** — ett satiriskt spel om den svenska skogsindustrins totala dominans över politik, myndigheter, skogsägare och natur. Spelet är en **React-app** (single-file .jsx eller en liten app-struktur) med incremental-mekanik.

**Tonen** är maximal svart humor, absurd satir och sarkasm — men förankrad i **verkliga mekanismer** från svensk skogspolitik. Spelaren spelar som "Skogsindustriella Komplexet" (aldrig namngivet efter ett riktigt bolag — men referenserna ska vara tydliga). Alla namn i spelet ska vara fiktiva men igenkännbara parafraser.

**Slutmålet:** Spelaren ska ha kul, skratta, men sitta kvar med en känsla av obehag — "Vänta, är det verkligen så här det fungerar?" Svaret: ja, i stor utsträckning.

---

## 1. CORE CONCEPT & VISION

### The Elevator Pitch
Du är **Massaindustrin AB**. Du klickar dig till total dominans över den svenska skogen. Du börjar med en enda skogsbruksplan och slutar med att industriplantera sterila trädplantager på månen. Längs vägen krossar du miljörörelser, köper politiker, lurar skogsägare, och omdefinierar begreppet "hållbarhet" tills det betyder "maximal avverkning".

### Den dolda poängen
Spelet visar **tre parallella sanningar** samtidigt:
1. **Industrin tjänar mest** — alltid, i varje led
2. **Skogsägaren tror de tjänar** — men utnyttjas som politisk sköld och råvaruleverantör
3. **Naturen förlorar** — men det syns inte i industrins statistik

### Spelmekanikens kärna
Precis som Universal Paperclip Simulator eskalerar spelet från manuellt klickande till absurd automatisering, men med en **dubbel botten**: varje uppgradering som ser positiv ut har en dold kostnad som avslöjas gradvis.

---

## 2. PRIMÄRRESURSER (Synliga för spelaren)

| Resurs | Internt namn | UI-label | Beskrivning |
|--------|-------------|----------|-------------|
| **Klickresurs** | `STAMMAR` | **Stammar** | Grundresursen. Varje klick = en stam fälld. Börjar med 1/klick. |
| **Valuta** | `KAPITAL` | **Kapital (Mkr)** | Genereras vid försäljning av stammar → massa. Allt köps med detta. |
| **Inflytande** | `LOBBY` | **Politiskt Kapital** | Tjänas genom lobbying-mekanik. Krävs för lagändringar & politiska projekt. |
| **PR** | `IMAGE` | **Grön Image™** | Hur "hållbar" industrin uppfattas. Börjar på 100. Sjunker vid skandaler. Kan köpas tillbaka med PR-kampanjer. |

### Dolda resurser (visas INTE i UI förrän de avslöjas i endgame)

| Dold resurs | Internt namn | Avslöjas i | Beskrivning |
|-------------|-------------|------------|-------------|
| Verkligt koldioxidutsläpp | `REAL_CO2` | Endgame | Totalt nettoutsläpp inkl. markberedning, transport, förlorat kolförråd |
| Skogsägarens faktiska förtjänst | `OWNER_PROFIT` | Endgame | Vad småskogsägaren faktiskt fått vs vad industrin tjänat |
| Biologisk mångfald | `BIODIV` | Gradvis (counter) | Startar på 100%. Sjunker med varje kalavverkning. |
| Artantal | `SPECIES` | Endgame | Hur många arter som försvunnit |
| Samebyars renbetesmark | `SAMI_LAND` | Mid-game event | Förlorad betesmark i km² |

---

## 3. VAD SPELAREN KLICKAR PÅ

### Klick-mekanik: "Skriv Skogsbruksplan"
Spelarens primära klick-action är **"Skriv Skogsbruksplan"**. Varje klick genererar stammar. Flavourtexten ändras med progression:

- **Tier 0:** *"Du skriver en skogsbruksplan åt en pensionerad lärare i Ångermanland. Gratis, såklart."*
- **Tier 1:** *"Du rekommenderar 'föryngringsavverkning' — det låter ju bättre än 'kalavverkning'."*
- **Tier 2:** *"Planen föreslår gallring. Av det fina virket. Skräpet lämnar du kvar. Ägaren märker inget."*
- **Tier 3:** *"Avverkningsanmälan inskickad. Skogsstyrelsen hinner inte granska. Perfekt."*
- **Tier 4:** *"Planen skrivs nu av en AI. Ägaren får ett mail. Skördaren är redan på plats."*

### Klick-multiplikatorer
| Uppgradering | Kostnad | Effekt | Flavourtext |
|-------------|---------|--------|-------------|
| Bättre penna | 50 Kapital | +1 stam/klick | *"Montblanc. Viktigt att se seriös ut."* |
| Digital plan | 200 Kapital | +5 stammar/klick | *"Nu med färgglada kartor. Ägaren fattar inget."* |
| Planfabrik | 1 000 Kapital | +20 stammar/klick | *"En plan var tredje sekund. Ägarnas namn autogenereras."* |
| AI-Planering | 10 000 Kapital | +100 stammar/klick | *"Maskininlärning optimerar gallringsintervall. Inga människor inblandade."* |

---

## 4. AUTOMATISERING & BYGGNADER

### Generators (Producerar stammar per sekund)

| Generator | Baskostnad | Stammar/s | Flavourtext |
|-----------|-----------|-----------|-------------|
| **Virkesuppköpare** | 100 | 1/s | *"En karl i Barbourjacka som 'bara tittar förbi'. Bjuder på kaffe. Nämner att gran-priserna aldrig varit bättre."* |
| **Skördarteam** | 500 | 5/s | *"John Deere 1270G. Tar en 150-årig tall på 40 sekunder. Perfekt."* |
| **Massafabrik** | 2 500 | 25/s | *"Allt under 25 cm i diameter blir till engångslådor för Amazons nästadagsleverans."* |
| **Markberedningsmaskin** | 10 000 | 100/s | *"Vänder upp hela skogsmarken. Släpper ut tonvis med lagrat kol. Men: unga plantor! De binder ju CO₂! (Snälla googla inte nettot.)"* |
| **Certifieringskarousel** | 50 000 | 500/s | *"FSC-stämpeln sätts på allt. Pausar vi certifieringen kan vi hugga nyckelbiotoperna, sen går vi tillbaka."* |
| **Lobbyfirma** | 200 000 | 2 000/s | *"Ex-statssekreterare som vet exakt vilka dörrar man knackar på."* |
| **Autonomt Skördarnätverk** | 1 000 000 | 10 000/s | *"GPS-styrda skördare som opererar nattetid. Ingen ser dem. Ingen hör dem. Skogen hör dem."* |
| **Orbital Timberstation** | 50 000 000 | 100 000/s | *"Varför sluta vid atmosfären?"* |

---

## 5. LOBBY-SYSTEMET (Politiskt Kapital)

### Hur man tjänar Politiskt Kapital

| Aktivitet | Kostnad (Kapital) | PK-vinst | Flavourtext |
|-----------|-------------------|----------|-------------|
| **Älgjakt med riksdagsledamot** | 5 000 | +10 PK | *"Inget diskuteras. Allt förstås."* |
| **Finansiera tankesmedja** | 25 000 | +50 PK | *"Rapporten 'Skog i Tillväxt: Varför Avverkning Räddar Klimatet' publiceras i DN Debatt."* |
| **Sponsra partistämma** | 100 000 | +200 PK | *"Äganderätten nämns 47 gånger i motionerna."* |
| **Transatlantiska Kontakten** | 500 000 | +1 000 PK | *"Ett möte i Washington DC. Heritage Foundation. Oljebolag med i rummet. EU:s hållbarhetslagar diskuteras. Din svenska delegat nickar."* |

### Vad man köper med Politiskt Kapital

| Lagändring/Projekt | PK-kostnad | Effekt | Baserad på |
|--------------------|-----------|--------|-----------|
| **"Frihet Under Ansvar 2.0"** | 50 PK | -30% myndighetstillsyn | Skogsreformen 1993, aldrig reviderad trots 30+ år |
| **"Skogsstyrelsen: Tillsynsbudget -40%"** | 100 PK | Skandaler kostar 50% mindre Image | Naturvårdsverkets nedskärningar |
| **"Äganderätten Är Hotad!™"** | 200 PK | Skogsägare protesterar aldrig mot dig | Skogsindustrins 200M kr lobbybudget 2022 |
| **"Operation Omnibus"** | 500 PK | EU-compliance -50% i 5 minuter | Warborn/Omnibus-paketet, Heritage Foundation |
| **"Myndighetskapning"** | 1 000 PK | Skogsstyrelsen skriver DINA rapporter | GD som raderade mail med lobbyister, ägde skog för 30 Mkr |
| **"Svängdörren"** | 2 000 PK | Permanenta: ministrar jobbar för dig efteråt | Maktutredningen 2026 — svängdörrar politik/näringsliv |
| **"Avskogningsförordningen: Avvecklad"** | 5 000 PK | Global avverkning utan konsekvens | EU:s avskogningsförordning urvattnades via Omnibus |

---

## 6. SKOGSÄGAR-MEKANIKEN: "BESKYDDARVERKSAMHETEN"

### Kärnmekanik: Relationship Meter
En mätare visas: **"Skogsägarförtroende"** (0–100).

- **För HÖGT (>80):** Du utnyttjar dem inte tillräckligt. De behåller virket.
- **För LÅGT (<20):** De protesterar, säljer till konkurrenter.
- **Sweet spot (40–60):** De följer dina planer utan att ifrågasätta.

### Hur du manipulerar det:

| Action | Effekt på Förtroende | Effekt på dig | Flavourtext |
|--------|---------------------|---------------|-------------|
| Gratis skogsbruksplan | +15 | Du styr gallring & avverkning | *"Kostnadsfritt! (Värdet av virket vi får: 4,7 Mkr.)"* |
| "Äganderätten!"-kampanj | +25 | Blockerar EU-kartläggning av gammelskog | *"VI kämpar för DIN skog! (Mot folk som vill skydda den.)"* |
| Sänk virkespriset | -10 | +30% Kapital per stam | *"Marknadskrafterna, tyvärr. (Du ÄR marknadskraften.)"* |
| Hårdgallring | -5 | Tar allt fint virke, lämnar skräp | *"Vi gallrar bort de svaga träden. (Och de starkaste. Ägaren ser inte skillnad.)"* |
| "Partnerskap" | +20 | Ägaren bunden i 25-årskontrakt | *"Ett handslag. En kopp kaffe. 500 hektar."* |

### Dold statistik (avslöjas i endgame):
- Kolumn 1: **Vad skogsägaren fick** (Kapital)
- Kolumn 2: **Vad industrin tjänade** (Kapital × 8-15)
- Kvot visas med röd text: *"Förhållande: 1:12"*

---

## 7. TECH TREE: EROR & FASER

### Fas 1: "Lokalpatriot" (0–10 000 stammar)
Du är en regional aktör. Du skriver planer, köper virke, bygger din första massafabrik.

- **Mål:** Fyll din första massaorder till ett pappersföretag.
- **Nyckelbeslut:** "Ska du gallra försiktigt eller hårt?" (Hårt ger mer kapital nu, mindre virke sen.)
- **Unlock:** Lobbymodulen.

### Fas 2: "Den Goda Grannen" (10 000–100 000 stammar)
Skalan ökar. Du inser att skogsägare är dina bästa allierade — och dina bästa offer.

- **Mål:** Kontrollera 10 skogsägares planer.
- **Nyckelprojekt:** "Äganderätten Är Hotad!" (Lobbykampanj)
- **Event:** *"Rysslands-embargo!"* — Ryskt virke försvinner. Priserna rusar. Du kan nu avverka i känsliga habitat under flaggan "nationell krisberedskap".
- **Unlock:** PR/Image-systemet.

### Fas 3: "Massabaronen" (100 000–1 000 000 stammar)
Du dominerar den nationella marknaden. Men Kina börjar dumpa billig massa.

- **Mål:** Bibehåll lönsamhet trots priskollaps.
- **Nyckelprojekt:** "Sänk Avverkningsåldern!" — Hugger yngre träd. Dåligt virke, men mer massa.
- **Event:** *"Kinesisk Massadumpning!"* — Priserna rasar. Din motåtgärd: volym, volym, volym.
- **Flavourtext:** *"Träden hinner inte bli timmer. Men vem behöver hus av trä när man kan ha wellpapp?"*
- **Unlock:** Internationell lobbymodul (USA-kontakter).

### Fas 4: "PR-Katastrofen" (1M–10M stammar)
Din image kollapsar. Men du har verktygen att fixa det.

- **Obligatorisk Event: "Nestlé-Reträtten"**
  - *"Nestlé — NESTLÉ! — världens mest hatade livsmedelsföretag — anser att DITT rykte är för dåligt. De bryter samarbetet."*
  - **Spelvalen:**
    - A) Dubbeldown: "Certifieringspaus" → Lämna FSC, hugga nyckelbiotoper, gå tillbaka sen. (-30 Image, +50 000 stammar)
    - B) Greenwash: Skapa 50 "gräsrotsorganisationer" av "oroliga skogsägare". (+20 Image, kostar 100 000 Kapital)
    - C) Attackera kritikerna: "Aktivism hotar jobben!" (+10 PK, -15 Image)

- **Nyckelprojekt: "Klimatnarrativet"**
  - *"Unga träd binder mest CO₂!"*
  - Tvinga all offentlig statistik att bara visa kolupptag i plantor.
  - Dold effekt: Ignorera 400% spike i kolutsläpp från markberedning.
  - Kosmetisk: En liten grön pil-ikon (↑) dyker upp bredvid din CO₂-display. (Den verkliga siffran döljs i endgame.)

- **Unlock:** Samiska konflikten (mid-game event).

### Fas 5: "Det Skogsindustriella Komplexet" (10M–100M stammar)
Du har kontroll över politiker, myndigheter, och narrativet.

- **Nyckelprojekt: "Maktutredningen — Men tvärtom"**
  - Skogsstyrelsens maktutredning publiceras → Visar att lobbyister styr skogspolitiken
  - **Ditt motdrag:** Finansiera en "motrapport" från din tankesmedja
  - *"Rapporten 'Makten Över Skogen' visar faktiskt att skogsägarna har FÖR LITE makt!"*

- **Nyckelprojekt: "Svängdörren"**
  - Anställ före detta statssekreterare och generaldirektörer.
  - Effekt: Du skriver lagförslagen själv.
  - *"Herman lämnade Skogsstyrelsen. Herman äger 700 hektar skog. Herman jobbar nu för dig. Herman ler."*

- **Nyckelprojekt: "Transatlantiska Pipelinen"**
  - Samarbeta med Heritage Foundation / USA-kopplade tankesmedjor.
  - Din EU-kontakt driver igenom Omnibus-paketet.
  - Urholka CSRD, CSDDD, avskogningsförordningen.
  - *"En svensk moderat i Bryssel. Ett möte med Exxon. EU:s hållbarhetslagar: avvecklade. Ingen ser kopplingen."*
  - Achievement: **"Warborn-Manövern"** — *"Utreddes för jäv. Fick igenom det ändå."*

- **Unlock:** Endgame-modulen.

### Fas 6: "Post-Biologisk Skogsbruk" (100M–1B stammar)
Sverige är klart. All skog är industriskog.

- **Nyckelprojekt: "Silva Maximus Grid"**
  - Ersätt de sista blandskogarna med genetiskt optimerade monokulturer.
  - Träden planteras i rutnätsmönster. Exakt 1,8m mellanrum. Inga underväxter. Inget fältskikt. Inga fåglar.
  - *"Det är inte en skog. Det är en fabrik som ser ut som en skog."*

- **Achievement: "Den Tysta Våren"**
  - Fågelljud ersätts gradvis i spelets ljuddesign av drönandet från autonoma skördare. (Se UI/Ljud-sektionen.)

- **Unlock:** Terraforming/Expansionsmodulen.

### Fas 7: "UNIVERSUM AB" (1B+ stammar — Endgame)
Se sektion 11.

---

## 8. EVENTS & RANDOM ENCOUNTERS

Events triggas vid specifika resursers milstolpar eller slumpmässigt. De visas som nyhetspopups.

| Event | Trigger | Val | Effekt |
|-------|---------|-----|--------|
| **"Samebyns protest"** | 500 000 stammar | A) Ignorera (-5 Image) B) "Samråd" (3 000 Kapital, ingen effekt) C) Köp betesmark (50 000 Kapital, +10 000 stammar framtida inkomst) | Dold: `SAMI_LAND` -15% |
| **"SVT-dokumentär: Slaget om Skogen"** | Image < 50 | A) SMS:a GD att göra utspel mot SVT (500 PK) B) Radera mejlen (-0 Image, reference till verkliga händelsen) C) Inget (Image -20) | *"GD:n sms:ar lobbyisten: 'Mejla till min privata adress istället.'"* |
| **"Ideell förening hittar nyckelbiotop"** | Varje 50 000 stammar | A) Avverka ändå (-15 Image, +5 000 stammar) B) "Paus" certifiering C) Anklaga dem för att vara ovetenskapliga (+5 PK) | *"En pensionär med GPS och artkunskap. Din värsta fiende."* |
| **"Kinesisk prisras"** | Fas 3 start | Obligatorisk: Sänk avverkningsålder | *"Marginalerna krymper. Lösning: Mer volym. Alltid mer volym."* |
| **"Plockhugget-problemet"** | 200 000 stammar | A) Svartmåla som oekonomiskt (gratis) B) Kopiera konceptet och sälja som "premium" (10 000 Kapital) | *"De tar BETALT för sin rådgivning. Till skillnad från dig som skickar ut inspektorer gratis. (Tänk inte på varför.)"* |
| **"Wellpapp-boomen"** | 1M stammar | Amazon-kontrakt: +200% massapris i 2 min | *"Jeff Bezos behöver lådor. Du behöver 150-åriga tallar. Det är synergier."* |
| **"Svenska Kyrkan säljer"** | 3M stammar | Köp kyrkoskog för spotpris | *"150-årig tall till Danmarks börshus. 'Det är cirkulärt,' hävdar Kontraktsansvarig."* |
| **"Greta-effekten"** | Image < 30 | Global uppmärksamhet, Image -25 ELLER: "Vi ÄR klimatlösningen!" kampanj +15 Image | *"En tonåring med plakat. Industrins existentiella hot."* |

---

## 9. ACHIEVEMENTS

Achievements poppar upp med en satirisk ikon och text. De visas i en trophy-hylla.

### Tier 1: Lokal
| Achievement | Villkor | Ikon | Text |
|-------------|---------|------|------|
| **Första Planen** | Skriv 1 skogsbruksplan | 📋 | *"Den första är gratis. Precis som dealern sa."* |
| **Kaffekoppen** | Köp 10 Virkesuppköpare | ☕ | *"Tio inspektörer. Tio kaffekoppar. 5 000 hektar."* |
| **Gallringsmästaren** | Gallra 100 gånger | 🪓 | *"Du tog de bästa träden och lämnade skräpet. Ägaren tackade dig."* |

### Tier 2: Regional
| Achievement | Villkor | Ikon | Text |
|-------------|---------|------|------|
| **Frihet Under Ansvar** | Köp lagändringen | 🗽 | *"Staten litar på dig. Det borde den inte."* |
| **Äganderättskrigaren** | Maxxa skogsägarförtroende 3 gånger | 🛡️ | *"De tror du kämpar för dem. Du kämpar för deras skog."* |
| **Rysslands-Bonansen** | Klara Rysslands-eventet | 🇷🇺 | *"En tragedi. Men din omsättning ökade 40%."* |

### Tier 3: Nationell
| Achievement | Villkor | Ikon | Text |
|-------------|---------|------|------|
| **Nestlé sa nej** | Trigga Nestlé-eventet | 🍫 | *"Det företag som sålde bröstmjölksersättning till fattiga mödrar tycker att DU har etikproblem."* |
| **GD-Flansen** | Köp "Myndighetskapning" | 🚪 | *"Han raderade mejlen. Han äger skogen. Han jobbar för dig nu."* |
| **Klimatambassadören** | Maxxa "Grön Image" trots >500 000 stammar avverkade | 🌱 | *"Du släppte ut 4 miljoner ton CO₂. Din rapport visar -200 000. Matematik!"* |

### Tier 4: Internationell
| Achievement | Villkor | Ikon | Text |
|-------------|---------|------|------|
| **Warborn-Manövern** | Klara "Operation Omnibus" | 🇪🇺 | *"Anmäld för jäv. Omnibus antogs ändå. Heritage Foundation skickar blommor."* |
| **Den Transatlantiska Pipansen** | Köp "Transatlantiska Kontakten" 5 gånger | 🤝 | *"Exxon, en tankesmedja, och din EU-parlamentariker i samma rum. Ingen antecknar."* |
| **FSC-Karussellen** | Lämna och återanslut till FSC 3 gånger | ♻️ | *"Lämna. Hugga nyckelbiotoper. Gå tillbaka. Repeat. Certifiering!"* |

### Tier 5: Endgame
| Achievement | Villkor | Ikon | Text |
|-------------|---------|------|------|
| **Den Tysta Våren** | BIODIV = 0% | 🔇 | *"Rachel Carson varnade. Du levererade."* |
| **Djurfritt Sedan 2035** | Alla djur-events klarade | 🦗 | *"Inte ens insekterna överlevde. Men din wellpapp-produktion ökade 12%."* |
| **Kolonialmakten** | Starta Mån-modulen | 🌑 | *"Jorden var inte nog. Månen har mineraler. Och du har skördare."* |
| **Den Perfekta Raden** | Mångla alla stammar i spelet | ∞ | *"Universum har blivit en industriskog. Stjärnorna lyser genom rutnätet."* |
| **Och Sen Då?** | Se endgame-sekvensen | 💀 | *"Aktieägarna fick sin utdelning. Allt annat är detaljer."* |

---

## 10. ANTAGONISTER / MOTSTÅND ("Problem-modulen")

Dessa enheter motverkar spelaren. De kostar Image eller Politiskt Kapital att hantera.

| Antagonist | Trigger | Effekt om ignorerad | Motåtgärd |
|-----------|---------|---------------------|-----------|
| **Skogsvärnarna** (Naturskyddsföreningen-parodi) | Varje 100 000 stammar | Image -10/min | Finansiera "motrörelse" (50 000 Kapital) |
| **Den Envisa Pensionären** | Ideell-biotop-event | Blockerar 1 avverkningsanmälan | "Ovetenskaplig" PR-kampanj (20 PK) |
| **EU-Inspektören** | Fas 4+ | -20% effektivitet | Operation Omnibus (500 PK) |
| **SVT Vetenskap** | Image < 40 | Mega Image-drop (-40) | Skogsstyrelse-utspel mot SVT (300 PK) |
| **Samebyns Juridik** | Fas 5+ | Blockerar avverkning i norra zonen | "Samrådsprocess" (i 15 år, ingen effekt) |
| **Plockhugget AB** | Fas 3+ | Visar att alternativ fungerar | Svartmåla + "ingen vetenskaplig grund" |
| **Greta** | Global Image < 30 | Internationell Image-katastrof | Omöjlig att eliminera. Kostar 500 000 Kapital att hantera. |

---

## 11. ENDGAME: "UNIVERSUM AB"

### Fas 7A: Terraforming
När jordens skog = 100% industriskog:

- **Projekt: "Lunar Silva"** — Använd extrema CO₂-utsläpp för att skapa en atmosfär på månen.
  - *"Klimatförändringarna var inget problem. De var en investering. Mer CO₂ = mer växthuseffekt = möjligt att odla på månen."*
  - Logik-twist: Spelets klimatförnekelse vänds till "Klimatförändring ÄR bra — vi kan terraforma med den!"

- **Projekt: "Mars Massafabrik"** — Genetiskt modifierade träd som klarar 0.6% atmosfärstryck.
  - *"De växer inte. Men det gör inte heller dina contorta-plantager i Norrland. Ändå planterar du."*

### Fas 7B: Den Sista Skärmen
En minimal, vit skärm. En digital kvitto:

```
╔══════════════════════════════════════════════╗
║            SILVA MAXIMUS AB                  ║
║           ÅRSREDOVISNING: ∞                  ║
╠══════════════════════════════════════════════╣
║                                              ║
║  Total stammar avverkade: [spelarens siffra]  ║
║  Total kapital genererat:  [spelarens siffra] ║
║                                              ║
║  ────── DOLD BOKFÖRING ──────               ║
║                                              ║
║  Verkligt netto-CO₂:        +847 000 000 ton ║
║  (Din rapport sa:           -12 000 000 ton) ║
║                                              ║
║  Skogsägare: totalt utbetalt:   340 Mkr      ║
║  Industri: totalt intjänat:   4 200 Mkr      ║
║  Förhållande:                      1 : 12    ║
║                                              ║
║  Arter utrotade:               ALL OF THEM   ║
║  Fågelarter kvar:                         0  ║
║  Samebyar med intakt betesmark:           0  ║
║                                              ║
║  Skogsstyrelsens integritet:         KÖPT    ║
║  FSC-certifieringens trovärdighet: KÖPT      ║
║  EU:s avskogningsförordning:     URVATNAD    ║
║                                              ║
║  Aktiekurs:                         ∞ ↑      ║
║  Utdelning till aktieägarna:    MAXIMAL      ║
║                                              ║
╠══════════════════════════════════════════════╣
║                                              ║
║   [ DELA UT VINST TILL AKTIEÄGARNA ]         ║
║        (Återställ verkligheten)              ║
║                                              ║
╚══════════════════════════════════════════════╝
```

### Post-Credits
En kort text scrollar (som filmcredits):

> *"Skogsstyrelsens maktutredning 2026 konstaterade att lobbyister har makt över svensk skogspolitik.*
>
> *Svängdörrar mellan politik och näringsliv upprätthåller status quo.*
>
> *Samma grundprinciper i skogspolitiken har legat fast sedan 1993. Trots att världen förändrats fundamentalt.*
>
> *Skogsindustrin lägger minst 200 miljoner kronor årligen på lobbying.*
>
> *Nestlé bröt samarbetet med SCA 2025. NESTLÉ.*
>
> *EU:s hållbarhetslagar urvattnades via Omnibus-paketet. Huvudförhandlaren anmäldes för jäv.*
>
> *63% av allt svenskt virke blir massa — engångsprodukter, wellpapp, förpackningar.*
>
> *Alternativa brukningsformer existerar. De svartmålas som oekonomiska.*
>
> *Skogsägare: läs din skogsbruksplan igen. Fråga vem som egentligen tjänar.*
>
> *Allt i det här spelet är baserat på verkliga händelser, rapporter och granskningar."*

Sedan: en länk till Skogsstyrelsens rapport "Makten Över Skogen" (2026).

---

## 12. NEWS TICKER

En horisontell nyhetsticker löper längst ner i spelet. Nya rubriker triggas av milstolpar. Rubrikerna ska vara satiriska men igenkännbara:

### Fas 1–2:
- *"Virkesuppköpare bjuder på kaffe i Ångermanland: 'Jag tittar bara förbi, jag lovar.'"*
- *"Skogsägare nöjd med gratis plan: 'De verkar ju veta vad de gör.'"*
- *"Rapport: 'Gallring god för skogen' — finansierad av massaindustrin."*
- *"Centerpartiet: 'Äganderätten hotas av fågelskådare.'"*

### Fas 3–4:
- *"Kinas massa-dumpning pressar ner priserna. Industrin: 'Hugga snabbare löser det.'"*
- *"Svenska Kyrkan levererar 150-årig tall till danska börshuset — 'Det är cirkulärt,' hävdar skogsförvaltaren."*
- *"Lobbyist-rapport: Träd föredrar att bli wellpapp framför att ruttna i skogen."*
- *"Ny studie: Unga plantor binder CO₂! (Studien finansierad av dem som fällde de gamla träden.)"*
- *"Alternativt skogsbruk döms ut som 'ovetenskapligt' av branschfinansierad forskare."*
- *"Plockhugget tar betalt för rådgivning. Industrin: 'Vi gör det gratis!' (Tänk inte på varför.)"*

### Fas 5–6:
- *"M-politiker i möte med Trump-rådgivare: 'Vi delar samma syn på biomassa.'"*
- *"Skogsstyrelsen publicerar rapport om att lobbyister styr skogspolitiken. Lobbyisterna: 'Nej.'"*
- *"Ex-generaldirektör köper 700 hektar skog. Samma skog hans myndighet hade tillsyn över."*
- *"EU:s hållbarhetslagar urvattnades. Huvudförhandlaren: 'Jag har varit fullt transparent.' (Utreds för jäv.)"*
- *"Heritage Foundation skickar tackkort till Bryssel."*
- *"Prischock på massa: Kinesisk dumpning tvingar fram sänkt avverkningsålder i Norrland."*
- *"Nestlé bryter med svensk skogsjätte: 'Ert rykte är sämre än vårt.' Branschens existentiella kris."*
- *"Naturskyddsföreningen lämnar Skogsstyrelsens samverkansprocess: 'Våra synpunkter väger lätt.'"*
- *"Facket oroat. Industrin: 'Aktivister hotar jobben.' (Industrins robotskördare hotade jobben.)"*
- *"GD:n sms:ar lobbyisten: 'Mejla till min privata adress istället.' SVT: 'Vi vill se mejlen.' GD:n: 'Raderade.'"*

### Fas 7 (Endgame):
- *"Sista lavskrikan observerad. Observatören arresterad för 'störande av produktiv verksamhet.'"*
- *"Jordens skogar: 100% produktiva. Biologisk mångfald: 'Vad är det?' — Näringsdepartementet."*
- *"Lunar Silva AB godkänt för börsnotering. Kurs: ∞."*
- *"FN:s generalsekreterare gratulerar: 'Ni har löst klimatfrågan. Genom att eliminera den.'"*

---

## 13. UI / UX DESIGN

### Färgtema: "Byråkratisk Brutalism"
- **Bakgrund:** Ljusgrå (#F0F0F0) med subtila rutnätslinjer (som millimeterpapper/skogsbruksplan)
- **Accent 1:** Industriorange (#D4730C) — knappar, siffror, progress bars
- **Accent 2:** "Falsk grön" (#7DB840) — används ironiskt för alla "hållbarhets"-element
- **Text:** Mörkgrå (#2C2C2C), monospace-font (Courier/IBM Plex Mono)
- **Varning/Skandal:** Röd (#CC2222)
- **Endgame-reveal:** Vit bakgrund, svart text. Rent. Kliniskt.

### Layout (Desktop)
```
┌──────────────────────────────────────────────┐
│  SILVA MAXIMUS                    🌱 Image:73 │
│  Massaindustrin AB       💰 Kapital: 2.4 Mkr  │
│                          🏛️ Pol. Kapital: 45   │
├────────────────┬─────────────────────────────┤
│                │                             │
│  [KLICK-YTA]   │   GENERATORS / BYGGNADER    │
│  "Skriv        │   ┌─────────────────────┐   │
│   Skogsbruks-  │   │ Virkesuppköpare (5) │   │
│   plan"        │   │ 5 stammar/s         │   │
│                │   ├─────────────────────┤   │
│  Stammar:      │   │ Skördarteam (2)     │   │
│  4,712         │   │ 10 stammar/s        │   │
│                │   ├─────────────────────┤   │
│  [SKOGSÄGAR-   │   │ 🔒 Massafabrik      │   │
│   FÖRTROENDE]  │   │ (2 500 Kapital)     │   │
│  ████████░░ 72 │   └─────────────────────┘   │
│                │                             │
│                │   LOBBY-PROJEKT             │
│                │   ┌─────────────────────┐   │
│                │   │ Älgjakt med         │   │
│                │   │ riksdagsledamot     │   │
│                │   │ [5 000 Kapital]     │   │
│                │   └─────────────────────┘   │
├────────────────┴─────────────────────────────┤
│ 📺 Skogsägare nöjd med gratis plan: "De vet │
│    vad de gör." | Rapport: Gallring god...   │
└──────────────────────────────────────────────┘
```

### Ljud/Musik-design (gradvis övergång)
- **Fas 1–2:** Fågelkvitter, vindsus, bäck. Lugnt, idylliskt.
- **Fas 3:** Motorsågsljud blandat med fåglar. Fåglarna blir färre.
- **Fas 4:** Skördarmaskiner dominerar. Enstaka fågel.
- **Fas 5:** Industriellt dån. Ingen natur.
- **Fas 6:** Tystnad. Sedan: drönande, monotont surr.
- **Fas 7:** Komplett tystnad. Bara ett litet "pip" när du klickar. Som ett EKG. Sedan: flatline.

---

## 14. SPECIFIKA NYCKELREFERENSER ATT BAKA IN

Dessa verkliga händelser och fakta ska genomsyra spelet (med fiktiva namn):

| Verklig referens | I spelet | Källa |
|-----------------|---------|-------|
| Skogsstyrelsens maktutredning 2026 "Makten över skogen" | Event + Achievement + Endgame-credits | Rapport 2026/03, Lunds univ. & SLU |
| Svängdörrar politik ↔ industri | "Svängdörren"-uppgradering | Maktutredningen: "svag reglering av svängdörrar" |
| S + C som maktpar i skogspolitiken | Lobbysystemets "koalitionsmekanik" | Maktutredningen: "de två mest inflytelserika aktörerna" |
| Warborn / Omnibus / Heritage Foundation | "Operation Omnibus"-projekt | Aftonbladet + Der Spiegel + Arbetsvärlden |
| GD raderade mejl med lobbyister + ägde skog för 30 Mkr | Event: "SVT-dokumentären" | SVT Vetenskap, DN, Natursidan |
| Nestlé bröt med SCA 2025 | Event: "Nestlé-Reträtten" | Greenpeace, SVT, DN |
| SCA lämnar FSC-certifiering | "FSC-Karussellen" achievement | Skydda Skogen, DN |
| Plockhugget som alternativt skogsbruk | Event: "Plockhugget-problemet" | Plockhugget AB |
| 200 Mkr i lobbybudget 2022 | Lobbysystemets flavourtext | Skogen.se |
| Naturskyddsföreningen lämnade Skogsstyrelsens samverkansprocess | News ticker | Altinget |
| "Frihet under ansvar" sedan 1993 — aldrig reviderat | "Frihet Under Ansvar 2.0"-uppgradering | Riksdagsbeslut 1993, maktutredningen |
| Kina dumpar billig massa | Event: "Kinesisk Massadumpning" | Branschpress |
| 63% av virke → massa (engångsprodukter) | Genomgående | Skogsindustriernas statistik |
| Markberedning → massivt kolutsläpp | Dold variabel: REAL_CO2 | Naturvårdsverket, forskningsrapporter |

---

## 15. TEKNISKA INSTRUKTIONER FÖR CLAUDE CODE

### Stack
- **React** (single-file .jsx ELLER liten app-struktur med komponenter)
- **Tailwind CSS** för styling (eller inline styles med temat ovan)
- **State management:** `useState` / `useReducer` — INGA browser storage APIs
- **Ljud:** Tone.js eller liknande (valfritt, kan vara fas 2)

### Struktur
```
src/
├── App.jsx          (Huvud-container, game loop)
├── GameState.js     (useReducer-baserad game state)
├── components/
│   ├── ClickArea.jsx       (Klickytan + stammar-counter)
│   ├── Generators.jsx      (Byggnader/generators-lista)
│   ├── LobbyPanel.jsx      (Politiskt Kapital-systemet)
│   ├── OwnerMeter.jsx      (Skogsägarförtroende-mätare)
│   ├── EventModal.jsx      (Popup för events)
│   ├── NewsTicker.jsx       (Nyhetstickern)
│   ├── AchievementPopup.jsx (Achievement-notifiering)
│   ├── TechTree.jsx         (Fas-progress och projekt)
│   └── EndScreen.jsx        (Endgame-kvittot)
├── data/
│   ├── generators.js        (Generator-definitioner)
│   ├── upgrades.js          (Uppgraderingar)
│   ├── events.js            (Event-definitioner)
│   ├── achievements.js      (Achievement-lista)
│   ├── newsTickerLines.js   (Alla ticker-rubriker)
│   └── lobbyProjects.js     (Lobby-projekt)
└── utils/
    ├── gameLoop.js           (setInterval-baserad tick)
    └── formatNumber.js       (Snygg siffra-formatering)
```

### Game Loop
- **Tick-rate:** 10 ticks/sekund (100ms interval)
- Varje tick: beräkna stammar från generators, kolla event-triggers, uppdatera hidden vars
- **Klick:** Separata onClick-handlers med cooldown-prevention

### Balansering
- Följ ungefär Universal Paperclip Simulator-kurvan:
  - Första 5 min: manuellt klickande dominerar
  - 5–15 min: generators tar över
  - 15–30 min: lobbymodul och events driver progressionen
  - 30–60 min: endgame om man optimerar
- Kostnader eskalerar med 1.15× multiplikator per köpt enhet
- Event-triggers är absoluta stamtal, inte relativa

### Viktiga implementationsdetaljer
1. **ALDRIG `localStorage`/`sessionStorage`** — all state i React-state
2. **Dolda variabler** (REAL_CO2, OWNER_PROFIT, etc.) räknas parallellt men visas inte i UI förrän endgame
3. **Skogsägarförtroende-mätaren** ska visuellt likna en vanlig progress bar men ha en "sweet spot"-zon markerad
4. **News ticker** är en CSS-animerad horisontell scroll, nya rubriker pushas in
5. **Endgame-skärmen** ska vara visuellt annorlunda — minimal, vit, kylig. Kontrast mot spelets färgglada UI.
6. **Achievements** poppar upp som toast-notifications med satirisk text

---

## 16. NAMNKONVENTIONER (Fiktiva namn)

Alla namn i spelet ska vara fiktiva men igenkännbara:

| Verklig referens | I spelet |
|-----------------|---------|
| SCA | **Norrskog Maximal AB** |
| Naturskyddsföreningen | **Skogsvärnarna** |
| Skogsstyrelsen | **Riksskogsnämnden** |
| Skydda Skogen | **Trädkramare Inc.** |
| FSC | **GrönStämpel™** |
| Heritage Foundation | **Frihetens Tankesmedja** |
| Nestlé | **Choco-Corp International** |
| Centerpartiet | **Landsbygdsalliansen** |
| Socialdemokraterna | **Arbetarnas Koalition** |
| Moderaterna / specifik EU-parlamentariker | **Borgliga Framtidspartiet** / **EU-Kontakten** |
| SVT Vetenskap | **Statliga Dokumentärkanalen** |
| Plockhugget | **Skogsvispen AB** (litet, alternativt) |
| Greenpeace | **RegnbågsFlottan** |
| Generaldirektören (Herman Sundqvist-referens) | **GD Tallström** |
| Amazon | **Kartongen.com** |
| EU:s Omnibus-paket | **Paket Allt-i-Ett** |

---

## 17. PRIORITERINGSORDNING FÖR IMPLEMENTERING

### Sprint 1: Minimum Viable Satire
1. Klickytan ("Skriv Skogsbruksplan") + stammar-counter
2. Kapital-generering (stammar → pengar)
3. 3–4 generators med flavourtext
4. Basic upgrade-system (klick-multiplikatorer)
5. Fas-progression (1–3)

### Sprint 2: Maktspelet
6. Lobbysystem (Politiskt Kapital)
7. Skogsägarförtroende-mätare
8. 5–6 events med val
9. News ticker (Fas 1–4 rubriker)
10. Image/PR-system

### Sprint 3: Den Mörka Sanningen
11. Achievements-system
12. Tech tree med alla faser
13. Dolda variabler + endgame-reveal
14. Endgame-skärmen (kvittot)
15. Post-credits

### Sprint 4: Polish
16. Ljud-design (gradvis övergång)
17. Antagonist-systemet
18. Resterande events och news ticker-rubriker
19. Balansering och playtesting
20. Fas 7 (terraforming/absurd endgame)

---

*"Frihet under ansvar. Ansvar under oss."*
— Silva Maximus AB:s inofficiella motto
