const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const closeButton = form.querySelector('.img-upload__cancel');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.body;

const CLASS_HIDDEN = 'hidden'; // Класс для скрытия формы
const MODAL_OPEN_CLASS = 'modal-open'; // Класс для блокировки прокрутки

// Функция для открытия формы
const openForm = () => {
  overlay.classList.remove(CLASS_HIDDEN); // Показываем форму
  body.classList.add(MODAL_OPEN_CLASS); // Блокируем прокрутку
};

// Функция для закрытия формы
const closeForm = () => {
  form.reset(); // Сбрасываем значения всех полей формы
  uploadInput.value = ''; // Сбрасываем значение поля загрузки
  document.body.classList.remove(MODAL_OPEN_CLASS); // Разрешаем прокрутку
  overlay.classList.add(CLASS_HIDDEN); // Скрываем форму
};

// Обработчик изменения значения поля загрузки
uploadInput.addEventListener('change', openForm);

// Обработчик закрытия формы по кнопке
closeButton.addEventListener('click', closeForm);

// Обработчик закрытия формы по клавише Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !overlay.classList.contains(CLASS_HIDDEN)) {
    closeForm();
  }
});
