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
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
};

// Функция для отправки данных
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
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
};

export { fetchData, sendData };
