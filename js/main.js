import { renderThumbnails } from './render-thumbnails.js';
import { generatePhotos } from './data.js';

import './form.js';



// Генерация данных
const photoArray = generatePhotos();

// Отрисовка миниатюр
renderThumbnails(photoArray);
