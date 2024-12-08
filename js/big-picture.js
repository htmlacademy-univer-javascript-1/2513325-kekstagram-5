const COMMENTS_STEP = 5; // Количество комментариев для показа за раз

// Элементы полноразмерного просмотра
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

let currentComments = [];
let currentShownCount = 0;

// Функция для создания элемента комментария
const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = avatar;
  imgElement.alt = name;
  imgElement.width = 35;
  imgElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.appendChild(imgElement);
  commentElement.appendChild(textElement);

  return commentElement;
};

// Функция для показа части комментариев
const showComments = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = currentComments.slice(
    currentShownCount,
    currentShownCount + COMMENTS_STEP
  );

  nextComments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  socialComments.appendChild(fragment);
  currentShownCount += nextComments.length;

  // Обновление счётчика отображённых комментариев
  commentCountBlock.innerHTML = `${currentShownCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  // Скрытие кнопки, если все комментарии показаны
  if (currentShownCount >= currentComments.length) {
    commentsLoaderButton.classList.add('hidden');
  }
};

// Функция для заполнения данных в полноразмерное окно
const fillBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  // Очистка предыдущих комментариев
  socialComments.innerHTML = '';
  currentComments = photo.comments;
  currentShownCount = 0;

  // Показ комментариев по шагам
  showComments();

  // Сброс видимости кнопки загрузки комментариев
  if (currentComments.length > COMMENTS_STEP) {
    commentsLoaderButton.classList.remove('hidden');
  } else {
    commentsLoaderButton.classList.add('hidden');
  }

  // Показываем блок счётчика комментариев
  commentCountBlock.classList.remove('hidden');
};

// Функция для открытия окна
const openBigPicture = (photo) => {
  fillBigPicture(photo);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Обработчики событий
  closeButton.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onKeyDown);
  commentsLoaderButton.addEventListener('click', showComments); // Загрузка дополнительных комментариев
};

// Функция для закрытия окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаление обработчиков событий
  closeButton.removeEventListener('click', onCloseBigPicture);
  document.removeEventListener('keydown', onKeyDown);
  commentsLoaderButton.removeEventListener('click', showComments);
};

// Обработчик клавиши Esc
const onKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

// Обработчик кнопки закрытия
const onCloseBigPicture = () => {
  closeBigPicture();
};

// Экспорт функции открытия окна
export { openBigPicture };
