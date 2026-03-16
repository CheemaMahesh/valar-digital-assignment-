class OfferCarousel {
  constructor() {
    this.currentIndex = 0;
    this.track = null;
    this.slides = [];
    this.prevBtn = null;
    this.nextBtn = null;
    this.init();
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupCarousel());
    } else {
      this.setupCarousel();
    }
  }

  setupCarousel() {
    this.track = document.querySelector(".offer-carousel-track");
    this.prevBtn = document.getElementById("carouselPrev");
    this.nextBtn = document.getElementById("carouselNext");

    if (!this.track || !this.prevBtn || !this.nextBtn) {
      console.error("Carousel elements not found");
      return;
    }

    this.updateVisibleSlides();

    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    window.addEventListener("resize", () => {
      this.currentIndex = 0;
      this.updateVisibleSlides();
      this.updateCarousel();
    });

    this.updateCarousel();
  }

  updateVisibleSlides() {
    this.slides = Array.from(this.track.children).filter(
      (slide) => getComputedStyle(slide).display !== "none",
    );
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  updateCarousel() {
    const slideWidth = this.slides[0]?.offsetWidth || 0;
    const offset = -this.currentIndex * slideWidth;
    this.track.style.transform = `translateX(${offset}px)`;

    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex === this.slides.length - 1;
  }
}

new OfferCarousel();

// ============

// Collapsible cards functionality
class CollapsibleCards {
  constructor() {
    this.activeCard = null;
    this.init();
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupCards());
    } else {
      this.setupCards();
    }
  }

  setupCards() {
    const cardHeaders = document.querySelectorAll(".offer-details-card-header");

    cardHeaders.forEach((header) => {
      header.addEventListener("click", () => this.handleCardClick(header));
    });
  }

  handleCardClick(clickedHeader) {
    const card = clickedHeader.closest(".offer-details-card");
    const cardId = card.dataset.cardId;
    const content = document.getElementById(`content-${cardId}`);

    if (!content) return;

    if (this.activeCard === card) {
      this.closeCard(card, content);
      this.activeCard = null;
    } else {
      if (this.activeCard) {
        const prevContent = document.getElementById(
          `content-${this.activeCard.dataset.cardId}`,
        );
        this.closeCard(this.activeCard, prevContent);
      }

      this.openCard(card, content);
      this.activeCard = card;
    }
  }

  openCard(card, content) {
    card.classList.add("active");
    content.classList.add("active");
  }

  closeCard(card, content) {
    card.classList.remove("active");
    content.classList.remove("active");
  }
}

new CollapsibleCards();

// ==========

class BlendCollapse {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("click", (e) => {
      const collapseContainer = e.target.closest(".blend-collapse-container");
      if (collapseContainer) {
        this.toggleCollapse(collapseContainer);
      }
    });
  }

  toggleCollapse(container) {
    container.classList.toggle("active");
  }
}

new BlendCollapse();

// ============

class FaqCollapse {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("click", (e) => {
      const faqTrigger = e.target.closest(".faq-collase-trigger");
      if (faqTrigger) {
        const faqCard = faqTrigger.closest(".faq-card");
        if (faqCard) {
          this.toggleCollapse(faqCard);
        }
      }
    });
  }

  toggleCollapse(card) {
    card.classList.toggle("active");
  }
}

new FaqCollapse();
