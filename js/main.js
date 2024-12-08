import { generatePhotos } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';

// Генерация данных
const photoArray = generatePhotos();

// Отрисовка миниатюр
renderThumbnails(photoArray);
