import { sendData } from './api.js';

const MAX_HASHTAGS = 5;
const CLASS_HIDDEN = 'hidden';
const MODAL_OPEN_CLASS = 'modal-open';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

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
  // Получаем текущий выбранный эффект
  const selectedEffect = form.querySelector('.effects__radio:checked').value;

  // Если выбран "Оригинал", скрываем слайдер
  if (selectedEffect === 'none') {
    effectSlider.classList.add(CLASS_HIDDEN);
  } else {
    // В противном случае, показываем слайдер
    effectSlider.classList.remove(CLASS_HIDDEN);
  }
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

// Добавление вызова loadFile
uploadInput.addEventListener('change', () => {
  openForm();
  loadFile(); // Функция теперь вызывается
});

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
  // Проверка, есть ли уже сообщение об успехе
  const existingSuccessMessage = document.querySelector('.success');
  if (existingSuccessMessage) {
    return; // Если сообщение уже есть, ничего не делаем
  }

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

  // Обработчик нажатия клавиши Esc
  function onEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault(); // Отменяем стандартное поведение (например, закрытие других модальных окон)
      closeError(); // Закрываем сообщение об ошибке
    }
  }

  // Функция для закрытия сообщения
  function closeError() {
    errorElement.remove();
    document.removeEventListener('keydown', onEscPress); // Убираем обработчик Esc
  }

  // Добавляем обработчик на клавишу Esc
  document.addEventListener('keydown', onEscPress);

  // Добавляем обработчик для закрытия через кнопку
  errorElement.querySelector('.error__button').addEventListener('click', closeError);
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

// Обработчик Esc
const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape' && !overlay.classList.contains(CLASS_HIDDEN)) {
    evt.preventDefault();
    closeForm();
  }
};

const addDocumentListeners = () => {
  document.addEventListener('keydown', onEscKeyDown);
};

const removeDocumentListeners = () => {
  document.removeEventListener('keydown', onEscKeyDown);
};

// Добавление события для загрузки файла
uploadInput.addEventListener('change', () => {
  openForm();
  addDocumentListeners();
});

//  закрытия формы
closeButton.addEventListener('click', () => {
  closeForm();
  removeDocumentListeners();
});


// Инициализация Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error',
});

// Валидация: один хэш-тег
const validateHashtag = (value) => {
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return hashtags.every((tag) => hashtagRegex.test(tag));
};

// Валидация: количество хэш-тегов
const validateHashtagCount = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return hashtags.length <= MAX_HASHTAGS;
};

// Валидация: уникальность хэш-тегов
const validateHashtagUnique = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

// Добавление валидаторов
pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtag,
  'Каждый хэш-тег должен начинаться с # и содержать только буквы и цифры, длиной до 20 символов.'
);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtagCount,
  `Максимум ${MAX_HASHTAGS} хэш-тегов.`
);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtagUnique,
  'Хэш-теги не должны повторяться.'
);

// Блокировка кнопки отправки при ошибках
form.addEventListener('input', () => {
  submitButton.disabled = !pristine.validate();
});

// Обработчик отправки формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    submitButton.disabled = true;
    const formData = new FormData(form);
    sendData(formData)
      .then(() => {
        closeForm();
        showSuccessMessage();
      })
      .catch(showErrorMessage)
      .finally(() => {
        submitButton.disabled = false;
      });
  }
});
