// تغییر وضعیت بین شب و روز (ماه و خورشید)
function toggleTheme() {
    const body = document.body;
    const moon = document.getElementById('moon');
    const sun = document.getElementById('sun');

    // تغییر حالت رنگ پس‌زمینه
    if (body.style.backgroundColor === 'black') {
        body.style.backgroundColor = 'white';
        moon.style.display = 'inline';
        sun.style.display = 'none';
    } else {
        body.style.backgroundColor = 'black';
        moon.style.display = 'none';
        sun.style.display = 'inline';
    }
}

// دریافت ساعت و تاریخ آنلاین
function updateDateTime() {
    const datetime = document.getElementById('datetime');
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeString = now.toLocaleString('fa-IR', options);
    datetime.textContent = `تاریخ و ساعت: ${timeString}`;
}

// دریافت دمای تهران از API
function updateTemperature() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=your_api_key&units=metric&lang=fa')
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const temperatureElement = document.getElementById('temperature');
            temperatureElement.textContent = `دمای تهران: ${temperature}°C`;
        });
}

// بارگذاری اطلاعات
updateDateTime();
setInterval(updateDateTime, 1000); // آپدیت هر ثانیه
updateTemperature(); // به‌روزرسانی دما
