import React, { useState, useMemo, useEffect } from "react";
import "./CitySelector.css";
import classnames from "classnames";

export default function CitySelector(props) {
  const { visible, onBack, isLoading, cityData, fetchCityData } = props;
  const [searchKey, setSearchKey] = useState("");
  const key = useMemo(() => searchKey.trim(), [searchKey]);
  useEffect(() => {
    if (isLoading || cityData || !visible) {
      return;
    }
    fetchCityData();
  }, [isLoading, cityData, visible]);
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
      </div>
  );
}
