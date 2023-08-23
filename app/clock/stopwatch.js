// DOM Variables
// Buttons
const stopwatchPlayButton = document.getElementById('stopwatch-play')
const stopwatchPauseButton = document.getElementById('stopwatch-pause')
const stopwatchResetButton = document.getElementById('stopwatch-reset')
const stopwatchLapButton = document.getElementById('stopwatch-lap')
const stopwatchPlaceHolder = document.getElementById('stopwatch-placeholder')
const stopwatchFrame = document.getElementById('stopwatch')

// Container Variables
const stopwatchDisplay = document.getElementById('stopwatch-display')

// Stopwatch Time Variables
let stopwatchDeciSeconds, stopwatchSeconds, stopwatchMinutes, stopwatchHours
stopwatchDeciSeconds = stopwatchSeconds = stopwatchMinutes = stopwatchHours = 0

let stopwatchInterval = null
let stopwatchStatus = "stopped"

let stopwatchCounter, stopwatchLeadingSeconds, stopwatchLeadingMinutes
stopwatchCounter = stopwatchLeadingSeconds = stopwatchLeadingMinutes = 0


// Stopwatch Functions
function stopwatch() {
    stopwatchDeciSeconds++
    if (stopwatchDeciSeconds/10 === 1) {
        stopwatchDeciSeconds = 0
        stopwatchSeconds++
    
        if (stopwatchSeconds/60 === 1) {
            stopwatchSeconds = 0
            stopwatchMinutes++

            if (stopwatchMinutes/60 === 1) {
                stopwatchMinutes = 0
                stopwatchHours++
            }
        }
    }

    if (stopwatchSeconds < 10) {
        stopwatchLeadingSeconds = "0" + stopwatchSeconds.toString()
    } else {
        stopwatchLeadingSeconds = stopwatchSeconds
    }

    if (stopwatchMinutes < 10) {
        stopwatchLeadingMinutes = "0" + stopwatchMinutes.toString()
    } else {
        stopwatchLeadingMinutes = stopwatchMinutes
    }
    
    if (stopwatchHours === 0) {
        stopwatchDisplay.innerText = stopwatchLeadingMinutes + ":" + stopwatchLeadingSeconds + "." + stopwatchDeciSeconds
    } else {
        stopwatchDisplay.innerText = stopwatchHours + ":" + stopwatchLeadingMinutes + ":" + stopwatchLeadingSeconds + "." + stopwatchDeciSeconds
    }
}

function playPause() {
    if (stopwatchStatus === "stopped") {
        stopwatchInterval = window.setInterval(stopwatch, 100)
        stopwatchPlayButton.classList.add('hidden')
        stopwatchPlaceHolder.classList.add('hidden')
        
        stopwatchResetButton.classList.remove('hidden')
        stopwatchPauseButton.classList.remove('hidden')
        stopwatchLapButton.classList.remove('hidden')
        stopwatchStatus = "started"
        stopwatchFrame.classList.remove('Reset')
        stopwatchFrame.classList.remove('Paused')
        stopwatchFrame.classList.add('Active')
    } else {
        window.clearInterval(stopwatchInterval)
        stopwatchPauseButton.classList.add('hidden')
        stopwatchLapButton.classList.add('hidden')
        stopwatchPlayButton.classList.remove('hidden')
        stopwatchPlaceHolder.classList.remove('hidden')
        stopwatchStatus = "stopped"
        stopwatchFrame.classList.remove('Reset')
        stopwatchFrame.classList.remove('Active')
        stopwatchFrame.classList.add('Paused')
    }
}

function resetAction() {
    window.clearInterval(stopwatchInterval)
    stopwatchSeconds = stopwatchMinutes = stopwatchHours = 0
    stopwatchDisplay.innerText = "00:00.0"
    stopwatchPlaceHolder.classList.add('hidden')
    stopwatchResetButton.classList.add('hidden')
    stopwatchPauseButton.classList.add('hidden')
    stopwatchLapButton.classList.add('hidden')
    stopwatchPlayButton.classList.remove('hidden')
    stopwatchFrame.classList.remove('Active')
    stopwatchFrame.classList.remove('Paused')
    stopwatchFrame.classList.add('Reset')

    while (document.querySelector('#lap-time').firstChild) {
        document.querySelector('#lap-time').removeChild(document.querySelector('#lap-time').firstChild)
    }

    stopwatchStatus = "stopped"
    stopwatchCounter = 0
}

function lapAction() {
    stopwatchCounter += 1
    let laptime = document.createElement('li')
    laptime.innerText = `#${stopwatchCounter} - ${stopwatchLeadingMinutes}:${stopwatchLeadingSeconds}.${stopwatchDeciSeconds}`
    document.querySelector('#lap-time').insertBefore(laptime, document.querySelector('#lap-time').firstChild)
}


// Event Listeners
stopwatchFrame.addEventListener('click', playPause)

stopwatchPlayButton.addEventListener('click', playPause)
stopwatchPlayButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
        playPause()
    }
})

stopwatchPauseButton.addEventListener('click', playPause)
stopwatchPauseButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
        playPause()
    }
})

stopwatchResetButton.addEventListener('click', resetAction)
stopwatchResetButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
        resetAction()
    }
})

stopwatchLapButton.addEventListener('click', lapAction)
stopwatchLapButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
        lapAction()
    }
})