setInterval(setClock, 1000)

const hourHand = document.getElementById('clock-hourhand')
const minuteHand = document.getElementById('clock-minutehand')
const secondHand = document.getElementById('clock-secondhand')

function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotionRatio) {
    element.style.setProperty('--rotation', rotionRatio*360)
}

setClock()