import { sendData } from './api.js';


const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const closeButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.body;

const CLASS_HIDDEN = 'hidden'; // Класс для скрытия формы
const MODAL_OPEN_CLASS = 'modal-open'; // Класс для блокировки прокрутки

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

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

// Функция для успешного сообщения
const showSuccessMessage = () => {
  const successElement = successTemplate.cloneNode(true);
  document.body.appendChild(successElement);

  successElement.querySelector('.success__button').addEventListener('click', () => {
    successElement.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successElement.remove();
    }
  });
};

// Функция для сообщения об ошибке
const showErrorMessage = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  errorElement.querySelector('.error__button').addEventListener('click', () => {
    errorElement.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      errorElement.remove();
    }
  });
};

// Обработчик отправки формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Останавливаем стандартное поведение формы

  const formData = new FormData(form);

  // Блокируем кнопку на время отправки
  submitButton.disabled = true;

  sendData(formData)
    .then(() => {
      form.reset(); // Сбрасываем форму
      closeForm(); // Закрываем форму
      showSuccessMessage(); // Показываем сообщение об успехе
      submitButton.disabled = false;
    })
    .catch(() => {
      showErrorMessage(); // Показываем сообщение об ошибке
      submitButton.disabled = false;
    });
});

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
