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

// Video info data with Vimeo IDs
const videoInfo = {
    "twice_-_strategy_(feat._megan_thee_stallion) (360p).mp4": {
        title: "TWICE - STRATEGY",
        subtitle: "Music Video",
        description: "A STRAIGHTFORWARD FASHION CAMPAIGN FILM FOR ZARA'S SUMMER COLLECTION. EXPERIENCE A BREEZY SUMMER DAY AND WATCH AS TIME SLOWS. WITH EACH STEP, THESE YOUNG AND FASHIONABLE PEOPLE HEAD BACK TO THE OFFICE.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024",
        vimeoId: "1056340719"
    },
    "woodz_-_smashing_concrete (360p).mp4": {
        title: "WOODZ - Smashing Concrete",
        subtitle: "Music Video",
        description: "A powerful visual journey through urban landscapes.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024",
        vimeoId: "1122244222"
    },
    "woodz_-_i'll_never_love_again (360p).mp4": {
        title: "WOODZ - I'LL NEVER LOVE AGAIN",
        subtitle: "Music Video",
        description: "An emotional visual narrative.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024",
        vimeoId: "1122262462"
    },
    "aespa_-_hot_mess (360p).mp4": {
        title: "aespa - HOT MESS",
        subtitle: "Music Video",
        description: "A bold and energetic visual experience.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024",
        vimeoId: "1004763418"
    },
    "taeyong_-_501 (360p).mp4": {
        title: "TAEYONG - 501",
        subtitle: "Music Video",
        description: "A creative exploration of style and movement.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024",
        vimeoId: "1125071461"
    },
    "big_naughty_x_kid_milli_-_freestylin (360p).mp4": {
        title: "BIG NAUGHTY x KID MILLI - FREESTYLIN",
        subtitle: "Music Video",
        description: "A dynamic collaboration visualized.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024",
        vimeoId: "1017875856"
    },
    "surl_-_forest_(mountain_and_elevator) (360p).mp4": {
        title: "SURL - FOREST (Mountain and Elevator)",
        subtitle: "Music Video",
        description: "A journey through natural and urban spaces.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024",
        vimeoId: "1023865004"
    },
    "yuqi_-_motivation (360p).mp4": {
        title: "YUQI - MOTIVATION",
        subtitle: "Music Video",
        description: "An inspiring visual story.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024",
        vimeoId: "1140124942"
    },
    "ini_-_wmda_(where_my_drum_at) (360p).mp4": {
        title: "INI - WMDA (Where My Drum At)",
        subtitle: "Music Video",
        description: "A rhythmic visual experience.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024",
        vimeoId: "1020560779"
    }
};

// Fullpage modal functionality
const fullpageModal = document.getElementById('fullpageModal');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalToggleBtn = document.getElementById('modalToggleBtn');
const modalDescription = document.getElementById('modalDescription');

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        modalContent.innerHTML = '';

        const videoSrc = item.dataset.video;
        const imageSrc = item.dataset.image;

        // Get video filename from path
        const filename = videoSrc ? videoSrc.split('/').pop() : null;
        const info = filename ? videoInfo[filename] : null;

        // Update modal info
        if (info) {
            modalTitle.textContent = info.title;
            modalSubtitle.textContent = info.subtitle;
            modalDescription.innerHTML = `<p>${info.description}</p>`;
        } else {
            modalTitle.textContent = '';
            modalSubtitle.textContent = '';
            modalDescription.innerHTML = '';
        }

        // Reset toggle button and description
        modalToggleBtn.textContent = 'MORE';
        modalDescription.classList.remove('expanded');

        if (videoSrc && info && info.vimeoId) {
            // Use Vimeo embed
            const iframe = document.createElement('iframe');
            iframe.src = `https://player.vimeo.com/video/${info.vimeoId}?autoplay=1&loop=1&title=0&byline=0&portrait=0`;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            modalContent.appendChild(iframe);
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

// Toggle button functionality
modalToggleBtn.addEventListener('click', () => {
    const isExpanded = modalDescription.classList.contains('expanded');
    if (isExpanded) {
        modalDescription.classList.remove('expanded');
        modalToggleBtn.textContent = 'MORE';
    } else {
        modalDescription.classList.add('expanded');
        modalToggleBtn.textContent = 'LESS';
    }
});
