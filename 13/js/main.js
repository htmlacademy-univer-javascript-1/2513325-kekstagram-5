import { renderThumbnails } from './render-thumbnails.js';
import { fetchData } from './api.js';
import './form.js';

// Загрузка данных с сервера и отрисовка миниатюр
fetchData()
  .then((data) => {
    renderThumbnails(data); // Используем данные с сервера
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Не удалось загрузить данные:', error);
    // Обработка ошибки (например, показать сообщение пользователю)
  });
