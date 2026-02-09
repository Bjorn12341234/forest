# SILVA MAXIMUS — Game Design Document

> Source of truth for all game design decisions.

---

## 1. Core Concept & Vision

### The Elevator Pitch
Du är **Massaindustrin AB**. Du klickar dig till total dominans över den svenska skogen. Du börjar med en enda skogsbruksplan och slutar med att industriplantera sterila trädplantager på månen. Längs vägen krossar du miljörörelser, köper politiker, lurar skogsägare, och omdefinierar begreppet "hållbarhet" tills det betyder "maximal avverkning".

### Genre
Satirisk incremental/idle-simulator i Universal Paperclip Simulator-tradition.

### The Hidden Point
Spelet visar tre parallella sanningar samtidigt:
1. **Industrin tjänar mest** — alltid, i varje led
2. **Skogsägaren tror de tjänar** — men utnyttjas som politisk sköld och råvaruleverantör
3. **Naturen förlorar** — men det syns inte i industrins statistik

Varje uppgradering som ser positiv ut har en dold kostnad som avslöjas gradvis. I endgame ser spelaren ett kliniskt "kvitto" som visar den verkliga skadan.

### Tone
Maximal svart humor, absurd satir och sarkasm — men förankrad i verkliga mekanismer från svensk skogspolitik. Spelaren ska ha kul, skratta, men sitta kvar med obehag: *"Vänta, är det verkligen så här det fungerar?"* Svaret: ja, i stor utsträckning.

### Language
Allt i spelet är på **svenska**. Alla UI-labels, flavourtext, events, achievements, allt.

---

## 2. Primary Resources (Synliga för spelaren)

| Resurs | Internt namn | UI-label | Beskrivning |
|--------|-------------|----------|-------------|
| Klickresurs | `stammar` | **Stammar** | Grundresursen. Varje klick = stammar fällda. Börjar med 1/klick. |
| Valuta | `kapital` | **Kapital (Mkr)** | Genereras vid försäljning av stammar → massa. Allt köps med detta. |
| Inflytande | `lobby` | **Politiskt Kapital** | Tjänas genom lobbying-mekanik. Krävs för lagändringar & politiska projekt. |
| PR | `image` | **Grön Image™** | Hur "hållbar" industrin uppfattas. Börjar på 100. Sjunker vid skandaler. Kan köpas tillbaka med PR-kampanjer. |

### Hidden Resources (visas INTE i UI förrän avslöjning)

| Dold resurs | Internt namn | Avslöjas i | Beskrivning |
|-------------|-------------|------------|-------------|
| Verkligt koldioxidutsläpp | `realCO2` | Endgame | Totalt nettoutsläpp inkl. markberedning, transport, förlorat kolförråd |
| Skogsägarens faktiska förtjänst | `ownerProfit` | Endgame | Vad småskogsägaren faktiskt fått vs vad industrin tjänat |
| Biologisk mångfald | `biodiversity` | Gradvis (counter) | Startar på 100%. Sjunker med varje kalavverkning. |
| Artantal | `species` | Endgame | Hur många arter som försvunnit |
| Samebyars renbetesmark | `samiLand` | Mid-game event | Förlorad betesmark i km² |

---

## 3. Click Mechanic: "Skriv Skogsbruksplan"

Spelarens primära klick-action. Varje klick genererar stammar. Flavourtexten ändras med progression:

- **Tier 0:** *"Du skriver en skogsbruksplan åt en pensionerad lärare i Ångermanland. Gratis, såklart."*
- **Tier 1:** *"Du rekommenderar 'föryngringsavverkning' — det låter ju bättre än 'kalavverkning'."*
- **Tier 2:** *"Planen föreslår gallring. Av det fina virket. Skräpet lämnar du kvar. Ägaren märker inget."*
- **Tier 3:** *"Avverkningsanmälan inskickad. Skogsstyrelsen hinner inte granska. Perfekt."*
- **Tier 4:** *"Planen skrivs nu av en AI. Ägaren får ett mail. Skördaren är redan på plats."*

### Click Multiplier Upgrades

| Uppgradering | Kostnad | Effekt | Flavourtext |
|-------------|---------|--------|-------------|
| Bättre penna | 50 Kapital | +1 stam/klick | *"Montblanc. Viktigt att se seriös ut."* |
| Digital plan | 200 Kapital | +5 stammar/klick | *"Nu med färgglada kartor. Ägaren fattar inget."* |
| Planfabrik | 1 000 Kapital | +20 stammar/klick | *"En plan var tredje sekund. Ägarnas namn autogenereras."* |
| AI-Planering | 10 000 Kapital | +100 stammar/klick | *"Maskininlärning optimerar gallringsintervall. Inga människor inblandade."* |

---

## 4. Generators (Producerar stammar per sekund)

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
| **Klon-Skog** | 5 000 000 | 500 000/s | *"Identiska granar. Identiska rader. Identisk framtid."* |
| **Planetär Terraformer** | 50 000 000 | 2 000 000/s | *"Mars röda jord + svensk grön gran = orange vinst."* |
| **Nanoskördare** | 500 000 000 | 20 000 000/s | *"Molekylär avverkning. Träden vet inte ens att de fälls."* |
| **Dimensionsskördare** | 5 000 000 000 | 200 000 000/s | *"Avverkar i parallella dimensioner. Ingen kan klaga."* |
| **Multiverse-Harvester** | 50 000 000 000 | 2 000 000 000/s | *"Oändliga universum. Oändlig skog. Oändlig avverkning."* |
| **Entropimotor** | 500 000 000 000 | 20 000 000 000/s | *"Omvandlar universums termiska död till produktiv energi."* |

### Cost Scaling
```
cost(n) = base_cost × 1.15^n
```
Where `n` is the number of that generator already owned.

Sena generatorer (fas 7+) har costScale 1.20–1.35 istället för standard 1.15.

---

## 5. Lobby System (Politiskt Kapital)

### Earning Politiskt Kapital

| Aktivitet | Kostnad (Kapital) | PK-vinst | Flavourtext |
|-----------|-------------------|----------|-------------|
| **Älgjakt med riksdagsledamot** | 5 000 | +10 PK | *"Inget diskuteras. Allt förstås."* |
| **Finansiera tankesmedja** | 25 000 | +50 PK | *"Rapporten 'Skog i Tillväxt: Varför Avverkning Räddar Klimatet' publiceras i DN Debatt."* |
| **Sponsra partistämma** | 100 000 | +200 PK | *"Äganderätten nämns 47 gånger i motionerna."* |
| **Transatlantiska Kontakten** | 500 000 | +1 000 PK | *"Ett möte i Washington DC. Heritage Foundation. Oljebolag med i rummet. EU:s hållbarhetslagar diskuteras. Din svenska delegat nickar."* |

### Spending Politiskt Kapital (Lagändringar)

| Lagändring/Projekt | PK-kostnad | Effekt | Baserad på |
|--------------------|-----------|--------|-----------|
| **"Frihet Under Ansvar 2.0"** | 50 PK | -30% myndighetstillsyn | Skogsreformen 1993 |
| **"Skogsstyrelsen: Tillsynsbudget -40%"** | 100 PK | Skandaler kostar 50% mindre Image | Naturvårdsverkets nedskärningar |
| **"Äganderätten Är Hotad!™"** | 200 PK | Skogsägare protesterar aldrig mot dig | Skogsindustrins 200M kr lobbybudget 2022 |
| **"Operation Omnibus"** | 500 PK | EU-compliance -50% i 5 minuter | Warborn/Omnibus-paketet |
| **"Myndighetskapning"** | 1 000 PK | Skogsstyrelsen skriver DINA rapporter | GD som raderade mail med lobbyister |
| **"Svängdörren"** | 2 000 PK | Permanenta: ministrar jobbar för dig efteråt | Maktutredningen 2026 |
| **"Avskogningsförordningen: Avvecklad"** | 5 000 PK | Global avverkning utan konsekvens | EU:s avskogningsförordning |

---

## 6. Skogsägar-Mekaniken: "Beskyddarverksamheten"

### Relationship Meter: Skogsägarförtroende (0–100)

- **För HÖGT (>80):** Du utnyttjar dem inte tillräckligt. De behåller virket.
- **För LÅGT (<20):** De protesterar, säljer till konkurrenter.
- **Sweet spot (40–60):** De följer dina planer utan att ifrågasätta.

### Manipulation Actions

| Action | Effekt på Förtroende | Effekt på dig | Flavourtext |
|--------|---------------------|---------------|-------------|
| Gratis skogsbruksplan | +15 | Du styr gallring & avverkning | *"Kostnadsfritt! (Värdet av virket vi får: 4,7 Mkr.)"* |
| "Äganderätten!"-kampanj | +25 | Blockerar EU-kartläggning | *"VI kämpar för DIN skog! (Mot folk som vill skydda den.)"* |
| Sänk virkespriset | -10 | +30% Kapital per stam | *"Marknadskrafterna, tyvärr. (Du ÄR marknadskraften.)"* |
| Hårdgallring | -5 | Tar allt fint virke | *"Du tog de bästa träden och lämnade skräpet. Ägaren ser inte skillnad."* |
| "Partnerskap" | +20 | Ägaren bunden i 25-årskontrakt | *"Ett handslag. En kopp kaffe. 500 hektar."* |

### Hidden Bookkeeping (revealed in endgame)
- Column 1: **Vad skogsägaren fick** (Kapital)
- Column 2: **Vad industrin tjänade** (Kapital × 8-15)
- Ratio shown in red: *"Förhållande: 1:12"*

---

## 7. Game Phases

### Phase 1: "Lokalpatriot" (0–10 000 stammar)
Du är en regional aktör. Du skriver planer, köper virke, bygger din första massafabrik.
- **Mål:** Fyll din första massaorder till ett pappersföretag.
- **Nyckelbeslut:** "Ska du gallra försiktigt eller hårt?"
- **Unlock:** Lobbymodulen.

### Phase 2: "Den Goda Grannen" (10 000–100 000 stammar)
Skalan ökar. Du inser att skogsägare är dina bästa allierade — och dina bästa offer.
- **Mål:** Kontrollera 10 skogsägares planer.
- **Nyckelprojekt:** "Äganderätten Är Hotad!" (Lobbykampanj)
- **Event:** *"Rysslands-embargo!"*
- **Unlock:** PR/Image-systemet.

### Phase 3: "Massabaronen" (100 000–1 000 000 stammar)
Du dominerar den nationella marknaden. Men Kina börjar dumpa billig massa.
- **Mål:** Bibehåll lönsamhet trots priskollaps.
- **Nyckelprojekt:** "Sänk Avverkningsåldern!"
- **Event:** *"Kinesisk Massadumpning!"*
- **Unlock:** Internationell lobbymodul.

### Phase 4: "PR-Katastrofen" (1M–10M stammar)
Din image kollapsar. Men du har verktygen att fixa det.
- **Obligatorisk Event: "Nestlé-Reträtten"**
  - Val A) Dubbeldown: "Certifieringspaus" (-30 Image, +50 000 stammar)
  - Val B) Greenwash: Skapa 50 "gräsrotsorganisationer" (+20 Image, -100 000 Kapital)
  - Val C) Attackera kritikerna (+10 PK, -15 Image)
- **Nyckelprojekt: "Klimatnarrativet"**
- **Unlock:** Samiska konflikten.

### Phase 5: "Det Skogsindustriella Komplexet" (10M–100M stammar)
Du har kontroll över politiker, myndigheter, och narrativet.
- **Nyckelprojekt:** "Maktutredningen — Men tvärtom", "Svängdörren", "Transatlantiska Pipelinen"
- **Unlock:** Endgame-modulen.

### Phase 6: "Global Skogskonglomerat" (100M–1B stammar)
Sverige är klart. All skog är industriskog.
- **Nyckelprojekt: "Silva Maximus Grid"** — Ersätt de sista blandskogarna med genetiskt optimerade monokulturer.
- **Achievement: "Den Tysta Våren"** — Fågelljud ersätts gradvis av drönande från autonoma skördare.
- **Unlock:** Expansionsmodulen (världskarta).

### Phase 7: "Post-Biologisk Skogsbruk" (1B–10B stammar)
- **Unlock:** Global expansion, terraforming-forskning.
- **Nyckelprojekt:** Kloning, genetisk optimering, autonoma nätverk.
- **Achievement: "Den Tysta Våren"** — Fågelljud ersätts gradvis av drönande från autonoma skördare.

### Phase 8: "Terraforming AB" (10B–100B stammar)
Årsredovisning triggas som milstolpe vid 10B. Rymden öppnas.
- **Nyckelprojekt: "Lunar Silva"** — Terraforma månen.
- **Unlock:** Solsystemskarta, planetära expansioner.

### Phase 9: "Kosmisk Industrialisering" (100B–1T stammar)
Dysonsfärer, svarta hål, alien-kontakt.
- **Projekt: "Mars Massafabrik"** — Genetiskt modifierade träd i 0.6% atmosfärstryck.
- **Unlock:** Galaktisk karta.

### Phase 10: "Den Perfekta Raden" (1T–10T stammar)
Galaktisk dominans, mörk materia.
- **Projekt:** Exploatera svarta hål, mörk materia-skördare.
- **Achievement: "Den Perfekta Raden"** — Universum blir ett rutnät.

### Phase 11: "Parallella Universum" (10T–100T stammar)
Multiversum, tidsresor, kausalitetsbrott.
- **Unlock:** Multiversumskarta.
- **Projekt:** Dimensionsskördare, temporala loopar.

### Phase 12: "Entropins Slut" (100T+ stammar)
Universums slut, den sista maskinen, meta-endgame.
- **Den Sista Skärmen:** Årsredovisnings-kvittot (se Endgame section).

---

## 8. Events & Random Encounters

Events triggas vid specifika resursers milstolpar eller slumpmässigt.

| Event | Trigger | Val | Effekt |
|-------|---------|-----|--------|
| **"Samebyns protest"** | 500 000 stammar | A) Ignorera (-5 Image) B) "Samråd" (3 000 Kapital, ingen effekt) C) Köp betesmark (50 000 Kapital, +10 000 stammar) | Dold: `samiLand` -15% |
| **"SVT-dokumentär: Slaget om Skogen"** | Image < 50 | A) SMS:a GD mot SVT (500 PK) B) Radera mejlen (-0 Image) C) Inget (Image -20) | GD:n reference |
| **"Ideell förening hittar nyckelbiotop"** | Varje 50 000 stammar | A) Avverka ändå (-15 Image, +5 000 stammar) B) "Paus" certifiering C) Anklaga dem som ovetenskapliga (+5 PK) | Pensionär med GPS |
| **"Kinesisk prisras"** | Fas 3 start | Obligatorisk: Sänk avverkningsålder | Marginalerna krymper |
| **"Plockhugget-problemet"** | 200 000 stammar | A) Svartmåla som oekonomiskt B) Kopiera och sälj som "premium" (10 000 Kapital) | De tar BETALT |
| **"Wellpapp-boomen"** | 1M stammar | Amazon-kontrakt: +200% massapris i 2 min | Jeff Bezos behöver lådor |
| **"Svenska Kyrkan säljer"** | 3M stammar | Köp kyrkoskog för spotpris | 150-årig tall → börshus |
| **"Greta-effekten"** | Image < 30 | Global uppmärksamhet, Image -25 ELLER kampanj +15 Image | En tonåring med plakat |
| **"Nestlé-Reträtten"** | Obligatorisk Fas 4 | Se Phase 4 description | Existentiell kris |

---

## 9. Achievements

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
| **Klimatambassadören** | Maxxa "Grön Image" trots >500 000 stammar | 🌱 | *"Du släppte ut 4 miljoner ton CO₂. Din rapport visar -200 000. Matematik!"* |

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

## 10. Antagonists / Motstånd

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

## 11. Endgame & 4 Eror

### Spelstrukturen: Fyra eror
- **SVERIGE (fas 1-4):** Lokal → Regional → Nationell dominans
- **VÄRLDEN (fas 5-7):** Internationalisering, global expansion, terraforming-forskning
- **UNIVERSUM (fas 8-10):** Rymden, planeter, galaktisk industrialisering
- **BORTOM (fas 11-12):** Multiversum, tidsresor, entropins slut

### Årsredovisningen (triggas vid 10B stammar)
Årsredovisningen är inte längre spelslut — den är en **milstolpe** som triggas vid 10B stammar (fas 8 start).

Minimal, vit skärm. Kliniskt kvitto som visar:
- Total stammar avverkade
- Total kapital genererat
- **DOLD BOKFÖRING:** Verkligt netto-CO₂ vs rapporterat, skogsägare vs industri (1:12), arter utrotade, samebyar = 0, Skogsstyrelsen = KÖPT, FSC = KÖPT, EU = URVATNAD
- Knapp: **"FORTSÄTT SPELA"** (inte reset)

### Post-Credits (efter Årsredovisningen)
Scrollande text med evil-corp triumfalism:
- *"Tack för din insats."*
- *"Aktieägarna är nöjda."*
- *"Styrelsens bonusar är säkrade."*
- *"Expansionen fortsätter."*

### Reality Page (efter post-credits)
Svart bakgrund. Verkliga fakta om svensk skogsindustri:
- Skogsstyrelsens maktutredning 2026
- Svängdörrar politik ↔ näringsliv
- "Frihet under ansvar" sedan 1993
- 200 Mkr i lobbybudget
- Nestlé bröt med SCA 2025
- EU:s hållbarhetslagar urvattnades via Omnibus
- 63% av virke → massa (engångsprodukter)
- Alternativa brukningsformer existerar. De svartmålas.
- Länk till **Föreningen Naturhänsyn** (naturhansyn.se)
- Länk till Skogsstyrelsens rapport "Makten Över Skogen" (2026)

Knappar:
- **"FORTSÄTT SPELA"** (återgå till spelet)
- **"Starta om"** (reset)

---

## 11b. Expansion-systemet

### Översikt
Expansion-fliken låses upp i **fas 6** och ger tillgång till globala/kosmiska expansionsmål.

### 18 Expansion Targets
- **Länder (fas 6-7):** Brasilien, Kongo, Ryssland, Kanada, etc.
- **Planeter (fas 8-9):** Månen, Mars, Europa, Titan, etc.
- **Galaktiska mål (fas 10):** Proxima Centauri b, Dysonsfärer, svarta hål
- **Parallella universum (fas 11-12):** Alt-Earth 1, Alt-Earth 2, dimensionella loopar

### 4 Kartvyer
- **Världskarta (fas 6-7):** Expandera till andra länder.
- **Solsystemskarta (fas 8-9):** Terraforma planeter och månar.
- **Galax-karta (fas 10):** Exploatera stjärnsystem och svarta hål.
- **Multiverse-karta (fas 11-12):** Skörda parallella dimensioner.

### Mekanik
Expansion targets kostar:
- **Stammar** (initial investering)
- **Kapital** (infrastruktur)
- **Lobby** (politisk vilja / rymdfartsmyndigheter)

Producerar:
- **Stammar/s** (kontinuerlig produktion)
- **Kapital/s** (kontinuerlig intäkt)

Dolda kostnader:
- **Biodiversitet** (minskar per expansion)
- **realCO2** (ökar per expansion)

---

## 12. News Ticker

Horisontell nyhetsticker längst ner. Nya rubriker triggas av milstolpar.

### Fas 1–2:
- *"Virkesuppköpare bjuder på kaffe i Ångermanland: 'Jag tittar bara förbi, jag lovar.'"*
- *"Skogsägare nöjd med gratis plan: 'De verkar ju veta vad de gör.'"*
- *"Rapport: 'Gallring god för skogen' — finansierad av massaindustrin."*
- *"Centerpartiet: 'Äganderätten hotas av fågelskådare.'"*

### Fas 3–4:
- *"Kinas massa-dumpning pressar ner priserna. Industrin: 'Hugga snabbare löser det.'"*
- *"Svenska Kyrkan levererar 150-årig tall till danska börshuset — 'Det är cirkulärt.'"*
- *"Lobbyist-rapport: Träd föredrar att bli wellpapp framför att ruttna i skogen."*
- *"Ny studie: Unga plantor binder CO₂! (Studien finansierad av dem som fällde de gamla träden.)"*
- *"Alternativt skogsbruk döms ut som 'ovetenskapligt' av branschfinansierad forskare."*
- *"Plockhugget tar betalt för rådgivning. Industrin: 'Vi gör det gratis!' (Tänk inte på varför.)"*

### Fas 5–6:
- *"M-politiker i möte med Trump-rådgivare: 'Vi delar samma syn på biomassa.'"*
- *"Skogsstyrelsen publicerar rapport om att lobbyister styr skogspolitiken. Lobbyisterna: 'Nej.'"*
- *"Ex-generaldirektör köper 700 hektar skog. Samma skog hans myndighet hade tillsyn över."*
- *"EU:s hållbarhetslagar urvattnades. Huvudförhandlaren: 'Jag har varit fullt transparent.'"*
- *"Heritage Foundation skickar tackkort till Bryssel."*
- *"Nestlé bryter med svensk skogsjätte: 'Ert rykte är sämre än vårt.'"*
- *"Naturskyddsföreningen lämnar Skogsstyrelsens samverkansprocess: 'Våra synpunkter väger lätt.'"*
- *"GD:n sms:ar lobbyisten: 'Mejla till min privata adress istället.'"*

### Fas 7 (Endgame):
- *"Sista lavskrikan observerad. Observatören arresterad för 'störande av produktiv verksamhet.'"*
- *"Jordens skogar: 100% produktiva. Biologisk mångfald: 'Vad är det?' — Näringsdepartementet."*
- *"Lunar Silva AB godkänt för börsnotering. Kurs: ∞."*
- *"FN:s generalsekreterare gratulerar: 'Ni har löst klimatfrågan. Genom att eliminera den.'"*

---

## 13. UI/UX Design

### Visual Theme: "Byråkratisk Brutalism"
- **Bakgrund:** Ljusgrå (#F0F0F0) med subtila rutnätslinjer (som millimeterpapper/skogsbruksplan)
- **Accent 1:** Industriorange (#D4730C) — knappar, siffror, progress bars
- **Accent 2:** "Falsk grön" (#7DB840) — används ironiskt för alla "hållbarhets"-element
- **Text:** Mörkgrå (#2C2C2C), monospace-font (IBM Plex Mono)
- **Varning/Skandal:** Röd (#CC2222)
- **Endgame-reveal:** Vit bakgrund, svart text. Rent. Kliniskt.

### Desktop Layout
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
│ 📺 Skogsägare nöjd med gratis plan...       │
└──────────────────────────────────────────────┘
```

### Sound Design (gradvis övergång)
- **Fas 1–2:** Fågelkvitter, vindsus, bäck. Lugnt, idylliskt.
- **Fas 3:** Motorsågsljud blandat med fåglar. Fåglarna blir färre.
- **Fas 4:** Skördarmaskiner dominerar. Enstaka fågel.
- **Fas 5:** Industriellt dån. Ingen natur.
- **Fas 6:** Tystnad. Sedan: drönande, monotont surr.
- **Fas 7:** Komplett tystnad. Bara ett litet "pip" vid klick. Som ett EKG. Sedan: flatline.

---

## 14. Naming Conventions (Fiktiva namn)

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
| Moderaterna / EU-parlamentariker | **Borgliga Framtidspartiet** / **EU-Kontakten** |
| SVT Vetenskap | **Statliga Dokumentärkanalen** |
| Plockhugget | **Skogsvispen AB** |
| Greenpeace | **RegnbågsFlottan** |
| GD (Herman Sundqvist-ref) | **GD Tallström** |
| Amazon | **Kartongen.com** |
| EU:s Omnibus-paket | **Paket Allt-i-Ett** |

---

## 15. Key References

Verkliga händelser och fakta som genomsyrar spelet:

| Verklig referens | I spelet | Källa |
|-----------------|---------|-------|
| Skogsstyrelsens maktutredning 2026 | Event + Achievement + Endgame | Rapport 2026/03 |
| Svängdörrar politik ↔ industri | "Svängdörren"-uppgradering | Maktutredningen |
| S + C som maktpar | Lobbysystemets koalitionsmekanik | Maktutredningen |
| Warborn / Omnibus / Heritage Foundation | "Operation Omnibus" | Aftonbladet + Der Spiegel |
| GD raderade mejl + ägde skog | Event: "SVT-dokumentären" | SVT Vetenskap, DN |
| Nestlé bröt med SCA 2025 | Event: "Nestlé-Reträtten" | Greenpeace, SVT |
| SCA lämnar FSC | "FSC-Karussellen" | Skydda Skogen, DN |
| Plockhugget | Event: "Plockhugget-problemet" | Plockhugget AB |
| 200 Mkr lobbybudget 2022 | Lobby flavourtext | Skogen.se |
| "Frihet under ansvar" sedan 1993 | "Frihet Under Ansvar 2.0" | Riksdagsbeslut 1993 |
| 63% av virke → massa | Genomgående | Skogsindustriernas statistik |
| Markberedning → kolutsläpp | Dold variabel: realCO2 | Naturvårdsverket |

---

## 16. Balancing Guidelines

Target: **2–4 timmar** total playtime (med 12 faser).
- **Första 5 min:** Manuellt klickande dominerar
- **5–20 min:** Generators tar över
- **20–60 min:** Lobbymodul och events driver progressionen
- **60–120 min:** Global expansion (fas 6-7)
- **120–180 min:** Rymd-era (fas 8-10)
- **180–240 min:** Meta-endgame (fas 11-12)

Cost escalation: 1.15× multiplikator per köpt enhet (sena generatorer 1.20–1.35×).

Event-frekvenser skalade 30-50% längre intervaller för senare faser.

Lobby boost capped at +100%.

Late tech costs 3-5x higher än motsvarande early-game tech.

---

*"Frihet under ansvar. Ansvar under oss."*
— Silva Maximus AB:s inofficiella motto
