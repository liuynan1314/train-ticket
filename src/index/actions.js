export const ACTION_SET_FROM = "SET_FROM";
export const ACTION_SET_TO = "SET_TO";
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE =
  "SET_IS_CITY_SELECTOR_VISIBLE";
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY =
  "SET_CURRENT_SELECTING_LEFT_CITY";
export const ACTION_SET_CITY_DATA = "SET_CITY_DATA";
export const ACTION_SET_IS_LOADING_CITY_DATA = "SET_IS_LOADING_CITY_DATA";
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE =
  "SET_IS_DATE_SELECTOR_VISIBLE";
export const ACTION_SET_HIGH_SPEED = "SET_HIGH_SPEED";
export const ACTION_SET_DEPART_DATE = "SET_DEPART_DATE";

export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    payload: from
  };
}

export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    payload: to
  };
}

export function setCityData(data) {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: data
  };
}

export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed
    });
  };
}

export function showCitySelector(currentSelectingLeftCity) {
  return dispatch => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    });
    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity
    });
  };
}

export function hideCitySelector() {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false
  };
}

export function setSelectedCity(selectedCity) {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState();
    if (currentSelectingLeftCity) {
      dispatch({
        type: ACTION_SET_FROM,
        payload: selectedCity
      });
    } else {
      dispatch({
        type: ACTION_SET_TO,
        payload: selectedCity
      });
    }
    dispatch(hideCitySelector());
  };
}

export function exchangeFromTo() {
  return (dispatch, getState) => {
    const { from, to } = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
}

export function showDataSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true
  };
}

export function hideDataSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false
  };
}
export function setIsLoadingCityData(param) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: param
  };
}

export function fetchCityData() {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState();
    if (isLoadingCityData) {
      return;
    }
    dispatch(setIsLoadingCityData(true));
    fetch("/rest/cities?_" + Date.now())
      .then(res => res.json())
      .then(cityData => {
        dispatch(setCityData(cityData));
        dispatch(setIsLoadingCityData(false));
      })
      .catch(() => {
        dispatch(setIsLoadingCityData(false));
      });
  };
}

export function setDepartDate(date) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: date
  };
}
