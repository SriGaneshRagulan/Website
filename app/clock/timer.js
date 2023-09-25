// DOM Variables
// Buttons
const timerPlayButton = document.getElementById('timer-play')
const timerPauseButton = document.getElementById('timer-pause')
const timerResetButton = document.getElementById('timer-reset')
const timerPlaceHolder = document.getElementById('timer-placeholder')
const timerFrame = document.getElementById('timer')

// Containers
const timerButtons = document.querySelector('.buttons')
const timerDisplay = document.getElementById('timer-display')

// Audio
const timerAudio = document.getElementById('timer-audio')


// Timer Variables
let timerHours, timerMinutes, timerSeconds, timerDeciSeconds
timerHours = timerMinutes = timerSeconds = 0
timerDeciSeconds = 9

timerStatus = "paused"
timerInterval = null

let leadingTimerSeconds, leadingTimerMinutes
leadingTimerSeconds = leadingTimerMinutes = 0

let prevStoredTime = "1:00"


// Timer Functions
function getTime() {
    let len = timerDisplay.innerText.split(':').length
    
    if (len === 1) {
        timerSeconds = parseInt(timerDisplay.innerText.split(":")[0].trim())
    } else if (len === 2) {
        timerMinutes = parseInt(timerDisplay.innerText.split(":")[0].trim())
        timerSeconds = parseInt(timerDisplay.innerText.split(":")[1].trim())
    } else {
        timerHours = parseInt(timerDisplay.innerText.split(":")[0].trim())
        timerMinutes = parseInt(timerDisplay.innerText.split(":")[1].trim())
        timerSeconds = parseInt(timerDisplay.innerText.split(":")[2].trim())
    }

    displayTime()
}

function displayTime() {
    if (timerSeconds < 10) {
        leadingTimerSeconds = `0${timerSeconds}`
    } else {
        leadingTimerSeconds = timerSeconds
    }
    
    if (timerMinutes < 10) {
        leadingTimerMinutes = `0${timerMinutes}`
    } else {
        leadingTimerMinutes = timerMinutes
    }

    if (timerHours <= 0 && timerMinutes <= 0) {
            timerDisplay.innerHTML = `${timerSeconds}`
    } else if (timerHours <= 0) {
            timerDisplay.innerHTML = `${timerMinutes}:${leadingTimerSeconds}`
    } else {
        timerDisplay.innerHTML = `${timerHours}:${leadingTimerMinutes}:${leadingTimerSeconds}`
    }
}

function timer() {
    if (timerDeciSeconds === 0) {
        if (timerSeconds === 0) {
            if (timerMinutes === 0) {
                if (timerHours === 0) {
                    timerStatus = "active"
                    timerDeciSeconds = 9
                    timerPlayPause()
                    timerAudio.play()
                    timerAudio.loop = true
                    timerPlayButton.classList.add('hidden')
                    timerPauseButton.classList.add('hidden')
                    timerPlaceHolder.classList.add('hidden')
                    timerFrame.classList.remove('Paused')
                    timerFrame.classList.add('Expired')
                    console.log('%cTimer Expired', 'color: red;')
                    return
                }
                timerHours--
                timerMinutes = 59
                timerSeconds = 59
            } else {
                timerMinutes--
                timerSeconds = 59
            }
        } else {
            timerSeconds--
        }
        timerDeciSeconds = 9
    } else {
        timerDeciSeconds--
    }

    displayTime()
}

function timerPlayPause() {
    if (timerStatus === "paused") {
        timerStatus = "active"
        timerInterval = window.setInterval(timer, 100)
        timerPlayButton.classList.add('hidden')
        timerPauseButton.classList.remove('hidden')
        timerResetButton.classList.remove('hidden')
        timerPlaceHolder.classList.remove('hidden')
        timerFrame.classList.remove('Expired')
        timerFrame.classList.remove('Reset')
        timerFrame.classList.remove('Paused')
        timerFrame.classList.add('Active')
    } else {
        timerStatus = "paused"
        window.clearInterval(timerInterval)
        timerPlayButton.classList.remove('hidden')
        timerPauseButton.classList.add('hidden')
        timerResetButton.classList.remove('hidden')
        timerPlaceHolder.classList.remove('hidden')
        timerFrame.classList.remove('Reset')
        timerFrame.classList.remove('Active')
        timerFrame.classList.add('Paused')
    }
}

function timerPlayPauseAction() {
    getTime()
    timerPlayPause()
}

function timerResetAction() {
    window.clearInterval(timerInterval)
    timerHours = timerMinutes = timerSeconds = 0
    timerDisplay.innerText = prevStoredTime
    timerPlayButton.classList.remove('hidden')
    timerPauseButton.classList.add('hidden')
    timerResetButton.classList.add('hidden')
    timerPlaceHolder.classList.add('hidden')
    timerFrame.classList.remove('Expired')
    timerFrame.classList.remove('Active')
    timerFrame.classList.remove('Paused')
    timerFrame.classList.add('Reset')
    timerStatus = "paused"
    timerAudio.loop = false
    timerAudio.currentTime = 0
    timerAudio.pause()
    timerDeciSeconds = 9
}


// Event Listeners
timerDisplay.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        e.preventDefault()
        document.activeElement.blur()
        prevStoredTime = timerDisplay.innerText
        timerPlayPauseAction()
    }
})

timerPlayButton.addEventListener('click', timerPlayPauseAction)
timerPlayButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
       timerPlayPauseAction()
    }
})

timerPauseButton.addEventListener('click', timerPlayPauseAction)
timerPauseButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
       timerPlayPauseAction()
    }
})

timerResetButton.addEventListener('click', timerResetAction)
timerResetButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
        timerResetAction()
    }
})