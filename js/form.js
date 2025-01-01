import { sendData } from './api.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const closeButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.body;
const imgPreview = form.querySelector('.img-upload__preview img');
const effectsPreview = form.querySelectorAll('.effects__preview');

const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');
const effectSlider = form.querySelector('.effect-level__slider');
const effectLevel = form.querySelector('.effect-level__value');
const effectsList = form.querySelector('.effects__list');

const CLASS_HIDDEN = 'hidden';
const MODAL_OPEN_CLASS = 'modal-open';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Функция для обновления масштаба
const updateScale = (value) => {
  scaleControlValue.value = `${value}%`;
  imgPreview.style.transform = `scale(${value / 100})`;
};

// Инициализация noUiSlider
if (!effectSlider.noUiSlider) {
  noUiSlider.create(effectSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });
}

// Функция для применения эффекта
const applyEffect = (filter, value) => {
  switch (filter) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${value * 100}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${value * 3}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${1 + value * 2})`;
      break;
    default:
      imgPreview.style.filter = '';
      break;
  }
};

// Обработчик изменения фильтров
effectsList.addEventListener('change', (evt) => {
  const selectedEffect = evt.target.value;

  if (selectedEffect === 'none') {
    imgPreview.style.filter = '';
    effectSlider.classList.add(CLASS_HIDDEN);
  } else {
    effectSlider.classList.remove(CLASS_HIDDEN);
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
    });
    applyEffect(selectedEffect, 1);
  }
});

// Обновление значения эффекта
effectSlider.noUiSlider.on('update', (_, handle, unencoded) => {
  const value = unencoded[handle];
  effectLevel.value = value;
  const selectedEffect = form.querySelector('.effects__radio:checked').value;
  applyEffect(selectedEffect, value);
});

// Функция для открытия формы
const openForm = () => {
  overlay.classList.remove(CLASS_HIDDEN);
  body.classList.add(MODAL_OPEN_CLASS);
  updateScale(100); // Сбрасываем масштаб
  imgPreview.style.filter = ''; // Сбрасываем эффекты
};

// Функция для закрытия формы
const closeForm = () => {
  form.reset();
  uploadInput.value = '';
  document.body.classList.remove(MODAL_OPEN_CLASS);
  overlay.classList.add(CLASS_HIDDEN);
  imgPreview.src = 'img/upload-default-image.jpg';
};

// Функция для загрузки изображения
const loadFile = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgPreview.src = reader.result;

      // Применение загруженного изображения к эффектам
      effectsPreview.forEach((effect) => {
        effect.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
  }
};

// Обработчик уменьшения масштаба
scaleControlSmaller.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    updateScale(currentScale);
  }
});

// Обработчик увеличения масштаба
scaleControlBigger.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    updateScale(currentScale);
  }
});

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
  evt.preventDefault();

  const formData = new FormData(form);

  submitButton.disabled = true;

  sendData(formData)
    .then(() => {
      form.reset();
      closeForm();
      showSuccessMessage();
      submitButton.disabled = false;
    })
    .catch(() => {
      showErrorMessage();
      submitButton.disabled = false;
    });
});

// Обработчик изменения значения поля загрузки
uploadInput.addEventListener('change', () => {
  openForm();
  loadFile();
});

// Обработчик закрытия формы по кнопке
closeButton.addEventListener('click', closeForm);

// Обработчик закрытия формы по клавише Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !overlay.classList.contains(CLASS_HIDDEN)) {
    closeForm();
  }
});
