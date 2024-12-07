//Функция для генерации случайного целого числа в заданном диапазоне [min, max]
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Функция для получения случайного элемента из массива
function getRandomArrayElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

// Функция для генерации списка случайных комментариев
function generateComments() {
  const comments = [];
  // Набор возможных сообщений для комментариев
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  // Набор имён для авторов комментариев
  const names = ['Роберт', 'Ольга', 'Ефим', 'Мария', 'Сергей', 'Анна', 'Алексей', 'Максим', 'Дмитрий', 'Кирилл'];

  // Определяем случайное количество комментариев для каждой фотографии
  const commentCount = getRandomInt(0, 30);

  for (let i = 0; i < commentCount; i++) {
    // Генерируем уникальный идентификатор комментария
    const id = getRandomInt(1, 1000);
    // Формируем путь к случайной аватарке
    const avatar = `img/avatar-${getRandomInt(1, 6)}.svg`;
    // Генерируем одно или два случайных сообщения
    const message = getRandomInt(0, 1) ?
      getRandomArrayElement(messages) :
      `${getRandomArrayElement(messages)} ${getRandomArrayElement(messages)}`;
    // Выбираем случайное имя автора
    const name = getRandomArrayElement(names);

    // Добавляем комментарий в массив
    comments.push({ id, avatar, message, name });
  }

  return comments;
}

// Функция для генерации массива с описанием фотографий
function generatePhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    // Уникальный идентификатор фотографии
    const id = i;
    // Формируем URL для фотографии
    const url = `photos/${i}.jpg`;
    // Генерируем описание фотографии
    const description = `Описание фотографии №${i}`;
    // Генерируем случайное количество лайков
    const likes = getRandomInt(15, 200);
    // Генерируем список случайных комментариев для фотографии
    const comments = generateComments();

    // Формируем объект с данными фотографии
    photos.push({ id, url, description, likes, comments });
  }

  return photos;
}

// Генерируем массив фотографий и выводим его в консоль
const photos = generatePhotos();
console.log(photos);
