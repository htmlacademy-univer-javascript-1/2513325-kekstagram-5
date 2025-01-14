

const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram'; // Замените на актуальный адрес сервера

// Функция для загрузки данных
const fetchData = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/data`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert('Не удалось загрузить данные. Попробуйте позже.');
    throw error; // Логируется только в случае сетевой ошибки
  }
};

const sendData = async (data) => {
  try {
    const response = await fetch(`${SERVER_URL}`, {
      method: 'POST',
      body: data,
    });
    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert('Ошибка отправки формы. Попробуйте позже.');
    throw error; // Логируется только сетевое исключение
  }
};

export { fetchData, sendData };
