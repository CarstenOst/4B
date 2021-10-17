// kode tatt fra https://www.youtube.com/watch?v=0jjeOYMjmDU&ab_channel=TheCodingTrain (har såklart gjort om på noe)
// videre redigert av Carsten Østergaard
const canvas = document.querySelector("canvas");
const generateButton = document.querySelector(".generer-tre-knapp");
const toggleDarkMode = document.querySelector(".bg2")
const seeCoords = document.querySelector(".bg3")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let curve;

// denne tok jeg fra stackoverflow for lenge siden, så ikke originalt min
document.addEventListener("mousemove",function(event){

    const xCoord = event.clientX;
    const yCoord = event.clientY;

    document.getElementById('position').innerHTML = "X="+ xCoord +" Y="+ yCoord;
   // console.log(xCoord , yCoord);

});
// kode tatt fra https://www.youtube.com/watch?v=0jjeOYMjmDU&ab_channel=TheCodingTrain (har såklart gjort om på noe)
function tegnTre(startX, startY, len, angle, branchWidth, color1, color2) {

    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(255,255,255,.15)";
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0,0);
    //ctx.lineTo(0,-len);
    if (angle > 0){
        ctx.bezierCurveTo(10, -len/2, 10, -len/2, 0, -len);
    } else {
        ctx.bezierCurveTo(10, -len/2, -10, -len/2, 0, -len);
    }
    ctx.stroke();
    //her endret jeg litt
    if (len < 9) {
        //leaf
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, Math.PI/2);
        ctx.fill();
        ctx.restore();
        return;
    }
    curve = (Math.random() * 10) + 10;
    tegnTre(0, -len, len * 0.77, angle + curve, branchWidth * 0.8);
    tegnTre(0, -len, len * 0.77, angle - curve, branchWidth * 0.7);
    ctx.restore();
}

tegnTre(canvas.width/2, canvas.height - 80, 150, 0, 5, "#ffd700", "green")

function generateRandomTre() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    let centerPointX =canvas.width/2;
    let len = Math.floor((Math.random() * 60) + 100);
    let angle = (Math.random() * 14) -7;
    let branchWidth = Math.floor((Math.random() * 30)) + 1;
    let color1 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
    let color2 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";

    generateButton.style.background = color1;
    toggleDarkMode.style.background = color1;
    seeCoords.style.background = color1;

    tegnTre(centerPointX, canvas.height - 100, len, angle, branchWidth, color1, color2);
    console.log("Len =",len, " angle =", angle, "BranchWidth =", branchWidth, "color1 =", color1, "color2 =", color2)
}
// denne laget jeg selv såklart, ikke noe hokus pokus her
function bgToggle(){ //Will change the background to white or to hex #191919 depending on it's current state
    if (canvas.style.background === "white"){
        canvas.style.background = "#191919";

    } else {
        canvas.style.background = "white";
    }
}

// calls the functions
generateButton.addEventListener("click", generateRandomTre);
toggleDarkMode.addEventListener("click", bgToggle);
