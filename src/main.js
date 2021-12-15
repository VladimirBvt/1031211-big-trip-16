import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { renderTemplate, RenderPosition } from './render.js';
import { createFilterTemplate } from './view/filter-view.js';
import { createSortingTemplate } from './view/sorting-view.js';
import { createFormOfCreation } from './view/form-of-creation-view.js';
import { createEditForm } from './view/edit-form-view.js';
import { createTripPoint } from './view/trip-point-view.js';
import {generatePoint} from './mock/point.js';
import { createOffer } from './view/offer-view.js';


const POINT_COUNT = 15;

const points = Array.from({length: POINT_COUNT}, generatePoint);

const siteTripMainElement = document.querySelector('.trip-main__trip-controls');
const siteTripControlsNavigation = siteTripMainElement.querySelector(
  '.trip-controls__navigation'
);

renderTemplate(siteTripControlsNavigation, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const siteTripControlFilters = siteTripMainElement.querySelector('.trip-controls__filters');

renderTemplate(siteTripControlFilters, createFilterTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.page-body__page-main');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

renderTemplate(siteTripEventsElement, createSortingTemplate(), RenderPosition.BEFOREEND);

renderTemplate(siteTripEventsElement, createFormOfCreation(), RenderPosition.BEFOREEND);

const siteEventList = document.createElement('ul');
siteEventList.classList.add('trip-events__list');
siteTripEventsElement.append(siteEventList);


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


