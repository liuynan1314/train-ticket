import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData
} from "./actions";
import DepartDate from "./components/DepartDate.jsx";
import HighSpeed from "./components/HighSpeed.jsx";
import Journey from "./components/Journey.jsx";
import Header from "../components/Header/Header.jsx";
import CitySelector from "../components/CitySelector/CitySelector";
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
    isLoadingCityData
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

  const citySelectorCbs = useMemo(() => {
    return {
      onBack: hideCitySelector,
      fetchCityData
    };
  }, []);

  return (
      <div>
          <div className="header-wrapper">
              <Header onBack={onBack} title="火车票" />
          </div>
          <form className="form">
              <Journey from={from} to={to} {...cbs} />
              <DepartDate />
              <HighSpeed />
          </form>
          <CitySelector
        isLoading={isLoadingCityData}
        cityData={cityData}
        visible={isCitySelectorVisible}
        {...citySelectorCbs}
      />
      </div>
  );
};

export default connect(
  ({ from, to, isCitySelectorVisible, isLoadingCityData, cityData }) => {
    return {
      from,
      to,
      isCitySelectorVisible,
      isLoadingCityData,
      cityData
    };
  },
  dispatch => {
    return {
      exchangeFromTo: (...args) => dispatch(exchangeFromTo(...args)),
      showCitySelector: (...args) => dispatch(showCitySelector(...args)),
      hideCitySelector: () => dispatch(hideCitySelector()),
      fetchCityData: () => dispatch(fetchCityData())
    };
  }
)(App);
