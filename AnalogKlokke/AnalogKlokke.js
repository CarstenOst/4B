
// Analogklokke - BACIT 1.år Gruppe 4B - Carsten Østergaard, Amalie Ehnebom Lunden, Vetle Johansen Nilsen, Lars Gunnar Stokke, Prebem Røstad, Ilham Ahmed
var canvas = document.getElementById("canvas"); //variabler utenfor funksjoner vil være globale, og mulig å bruke i alle funksjonene
var ctx = canvas.getContext("2d"); //Variabel ctx som er "context" forkortet
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9
setInterval(tegnKlokke, 1000);

function tegnKlokke(){ //ideelt set så burde språket i dokumentet være engelsk
    tegnFjes(ctx, radius);
    tegnNummer(ctx, radius);
    tegnTid(ctx, radius);
}

function tegnFjes(ctx, radius){
    var grad; //variabel som vil kun gjelde inne i funksjonen
    ctx.beginPath();
    ctx.arc(0,0, radius, 0, Math.PI*2);
    ctx.fillStyle = "artic-blue";
    ctx.fill();
    grad = ctx.createRadialGradient(0,0,radius*0.90,0,0,radius*1.1); //En ekstra ring rundt klokka for estetiske grunner :)
    grad.addColorStop(0, "#222"); // #222 er det samme som #222222 (hex code altså)
    grad.addColorStop(0.5, "#fff");//liten fade rundt klokka
    grad.addColorStop(1, "#222");
    ctx.strokeStyle = grad;
    ctx.lineWidth= radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0,0, radius*0.1, 0, Math.PI*2)
    ctx.fillStyle = "#222";
    ctx.fill();
}
function tegnNummer(ctx, radius) {
    var ang; //angle forkortet (vinkel)
    var num; //nummer som skal brukes
    ctx.font = radius * 0.15 + "px arial"; //setter font til arial, dette er fonten til tallene
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) { //en for loop som begynner på (int)1 vil utføres totalt 12 ganger
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0); //gjør om variabelen num som er integer til text (string)
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}
function tegnTid(){
    var naa = new Date();
    var time = naa.getHours();
    var minutt = naa.getMinutes();
    var sekund = naa.getSeconds();
    // timer
    time = time%12;


}


