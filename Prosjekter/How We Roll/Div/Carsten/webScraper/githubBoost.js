const puppeteer = require("puppeteer");
process.setMaxListeners(40);
async function boostGithubPage(url) {
    for (let i = 0; i <= 7; i++){
        let browser = await puppeteer.launch();
        spamThis(i, browser, url);
    }
}
async function spamThis(instance, browser, url){
    for (let i = 0; i <= 60; i++) {
        try {
            const page = await browser.newPage();
            await page.goto(url);
            await page.close();

            let remainder = i % 1;
            if (!remainder){ // shows the status if remainder is 0
                console.log("Instance " + instance + " number " + i);
            }
        }
        catch (e){
            console.log("________________________________________________________________________________________")
            console.log("Instance " + instance + " number " + i + " failed hard bruh: " + e)
            console.log("________________________________________________________________________________________")
        }
    }
    await browser.close();
}

    //boostGithubPage("https://github.com/CarstenOst/CarstenOst/blob/main/README.md")

async function startThis(){
    for (let i = 0; i < 10000; i++) {
        console.log("Initiating github boost...")
        await boostGithubPage("https://camo.githubusercontent.com/f60355aafa307f2a42103fc01b2ab4705f58f3317e1dffe50d584d2878a43ba9/68747470733a2f2f6b6f6d617265762e636f6d2f67687076632f3f757365726e616d653d4361727374656e4f7374266c6162656c3d50524f46494c452b5649455753")
        console.log("Sleeping for 300 Sec")
        await sleep(310000)
        for (let k = 60; k >= 0; k--) {
            console.log(k + " sec b4 startup again...")
            await sleep(1000)
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

startThis();