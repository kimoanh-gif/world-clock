let displayMode="both"

function setMode(mode,btn){

displayMode=mode

document.querySelectorAll(".mode-btn").forEach(b=>{
b.classList.remove("active")
})

btn.classList.add("active")

updateClock()

}

function updateClock(){

updateCity("hanoi","clock-hanoi","Asia/Ho_Chi_Minh")
updateCity("yangon","clock-yangon","Asia/Yangon")
updateCity("seoul","clock-seoul","Asia/Seoul")
updateCity("tokyo","clock-tokyo","Asia/Tokyo")
updateCity("singapore","clock-singapore","Asia/Singapore")
updateCity("kl","clock-kl","Asia/Kuala_Lumpur")

}

function updateCity(timeId,canvasId,zone){

const now=new Date(
new Date().toLocaleString("en-US",{timeZone:zone})
)

const timeString=now.toLocaleTimeString("en-US")

const timeElement=document.getElementById(timeId)
const canvas=document.getElementById(canvasId)

if(displayMode==="digital"){
timeElement.style.display="block"
canvas.style.display="none"
}

else if(displayMode==="analog"){
timeElement.style.display="none"
canvas.style.display="block"
}

else{
timeElement.style.display="block"
canvas.style.display="block"
}

timeElement.innerHTML=timeString

drawClock(canvas,now)

}

function drawClock(canvas,now){

const ctx=canvas.getContext("2d")

const width=canvas.width
const height=canvas.height

const centerX=width/2
const centerY=height/2
const radius=width/2-10

ctx.clearRect(0,0,width,height)

const hour=now.getHours()%12
const min=now.getMinutes()
const sec=now.getSeconds()

ctx.beginPath()
ctx.arc(centerX,centerY,radius,0,Math.PI*2)
ctx.strokeStyle="red"
ctx.lineWidth=3
ctx.stroke()

ctx.font="14px Arial"
ctx.textAlign="center"
ctx.textBaseline="middle"

for(let i=1;i<=12;i++){

let angle=i*Math.PI/6

let x=centerX+Math.cos(angle-Math.PI/2)*(radius-15)
let y=centerY+Math.sin(angle-Math.PI/2)*(radius-15)

ctx.fillText(i,x,y)

}

let hourAngle=(hour+min/60)*Math.PI/6
let minAngle=(min+sec/60)*Math.PI/30
let secAngle=sec*Math.PI/30

drawHand(ctx,centerX,centerY,hourAngle,radius*0.5,6,"black")
drawHand(ctx,centerX,centerY,minAngle,radius*0.7,4,"black")
drawHand(ctx,centerX,centerY,secAngle,radius*0.8,2,"red")

ctx.beginPath()
ctx.arc(centerX,centerY,4,0,Math.PI*2)
ctx.fill()

}

function drawHand(ctx,cx,cy,angle,length,width,color){

ctx.beginPath()
ctx.lineWidth=width
ctx.strokeStyle=color

ctx.moveTo(cx,cy)

ctx.lineTo(
cx+length*Math.cos(angle-Math.PI/2),
cy+length*Math.sin(angle-Math.PI/2)
)

ctx.stroke()

}

setInterval(updateClock,1000)

updateClock()