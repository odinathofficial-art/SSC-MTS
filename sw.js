const CACHE_NAME = "quiz-engine-v1";

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.add("quiz.html");
            })
    );
});

self.addEventListener("fetch", event => {

    const url = new URL(event.request.url);

    // Only cache quiz.html
    if (url.pathname.endsWith("/quiz.html") || url.pathname === "/quiz.html") {

        event.respondWith(
            caches.match(event.request)
                .then(response => {

                    if (response) {
                        return response;
                    }

                    return fetch(event.request).then(networkResponse => {

                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, networkResponse.clone());
                        });

                        return networkResponse;
                    });
                })
        );
    }
});
