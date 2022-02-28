import React, { useState, useMemo, useEffect } from "react";
import CityList from "./components/CityList/CityList";
import Suggest from "./components/Suggest/Suggest";
import "./CitySelector.css";
import classnames from "classnames";
import { useCallback } from "react";

export default function CitySelector(props) {
  const {
    visible,
    onBack,
    isLoading,
    cityData,
    fetchCityData,
    onSelect
  } = props;
  const [searchKey, setSearchKey] = useState("");
  const key = useMemo(() => searchKey.trim(), [searchKey]);
  useEffect(() => {
    if (isLoading || cityData || !visible) {
      return () => setSearchKey("");
    }
    fetchCityData();
    return () => setSearchKey("");
  }, [isLoading, cityData, visible]);

  const AlphaBate = useCallback(() => {
    return Array.from(new Array(26), (_, index) =>
      String.fromCharCode(65 + index)
    );
  }, []);

  const outputCitySections = useCallback(() => {
    if (isLoading) {
      return <div>loading</div>;
    }

    if (cityData) {
      return (
          <CityList
          sections={cityData.cityList}
          onSelect={onSelect}
          AlphaBate={AlphaBate()}
          clickToAlpha={toAlpha}
        />
      );
    }
    return null;
  }, [isLoading]);

  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-cache=${alpha}]`).scrollIntoView(true);
  }, []);
  return (
      <div className={classnames("city-selector", { hidden: !visible })}>
          <div className="city-search">
              <div className="search-back" onClick={onBack}>
                  <svg width="42" height="42">
                      <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
                  </svg>
              </div>
              <div className="search-input-wrapper">
                  <input
            className="search-input"
            type="text"
            name="city"
            id="city"
            placeholder="城市、车站的中文或拼音"
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
          />
                  <i
            onClick={() => setSearchKey("")}
            className={classnames("search-clean", {
              hidden: key.length === 0
            })}
          >
            &#xf063;
                  </i>
              </div>
          </div>
          {outputCitySections()}
          {key && <Suggest searchKey={key} onSelect={key => onSelect(key)} />}
      </div>
  );
}
