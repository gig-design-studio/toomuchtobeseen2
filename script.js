// Wait for GSAP to load
window.addEventListener('load', function() {
    const slider = document.querySelector(".slider");
    const slideTitle = document.querySelector(".slide-title");
    const thumbnailWheel = document.querySelector(".thumbnail-wheel");

    const totalSlides = 20;
    const endScale = 5;
    let slideWidth = window.innerWidth * 0.45;
    let viewportCenter = window.innerWidth / 2;
    let isMobile = window.innerWidth < 1000;

    const slideTitles = [
        "TWICE - STRATEGY",
        "WOODZ - Smashing Concrete",
        "WOODZ - I'LL NEVER LOVE AGAIN",
        "aespa - HOT MESS",
        "TAEYONG - 501",
        "BIG NAUGHTY x KID MILLI - FREESTYLIN",
        "SURL - FOREST (Mountain and Elevator)",
        "YUQI - MOTIVATION",
        "INI - WMDA (Where My Drum At)",
        "Creative Direction",
        "TWICE - STRATEGY",
        "WOODZ - Smashing Concrete",
        "WOODZ - I'LL NEVER LOVE AGAIN",
        "aespa - HOT MESS",
        "TAEYONG - 501",
        "BIG NAUGHTY x KID MILLI - FREESTYLIN",
        "SURL - FOREST (Mountain and Elevator)",
        "YUQI - MOTIVATION",
        "INI - WMDA (Where My Drum At)",
        "Interactive Experience"
    ];

    const videoInfo = {
        1: {
            title: "TWICE - STRATEGY",
            subtitle: "BACK TO OFFICE",
            description: "A STRAIGHTFORWARD FASHION CAMPAIGN FILM FOR ZARA'S SUMMER COLLECTION. EXPERIENCE A BREEZY SUMMER DAY AND WATCH AS TIME SLOWS. WITH EACH STEP, THESE YOUNG AND FASHIONABLE PEOPLE HEAD BACK TO THE OFFICE.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        2: {
            title: "WOODZ - Smashing Concrete",
            subtitle: "Music Video",
            description: "A powerful visual journey through urban landscapes.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        3: {
            title: "WOODZ - I'LL NEVER LOVE AGAIN",
            subtitle: "Music Video",
            description: "An emotional visual narrative.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        4: {
            title: "aespa - HOT MESS",
            subtitle: "Music Video",
            description: "A bold and energetic visual experience.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        5: {
            title: "TAEYONG - 501",
            subtitle: "Music Video",
            description: "A creative exploration of style and movement.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        6: {
            title: "BIG NAUGHTY x KID MILLI - FREESTYLIN",
            subtitle: "Music Video",
            description: "A dynamic collaboration visualized.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        7: {
            title: "SURL - FOREST (Mountain and Elevator)",
            subtitle: "Music Video",
            description: "A journey through natural and urban spaces.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        8: {
            title: "YUQI - MOTIVATION",
            subtitle: "Music Video",
            description: "An inspiring visual story.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        9: {
            title: "INI - WMDA (Where My Drum At)",
            subtitle: "Music Video",
            description: "A rhythmic visual experience.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        11: {
            title: "TWICE - STRATEGY",
            subtitle: "BACK TO OFFICE",
            description: "A STRAIGHTFORWARD FASHION CAMPAIGN FILM FOR ZARA'S SUMMER COLLECTION. EXPERIENCE A BREEZY SUMMER DAY AND WATCH AS TIME SLOWS. WITH EACH STEP, THESE YOUNG AND FASHIONABLE PEOPLE HEAD BACK TO THE OFFICE.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        12: {
            title: "WOODZ - Smashing Concrete",
            subtitle: "Music Video",
            description: "A powerful visual journey through urban landscapes.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        13: {
            title: "WOODZ - I'LL NEVER LOVE AGAIN",
            subtitle: "Music Video",
            description: "An emotional visual narrative.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        14: {
            title: "aespa - HOT MESS",
            subtitle: "Music Video",
            description: "A bold and energetic visual experience.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        15: {
            title: "TAEYONG - 501",
            subtitle: "Music Video",
            description: "A creative exploration of style and movement.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        16: {
            title: "BIG NAUGHTY x KID MILLI - FREESTYLIN",
            subtitle: "Music Video",
            description: "A dynamic collaboration visualized.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        17: {
            title: "SURL - FOREST (Mountain and Elevator)",
            subtitle: "Music Video",
            description: "A journey through natural and urban spaces.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        18: {
            title: "YUQI - MOTIVATION",
            subtitle: "Music Video",
            description: "An inspiring visual story.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        },
        19: {
            title: "INI - WMDA (Where My Drum At)",
            subtitle: "Music Video",
            description: "A rhythmic visual experience.\n\nDirector: Creative Team\nProduction: UNVEIL®\nYear: 2024"
        }
    };

    let currentX = 0;
    let targetX = 0;
    let isScrolling = false;
    let scrollTimeout;
    let activeSlideIndex = 0;

    // Fullpage modal functionality
    const fullpageModal = document.getElementById('fullpageModal');
    const closeModal = document.getElementById('closeModal');
    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalToggleBtn = document.getElementById('modalToggleBtn');
    const modalDescription = document.getElementById('modalDescription');

    function openFullpage(imageNumber) {
        modalContent.innerHTML = '';

        // Update modal info
        const info = videoInfo[imageNumber];
        if (info) {
            modalTitle.textContent = info.title;
            modalSubtitle.textContent = info.subtitle;
            modalDescription.innerHTML = `<p>${info.description}</p>`;
        }

        // Reset toggle button and description
        modalToggleBtn.textContent = 'MORE';
        modalDescription.classList.remove('expanded');

        // Check if this slide has video
        if (imageNumber === 1 || imageNumber === 11) {
            const video = document.createElement("video");
            video.src = "cg-yzavoku-slider/movie/twice_-_strategy_(feat._megan_thee_stallion) (360p).mp4";
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            modalContent.appendChild(video);
        } else if (imageNumber === 2 || imageNumber === 12) {
            const video = document.createElement("video");
            video.src = "cg-yzavoku-slider/movie/woodz_-_smashing_concrete (360p).mp4";
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            modalContent.appendChild(video);
        } else if (imageNumber === 3 || imageNumber === 13) {
            const video = document.createElement("video");
            video.src = "cg-yzavoku-slider/movie/woodz_-_i'll_never_love_again (360p).mp4";
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            modalContent.appendChild(video);
        } else if (imageNumber === 4 || imageNumber === 14) {
            const video = document.createElement("video");
            video.src = "cg-yzavoku-slider/movie/aespa_-_hot_mess (360p).mp4";
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            modalContent.appendChild(video);
        } else if (imageNumber === 5 || imageNumber === 15) {
            const video = document.createElement("video");
            video.src = "cg-yzavoku-slider/movie/taeyong_-_501 (360p).mp4";
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            modalContent.appendChild(video);
        } else if (imageNumber === 6 || imageNumber === 16) {
            const video = document.createElement("video");
            video.src = "cg-yzavoku-slider/movie/big_naughty_x_kid_milli_-_freestylin (360p).mp4";
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            modalContent.appendChild(video);
        } else if (imageNumber === 7 || imageNumber === 17) {
            const video = document.createElement("video");
            video.src = "cg-yzavoku-slider/movie/surl_-_forest_(mountain_and_elevator) (360p).mp4";
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            modalContent.appendChild(video);
        } else if (imageNumber === 8 || imageNumber === 18) {
            const video = document.createElement("video");
            video.src = "cg-yzavoku-slider/movie/yuqi_-_motivation (360p).mp4";
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            modalContent.appendChild(video);
        } else if (imageNumber === 9 || imageNumber === 19) {
            const video = document.createElement("video");
            video.src = "cg-yzavoku-slider/movie/ini_-_wmda_(where_my_drum_at) (360p).mp4";
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            modalContent.appendChild(video);
        } else {
            const img = document.createElement("img");
            img.src = `cg-yzavoku-slider/public/slide-${imageNumber}.jpg`;
            modalContent.appendChild(img);
        }

        fullpageModal.classList.add('active');
    }

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

    // Create slides
    function createSlides() {
        for (let i = 0; i < totalSlides * 3; i++) {
            const slide = document.createElement("div");
            slide.className = "slide";

            const imageNumber = (i % totalSlides) + 1;

            // Add click event to open fullpage
            slide.addEventListener('click', () => {
                openFullpage(imageNumber);
            });
            slide.style.cursor = 'pointer';

            // Check if this is slide with video - add video instead of image
            if (imageNumber === 1 || imageNumber === 11) {
                const video = document.createElement("video");
                video.src = "cg-yzavoku-slider/movie/twice_-_strategy_(feat._megan_thee_stallion) (360p).mp4";
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.width = "100%";
                video.style.height = "100%";
                video.style.position = "absolute";
                video.style.top = "0";
                video.style.left = "0";
                video.style.objectFit = "cover";
                slide.appendChild(video);
            } else if (imageNumber === 2 || imageNumber === 12) {
                const video = document.createElement("video");
                video.src = "cg-yzavoku-slider/movie/woodz_-_smashing_concrete (360p).mp4";
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.width = "100%";
                video.style.height = "100%";
                video.style.position = "absolute";
                video.style.top = "0";
                video.style.left = "0";
                video.style.objectFit = "cover";
                slide.appendChild(video);
            } else if (imageNumber === 3 || imageNumber === 13) {
                const video = document.createElement("video");
                video.src = "cg-yzavoku-slider/movie/woodz_-_i'll_never_love_again (360p).mp4";
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.width = "100%";
                video.style.height = "100%";
                video.style.position = "absolute";
                video.style.top = "0";
                video.style.left = "0";
                video.style.objectFit = "cover";
                slide.appendChild(video);
            } else if (imageNumber === 4 || imageNumber === 14) {
                const video = document.createElement("video");
                video.src = "cg-yzavoku-slider/movie/aespa_-_hot_mess (360p).mp4";
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.width = "100%";
                video.style.height = "100%";
                video.style.position = "absolute";
                video.style.top = "0";
                video.style.left = "0";
                video.style.objectFit = "cover";
                slide.appendChild(video);
            } else if (imageNumber === 5 || imageNumber === 15) {
                const video = document.createElement("video");
                video.src = "cg-yzavoku-slider/movie/taeyong_-_501 (360p).mp4";
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.width = "100%";
                video.style.height = "100%";
                video.style.position = "absolute";
                video.style.top = "0";
                video.style.left = "0";
                video.style.objectFit = "cover";
                slide.appendChild(video);
            } else if (imageNumber === 6 || imageNumber === 16) {
                const video = document.createElement("video");
                video.src = "cg-yzavoku-slider/movie/big_naughty_x_kid_milli_-_freestylin (360p).mp4";
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.width = "100%";
                video.style.height = "100%";
                video.style.position = "absolute";
                video.style.top = "0";
                video.style.left = "0";
                video.style.objectFit = "cover";
                slide.appendChild(video);
            } else if (imageNumber === 7 || imageNumber === 17) {
                const video = document.createElement("video");
                video.src = "cg-yzavoku-slider/movie/surl_-_forest_(mountain_and_elevator) (360p).mp4";
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.width = "100%";
                video.style.height = "100%";
                video.style.position = "absolute";
                video.style.top = "0";
                video.style.left = "0";
                video.style.objectFit = "cover";
                slide.appendChild(video);
            } else if (imageNumber === 8 || imageNumber === 18) {
                const video = document.createElement("video");
                video.src = "cg-yzavoku-slider/movie/yuqi_-_motivation (360p).mp4";
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.width = "100%";
                video.style.height = "100%";
                video.style.position = "absolute";
                video.style.top = "0";
                video.style.left = "0";
                video.style.objectFit = "cover";
                slide.appendChild(video);
            } else if (imageNumber === 9 || imageNumber === 19) {
                const video = document.createElement("video");
                video.src = "cg-yzavoku-slider/movie/ini_-_wmda_(where_my_drum_at) (360p).mp4";
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.width = "100%";
                video.style.height = "100%";
                video.style.position = "absolute";
                video.style.top = "0";
                video.style.left = "0";
                video.style.objectFit = "cover";
                slide.appendChild(video);
            } else {
                const img = document.createElement("img");
                // Update path to use cg-yzavoku-slider/public
                img.src = `cg-yzavoku-slider/public/slide-${imageNumber}.jpg`;
                slide.appendChild(img);
            }

            slider.appendChild(slide);
        }
    }

    // Create thumbnail items
    function createThumbnailItems() {
        for (let i = 0; i < totalSlides; i++) {
            const angle = (i / totalSlides) * Math.PI * 2;
            const radius = isMobile ? 100 : 350;
            const x = radius * Math.cos(angle) + window.innerWidth / 2;
            const y = radius * Math.sin(angle) + window.innerHeight / 2 - 25;

            const thumbnail = document.createElement("div");
            thumbnail.className = "thumbnail-item";
            thumbnail.dataset.index = i;
            thumbnail.dataset.angle = angle;
            thumbnail.dataset.radius = radius;

            const img = document.createElement("img");
            const imageNumber = i + 1;
            img.src = `cg-yzavoku-slider/public/slide-${imageNumber}.jpg`;
            thumbnail.appendChild(img);

            gsap.set(thumbnail, {
                x,
                y,
                transformOrigin: "center center",
            });

            thumbnailWheel.appendChild(thumbnail);
        }
    }

    // Initialize slider
    function initializeSlider() {
        const slides = document.querySelectorAll(".slide");

        slides.forEach((slide, index) => {
            const x = index * slideWidth - slideWidth;
            gsap.set(slide, { x: x });
        });

        const centerOffset = window.innerWidth / 2 - slideWidth / 2;
        currentX = centerOffset;
        targetX = centerOffset;
    }

    // Handle scroll
    function handleScroll(e) {
        e.preventDefault();
        const scrollIntensity = e.deltaY || e.detail || e.wheelDelta * -1;
        targetX -= scrollIntensity * 1;

        isScrolling = true;
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    }

    // Animation loop
    function animate() {
        currentX += (targetX - currentX) * 0.1;

        const totalWidth = totalSlides * slideWidth;
        if (currentX > 0) {
            currentX -= totalWidth;
            targetX -= totalWidth;
        } else if (currentX < -totalWidth) {
            currentX += totalWidth;
            targetX += totalWidth;
        }

        let centerSlideIndex = 0;
        let closestToCenter = Infinity;
        const slides = document.querySelectorAll(".slide");

        slides.forEach((slide, index) => {
            const x = index * slideWidth + currentX;
            gsap.set(slide, { x: x });

            const slideCenterX = x + slideWidth / 2;
            const distanceFromCenter = Math.abs(slideCenterX - viewportCenter);

            const outerDistance = slideWidth * 3;
            const progress = Math.min(distanceFromCenter / outerDistance, 1);

            const easedProgress =
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            const scale = 1 + easedProgress * (endScale - 1);

            // Apply scale to both img and iframe
            const img = slide.querySelector("img");
            const iframe = slide.querySelector("iframe");

            if (img) {
                gsap.set(img, { scale: scale });
            }
            if (iframe) {
                gsap.set(iframe, { scale: scale });
            }

            // Find the slide closest to the center
            if (distanceFromCenter < closestToCenter) {
                closestToCenter = distanceFromCenter;
                centerSlideIndex = index % totalSlides;
            }
        });

        const slideProgress = Math.abs(currentX) / slideWidth;
        const newActiveSlideIndex = Math.floor(slideProgress) % totalSlides;

        if (newActiveSlideIndex !== activeSlideIndex) {
            activeSlideIndex = newActiveSlideIndex;
        }

        const currentTitleIndex = centerSlideIndex;
        slideTitle.textContent = slideTitles[currentTitleIndex];

        updateThumbnailItems();

        requestAnimationFrame(animate);
    }

    // Update thumbnail items
    function updateThumbnailItems() {
        const exactSlideProgress = Math.abs(currentX) / slideWidth;
        const currentRotationAngle = -(exactSlideProgress * (360 / totalSlides)) + 90;

        const thumbnails = document.querySelectorAll(".thumbnail-item");
        thumbnails.forEach((thumbnail) => {
            const baseAngle = parseFloat(thumbnail.dataset.angle);
            const radius = isMobile ? 150 : 350;
            const currentAngle = baseAngle + (currentRotationAngle * Math.PI) / 180;

            const x = radius * Math.cos(currentAngle) + window.innerWidth / 2;
            const y = radius * Math.sin(currentAngle) + window.innerHeight / 2 - 25;

            gsap.set(thumbnail, {
                x: x,
                y: y,
                rotation: 0,
                transformOrigin: "center center",
            });
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        window.addEventListener("wheel", handleScroll, { passive: false });
        window.addEventListener("DOMMouseScroll", handleScroll, { passive: false });

        window.addEventListener(
            "scroll",
            function (e) {
                if (e.target === document || e.target === document.body) {
                    window.scrollTo(0, 0);
                }
            },
            { passive: false }
        );

        window.addEventListener("resize", () => {
            isMobile = window.innerWidth < 1000;
            slideWidth = window.innerWidth * (isMobile ? 0.75 : 0.45);
            viewportCenter = window.innerWidth / 2;
            thumbnailWheel.innerHTML = "";
            createThumbnailItems();
            initializeSlider();
        });
    }

    // Initialize everything
    function init() {
        createSlides();
        createThumbnailItems();
        initializeSlider();
        setupEventListeners();
        animate();

        // Fade in header and footer
        gsap.from('.header', {
            opacity: 0,
            y: -20,
            duration: 1,
            ease: 'power2.out',
            delay: 0.3
        });

        gsap.from('.bottom-nav', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power2.out',
            delay: 0.4
        });
    }

    init();
});
