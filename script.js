// ⚙️ کانفیگ Firebase — اینجا جایگزین کن
const clientId = '55895302e1da4b829c77d2b6fcf2ffc8'; // Your Spotify client ID
const redirectUri = 'http://localhost:3000/callback'; // The correct redirect URI for local development
const scope = 'user-library-read playlist-read-private';
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

window.location.href = authUrl;

  
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore(app);
  const messaging = firebase.messaging(app);
  
  // 📲 نوتیفیکیشن
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      messaging.getToken({ vapidKey: "🔑 VAPID_KEY" }).then(token => {
        console.log("FCM Token:", token);
      });
    }
  });
  
  // 📥 ثبت‌نام کاربر
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      alert("ثبت‌نام با موفقیت انجام شد!");
    } catch (err) {
      alert("خطا در ثبت‌نام");
      console.error(err);
    }
  });
  
  // 🔐 ورود کاربر
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      alert("ورود موفقیت‌آمیز!");
    } catch (err) {
      alert("خطا در ورود");
      console.error(err);
    }
  });
  
  // 💰 سیستم مهکوین
  const savePoints = async (userId, points) => {
    await db.collection('users').doc(userId).set({ points });
  };
  
  const getPoints = async (userId) => {
    const doc = await db.collection('users').doc(userId).get();
    return doc.exists ? doc.data().points : 0;
  };
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      setInterval(async () => {
        const currentPoints = await getPoints(user.uid);
        await savePoints(user.uid, currentPoints + 50);
        console.log("مهکوین آپدیت شد!");
      }, 60000);
    }
  });
  
  // 🎵 دریافت آهنگ‌های تاپ از اسپاتیفای
  const token = '🔑 SPOTIFY_ACCESS_TOKEN';
  async function fetchSpotifyData(endpoint) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  }
  
  async function getTopTracks() {
    const data = await fetchSpotifyData('v1/me/top/tracks?time_range=long_term&limit=5');
    console.log("Top Tracks:", data.items);
  }
  getTopTracks();
  