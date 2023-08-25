self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./style.css", "./files/profile.webp", "./files/title.webp", "./app/clock/index.html", "./app/clock/clock.css", "./app/clock/clock.js", "./app/clock/timer.js", "./app/clock/stopwatch.js", "./app/clock/timer.mp3"])
        })
    )
})

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.response)
        })
    )
})