document.addEventListener('DOMContentLoaded', function() {
  // 1. Handle Name Parameter
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to') || 'Tamu Undangan';
  const nameElements = document.querySelectorAll('.guest-name');
  nameElements.forEach(element => {
    element.textContent = guestName;
  });

  // 2. Music Autoplay on Button Click
  window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById("bg-music");

    // Coba autoplay (kadang butuh interaksi user)
    const playAudio = () => {
      audio.play().catch(() => {
        // Gagal autoplay, tunggu interaksi user
        document.body.addEventListener("click", () => {
          audio.play();
        }, { once: true });
      });
    };

    playAudio();
  });


  // 3. Countdown Timer
  const countdownElements = {
    days: document.querySelector('#days'),
    hours: document.querySelector('#hours'),
    minutes: document.querySelector('#minutes'),
    seconds: document.querySelector('#seconds')
  };

  function updateCountdown() {
    const weddingDate = new Date('2025-06-29T11:00:00+08:00');
    const now = new Date();
    const timeDifference = weddingDate - now;

    if (timeDifference <= 0) {
      Object.values(countdownElements).forEach(el => el.textContent = '0');
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    countdownElements.days.textContent = days;
    countdownElements.hours.textContent = hours;
    countdownElements.minutes.textContent = minutes;
    countdownElements.seconds.textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 4. Google Maps Redirect
  const mapsPlaceholder = document.querySelector('.maps-container');
  if (mapsPlaceholder) {
    mapsPlaceholder.addEventListener('click', function() {
      window.open('https://maps.app.goo.gl/ms9Nzc2DzeNPf7KN9?g_st=aw', '_blank');
    });
  }

  // 5.Rsuv

  document.getElementById("wishForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value;

    if (!name || !message || !attendance) {
      alert("Silakan lengkapi semua data!");
      return;
    }

    // Nomor WhatsApp tujuan (ganti dengan punyamu)
    const phoneNumber = "6283847982230";

    // Pesan yang akan dikirim ke WhatsApp
    const waMessage = `Assalamualaikum saya ${name} .\nMengucapkan:\n${message}\n\nStatus Kehadiran: ${attendance}`;

    // Encode pesan agar bisa dikirim via URL
    const encodedMessage = encodeURIComponent(waMessage);

    // Arahkan ke WhatsApp
    const waURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(waURL, "_blank");
  });


});

// Floating Hearts Animation
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '♥';
  heart.className = 'floating-heart';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = Math.random() * 3 + 5 + 's';
  heart.style.opacity = Math.random() * 0.5 + 0.3;
  heart.style.fontSize = Math.random() * 10 + 15 + 'px';
  heart.style.color = `hsl(${Math.random() * 30 + 330}, 70%, 70%)`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Add floating heart styles dynamically
const style = document.createElement('style');
style.textContent = `
.floating-heart {
    position: fixed;
    top: 100%;
    pointer-events: none;
    z-index: 999;
    animation: floatUp 8s linear infinite;
}

@keyframes floatUp {
    to {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);     