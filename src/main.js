import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { renderTemplate, RenderPosition } from './render.js';

const siteTripMainElement = document.querySelector('.trip-main__trip-controls');
const siteTripControlsNavigation = siteTripMainElement.querySelector(
  '.trip-controls__navigation'
);

renderTemplate(siteTripControlsNavigation, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
