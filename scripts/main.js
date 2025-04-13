window.onload = function () {
  document.getElementById('loading-screen').style.display = 'none';
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await res.json();
    const date = new Date();
    document.getElementById("weather").innerText =
      `مکان شما — دما: ${data.current_weather.temperature}°C | ساعت: ${date.toLocaleTimeString()} | تاریخ: ${date.toLocaleDateString()}`;
  });
}

const tracks = [
  { name: 'آهنگ ۱', file: 'music/track1.mp3' },
  { name: 'آهنگ ۲', file: 'music/track2.mp3' }
];

const audio = document.getElementById('audio-player');
const playlist = document.getElementById('playlist');

function loadPlaylist() {
  tracks.forEach((track, i) => {
    const opt = document.createElement('option');
    opt.value = track.file;
    opt.textContent = track.name;
    playlist.appendChild(opt);
  });
}

function loadTrack() {
  audio.src = playlist.value;
  audio.play();
}

loadPlaylist();

// config زیر رو با اطلاعات پروژه‌ی خودت از Firebase جایگزین کن
const firebaseConfig = {
  apiKey: "🔥 اینجا اطلاعات واقعی پروژه‌تو بذار",
  authDomain: "mehrana-chat.firebaseapp.com",
  databaseURL: "https://mehrana-chat.firebaseio.com",
  projectId: "mehrana-chat",
  storageBucket: "mehrana-chat.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefgh"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function sendMessage() {
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;
  if (!username || !message) return alert("نام و پیام الزامی است");
  db.ref("messages").push({
    user: username,
    text: message,
    time: Date.now()
  });
  document.getElementById("message").value = "";
}

db.ref("messages").on("child_added", snap => {
  const msg = snap.val();
  const el = document.createElement("p");
  const t = new Date(msg.time).toLocaleTimeString();
  el.innerHTML = `<strong>${msg.user}</strong> (${t}): ${msg.text}`;
  document.getElementById("messages").appendChild(el);
});
