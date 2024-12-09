

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input'); // Поле загрузки файла
const overlay = form.querySelector('.img-upload__overlay'); // Форма редактирования
const closeButton = form.querySelector('.img-upload__cancel'); // Кнопка закрытия формы
const previewImage = overlay.querySelector('.img-upload__preview img'); // Изображение для предварительного просмотра
const effectPreviews = overlay.querySelectorAll('.effects__preview'); // Превью эффектов
const scaleControlSmaller = form.querySelector('.scale__control--smaller'); // Кнопка уменьшения масштаба
const scaleControlBigger = form.querySelector('.scale__control--bigger'); // Кнопка увеличения масштаба
const scaleControlValue = form.querySelector('.scale__control--value'); // Поле масштаба
const body = document.body;


const CLASS_HIDDEN = 'hidden'; // Класс для скрытия формы
const MODAL_OPEN_CLASS = 'modal-open'; // Класс для блокировки прокрутки
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

let currentScale = 100; // Масштаб по умолчанию

// Функция для обновления масштаба
const updateScale = (newScale) => {
  currentScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE); // Ограничиваем значение
  scaleControlValue.value = `${currentScale}%`; // Обновляем значение в поле
  previewImage.style.transform = `scale(${currentScale / 100})`; // Применяем масштаб к изображению
};

// Функции для уменьшения и увеличения масштаба
const decreaseScale = () => updateScale(currentScale - SCALE_STEP);
const increaseScale = () => updateScale(currentScale + SCALE_STEP);

// Функция для отображения загруженного изображения
const displayUploadedFile = () => {
  const file = uploadInput.files[0]; // Получаем файл
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    previewImage.src = reader.result; // Заменяем изображение в блоке предварительного просмотра
    effectPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${reader.result})`; // Заменяем изображения в превью эффектов
    });
  };
  reader.readAsDataURL(file); // Читаем файл как DataURL
};

// Функция для открытия формы редактирования
const openForm = () => {
  overlay.classList.remove(CLASS_HIDDEN); // Показываем форму
  body.classList.add(MODAL_OPEN_CLASS); // Блокируем прокрутку
  displayUploadedFile(); // Отображаем загруженное изображение
  updateScale(100); // Сбрасываем масштаб на 100%
};

// Функция для закрытия формы редактирования
const closeForm = () => {
  overlay.classList.add(CLASS_HIDDEN); // Скрываем форму
  body.classList.remove(MODAL_OPEN_CLASS); // Разрешаем прокрутку
  form.reset(); // Сбрасываем данные формы
  previewImage.src = 'img/upload-default-image.jpg'; // Возвращаем изображение по умолчанию
  effectPreviews.forEach((effectPreview) => {
    effectPreview.style.backgroundImage = ''; // Убираем превью эффектов
  });
};

// Обработчик изменения значения поля загрузки
uploadInput.addEventListener('change', openForm);

// Обработчики кликов на кнопках уменьшения и увеличения масштаба
scaleControlSmaller.addEventListener('click', decreaseScale);
scaleControlBigger.addEventListener('click', increaseScale);

// Обработчик закрытия формы по кнопке
closeButton.addEventListener('click', closeForm);

// Обработчик закрытия формы по клавише Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !overlay.classList.contains(CLASS_HIDDEN)) {
    closeForm();
  }
});


