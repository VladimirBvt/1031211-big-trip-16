import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { renderTemplate, RenderPosition } from './render.js';
import { createFilterTemplate } from './view/filter-view.js';
import { createSortingTemplate } from './view/sorting-view.js';
import { createFormOfCreation } from './view/form-of-creation-view.js';
import { createEditForm } from './view/edit-form-view.js';
import { createTripPoint } from './view/trip-point-view.js';
import './mock/point';

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

const siteTripEventsList = document.querySelector('.trip-events__list');

renderTemplate(siteTripEventsList, createEditForm(), RenderPosition.AFTERBEGIN);

const COUNT = 3;

for (let i = 0; i < COUNT; i ++) {
  renderTemplate(siteTripEventsList, createTripPoint(), RenderPosition.BEFOREEND);
}
