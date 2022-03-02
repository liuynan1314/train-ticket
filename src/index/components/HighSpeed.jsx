import React from "react";
import classnames from "classnames";
import "./HighSpeed.css";

export default function HighSpeed(props) {
  const { highSpeed, toggleSwitch } = props;
  return (
      <div className="high-speed">
          <div className="high-speed-label">只看高铁/动车</div>
          <div className="high-speed-switch">
              <input type="hidden" name="highSpeed" value={highSpeed} />
              <div
          className={classnames("high-speed-track", {
            checked: highSpeed
          })}
          onClick={toggleSwitch}
        >
                  <span
            className={classnames("high-speed-handle", {
              checked: highSpeed
            })}
          ></span>
              </div>
          </div>
      </div>
  );
}
