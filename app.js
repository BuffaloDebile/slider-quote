const slides = [...document.querySelectorAll('.slide')];

const sliderData = {
  direction: 0,
  slideOutIndex: 0,
  slidesInIndex: 0,
};

const directionButtons = [...document.querySelectorAll('.direction-btn')];

directionButtons.forEach((btn) => {
  btn.addEventListener('click', handleClick);
});

function handleClick(e) {
  getDirection(e.target);
  slideOut();
}

function getDirection(btn) {
  sliderData.direction = btn.className.includes('right') ? 1 : -1;

  sliderData.slideOutIndex = slides.findIndex((slide) =>
    slide.classList.contains('active'),
  );

  if (sliderData.slideOutIndex + sliderData.direction > slides.length - 1) {
    sliderData.slidesInIndex = 0;
  } else if (sliderData.slideOutIndex + sliderData.direction < 0) {
    sliderData.slidesInIndex = slides.length - 1;
  } else {
    sliderData.slidesInIndex = sliderData.slideOutIndex + sliderData.direction;
  }
}

function slideOut() {
  slideAnimation({
    el: slides[sliderData.slidesInIndex],
    props: {
      display: 'flex',
      tranform: `translateX(${sliderData.direction < 0 ? '100%' : '-100%'})`,
      opacity: 0,
    },
  });

  slideAnimation({
    el: slides[sliderData.slideOutIndex],
    props: {
      transition:
        'transform 0.4s cubic-bezier(0.74, -0.34, 1, 1.19), opacity 0.4s ease-out',
      transform: `translateX(${sliderData.direction < 0 ? '-100%' : '100%'})`,
      opacity: 0,
    },
  });

  slides[sliderData.slideOutIndex].addEventListener('transitionend', slideIn);
}

function slideAnimation(animationObject) {
  for (const prop in animationObject.props) {
    animationObject.el.style[prop] = animationObject.props[prop];
  }
}
