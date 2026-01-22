// Modal Logic
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const body = document.body;

function openModal(modalType) {
    let title = "Enquire Now";
    let message = "Please leave your details and we will contact you shortly.";
    let buttonText = "Submit";

    switch (modalType) {
        case 'pricingAndFloorPlans':
            title = "Get Pricing & Floor Plans";
            message = "Enter your details to receive the brochure & price sheet instantly.";
            buttonText = "Download Now";
            break;
        case 'bookVisit':
            title = "Book Site Visit";
            message = "Schedule your exclusive site tour today.";
            buttonText = "Confirm Booking";
            break;
        case 'downloadBrochure':
            title = "Download Brochure";
            message = "Get the complete project details.";
            buttonText = "Download";
            break;
        case 'joinCommunity':
            title = "Join Our Community";
            message = "Be a part of 800+ happy families.";
            buttonText = "Join Now";
            break;
        case 'bookNow':
            title = "Claim Limited Offer";
            message = "Secure your unit with these exclusive benefits.";
            buttonText = "Claim Offer";
            break;
        case 'thankYouModal':
            // Should likely trigger after submission, but can be a type too
            title = "Thank You!";
            message = "We have received your request and will get back to you shortly.";
            buttonText = "Close";
            break;
    }

    // Update Modal Content Dynamically
    if (modalType !== 'thankYouModal') {
        modalContent.innerHTML = `
            <h3>${title}</h3>
            <p>${message}</p>
            <form class="modal-form" onsubmit="handleFormSubmit(event, '${modalType}')">
                <div class="form-group">
                    <input type="text" placeholder="Name" required>
                </div>
                <div class="form-group">
                    <input type="tel" placeholder="Phone Number" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Email (Optional)">
                </div>
                <button type="submit" class="btn btn-primary btn-block">${buttonText}</button>
            </form>
        `;
    } else {
        modalContent.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #28a745; margin-bottom: 20px;"></i>
                <h3>${title}</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="closeModal()">Close</button>
            </div>
        `;
    }

    modalOverlay.classList.add('active');
    body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    modalOverlay.classList.remove('active');
    body.style.overflow = '';
}

// Close modal when clicking outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

function handleFormSubmit(e, type) {
    e.preventDefault();
    // Simulate API call
    const button = e.target.querySelector('button');
    const originalText = button.innerText;
    button.innerText = "Processing...";
    button.disabled = true;

    setTimeout(() => {
        closeModal();
        // Show success message or thank you modal
        setTimeout(() => {
            openModal('thankYouModal');
        }, 300);
    }, 1500);
}

function openWhatsapp() {
    window.open('https://wa.me/919876543210?text=Hi, I am interested in Capri Ravet project.', '_blank');
}


// Phone Number Input Validation (Allow only digits)
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

// Gallery Carousel Logic
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryNext = document.querySelector('.gallery-next');
const galleryPrev = document.querySelector('.gallery-prev');
let currentGalleryIndex = 0;

function showGallerySlide(index) {
    if (!galleryItems.length) return;
    galleryItems.forEach(item => item.classList.remove('active'));
    galleryItems[index].classList.add('active');
}

if (galleryNext && galleryPrev) {
    galleryNext.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        showGallerySlide(currentGalleryIndex);
    });

    galleryPrev.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        showGallerySlide(currentGalleryIndex);
    });
}
