// Category switching
const toggleBtns = document.querySelectorAll('.toggle-btn');
const portfolioGrids = document.querySelectorAll('.portfolio-grid');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;

        // Update active toggle
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show corresponding grid
        portfolioGrids.forEach(grid => {
            grid.classList.remove('active');
        });
        document.getElementById(`${category}-grid`).classList.add('active');
    });
});

// Video hover play/pause
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    const video = item.querySelector('video');
    if (video) {
        item.addEventListener('mouseenter', () => {
            video.play();
        });
        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});

// Fullpage modal functionality
const fullpageModal = document.getElementById('fullpageModal');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        modalContent.innerHTML = '';

        const videoSrc = item.dataset.video;
        const imageSrc = item.dataset.image;

        if (videoSrc) {
            const video = document.createElement('video');
            video.src = videoSrc;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            modalContent.appendChild(video);
        } else if (imageSrc) {
            const img = document.createElement('img');
            img.src = imageSrc;
            modalContent.appendChild(img);
        }

        fullpageModal.classList.add('active');
    });
});

function closeFullpage() {
    fullpageModal.classList.remove('active');
    modalContent.innerHTML = '';
}

closeModal.addEventListener('click', closeFullpage);
fullpageModal.addEventListener('click', (e) => {
    if (e.target === fullpageModal) {
        closeFullpage();
    }
});
