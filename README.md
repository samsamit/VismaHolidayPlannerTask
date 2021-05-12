# VismaHolidayPlannerTask

Programming task for Visma Solutions

## DevNotes

Aloitan tehtävän tekemisen kirjoittamalla omat ajatuksen ja tehtävälistan tehtäväkuvauksesta.

- tarvitaan metodi joka ottaa inputtina aikavälin joka on oletettavasti string tyyppinen (1.7.2020 - 29.7.2020)
  - Tehtäväkuvauksesta voisi olettaa että inputti on siis string tyyppinen joten toteutan tämän sillä
  - Teen luokan kuitenkin sillä tavalla että siihen on helppo lisätä metodi joka ottaa sisäänsä myös muun tyyppisiä arvoja esim. Date
- Kun input on string muodossa on syytä luoda parsintafunkttio joka siis muuttaa tämän input stringin helpommin käsiteltävään date tyyppiin
- Lisäksi inputtia tukemaan tarvitaan muutama tarkistusfunktio joilla sselvitetään että inputti on sallitussa muodossa
  - Ensimmäinen tarkistusfunkio tarkistaa että input alkaa vaaditulla päivämäärämuodolla, sisältää väliviivan ja loppuu toiseen päivämäärään
  - Sitten on syytä tarkistata että päivämäärät ovat oikeita päivämääriä (Ei liian isoja päiviä tai kuukausia)
  - Tarkistetaan myös että annetut päivämäärät on kronologisesti annettu
  - Tässä vaiheessa voidaan myös tarkistaa että nämä annetut päivämäärät on myös määrätyllä lomanpitoaikavälillä
- Mikäli annettu aikaväli on läpäisee kaikki testit voidaan aloittaa käytettävien lomapäivien laskeminen
- Seuraavaksi looppaan aikavälin läpi ja lasken päivien määrän ja samalla lasken myös sunnuntaitten määrän
  - Jotenkin looppaan koko aikavälin läpi ja lasken sunnuntaitten määrän käyttäen Date tietotyypin getDay methodia
  - Tässä loopissa voisin myös selvittää onko joku loopattava päivä annettu kansainvälinen vapaapäivä mutta teeen sen varmaan toisella tavalla välttääkseni sisäkkäisiä looppeja
- Kainsainäliset vapaapäivät ei siis syö lomapäiviä ja ensimmäisen vuoden vapaapäivät on annettu valmiiksi
  - Teen noista vapaapäivistä parametrin tuolle luokalle niin ne voi sitten luokan luomisen yhteydessä määrittää aina uudelleen

Aloitan tällä nyt tekemään tehtävää ja kommentoin tähän alle siinä samalla ajatuksia...

- Meni aika paljon aikaa uusimman Node.js verion asennukseen ja importin toimintaan saamiseen...

- Loin luokan HolidayPlanner jonka konstructoriin annoin kolme muuttujaa

  - nationalHolidays muuttuja on Date array joka sisältää kaikki kansainväliset vapaapäivät
  - holidayPeriodStart ja holidayPeriodEnd määrää loma-ajan

- Aloitin tekemällä parseTimespanInputString funktion joka siis parsii siitä inputistta kaksi date tyyppistä muuttujaa

  - tein myös funktion checkIfStringsAreNumbers joka katsoo onko inputtina annetussa sstring arrayssa kaikki stringit numeroita ja palauttaa booleanarvon vastauksena
  - Tutkittuani tatrkemmin Date tietotyyppiä löysin helpomman keinon selvittää onko parrsittu tulos oikeasti päivämäärä
    - isValidDate funktio hoitaa tämän tarkistuksen
  - Testatuksen jälkeen huomasin että Date tietotyypin luonnissa voidaan laittaa päivien kohdalle vaikka 100 päivää. Tämä täytyy esttää jotenkin
  - Tein tarkastuksen siteen että katson vastaako annettu päivä ja kuukausi numero Datee tietotyypin luonnin jälkeen tullutta päivää ja kuukautta

- Seuraavaksi selvitän näiden päivämäärien välisieen päivien määrän getPassedDays funktiolla

  - Sisään Date tyyppiset muutttujat alku ja loppupäivälle ja ulos päivien määrä

- tähän väliin committi

- Päätin siisstiä parseTimespanInputString funktiota teekemällä apufunktion getDateFromDateString jolle annetaan sisään string muodossa päivämäärä ja se palauttaa päivämäärän Date muodossa

- Onko annettu päivämäärä loma-ajan sisällä, tätä varten tein luokkaan oman methodin nimeltä isDateInHolidayperiod

  - Tein sen luokkaan sisälle jotta sitä voitaisiin käyttää jossain muussakin yhteydessä nimenomaan HolidayPlanner teemalla
  - Metodi ottaa sisään dateee tyypin ja kertoo boolean arvolla onko se luokan construktorissa määriteltyjen päivämäärien sisällä

- Kun saan getPassedDays funktiosta päivämäärät niin tarkistan ylittääkö ne määrätyn maksimiloma-ajan

  - Tätä varten tein luokan construktoriin uuden muuttujan maxHolidaySpan joka ottaa siis maksimi loma-ajan päivinä
  - Tällä tatvalla luokasta saadaan enemmän muokattava

- Tein funnktion calculateBonusHolidaysAndSundays joka looppaa aikavälin kaikki päivät läpi ja tarkistaa onko päivä sunnintati tai onko se päivä nationalHolidays taulukossa
  - Tätä varten minun piti muutta constructoria siten että nationalHolidays taulukkoon laitetaan päivämäärä milliseekunttimuodotssa
  - Täten voin heelposti tarkistaa include metodilla sisältääkö taulukko loopattavan päivän
