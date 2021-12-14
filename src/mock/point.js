import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

//const OFFER_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

//const POINT_OFFERS = ['Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train'];

const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva', 'Porto', 'Paris', 'Barcelona'];

const DESCRIPTION_DESTINATION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const PICTURE_DESCRIPTIONS = ['Lorem ipsum dolor sit amet', 'Consectetur adipisicing elit', 'Cumque dolores harum odio optio', 'Quia quod soluta sunt tempora temporibus velit', 'Consequatur earum error hic laudantium repellendus repudiandae tenetur voluptates.', 'Distinctio dolore incidunt nam officia possimus quos, sunt suscipit vel velit!'];

const generateRandomData = (list) => {
  const randomIndex = getRandomInteger(0, list.length - 1);
  return list[randomIndex];
};

const NUMBER_ELEMENTS = 5;

const getDescriptionDestination = () => {
  const descriptions = [];
  descriptions.push(DESCRIPTION_DESTINATION[length - 1]);
  for (let i = 0; i < DESCRIPTION_DESTINATION.length - 1; i ++) {
    const randomIndex = getRandomInteger(0, DESCRIPTION_DESTINATION.length - 1);
    const randomElement = DESCRIPTION_DESTINATION[randomIndex];
    descriptions.push(randomElement);
  }
  descriptions.splice(0, NUMBER_ELEMENTS);
  return descriptions;
};

const getDestination = () => ({
  name: generateRandomData(DESTINATIONS),
  pictures: [{
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: generateRandomData(PICTURE_DESCRIPTIONS),
  }, {
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: generateRandomData(PICTURE_DESCRIPTIONS),
  }],
  description: getDescriptionDestination(),
});

const offers = [{
  type: 'taxi',
  offers: [
    {
      id: 1,
      title: 'Upgrade to a business class',
      price: 120,
    }, {
      id: 2,
      title: 'Choose the radio station',
      price: 60,
    }
  ],
}, {
  type: 'flight',
  offers: [
    {
      id: 1,
      title: 'Add luggage',
      price: 20,
    }, {
      id: 2,
      title: 'Switch to comfort',
      price: 80,
    }
  ],
}, {
  type: 'train',
  offers: [
    {
      id: 1,
      title: 'Add meal',
      price: 20,
    },
  ],
}, {
  type: 'ship',
  offers: [
    {
      id: 1,
      title: 'luxury cabin',
      price: 120,
    }, {
      id: 2,
      title: 'breakfast in the cabin',
      price: 30,
    }
  ]
}, {
  type: 'sightseeing',
  offers: [
    {
      id: 1,
      title: 'guide',
      price: 20,
    },
  ],
}, {
  type: 'drive',
  offers: [
    {
      id: 1,
      title: 'business class',
      price: 40,
    },
  ],
}, {
  type: 'bus',
  offers: [
    {
      id: 1,
      title: 'guide',
      price: 20,
    },
  ],
}, {
  type: 'check-in',
  offers: [
    {
      id: 1,
      title: 'big room',
      price: 50,
    }, {
      id: 1,
      title: 'breakfast',
      price: 20,
    }
  ],
}, {
  type: 'restaurant',
  offers: [
    {
      id: 1,
      title: 'tips',
      price: 10,
    },
  ],
}];

const identifications = [0];

const getIdentification = () => {
  const indexElement = identifications.length - 1;
  const identification = identifications[indexElement];
  const newId = identification + 1;
  identifications.push(newId);
  return newId;
};

export const generatePoint = () => {
  const type = generateRandomData(POINT_TYPES);
  const offersThisPoint = offers.find((offer) => type === offer.type);
  return ({
    basePrice: getRandomInteger(10, 500),
    dateFrom: dayjs(),
    dateTo: dayjs().add(getRandomInteger(10, 150), 'minute'),
    destination: getDestination(),
    id: getIdentification(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: offersThisPoint,
    type: type,
  });
};
