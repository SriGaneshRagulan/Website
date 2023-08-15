const playButton = document.getElementById('play')
const reset = document.getElementById('reset')
const frame = document.querySelector('.stopwatch')

const pauseButton = document.createElement('span')
pauseButton.id = "pause"
pauseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>'

const resetButton = document.createElement('span')
resetButton.id = "reset"
resetButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/></svg>'

const lapButton = document.createElement('span')
lapButton.id = 'lap'
lapButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h16V98.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6V64h16c17.7 0 32-14.3 32-32s-14.3-32-32-32H224 176zm72 192V320c0 13.3-10.7 24-24 24s-24-10.7-24-24V192c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>'

const placeHolder = document.createElement('div')
placeHolder.classList.add("place-holder")

let deciseconds = 0
let seconds = 0
let minutes = 0

let timerInterval = null
let timerStatus = "stopped"

let counter = 0

let leadingSeconds = 0
let leadingMinutes = 0

function stopwatch() {
    deciseconds++
    if (deciseconds/10 === 1) {
        deciseconds = 0
        seconds++
    
        if (seconds/60 === 1) {
            seconds = 0
            minutes++
        }
    }

    if (seconds < 10) {
        leadingSeconds = "0" + seconds.toString()
    } else {
        leadingSeconds = seconds
    }

    if (minutes < 10) {
        leadingMinutes = "0" + minutes.toString()
    } else {
        leadingMinutes = minutes
    }
    
    document.getElementById('display').innerText = leadingMinutes + ":" + leadingSeconds + "." + deciseconds
}

function playPause() {
    if (timerStatus === "stopped") {
        timerInterval = window.setInterval(stopwatch, 100)
        playButton.remove()
        placeHolder.remove()
        document.querySelector('.buttons').appendChild(resetButton)
        document.querySelector('.buttons').appendChild(pauseButton)
        document.querySelector('.buttons').appendChild(lapButton)
        timerStatus = "started"
        frame.classList.remove('reset')
        frame.classList.remove('paused')
        frame.classList.add('active')
    } else {
        window.clearInterval(timerInterval)
        pauseButton.remove()
        lapButton.remove()
        document.querySelector('.buttons').appendChild(playButton)
        document.querySelector('.buttons').appendChild(placeHolder)
        timerStatus = "stopped"
        frame.classList.remove('reset')
        frame.classList.remove('active')
        frame.classList.add('paused')
    }
}

playButton.addEventListener('click', playPause)
pauseButton.addEventListener('click', playPause)
frame.addEventListener('click', playPause)

resetButton.addEventListener('click', function() {
    window.clearInterval(timerInterval)
    seconds = 0
    minutes = 0
    hours = 0
    document.getElementById('display').innerText = "00:00.0"
    placeHolder.remove()
    resetButton.remove()
    pauseButton.remove()
    lapButton.remove()
    document.querySelector('.buttons').appendChild(playButton)
    frame.classList.remove('active')
    frame.classList.remove('paused')
    frame.classList.add('reset')

    while (document.querySelector('#lap-time').firstChild) {
        document.querySelector('#lap-time').removeChild(document.querySelector('#lap-time').firstChild)
    }

    timerStatus = "stopped"
    counter = 0
})

lapButton.addEventListener('click', function() {
    counter += 1
    let laptime = document.createElement('li')
    laptime.innerText = `#${counter} - ${leadingMinutes}:${leadingSeconds}.${deciseconds}`
    document.querySelector('#lap-time').insertBefore(laptime, document.querySelector('#lap-time').firstChild)
})