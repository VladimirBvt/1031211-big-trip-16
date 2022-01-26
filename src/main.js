//import { createSiteMenuTemplate } from './view/site-menu-view.js';
import SiteMenuView from './view/site-menu-view.js';
import { renderTemplate, RenderPosition, renderElement } from './render.js';
//import FilterView, { createFilterTemplate } from './view/filter-view.js';
import { createSortingTemplate } from './view/sorting-view.js';
import { createFormOfCreation } from './view/form-of-creation-view.js';
import { createEditForm } from './view/edit-form-view.js';
import { createTripPoint } from './view/trip-point-view.js';
import { generatePoint } from './mock/point.js';
import { createOffer } from './view/offer-view.js';
import { generateNewPoint } from './mock/point.js';
//WIP
//import { pointsToFilter } from './filter.js';
import FilterView from './view/filter-view.js';
import ListEventsView from './view/list-events-view.js';


const POINT_COUNT = 15;

const points = Array.from({length: POINT_COUNT}, generatePoint);

const siteTripMainElement = document.querySelector('.trip-main__trip-controls');
const siteTripControlsNavigation = siteTripMainElement.querySelector(
  '.trip-controls__navigation'
);

renderElement(siteTripControlsNavigation, new SiteMenuView().element, RenderPosition.BEFOREEND);
//renderTemplate(siteTripControlsNavigation, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const siteTripControlFilters = siteTripMainElement.querySelector('.trip-controls__filters');

renderElement(siteTripControlFilters, new FilterView().element, RenderPosition.BEFOREEND);
//Wip
//renderTemplate(siteTripControlFilters, createFilterTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.page-body__page-main');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

renderTemplate(siteTripEventsElement, createSortingTemplate(), RenderPosition.BEFOREEND);

renderTemplate(siteTripEventsElement, createFormOfCreation(), RenderPosition.BEFOREEND);

renderElement(siteTripEventsElement, new ListEventsView().element, RenderPosition.BEFOREEND);
const siteEventList = document.querySelector('.trip-events__list');
//siteEventList.classList.add('trip-events__list');
//siteTripEventsElement.append(siteEventList);


for (let i = 0; i < points.length; i ++) {
  renderTemplate(siteEventList, createTripPoint(points[i]), RenderPosition.BEFOREEND);
}

// кнопка открытия формы редактирования точки
const buttonOpenEditForm = document.querySelectorAll('.event__rollup-btn');

for (const button of buttonOpenEditForm) {
  button.addEventListener('click', (evt) => {
    const parentElement = evt.target.parentNode;
    const grandParentElement = parentElement.parentNode;
    const dataIdElement = grandParentElement.dataset.id;
    const thisPoint = points.find((point) => point.id === + dataIdElement);

    renderTemplate(grandParentElement, createEditForm(thisPoint), RenderPosition.AFTERBEGIN);

    const offerContainer = grandParentElement.querySelector('.event__available-offers');

    for (const offer of thisPoint.offers.offers) {
      renderTemplate(offerContainer, createOffer(offer), RenderPosition.BEFOREEND);
    }

    const editForm = grandParentElement.querySelector('.event--edit');
    const buttonClose = editForm.querySelector('.event__rollup-btn');

    buttonClose.addEventListener('click', () => {
      editForm.remove();
    });

    const buttonDelete = editForm.querySelector('.event__reset-btn');

    buttonDelete.addEventListener('click', () => {
      editForm.remove();
    });
  });
}

//скрывание формы добавления новой точки маршрута
const newEventForm = document.querySelector('.new_event');

newEventForm.classList.add('visually-hidden');

// кнопка добавления новой точки маршрута
const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');

buttonNewEvent.addEventListener('click', () => {
  newEventForm.classList.toggle('visually-hidden');
  buttonNewEvent.style.pointerEvents = 'none';

  const newPoint = generateNewPoint();
  newPoint.id = points.length;
  points.push(newPoint);
  //console.log(points);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    if (!newEventForm.classList.contains('visually-hidden')) {
      newEventForm.reset();
      newEventForm.classList.add('visually-hidden');
      buttonNewEvent.style.pointerEvents = 'auto';
    }
  }
});

// кнопка сброса формы новой точки и её закрытия
const buttonCancelNewEventForm = newEventForm.querySelector('.event__reset-btn');

buttonCancelNewEventForm.addEventListener('click', () => {
  newEventForm.classList.add('visually-hidden');
  buttonNewEvent.style.pointerEvents = 'auto';
});

// кнопка Save формы создания новой точки маршрута
/*const buttonSaveNewEventForm = newEventForm.querySelector('.event__save-btn');

buttonSaveNewEventForm.addEventListener('click', () => {

});*/

// кнопка Избранное
const favoriteButtons = document.querySelectorAll('.event__favorite-btn');

for (const button of favoriteButtons) {
  button.addEventListener('click', (evt) => {
    button.classList.toggle('event__favorite-btn--active');
    for (const point of points) {
      const idDataElement = evt.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
      if (button.classList.contains('event__favorite-btn--active')) {
        if (point.id === +idDataElement) {
          point.isFavorite = true;
        }
      } else if (point.id === +idDataElement) {
        point.isFavorite = false;
      }
    }
  });
}
/* В работе:
// фильтрация точек по кнопке FUTURE
const buttonFuturePoints = document.querySelector('#filter-future'); // input

buttonFuturePoints.addEventListener('click',() => {
  pointsToFilter.future();
});

// фильтрация точек по кнопке PAST
const buttonPastPoints = document.querySelector('#filter-past'); // input

buttonPastPoints.addEventListener('click',() => {
  pointsToFilter.past();
});

// фильтрация точек по кнопке everything
const buttonEverythingPoints = document.querySelector('#filter-everything'); // input

buttonEverythingPoints.addEventListener('click',() => points);
*/
export { points };
