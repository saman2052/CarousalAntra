// CONST
const DOM_SELECTOR = {
  CAROUSEL_VIEWPORT: '#movie-carousel .carousel__viewport',
  CAROUSEL_BTN_WRAPPER: '#movie-carousel .carousel__btn-wrapper',
};

const movies = [];

// APIs
function fetchMovieData() {
  return fetch('http://localhost:3000/movies').then((res) => res.json());
}

// FUNCTIONS
function render(element, data) {
  element.replaceChildren(...data);
}

function generateMovieNode(movieData) {
  const { id, imgUrl, name, outlineInfo } = movieData;

  const listNode = document.createElement('li');
  const imgNode = document.createElement('img');
  const titleNode = document.createElement('h3');
  const infoNode = document.createElement('p');

  listNode.classList.add('carousel__list-item');
  listNode.id = `movie-${id}`;

  imgNode.classList.add('carousel__img');
  imgNode.src = imgUrl;

  titleNode.classList.add('page-heading-3');
  titleNode.innerHTML = `Movie: ${name}`;

  infoNode.classList.add('page-small-italic');
  infoNode.innerHTML = `Info: ${outlineInfo}`;

  listNode.append(imgNode, titleNode, infoNode);

  return listNode;
}

function generateMovieCarousel(movieList) {
  for (let i = 0; i < movieList.length; i++) {
    const movieNode = generateMovieNode(movieList[i]);
    movies.push(movieNode);
  }

  return movies;
}

function renderMovieCarousel(movieList) {
  const element = document.querySelector(DOM_SELECTOR.CAROUSEL_VIEWPORT);

  const moviesRendered = generateMovieCarousel(movieList).slice(0, 4);
  const data = moviesRendered;

  render(element, data);
}

function slideCarouselNext() {
  let temp = movies.shift();
  movies.push(temp);

  const element = document.querySelector(DOM_SELECTOR.CAROUSEL_VIEWPORT);
  const data = movies.slice(0, 4);

  render(element, data);
  renderCarouselBtn();
}

function slideCarouselPrev() {
  let temp = movies.pop();
  movies.unshift(temp);

  const element = document.querySelector(DOM_SELECTOR.CAROUSEL_VIEWPORT);
  const data = movies.slice(0, 4);

  render(element, data);
  renderCarouselBtn();
}

function generateCarouselBtn(btnRole) {
  const btnNode = document.createElement('button');

  btnNode.classList.add('carousel__btn');

  if (btnRole === 'prev') {
    btnNode.classList.add('carousel__btn__prev');
    btnNode.innerHTML = '&lt;';
    btnNode.addEventListener('click', slideCarouselPrev);
  } else if (btnRole === 'next') {
    btnNode.classList.add('carousel__btn__next');
    btnNode.innerHTML = '&gt;';
    btnNode.addEventListener('click', slideCarouselNext);
  }

  return btnNode;
}

function renderCarouselBtn() {
  const prevBtn = generateCarouselBtn('prev');
  const nextBtn = generateCarouselBtn('next');

  if (movies[0].id === 'movie-1') {
    prevBtn.classList.add('carousel__btn-disable');
  }
  if (movies[3].id === `movie-${movies.length}`) {
    nextBtn.classList.add('carousel__btn-disable');
  }

  const element = document.querySelector(DOM_SELECTOR.CAROUSEL_BTN_WRAPPER);
  const data = [prevBtn, nextBtn];

  render(element, data);
}

// INIT
function init() {
  fetchMovieData()
    .then((json) => renderMovieCarousel(json))
    .then(() => renderCarouselBtn());
}

init();
