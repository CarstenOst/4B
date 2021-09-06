const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    //for å hente ut biler:
    const [el] = await page.$x("/html/body/main/div/div[3]/div[2]/section[1]/div/a/img"); // Copy xPath i inspect element
    const src = await el.getProperty("src");
    const imgURL = await src.jsonValue();

    //for å hente ut text:
    const [el2] = await page.$x("/html/body/main/div/div[3]/div[2]/section[2]/div/dl/dd[1]"); // Copy xPath i inspect element
    const txt = await el2.getProperty("textContent");
    const kontaktPerson = await txt.jsonValue();

    //for å hente ut tlfnr:
    const [el3] = await page.$x("/html/body/main/div/div[3]/div[2]/section[2]/div/dl/dd[3]/a"); // Copy xPath i inspect element
    const txt2 = await el3.getProperty("textContent");
    const telefonNummer = await txt2.jsonValue();

    //for å hente arbeidsgiver
    const [el4] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[1]"); // Copy xPath i inspect element
    const txt3 = await el4.getProperty("textContent");
    const arbeidsGiver = await txt3.jsonValue();

    //for å hente
    const [el5] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[2]"); // Copy xPath i inspect element
    const txt4 = await el5.getProperty("textContent");
    const stillingsTittel = await txt4.jsonValue();



    console.log({arbeidsGiver, stillingsTittel, kontaktPerson, telefonNummer, imgURL});

    browser.close();
}

scrapeProduct("https://www.finn.no/job/fulltime/ad.html?finnkode=231059221");