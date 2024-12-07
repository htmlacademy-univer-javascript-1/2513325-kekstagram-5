// Функция для генерации случайного целого числа
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция для получения случайного элемента из массива
export const getRandomArrayElement = (arr) => arr[getRandomInt(0, arr.length - 1)];
