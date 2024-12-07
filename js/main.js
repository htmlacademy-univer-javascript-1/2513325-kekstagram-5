// Функция для генерации случайного целого числа
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция для получения случайного элемента из массива
const getRandomArrayElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

// Функция для генерации списка комментариев
const generateComments = () => {
  const comments = [];
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  const names = ['Артём', 'Ольга', 'Иван', 'Мария', 'Сергей', 'Елена', 'Алексей', 'Татьяна', 'Дмитрий', 'Анна'];

  const commentCount = getRandomInt(0, 30);

  for (let i = 0; i < commentCount; i++) {
    const id = getRandomInt(1, 1000);
    const avatar = `img/avatar-${getRandomInt(1, 6)}.svg`;
    const message =
      getRandomInt(0, 1)
        ? getRandomArrayElement(messages)
        : `${getRandomArrayElement(messages)} ${getRandomArrayElement(messages)}`;
    const name = getRandomArrayElement(names);

    comments.push({ id, avatar, message, name });
  }

  return comments;
};

// Функция для генерации массива фотографий
const generatePhotos = () => {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    const id = i;
    const url = `photos/${i}.jpg`;
    const description = `Описание фотографии №${i}`;
    const likes = getRandomInt(15, 200);
    const comments = generateComments();

    photos.push({ id, url, description, likes, comments });
  }

  return photos;
};

// Создаем массив фотографий (не используем console.log)
const photoArray = generatePhotos();
