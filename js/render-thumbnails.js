import { openBigPicture } from './big-picture.js';

function renderThumbnails(photos) {
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');


  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = template.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    // Добавляем обработчик клика для открытия полноразмерного изображения
    photoElement.addEventListener('click', () => openBigPicture(photo));

    fragment.appendChild(photoElement);
  });

  picturesContainer.appendChild(fragment);
}

export { renderThumbnails };
