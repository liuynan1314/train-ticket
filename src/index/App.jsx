import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDataSelector,
  hideDataSelector
} from "./actions";
import DepartDate from "./components/DepartDate.jsx";
import HighSpeed from "./components/HighSpeed.jsx";
import Journey from "./components/Journey.jsx";
import Header from "../components/Header/Header.jsx";
import CitySelector from "../components/CitySelector/CitySelector";
import DateSelector from "../components/DateSelector/DateSelector";
import "./App.css";

const App = props => {
  const {
    from,
    to,
    cityData,
    fetchCityData,
    exchangeFromTo,
    showCitySelector,
    isCitySelectorVisible,
    hideCitySelector,
    isLoadingCityData,
    setSelectedCity,
    departDate,
    isDateSelectorVisible,
    showDataSelector,
    hideDataSelector
  } = props;
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const cbs = useMemo(() => {
    return {
      exchangeFromTo,
      showCitySelector
    };
  }, []);

  const departDateCbs = useMemo(() => {
    return {
      showDataSelector
    };
  }, []);

  const citySelectorCbs = useMemo(() => {
    return {
      onBack: hideCitySelector,
      fetchCityData,
      onSelect: setSelectedCity
    };
  }, []);

  const dateSelectorCbs = useMemo(() => {
    return {
      onBack: hideDataSelector
    };
  }, []);

  return (
      <div>
          <div className="header-wrapper">
              <Header onBack={onBack} title="火车票" />
          </div>
          <form className="form">
              <Journey from={from} to={to} {...cbs} />
              <DepartDate time={departDate} {...departDateCbs} />
              <HighSpeed />
          </form>
          <CitySelector
        isLoading={isLoadingCityData}
        cityData={cityData}
        visible={isCitySelectorVisible}
        {...citySelectorCbs}
      />
          <DateSelector visible={isDateSelectorVisible} {...dateSelectorCbs} />
      </div>
  );
};

export default connect(
  ({
    from,
    to,
    isCitySelectorVisible,
    isLoadingCityData,
    cityData,
    departDate,
    isDateSelectorVisible
  }) => {
    return {
      from,
      to,
      isCitySelectorVisible,
      isLoadingCityData,
      cityData,
      departDate,
      isDateSelectorVisible
    };
  },
  dispatch => {
    return {
      exchangeFromTo: (...args) => dispatch(exchangeFromTo(...args)),
      showCitySelector: (...args) => dispatch(showCitySelector(...args)),
      hideCitySelector: () => dispatch(hideCitySelector()),
      fetchCityData: () => dispatch(fetchCityData()),
      setSelectedCity: selectedCity => dispatch(setSelectedCity(selectedCity)),
      showDataSelector: () => dispatch(showDataSelector()),
      hideDataSelector: () => dispatch(hideDataSelector())
    };
  }
)(App);
