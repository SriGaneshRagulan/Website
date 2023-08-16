// DOM Variables
const display = document.getElementById('display')
const playButton = document.getElementById('play')
const frame = document.getElementById('timer')
const timerAudio = document.getElementById('timer-audio')

const pauseButton = document.createElement('span')
pauseButton.id = 'pause'
pauseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>'
pauseButton.setAttribute('tabindex', '0')

const resetButton = document.createElement('span')
resetButton.id = "reset"
resetButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/></svg>'
resetButton.setAttribute('tabindex', '0')

const placeHolder = document.createElement('div')
placeHolder.classList.add("place-holder")

const buttons = document.querySelector('.buttons')

// Timer Variables
let hours, minutes, seconds, deciseconds
hours = minutes = seconds = 0
deciseconds = 9

timerStatus = "paused"
timerInterval = null

// leading timer Variables
let leadingSeconds, leadingMinutes
leadingSeconds = leadingMinutes = 0

let prevStoredTime = "1:00"

function getTime() {
    let len = display.innerText.split(':').length
    
    if (len === 1) {
        seconds = parseInt(display.innerText.split(":")[0].trim())
    } else if (len === 2) {
        minutes = parseInt(display.innerText.split(":")[0].trim())
        seconds = parseInt(display.innerText.split(":")[1].trim())
    } else {
        hours = parseInt(display.innerText.split(":")[0].trim())
        minutes = parseInt(display.innerText.split(":")[1].trim())
        seconds = parseInt(display.innerText.split(":")[2].trim())
    }

    displayTime()
}

function displayTime() {
    if (seconds < 10) {
        leadingSeconds = `0${seconds}`
    } else {
        leadingSeconds = seconds
    }
    if (minutes < 10) {
        leadingMinutes = `0${minutes}`
    } else {
        leadingMinutes = minutes
    }

    if (hours <= 0 && minutes <= 0) {
            display.innerHTML = `${seconds}`
    } else if (hours <= 0) {
            display.innerHTML = `${minutes}:${leadingSeconds}`
    } else {
        display.innerHTML = `${hours}:${leadingMinutes}:${leadingSeconds}`
    }
}

function timer() {
    if (deciseconds === 0) {
        if (seconds === 0) {
            if (minutes === 0) {
                if (hours === 0) {
                    timerStatus = "active"
                    deciseconds = 9
                    playPause()
                    timerAudio.play()
                    timerAudio.loop = true
                    frame.classList.remove('paused')
                    frame.classList.add('expired')
                    console.log('timer expired')
                    return
                }
                hours--
                minutes = 59
                seconds = 59
            } else {
                minutes--
                seconds = 59
            }
        } else {
            seconds--
        }
        deciseconds = 9
    } else {
        deciseconds--
    }

    displayTime()
}


function playPause() {
    if (timerStatus === "paused") {
        timerStatus = "active"
        timerInterval = window.setInterval(timer, 100)
        playButton.remove()
        placeHolder.remove()
        buttons.appendChild(resetButton)
        buttons.appendChild(pauseButton)
        buttons.appendChild(placeHolder)
        frame.classList.remove('expired')
        frame.classList.remove('reset')
        frame.classList.remove('paused')
        frame.classList.add('active')
    } else {
        timerStatus = "paused"
        window.clearInterval(timerInterval)
        pauseButton.remove()
        placeHolder.remove()
        buttons.appendChild(playButton)
        buttons.appendChild(placeHolder)
        frame.classList.remove('reset')
        frame.classList.remove('active')
        frame.classList.add('paused')
    }
}


// Event Listeners

display.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        e.preventDefault()
        document.activeElement.blur()
        prevStoredTime = display.innerText
        playPauseAction()
    }
})

function playPauseAction() {
    getTime()
    playPause()
}

playButton.addEventListener('click', playPauseAction)
playButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
       playPauseAction()
    }
})

pauseButton.addEventListener('click', playPauseAction)
pauseButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
       playPauseAction()
    }
})

function resetAction() {
    window.clearInterval(timerInterval)
    hours = minutes = seconds = 0
    display.innerText = prevStoredTime
    placeHolder.remove()
    resetButton.remove()
    pauseButton.remove()
    buttons.appendChild(playButton)
    frame.classList.remove('expired')
    frame.classList.remove('active')
    frame.classList.remove('paused')
    frame.classList.add('reset')
    timerStatus = "paused"
    timerAudio.loop = false
    timerAudio.currentTime = 0
    timerAudio.pause()
    deciseconds = 9
}

resetButton.addEventListener('click', resetAction)
resetButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
        resetAction()
    }
})