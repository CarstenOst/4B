//WebScraper - Carsten Østergaard
const puppeteer = require("puppeteer");

async function scrapeFinnLink(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    //for å hente ut text:
    for(let i = 2; i <= 51; i++){
        var finnArticlePart1 = "/html/body/div[2]/main/div[3]/div/section[1]/div[3]/article[";
        let finnArticlePart2 = "]/div[3]/h2/a";
        let finnArticle = finnArticlePart1.concat(i, finnArticlePart2);
        const [el2] = await page.$x(finnArticle); // Copy xPath i inspect element
        const href = await el2.getProperty("href");
        const finnLinkAgder = await href.jsonValue();
        console.log({i});

        console.log({finnLinkAgder});

    }
    /*//for å hente ut tlfnr:
    const [el3] = await page.$x("/html/body/main/div/div[3]/div[2]/section[2]/div/dl/dd[3]/a"); // Copy xPath i inspect element
    const txt2 = await el3.getProperty("textContent");
    const telefonNummer = await txt2.jsonValue();

    //for å hente arbeidsgiver
    const [el4] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[1]"); // Copy xPath i inspect element
    const txt3 = await el4.getProperty("textContent");
    const arbeidsGiver = await txt3.jsonValue();

    //for å hente stillingstittel
    const [el5] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[2]"); // Copy xPath i inspect element
    const txt4 = await el5.getProperty("textContent");
    const stillingsTittel = await txt4.jsonValue();*/




    browser.close();
}

scrapeFinnLink("https://www.finn.no/job/fulltime/search.html?abTestKey=control&location=1.20001.22042&sort=RELEVANCE&PAGE=");