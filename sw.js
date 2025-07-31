// Service Worker para Matemática Divertida PWA
const CACHE_NAME = 'math-kids-v1.0.0';
const urlsToCache = [
  '/math-kids-app/',
  '/math-kids-app/index.html',
  '/math-kids-app/standalone.html',
  '/math-kids-app/manifest.json',
  '/math-kids-app/sounds/success.mp3',
  '/math-kids-app/sounds/error.mp3',
  '/math-kids-app/sounds/click.mp3',
  '/math-kids-app/sounds/background.mp3',
  'https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache aberto');
        return cache.addAll(urlsToCache.map(url => {
          return new Request(url, { mode: 'no-cors' });
        })).catch(err => {
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
            return caches.match('/math-kids-app/index.html');
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

// Notificações push (futuro)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova atividade disponível!',
    icon: '/math-kids-app/icons/icon-192x192.png',
    badge: '/math-kids-app/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Jogar Agora',
        icon: '/math-kids-app/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/math-kids-app/icons/icon-192x192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Matemática Divertida', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/math-kids-app/')
    );
  }
});
