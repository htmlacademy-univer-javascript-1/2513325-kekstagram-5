import { renderThumbnails } from './render-thumbnails.js';
import { fetchData } from './api.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');

// Функции для фильтров
const filterDefault = (photos) => photos;
const filterRandom = (photos) => {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
};
const filterDiscussed = (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = (photos, filterFunction) => {
  renderThumbnails(filterFunction(photos));
};

fetchData()
  .then((photos) => {
    renderThumbnails(photos);

    // Показываем блок фильтров
    imgFilters.classList.remove('img-filters--inactive');

    let currentFilter = filterDefault;

    // Добавляем обработчики фильтров
    filterButtons.forEach((button) => {
      button.addEventListener(
        'click',
        debounce((evt) => {
          // Меняем активную кнопку
          filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
          evt.target.classList.add('img-filters__button--active');

          // Применяем соответствующий фильтр
          if (evt.target.id === 'filter-default') {
            currentFilter = filterDefault;
          } else if (evt.target.id === 'filter-random') {
            currentFilter = filterRandom;
          } else if (evt.target.id === 'filter-discussed') {
            currentFilter = filterDiscussed;
          }

          // Применяем фильтр
          applyFilter(photos, currentFilter);
        }, RERENDER_DELAY)
      );
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Ошибка загрузки данных:', error);
  });

fetchData()
  .then(renderThumbnails)
  .catch(() => {
    const errorElement = document.createElement('div');
    errorElement.textContent = 'Ошибка загрузки изображений!';
    errorElement.className = 'error-message';
    document.body.appendChild(errorElement);
  });
