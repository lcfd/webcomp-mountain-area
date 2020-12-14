import {
  BASE_PATH_TOURISM_EVENT,
  BASE_PATH_TOURISM_EVENTTOPICS,
  BASE_PATH_TOURISM_EVENTTYPES,
  BASE_PATH_TOURISM_EVENT_REDUCED,
} from "./config";

const createUrlFilters = (filters, currentLocation) => {
  let dateFromFilter = "";
  if (filters.dateFrom.length) {
    dateFromFilter = `&begindate=${filters.dateFrom}`;
  }
  let dateToFilter = "";
  if (filters.dateTo.length) {
    dateToFilter = `&enddate=${filters.dateTo}`;
  }
  let topicFilter = "";
  if (filters.topic !== "") {
    topicFilter = `&topicfilter=${filters.topic}`;
  }
  let radius = "";
  if (filters.radius && filters.radius !== "0") {
    radius = `&latitude=${currentLocation.lat}&longitude=${
      currentLocation.lng
    }&radius=${parseInt(filters.radius) * 1000}`;
  }
  return `${dateFromFilter}${dateToFilter}${topicFilter}${radius}`;
};

export const requestTourismMountainArea = async (filters, currentLocation) => {
  try {
    const request = await fetch(
      `${BASE_PATH_TOURISM_EVENT_REDUCED}?active=true&odhactive=true&fields=Id,Latitude,Longitude${createUrlFilters(
        filters,
        currentLocation
      )}`
    );
    if (request.status !== 200) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const requestTourismMountainAreaPaginated = async (
  filters,
  currentLocation,
  pageNumber,
  language
) => {
  try {
    const request = await fetch(
      `${BASE_PATH_TOURISM_EVENT}?active=true&odhactive=true&language=${language}&fields=Id,Detail,CategoryCodes,LocationInfo&pagenumber=${pageNumber}&pagesize=10${createUrlFilters(
        filters,
        currentLocation
      )}`
    );
    if (request.status !== 200) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const requestTourismMountainAreaCodes = async () => {
  try {
    const request = await fetch(`${BASE_PATH_TOURISM_EVENTTOPICS}`);
    if (request.status !== 200) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const requestTourismEventDetails = async ({ Id }) => {
  try {
    const request = await fetch(`${BASE_PATH_TOURISM_EVENT}/${Id}`);
    if (request.status !== 200) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
