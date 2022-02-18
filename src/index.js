import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './services/axiosImages';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');

let page = 1;
let inputValue = '';

const getImages = async (e) => {
   e.preventDefault();
   inputValue = input.value.trim();

   if (!inputValue) {
      hideLoadBtn();
      clearData();
      return;
   }

   page = 1;
   hideLoadBtn();
   clearData();

   try {
      const res = await fetchImages(inputValue, page); 
        if (res.hits.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
        }
      renderImg(res.hits);
       Notify.success(`Hooray! We found ${res.totalHits} images.`);
       if (res.hits.length < 40) {
      return;
    }
      loadBtn();
   } catch (error) {
    Notify.failure('Sorry, something went wrong. Please try again.');
   }
}

const renderImg = (arr) => {
   const markup = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, dowloads }) => {
      return `<div class="photo-card">
 <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300"/>
</a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${dowloads}
    </p>
  </div>
</div>`
   })
      .join('');
   gallery.insertAdjacentHTML('beforeend', markup);
}

const loadImages = async () => {
   page += 1;
   btn.disabled = true;

  try {
     const res = await fetchImages(inputValue, page); 
         renderImg(res.hits);
       if (res.hits.length < 40) {
          hideLoadMoreBtn();
        Notify.info("We're sorry, but you've reached the end of search results.");
      return;
    }
      loadBtn();
   } catch (error) {
   Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
   }
}

const clearData = () => {
   gallery.innerHTML = '';
}
const loadBtn = ()=> {
  btn.classList.remove('is-hidden');
  btn.disabled = false;
}
const hideLoadBtn = () => {
  btn.disabled = true;
   btn.classList.add('is-hidden');
}

form.addEventListener('submit', getImages);
btn.addEventListener('click', loadImages);