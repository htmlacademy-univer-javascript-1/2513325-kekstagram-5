const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

// Функция для создания комментария
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

// Функция для заполнения данных в полноразмерное окно
const fillBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  // Очистка предыдущих комментариев
  socialComments.innerHTML = '';

  // Добавление новых комментариев
  const commentsFragment = document.createDocumentFragment();
  photo.comments.forEach((comment) => {
    commentsFragment.appendChild(createCommentElement(comment));
  });
  socialComments.appendChild(commentsFragment);

  // Скрытие блоков
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

// Функция для открытия окна
const openBigPicture = (photo) => {
  fillBigPicture(photo);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open'); // Блокировка прокрутки фона

  // Обработчики событий
  closeButton.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onKeyDown);
};

// Функция для закрытия окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open'); // Разблокировка прокрутки фона

  // Удаление обработчиков событий
  closeButton.removeEventListener('click', onCloseBigPicture);
  document.removeEventListener('keydown', onKeyDown);
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
