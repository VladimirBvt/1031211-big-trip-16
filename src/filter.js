import dayjs from 'dayjs';
import {points} from './main';

const isPointFuture = (point) => point.dateFrom >= dayjs();
const isPointPast = (point) => point.dateTo < dayjs();

export const pointsToFilter = {
  future: () => points.filter(() => isPointFuture),
  past: () => points.filter(() => isPointPast),
};
