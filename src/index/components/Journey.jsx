import React from "react";
import switchImg from "../imgs/switch.svg";
import "./Journey.css";

function Journey(props) {
  const { from, to, exchangeFromTo, showCitySelector } = props;
  return (
      <div className="journey">
          <div className="journey-station">
              <input
          className="journey-input"
          type="text"
          readOnly
          name="from"
          id="from"
          value={from}
          onClick={() => showCitySelector(true)}
        />
          </div>
          <div className="journey-switch" onClick={exchangeFromTo}>
              <img src={switchImg} width="70" height="40" alt="switch" />
          </div>
          <div className="journey-station journey-to">
              <input
          className="journey-input"
          type="text"
          readOnly
          name="to"
          id="to"
          value={to}
          onClick={() => showCitySelector(true)}
        />
          </div>
      </div>
  );
}

export default Journey;
