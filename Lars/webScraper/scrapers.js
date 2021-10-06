const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    //for å hente ut text:

        const [el1] = await page.$x("/html/body/main/div/div[3]/div[2]/section[2]/div/dl/dd[1]"); // Copy xPath i inspect element
        const txt = await el1.getProperty("textContent");
        const kontaktPerson = await txt.jsonValue();

    //for å hente ut tlfnr
    try {
        const [el2] = await page.$x("/html/body/main/div/div[3]/div[2]/section[2]/div/dl/dd[3]/a"); // Copy xPath i inspect element
        const txt2 = await el2.getProperty("textContent");
        var telefonNummer = await txt2.jsonValue();
    }
    //vil prøve en annen xPath dersom xPath over ikke funker^^
    catch (err){
        try {
            console.error(err.message + "-telefonnummer " + "Trying different xPath for link: " + url);
            telefonNummer = "undefined";
            const [el2] = await page.$x("/html/body/main/div/div[3]/div[2]/section[2]/div/dl/dd[2]/a"); // Copy xPath i inspect element
            const txt2 = await el2.getProperty("textContent");
            var telefonNummer = await txt2.jsonValue();
        }
        catch (err){
            console.log(err.message + "Multiple contact information, only added first one")
            const [el2] = await page.$x("/html/body/main/div/div[3]/div[2]/section[2]/div[1]/dl/dd[3]/a"); // Copy xPath i inspect element
            const txt2 = await el2.getProperty("textContent");
            var telefonNummer = await txt2.jsonValue();
        }
    }

    //for å hente arbeidsgiver
    const [el3] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[1]"); // Copy xPath i inspect element
    const txt3 = await el3.getProperty("textContent");
    const arbeidsGiver = await txt3.jsonValue();

    //for å hente stillingsTittel
    try {
        const [el4] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[2]"); // Copy xPath i inspect element
        const txt4 = await el4.getProperty("textContent");
        var stillingsTittel = await txt4.jsonValue();
    } catch (err){
        try {
            const [el4t] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dt[1]/text()");
            const txt4t = await el4t.getProperty("textContent");
            console.log(txt4t)
            if (txt4t === "Stillingstittel") {
                const [el4] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[1]"); // Copy xPath i inspect element
                const txt4 = await el4.getProperty("textContent");
                stillingsTittel = await txt4.jsonValue();
            } else {

            }


        }catch (err){
            console.error(err.message)
        }
    }
    //for å hente frist dato
    const [el5] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[3]"); // Copy xPath i inspect element
    const txt5 = await el5.getProperty("textContent");
    const frist = await txt5.jsonValue();

    //for å hente ansettelsform
    try {
        const [el6] = await page.$x("/html/body/main/div/div[3]/div[1]/div/section[2]/dl/dd[4]"); // Copy xPath i inspect element
        const txt6 = await el6.getProperty("textContent");
        var ansettelsesForm = await txt6.jsonValue();
    }catch (err) {}
    //for å hente konkurrent
    try {
        const [el7] = await page.$x("//*[@id=\"more-ads-from-this-org-link\"]"); // Copy xPath i inspect element
        const txt7 = await el7.getProperty("textContent");
        var konkurrent = await txt7.jsonValue();
    }
    catch (err){
        console.error(err.message + "Possible no competition")
    }

    try {
        var allOfTheElements = {
            arbeidsGiver,
            stillingsTittel,
            frist,
            ansettelsesForm,
            kontaktPerson,
            telefonNummer,
            konkurrent
        }
    }catch (err){console.error(err.message)}
    console.log(allOfTheElements);

    //lagre fil i "allOfTheElements.json"
    const fs = require('fs')
    const kake = (error) =>{if(error){console.error(error);return;}}
    fs.writeFile("allOfTheElements.json","[", kake)

    const saveData = (data, file) =>{
        const finished = (error) =>{
            if(error){
                console.error(error)
                return;
            }
        }
        const jsonData = JSON.stringify(data, null, 2)
        fs.writeFile(file,jsonData+",",finished)
    }
    saveData(allOfTheElements, "allOfTheElements.json")
    fs.appendFile("allOfTheElements.json","]",kake)
    browser.close(); // Obvious
}
scrapeProduct("https://www.finn.no/job/fulltime/ad.html?finnkode=229438780");

