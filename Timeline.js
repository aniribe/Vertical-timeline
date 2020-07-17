export class Timeline {
  constructor() {
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.swiperWrapper = document.querySelector(".swiper-wrapper");
    this.pagination = document.querySelector(".swiper-pagination");
    this.allSlides = this.swiperWrapper.children;
    this.amountOfSlides = this.swiperWrapper.childElementCount;
    this.currentSlide = 0;

    this.createYearsNavigation();
    this.prevBtn.addEventListener("click", this.prevBtnClickHandler);
    this.nextBtn.addEventListener("click", this.nextBtnClickHandler);
    this.disableBtns();
  }

  disableBtns() {
    if (this.currentSlide >= this.amountOfSlides - 1) {
      if (!this.nextBtn.className.includes("disabled"))
        this.nextBtn.classList.add("disabled");
    } else {
      if (this.nextBtn.className.includes("disabled"))
        this.nextBtn.classList.remove("disabled");
    }

    if (this.currentSlide <= 0) {
      if (!this.prevBtn.className.includes("disabled")) {
        this.prevBtn.classList.add("disabled");
      }
    } else {
      if (this.prevBtn.className.includes("disabled")) {
        this.prevBtn.classList.remove("disabled");
      }
    }
  }

  setListenerForYearNavigation = (element) => {
    element.addEventListener("click", (item) => {
      this.currentSlide = +item.target.getAttribute("data-number");
      this.swiperWrapper.style.transform = `translateY(-${
        100 * this.currentSlide
      }%)`;
      this.addClassActive();
      this.disableBtns();
    });
  };

  createYearsNavigation() {
    for (let i = 0; i < this.amountOfSlides; i++) {
      let item = document.createElement("li");
      item.innerText = this.allSlides[i].getAttribute("data-year");
      item.setAttribute("data-number", i);
      this.setListenerForYearNavigation(item);
      this.pagination.appendChild(item);
    }
  }

  addClassActive() {
    for (let i = 0; i < this.allSlides.length; i++) {
      if (this.allSlides[i].className.includes("active")) {
        this.allSlides[i].classList.remove("active");
      }
    }

    this.allSlides[this.currentSlide].classList.add("active");
  }

  prevBtnClickHandler = () => {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.disableBtns();
      this.swiperWrapper.style.transform = `translateY(-${
        100 * this.currentSlide
      }%)`;
      this.addClassActive();
    }
  };

  nextBtnClickHandler = () => {
    if (this.currentSlide < this.amountOfSlides - 1) {
      this.currentSlide++;
      this.disableBtns();
      this.swiperWrapper.style.transform = `translateY(-${
        100 * this.currentSlide
      }%)`;
      this.addClassActive();
    }
  };
}
