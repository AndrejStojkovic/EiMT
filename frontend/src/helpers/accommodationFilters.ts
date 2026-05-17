import type { AccommodationFilterDto } from '../types/accommodation';

const isPositiveInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value > 0;

export const normalizeAccommodationFilter = (filter: AccommodationFilterDto = {}): AccommodationFilterDto => {
  const normalized: AccommodationFilterDto = {};

  if (typeof filter.category === 'number') {
    normalized.category = filter.category;
  }
  if (isPositiveInteger(filter.hostId)) {
    normalized.hostId = filter.hostId;
  }
  if (isPositiveInteger(filter.hostCountryId)) {
    normalized.hostCountryId = filter.hostCountryId;
  }
  if (isPositiveInteger(filter.numRooms)) {
    normalized.numRooms = filter.numRooms;
  }
  if (typeof filter.available === 'boolean') {
    normalized.available = filter.available;
  }

  return normalized;
};

export const hasAccommodationFilters = (filter: AccommodationFilterDto = {}): boolean =>
  Object.keys(normalizeAccommodationFilter(filter)).length > 0;

export const areAccommodationFiltersEqual = (
  first: AccommodationFilterDto = {},
  second: AccommodationFilterDto = {},
): boolean => {
  const normalizedFirst = normalizeAccommodationFilter(first);
  const normalizedSecond = normalizeAccommodationFilter(second);

  return (
    normalizedFirst.category === normalizedSecond.category &&
    normalizedFirst.hostId === normalizedSecond.hostId &&
    normalizedFirst.hostCountryId === normalizedSecond.hostCountryId &&
    normalizedFirst.numRooms === normalizedSecond.numRooms &&
    normalizedFirst.available === normalizedSecond.available
  );
};
