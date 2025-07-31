// Service Worker para Matemática Divertida PWA
const CACHE_NAME = 'math-kids-v1.1.0';
const urlsToCache = [
  './',
  './index.html',
  './standalone.html',
  './manifest.json',
  './audio.js',
  './sw.js',
  'https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache aberto');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Service Worker: Erro ao cachear alguns recursos', err);
          // Cachear recursos individuais que funcionam
          return Promise.all(
            urlsToCache.map(url => {
              return cache.add(url).catch(err => {
                console.log(`Service Worker: Falha ao cachear ${url}`, err);
              });
            })
          );
        });
      })
  );
  self.skipWaiting();
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removendo cache antigo', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna do cache se disponível
        if (response) {
          return response;
        }
        
        // Senão, busca na rede
        return fetch(event.request).then((response) => {
          // Verifica se é uma resposta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clona a resposta
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // Se offline e não está no cache, retorna página offline
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
