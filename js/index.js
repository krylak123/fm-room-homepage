//! Set Viewport
const vp1280 = window.matchMedia('screen and (min-width: 1280px)');

//! Handled mobile menu

const handleToggleMenu = () => {
  document.querySelector('.menu').classList.toggle('menu--open');
};

document
  .querySelector('.header__menu-open')
  .addEventListener('click', handleToggleMenu);
document
  .querySelector('.menu__close')
  .addEventListener('click', handleToggleMenu);

//! Handled slider

const slideOptions = [
  {
    imageMobile: './images/mobile-image-hero-1.jpg',
    imageDesktop: './images/desktop-image-hero-1.jpg',
    title: 'Discover innovative ways to decorate',
    text: 'We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.',
  },
  {
    imageMobile: './images/mobile-image-hero-2.jpg',
    imageDesktop: './images/desktop-image-hero-2.jpg',
    title: 'We are available all across the globe',
    text: "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
  },
  {
    imageMobile: './images/mobile-image-hero-3.jpg',
    imageDesktop: './images/desktop-image-hero-3.jpg',
    title: 'Manufactured with the best materials',
    text: 'Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.',
  },
];

class Slider {
  constructor(slides) {
    this.panelBtnLeft = document.querySelector('.slider__panel-btn--left');
    this.panelBtnRight = document.querySelector('.slider__panel-btn--right');

    this.imageMobile = document.querySelector('img.slider__image');
    this.imageDesktop = document.querySelector('source.slider__image');
    this.title = document.querySelector('.slider__title');
    this.text = document.querySelector('.slider__text');

    this.options = slides;
    this.intervalIndex;
    this.index = 0;

    this.init();
  }

  editValues(index) {
    if (vp1280.matches)
      this.imageDesktop.srcset = this.options[index].imageDesktop;
    else this.imageMobile.src = this.options[index].imageMobile;

    this.title.textContent = this.options[index].title;
    this.text.textContent = this.options[index].text;
  }

  autoPlay() {
    this.index++;

    if (this.index > this.options.length - 1) {
      this.index = 0;
    }

    this.editValues(this.index);
  }

  moveLeft(e) {
    if (e.keyCode !== 37 && e.keyCode !== undefined) {
      return;
    }
    clearInterval(this.intervalIndex);

    this.index--;

    if (this.index < 0) {
      this.index = this.options.length - 1;
    }

    this.editValues(this.index);

    this.intervalIndex = setInterval(this.autoPlay.bind(this), 10000);
  }

  moveRight(e) {
    if (e.keyCode !== 39 && e.keyCode !== undefined) {
      return;
    }
    clearInterval(this.intervalIndex);

    this.index++;

    if (this.index > this.options.length - 1) {
      this.index = 0;
    }

    this.editValues(this.index);

    this.intervalIndex = setInterval(this.autoPlay.bind(this), 10000);
  }

  init() {
    this.intervalIndex = setInterval(this.autoPlay.bind(this), 10000);

    this.panelBtnLeft.addEventListener('click', this.moveLeft.bind(this));
    window.addEventListener('keydown', this.moveLeft.bind(this));
    this.panelBtnRight.addEventListener('click', this.moveRight.bind(this));
    window.addEventListener('keydown', this.moveRight.bind(this));
  }
}

const slider = new Slider(slideOptions);
