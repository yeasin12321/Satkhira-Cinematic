const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyc4gX0gjIXJU_aEaf1PQRgZO9j8dp5fBNIHw0SorzVOZLek4bw0sfAGbZcfYnfrUej/exec";
const galleryContainer = document.getElementById("dynamic-gallery");

async function fetchPhotos() {
    try {
        const response = await fetch(SCRIPT_URL);
        const photos = await response.json();
        const loader = document.getElementById("gallery-loader");
        if(loader) loader.style.display = "none";
        
        photos.forEach(photo => {
            const html = `
                <div class="gallery-item fade-in">
                    <div class="image-wrapper"><img src="${photo.imageUrl}" alt="${photo.title}"></div>
                    <div class="image-details"><h3>${photo.title}</h3><p>${photo.description}</p></div>
                </div>`;
            galleryContainer.insertAdjacentHTML('beforeend', html);
        });
        setupObserver();
    } catch (e) { console.error(e); }
}

// কার্সর লজিক
const dot = document.querySelector(".cursor-dot");
const alpona = document.querySelector(".cursor-alpona");
window.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px";
    alpona.animate({ left: e.clientX + "px", top: e.clientY + "px" }, { duration: 600, fill: "forwards" });
});

// অডিও টগল
const audioToggle = document.getElementById("audio-toggle");
const audio = document.getElementById("bg-audio");
if(audioToggle) {
    audioToggle.addEventListener("click", () => {
        if (audio.paused) { audio.play(); document.getElementById("audio-icon").innerText = "🔊"; }
        else { audio.pause(); document.getElementById("audio-icon").innerText = "🔇"; }
    });
}

function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

fetchPhotos();
