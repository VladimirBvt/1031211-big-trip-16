// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const POINT_OFFERS = ['Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train'];

const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva', 'Porto', 'Paris', 'Barcelona'];

const generateRandomData = (list) => {
  const randomIndex = getRandomInteger(0, list.length - 1);
  return list[randomIndex];
};

export const generatePoint = {
  basePrice: 1100,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: generateRandomData(DESTINATIONS),
  id: 0,
  isFavorite: false,
  offers: generateRandomData(POINT_OFFERS),
  type: generateRandomData(POINT_TYPES),
};
