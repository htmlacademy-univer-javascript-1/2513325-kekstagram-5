// Генерация случайного целого числа
export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Получение случайного элемента из массива
export const getRandomArrayElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

// Дебаунс
export const debounce = (callback, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), delay);
  };
};
