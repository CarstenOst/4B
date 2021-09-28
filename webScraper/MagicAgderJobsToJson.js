//Speci_WebScraper - Carsten Østergaard - Styggaste koden i he sett - Bruker 80% av 5800X uten await:)
const puppeteer = require("puppeteer");
process.setMaxListeners(20); //Omg its so simple :D

var counter = 1; //Variabel som brukes til å telle antall elementer skrevet i json array

// oppretter eller overskriver test.json fil
var fs = require("fs");
saveData = (file) =>{
    const finished = (error) =>{
        if(error){
            console.error(error);
        }
    }
    fs.writeFile(file,"[]",finished);
}
saveData( "FinnNo.json");

async function scrapeFinnLink(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    //for å hente ut text:
    for(let i = 2; i <= 51; i++){
        let finnArticleFromXpath = ("/html/body/div[2]/main/div[3]/div/section[1]/div[3]/article["+i+"]/div[3]/h2/a");
        let FinnTid1 = ("/html/body/div[2]/main/div[3]/div/section[1]/div[3]/article["+i+"]/div[3]/div[3]/div"); //enkel søknad
        let FinnTid2 = ("/html/body/div[2]/main/div[3]/div/section[1]/div[3]/article["+i+"]/div[3]/div[2]/div"); //uten enkel søknad

        try {
            const [el2] = await page.$x(finnArticleFromXpath); // Copy xP*ath i inspect element
            const href = await el2.getProperty("href");
            //if (el2.getProperty === "undefined"){break;}
            var finnLinkAgder = await href.jsonValue();

            console.log(counter); //Denne kan trygt fjernes/endres
            counter++
            const [ell] = await page.$x(FinnTid2); // Copy xPath i inspect element
            const tekst = await ell.getProperty("textContent");
            var TidUtsendt = await tekst.jsonValue();

            //----------------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------------
            //fjern await under denne kommentaren, for raskere resultat (advarsel du vil trenge litt minne og prosessorkraft)

            await ScrapeArticle(finnLinkAgder, TidUtsendt);

            //fjern await over  denne kommentaren. for raskere resultat (advarsel du vil trenge litt minne og prosessorkraft)
            //----------------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------------

        } catch (err){
            try{
                const [ell2] = await page.$x(FinnTid1); // Copy xPath i inspect element
                const tekst2 = await ell2.getProperty("textContent");
                TidUtsendt = await tekst2.jsonValue();

                await ScrapeArticle(finnLinkAgder, TidUtsendt);
            }catch (err){

                console.log("There are no more articles for you. Yay, hurra Lars 😀");
                {break}

            }
        }
    }
    browser.close();

}

async function ScrapeArticle(url, TidUtsendt) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    try {
        //for å hente ut text:
        try {
            const [el2] = await page.$x("/html/body/main/div/div[3]/div[2]/section[2]/div/dl/dd[1]"); // Copy xPath i inspect element
            const txt = await el2.getProperty("textContent");
            var Kontakt_Person = await txt.jsonValue();
        } catch (err){
            try {
                const [el2] = await page.$x("/html/body/main/div/div[3]/div[2]/section[1]/div/dl/dd[1]"); // Copy xPath i inspect element
                const txt = await el2.getProperty("textContent");
                Kontakt_Person = await txt.jsonValue();
            }catch (err){
                Kontakt_Person = "undefined";
                console.error("Kontaktpersonen er " + Kontakt_Person + ". Vennligst legg ved ny xPath eller sjekk link: " + url);
            }
        }

        //for å hente ut tlfnr
        try {
            const [el3] = await page.$x("/html/body/main/div/div[3]/div[2]/section[2]/div/dl/dd[3]/a"); // Copy xPath i inspect element
            const txt2 = await el3.getProperty("textContent");
            var Telefonnummer = await txt2.jsonValue();
        } catch (err){
            try {
                Telefonnummer = "undefined";
                const [el3] = await page.$x("/html/body/main/div/div[3]/div[2]/section[2]/div/dl/dd[2]/a"); // Copy xPath i inspect element
                const txt2 = await el3.getProperty("textContent");
                Telefonnummer = await txt2.jsonValue(); //Telefonnummer er allerede definert som var, trenger ikke definere igjen
                //console.log("Telefonnummer undefined, trying different xPath: " + url);

            }
            catch (err){
                try {
                    const [el3] = await page.$x("/html/body/main/div/div[3]/div[2]/section[2]/div[1]/dl/dd[3]/a"); // Copy xPath i inspect element
                    const txt2 = await el3.getProperty("textContent");
                    Telefonnummer = await txt2.jsonValue();
                    //console.log("Possible multiple phone numbers: " + url);

                } catch (err){
                    try{

                        const [el3] = await page.$x("/html/body/main/div/div[3]/div[2]/section[1]/div/dl/dd[3]/a"); // Copy xPath i inspect element
                        const txt2 = await el3.getProperty("textContent");
                        Telefonnummer = await txt2.jsonValue();
                        //console.log("Multiple contact information, only added first one: " + url);
                    }catch (err) {
                        console.error("No phone number written, see link: " + url);
                        Telefonnummer = "None";
                    }
                }
            }
        }
        //for å hente arbeidsgiver
        try {
            const [el4] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[1]"); // Copy xPath i inspect element
            const txt3 = await el4.getProperty("textContent");
            var Arbeidsgiver = await txt3.jsonValue();
        } catch (err){
            console.log("Ingen arbeidsgiver? Se link for info: " + url);
        }
        //for å hente Stillingstittel
        try {
            const [el5] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[2]"); // Copy xPath i inspect element
            const txt4 = await el5.getProperty("textContent");
            var Stillingstittel = await txt4.jsonValue();
        } catch (err){
                console.log("Her var det mulig ingen stillingstittel: " + url);
                Stillingstittel = ("Å ingenting, sjekk manuelt")}

        //for å hente Frist dato
        try {
            const [el6] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[3]"); // Copy xPath i inspect element
            const txt5 = await el6.getProperty("textContent");
            var Frist = await txt5.jsonValue();
        }catch (err){
            console.log("Her var det mulig ingen Frist: " + url);
            Frist = ("Å ingenting, sjekk manuelt")}

        //for å hente ansettelsform
        try {
            const [el7] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[4]"); // Copy xPath i inspect element
            const txt6 = await el7.getProperty("textContent");
            var Ansettelses_Form = await txt6.jsonValue();
        } catch (err){
            console.log("-------------------------------------------------------------------------------------------------");
            console.log("Her var det mulig ingen Ansettelsesform: " + url);
            console.log("-------------------------------------------------------------------------------------------------");
            Ansettelses_Form = ("Å ingenting, sjekk manuelt")
        }
        //for å hente Konkurrent
        try {
            const [el8] = await page.$x("//*[@id=\"more-ads-from-this-org-link\"]"); // Copy xPath i inspect element
            const txt7 = await el8.getProperty("textContent");
            var Konkurrent = await txt7.jsonValue();
        } catch (err){
            console.log("No competition here :): " + url);
            Konkurrent = "None";
        }
        const All_Elements = {Arbeidsgiver, Stillingstittel, Frist, TidUtsendt, Ansettelses_Form, Kontakt_Person, Telefonnummer, url, Konkurrent};

        // her må man legge inn array start og slutt. Her legges det bare til i filen
        /*const fs = require("fs");
        saveData = (data, file) =>{
            const finished = (error) =>{
                if(error){
                    console.error(error);
                }
            }
            const jsonData = JSON.stringify(data, null, 2);
            fs.appendFile(file,jsonData+",",finished);
        }
        saveData(All_Elements, "AllAgderJobs.json");*/

        // skriver en valid json script, bruker mye ram
        fs = require("fs");
        let userjson = fs.readFileSync("FinnNo.json", "utf-8");
        let test = JSON.parse(userjson);
        test.push(All_Elements);
        userjson = JSON.stringify(test, null, 2);
        fs.writeFileSync("FinnNo.json", userjson, "utf-8");



        browser.close(); // Obvious

    } catch (err){
        console.log("-------------------------------------------------------------------------------------------------");
        console.log("-------------------------------------------------------------------------------------------------");
        console.log("Shiet, this link is not viable and did not get written. Please add it manually Lars: ");
        console.log(url);
        console.log("-------------------------------------------------------------------------------------------------");
        console.log("-------------------------------------------------------------------------------------------------");
    }
}

async function FindFinnPages() { //loop som finner alle jobbene i agder
    for (let i = 1; i <= 12; i++) {
        try {
            let FinnArticlePage = ("https://www.finn.no/job/fulltime/search.html?abTestKey=control&location=1.20001.22042&page=" + i + "&sort=RELEVANCE"); //legg inn link her
            await scrapeFinnLink(FinnArticlePage);
        } catch (err) {
            console.log(" This means the program is finished :) Yay, hurra Lars 😀");
            console.log("----------------------------------");
            console.log("------------Success!--------------");
            console.log("----------------------------------");
        }
    }
}

FindFinnPages();//starter programmet

//for testing under
//scrapeFinnLink("https://www.finn.no/job/fulltime/search.html?abTestKey=control&location=1.20001.22042&page=10&sort=RELEVANCE");
