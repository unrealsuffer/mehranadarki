importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "🔑 API_KEY",
  authDomain: "mehranadarki.firebaseapp.com",
  projectId: "mehranadarki",
  storageBucket: "mehranadarki.appspot.com",
  messagingSenderId: "871012562306",
  appId: "🔑 APP_ID",
  measurementId: "🔑 MEASUREMENT_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
