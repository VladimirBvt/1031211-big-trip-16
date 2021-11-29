import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { renderTemplate, RenderPosition } from './render.js';
import { createFilterTemplate } from './view/filter-view.js';

const siteTripMainElement = document.querySelector('.trip-main__trip-controls');
const siteTripControlsNavigation = siteTripMainElement.querySelector(
  '.trip-controls__navigation'
);

renderTemplate(siteTripControlsNavigation, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const siteTripControlFilters = siteTripMainElement.querySelector('.trip-controls__filters');

renderTemplate(siteTripControlFilters, createFilterTemplate(), RenderPosition.BEFOREEND);
