// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 3000);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Top Banner Rotation
    const banner = document.getElementById('top-banner');
    const bannerContent = banner.querySelector('.banner-content');
    const bannerItems = banner.querySelectorAll('.banner-item');
    let currentBanner = 0;

    function rotateBanner() {
        currentBanner = (currentBanner + 1) % bannerItems.length;
        bannerContent.style.transform = `translateX(-${currentBanner * 100}%)`;
    }

    setInterval(rotateBanner, 5000);

    // About Section Swiper
    new Swiper('.about-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Service Modal
    const serviceModal = document.createElement('div');
    serviceModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    serviceModal.innerHTML = `
        <div class="bg-white p-8 rounded-lg max-w-md w-full relative">
            <button id="closeModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl" aria-label="Close modal">&times;</button>
            <h2 id="modalTitle" class="text-2xl font-bold mb-4"></h2>
            <p id="modalDescription" class="mb-4"></p>
            <ul id="modalFeatures" class="list-disc pl-5 mb-4"></ul>
            <p id="modalPrice" class="font-bold mb-4"></p>
        </div>
    `;
    document.body.appendChild(serviceModal);

    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalPrice = document.getElementById('modalPrice');
    const closeModal = document.getElementById('closeModal');
    const viewServiceButtons = document.querySelectorAll('.view-service');

    const serviceDetails = {
        wash: {
            title: "Premium Wash & Wax",
            description: "Our Premium Wash & Wax service is designed to bring out the shine in your vehicle.",
            features: [
                "Thorough exterior wash",
                "High-quality wax application",
                "Tire and rim cleaning",
                "Interior vacuum and wipe-down",
                "Window cleaning inside and out"
            ],
            price: "Starting at $79.99"
        },
        interior: {
            title: "Interior Detailing",
            description: "Our Interior Detailing service deep cleans and refreshes your vehicle's interior.",
            features: [
                "Thorough vacuuming of all surfaces",
                "Steam cleaning of upholstery and carpets",
                "Leather treatment (if applicable)",
                "Dashboard and console deep cleaning",
                "Air vent sanitization"
            ],
            price: "Starting at $129.99"
        },
        paint: {
            title: "Paint Correction",
            description: "Our Paint Correction service removes imperfections and restores your vehicle's paint to its original glory.",
            features: [
                "Multi-stage polishing process",
                "Swirl and light scratch removal",
                "Paint depth measurement",
                "High-gloss finish",
                "Protective sealant application"
            ],
            price: "Starting at $249.99"
        },
        ceramic: {
            title: "Ceramic Coating",
            description: "Our Ceramic Coating service provides long-lasting protection and an unmatched shine for your vehicle.",
            features: [
                "Paint decontamination and correction",
                "Professional-grade ceramic coating application",
                "Hydrophobic and UV protection properties",
                "Enhanced gloss and depth",
                "12-18 month durability"
            ],
            price: "Starting at $599.99"
        }
    };

    viewServiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const service = button.getAttribute('data-service');
            const details = serviceDetails[service];
            modalTitle.textContent = details.title;
            modalDescription.textContent = details.description;
            modalFeatures.innerHTML = details.features.map(feature => `<li>${feature}</li>`).join('');
            modalPrice.textContent = details.price;
            serviceModal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        serviceModal.classList.add('hidden');
    });

    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery Modal
    const galleryModal = document.createElement('div');
    galleryModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    galleryModal.innerHTML = `
        <div class="bg-white p-8 rounded-lg max-w-4xl w-full relative">
            <button id="closeGalleryModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl" aria-label="Close gallery modal">&times;</button>
            <h2 id="galleryModalTitle" class="text-2xl font-bold mb-4"></h2>
            <div id="galleryModalImages" class="swiper gallery-swiper mb-4">
                <div class="swiper-wrapper"></div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            <p id="galleryModalDescription" class="mb-4"></p>
        </div>
    `;
    document.body.appendChild(galleryModal);

    const galleryModalTitle = document.getElementById('galleryModalTitle');
    const galleryModalImages = document.getElementById('galleryModalImages');
    const galleryModalDescription = document.getElementById('galleryModalDescription');
    const closeGalleryModal = document.getElementById('closeGalleryModal');
    const viewWorkButtons = document.querySelectorAll('.view-work');

    viewWorkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const galleryItem = button.closest('.gallery-item');
            const images = JSON.parse(galleryItem.getAttribute('data-images'));
            const description = galleryItem.getAttribute('data-description');
            const title = galleryItem.querySelector('h3').textContent;

            galleryModalImages.querySelector('.swiper-wrapper').innerHTML = images.map(image => `
                <div class="swiper-slide">
                    <img src="${image}" alt="${title}" class="w-full h-auto">
                </div>
            `).join('');

            galleryModalTitle.textContent = title;
            galleryModalDescription.textContent = description;
            galleryModal.classList.remove('hidden');

            new Swiper('.gallery-swiper', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        });
    });

    closeGalleryModal.addEventListener('click', () => {
        galleryModal.classList.add('hidden');
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');

            answer.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    // Booking Modal and Notification
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeBookingModal = bookingModal.querySelector('.close');
    const bookNowNotification = document.getElementById('bookNowNotification');

    let notificationTimeout;

    function showNotification() {
        bookNowNotification.classList.remove('opacity-0');
        bookNowNotification.classList.add('opacity-100');
        
        clearTimeout(notificationTimeout);
        notificationTimeout = setTimeout(() => {
            bookNowNotification.classList.remove('opacity-100');
            bookNowNotification.classList.add('opacity-0');
        }, 3000);
    }

    function hideNotification() {
        bookNowNotification.classList.remove('opacity-100');
        bookNowNotification.classList.add('opacity-0');
    }

    bookNowBtn.addEventListener('mouseenter', showNotification);
    bookNowBtn.addEventListener('mouseleave', hideNotification);

    bookNowBtn.addEventListener('click', () => {
        bookingModal.style.display = 'block';
        hideNotification();
    });

    closeBookingModal.addEventListener('click', () => {
        bookingModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == bookingModal) {
            bookingModal.style.display = 'none';
        }
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    console.log('Script loaded and running for Intercoastal Detailing');
});