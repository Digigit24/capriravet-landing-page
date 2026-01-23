// API Configuration
const API_URL = "https://forms.thedigitechsolutions.com/api/forms/submit/08c75a45-133f-4562-aba8-35707a3df5e1";

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
            title = "Thank You!";
            message = "We have received your request and will get back to you shortly.";
            buttonText = "Close";
            break;
    }

    if (modalType !== 'thankYouModal') {
        modalContent.innerHTML = `
            <h3>${title}</h3>
            <p>${message}</p>
            <form class="modal-form" onsubmit="handleModalFormSubmit(event, '${modalType}')">
                <div class="form-group">
                    <input type="text" name="fullName" placeholder="Name" required>
                </div>
                <div class="form-group">
                    <input type="tel" name="phone" placeholder="Phone Number" pattern="[0-9]{10}" maxlength="10" title="10 digit mobile number" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email (Optional)">
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
    body.style.overflow = 'hidden';
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

// Helper: Split Name
function splitName(fullName) {
    const parts = fullName.trim().split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ') || '';
    return { firstName, lastName };
}

// Helper: Submit to API
async function submitToApi(payload, buttonElement, originalButtonText) {
    buttonElement.disabled = true;
    buttonElement.innerText = "Sending...";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Success
            if (modalOverlay.classList.contains('active')) {
                closeModal();
            }
            setTimeout(() => {
                openModal('thankYouModal');
            }, 300);
        } else {
            alert("Something went wrong. Please try again later.");
            buttonElement.innerText = originalButtonText;
            buttonElement.disabled = false;
        }
    } catch (error) {
        console.error("API Error:", error);
        alert("Network error. Please try again.");
        buttonElement.innerText = originalButtonText;
        buttonElement.disabled = false;
    }
}

// Handler for Modal Forms
function handleModalFormSubmit(e, source) {
    e.preventDefault();
    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerText;

    const formData = new FormData(form);
    const fullName = formData.get('fullName');
    const { firstName, lastName } = splitName(fullName);

    const payload = {
        first_name: firstName,
        last_name: lastName,
        email: formData.get('email') || "",
        phone: formData.get('phone'),
        message: `Landing Page Enquiry - Source: ${source}`,
        requirement: "3 BHK" // Defaulting as specific requirement isn't in generic modal
    };

    submitToApi(payload, button, originalText);
}

// Handler for Hero Section Form
function submitHeroForm(e) {
    e.preventDefault();
    const form = e.target;
    // Determine which button was clicked
    const submitter = e.submitter;
    const actionName = submitter ? submitter.innerText : "General Enquiry";
    const originalText = submitter ? submitter.innerText : "Submit";

    const formData = new FormData(form);
    const fullName = formData.get('fullName');
    const { firstName, lastName } = splitName(fullName);

    const payload = {
        first_name: firstName,
        last_name: lastName,
        email: formData.get('email') || "",
        phone: formData.get('phone'),
        message: `Landing Page Enquiry - Hero Section Action: ${actionName}`,
        requirement: formData.get('requirement') || "3 BHK"
    };

    if (submitter) {
        submitToApi(payload, submitter, originalText);
    } else {
        // Fallback if submitted via Enter key (default to first button or generic behavior)
        const firstButton = form.querySelector('button[type="submit"]');
        if (firstButton) {
            submitToApi(payload, firstButton, firstButton.innerText);
        }
    }
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

// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
});
