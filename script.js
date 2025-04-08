const texts = [
  "Hai Piyaa, selamat ulang tahun yaa...",
  "Semoga Piyaa selalu mendapatkan kebahagiaan...",
  "Semoga Piyaa diberi kemudahan dalam menjalani semua masalah yang dihadapi!",
  "Pikri sadar... selama ini sering menyia-nyiakan kehadiranmu yang tulus...",
  "Pikri menyesal telah gagal menjadi tempatmu berlabuh...",
  "Kini, hanya ada satu harapan kecil: kita bisa mencoba lagi...",
  "Maukah Piyaa... memberi satu kesempatan kecil untuk kita kembali memulai dari awal?"
];

const photos = [
  "foto1.jpg",
  "foto2.jpg",
  "foto3.jpg",
  "foto4.jpg",
  "foto5.jpg",
  "foto6.jpg",
  "foto7.jpg",
  "foto8.jpg"
];

let idx = 0;
let photoIndex = 1;
const letter = document.getElementById("letter-text");
const btn = document.getElementById("next-btn");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const displayedPhoto = document.getElementById("displayed-photo");
const nextPhoto = document.getElementById("next-photo");
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");
const romanticMusic = document.getElementById("romantic-music");
const heartbeatSound = document.getElementById("heartbeat-sound");
const paperSound = document.getElementById("paper-sound");
const volumeIcon = document.getElementById("volume-icon");
const progressBar = document.getElementById("progress-bar");
const floatingHearts = document.querySelector(".floating-hearts");
let isMuted = false;
let isRomanticMusicPlaying = false;
let romanticIntervals = [];

function createPhotoSparkles() {
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animation = `sparkle ${Math.random() * 0.5 + 0.5}s ease-out forwards`;
    document.querySelector('.photo-sparkles').appendChild(sparkle);
    
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
}

function startRomanticEffects() {
  if (!isRomanticMusicPlaying) {
    bgMusic.pause();
    romanticMusic.currentTime = 0;
    romanticMusic.play().catch(e => console.log("Romantic music error:", e));
    isRomanticMusicPlaying = true;
    
    const heartbeatInterval = setInterval(() => {
      heartbeatSound.currentTime = 0;
      heartbeatSound.play().catch(e => console.log("Heartbeat sound error:", e));
    }, 2000);
    
    romanticIntervals.push(heartbeatInterval);
    
    // Add more floating hearts during romantic mode
    const heartInterval = setInterval(() => {
      createFloatingHeart();
    }, 300);
    romanticIntervals.push(heartInterval);
  }
}

function stopRomanticEffects() {
  romanticIntervals.forEach(interval => clearInterval(interval));
  romanticIntervals = [];
}

function updateProgress() {
  const progress = (idx / texts.length) * 100;
  progressBar.style.width = `${progress}%`;
}

document.body.addEventListener('click', function init() {
  const playPromise = bgMusic.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log("Autoplay prevented, showing mute icon");
      isMuted = true;
      bgMusic.muted = true;
      volumeIcon.className = 'fas fa-volume-mute';
    });
  }
  
  document.body.removeEventListener('click', init);
  setInterval(createFloatingHeart, 800);
}, { once: true });

function createFloatingHeart() {
  if (isRomanticMusicPlaying || Math.random() > 0.7) {
    const heart = document.createElement("div");
    heart.className = "heart-particle";
    heart.innerHTML = "❤";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${Math.random() * 1 + 1}rem`;
    heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
    floatingHearts.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}

function showRomanticLetter() {
  popupText.innerHTML = `
    <p>Piyaa sayang...</p>
    <p>Di momen spesial ini, aku ingin mengungkapkan isi hatiku yang terdalam.</p>
    <p>Setiap hari tanpamu terasa seperti langit tanpa bintang, seperti malam tanpa bulan.</p>
    <p>Aku menyadari betapa berharganya dirimu, dan betapa aku merindukan senyummu.</p>
    <p>Bukan karena kenangan indah di masa lalu, tapi karena masa depan yang ingin kita bangun bersama...</p>
    <p>Aku ingin menjadi orang yang selalu ada untukmu, yang memahami setiap kelebihan dan kekuranganmu.</p>
    <p>Bersamamu, aku belajar arti cinta yang sesungguhnya - saling mengerti, saling mendukung, dan tumbuh bersama.</p>
    <p>Maukah kau memberi kita kesempatan untuk memulai lagi?</p>
    <p>Untuk mencintai lebih dalam, memahami lebih baik, dan membangun sesuatu yang lebih indah dari sebelumnya.</p>
    <p class="signature">- Dengan penuh cinta, Pikri <span class="heart">❤</span></p>
  `;
  
  popup.classList.remove("hidden");
  setTimeout(() => {
    popup.classList.add("active");
    paperSound.play().catch(e => console.log("Paper sound error:", e));
    
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      shapes: ['circle', 'heart'],
      colors: ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ffd8d8']
    });
    
    startRomanticEffects();
    
    setTimeout(() => {
      const paragraphs = popupText.querySelectorAll('p');
      paragraphs.forEach((p, index) => {
        setTimeout(() => {
          p.classList.add('visible');
        }, index * 600);
      });
      
      const confettiInterval = setInterval(() => {
        confetti({
          particleCount: 15,
          spread: 70,
          origin: { 
            x: Math.random(),
            y: Math.random() * 0.5 + 0.2
          },
          shapes: ['heart'],
          colors: ['#ff6b6b']
        });
      }, 1500);
      
      document.querySelector('.letter button').addEventListener('click', () => {
        clearInterval(confettiInterval);
        stopRomanticEffects();
      });
    }, 1000);
  }, 100);
}

function closePopup() {
  popup.classList.remove("active");
  
  setTimeout(() => {
    popup.classList.add("hidden");
    const paragraphs = popupText.querySelectorAll('p');
    paragraphs.forEach(p => {
      p.classList.remove('visible');
    });
  }, 800);
  
  romanticMusic.pause();
  bgMusic.play().catch(e => console.log("BG music play error:", e));
  isRomanticMusicPlaying = false;
  heartbeatSound.pause();
  heartbeatSound.currentTime = 0;
  stopRomanticEffects();
}

volumeIcon.addEventListener('click', () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  romanticMusic.muted = isMuted;
  heartbeatSound.muted = isMuted;
  volumeIcon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
  
  if (!isMuted && bgMusic.paused && !isRomanticMusicPlaying) {
    bgMusic.play().catch(e => console.log("Play error:", e));
  }
});

document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  const contentBox = document.querySelector('.content-box');
  contentBox.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * 5}deg) rotateY(${(x - 0.5) * 5}deg)`;
  
  const moon = document.querySelector('.moon-container');
  moon.style.transform = `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
});

btn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(e => console.log("Click sound error:", e));
  
  if (idx < texts.length) {
    updateProgress();
    
    letter.classList.remove("text-fade-in");
    void letter.offsetWidth;
    
    letter.textContent = texts[idx];
    letter.classList.add("text-fade-in");
    
    if (photoIndex < photos.length) {
      nextPhoto.src = photos[photoIndex];
      nextPhoto.classList.add("active");
      displayedPhoto.classList.add("fade-out");
      
      createPhotoSparkles();
      
      setTimeout(() => {
        displayedPhoto.src = photos[photoIndex];
        displayedPhoto.classList.remove("fade-out");
        nextPhoto.classList.remove("active");
        photoIndex++;
      }, 1000);
    }
    
    idx++;
    
    if (idx === texts.length) {
      btn.innerHTML = '<span class="btn-text">Buka Suratku...</span><span class="btn-heart">❤</span>';
      heartbeatSound.play().catch(e => console.log("Heartbeat sound error:", e));
      document.querySelector('.content-box').classList.add('heartbeat');
      
      for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingHeart, i * 300);
      }
    }
  } else {
    showRomanticLetter();
  }
});

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = Array(300).fill().map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 1.5,
  blinkSpeed: Math.random() * 0.02 + 0.01,
  brightness: Math.random() * 0.5 + 0.5,
  phase: Math.random() * Math.PI * 2
}));

let shootingStars = [];

function createShootingStar() {
  shootingStars.push({
    x: -20,
    y: Math.random() * canvas.height * 0.3,
    length: Math.random() * 50 + 50,
    speed: Math.random() * 15 + 10,
    angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
    opacity: 1,
    color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 30 + 70}%)`
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const time = Date.now() / 1000;
  
  stars.forEach(star => {
    const blink = Math.sin(time * star.blinkSpeed + star.phase) * 0.3 + 0.7;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * blink})`;
    ctx.fill();
  });
  
  if (Math.random() < (popup.classList.contains('hidden') ? 0.005 : 0.03)) {
    createShootingStar();
  }
  
  shootingStars.forEach((star, index) => {
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(
      star.x - star.length * Math.cos(star.angle),
      star.y - star.length * Math.sin(star.angle)
    );
    
    const gradient = ctx.createLinearGradient(
      star.x, star.y,
      star.x - star.length * Math.cos(star.angle),
      star.y - star.length * Math.sin(star.angle)
    );
    gradient.addColorStop(0, star.color);
    gradient.addColorStop(1, "white");
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2 * star.opacity;
    ctx.stroke();
    
    star.x += star.speed * Math.cos(star.angle);
    star.y += star.speed * Math.sin(star.angle);
    star.opacity -= 0.01;
    
    if (star.opacity <= 0 || star.y > canvas.height || star.x > canvas.width) {
      shootingStars.splice(index, 1);
    }
  });
  
  requestAnimationFrame(animate);
}

animate();
createPhotoSparkles();

document.querySelector('.photo-container').addEventListener('mouseenter', () => {
  createPhotoSparkles();
});

document.querySelector('.photo-container').addEventListener('click', () => {
  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animation = "sparkle 1s ease-out forwards";
    document.querySelector('.photo-sparkles').appendChild(sparkle);
    
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
});

// Initialize particles.js if available
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      }
    }
  });
}