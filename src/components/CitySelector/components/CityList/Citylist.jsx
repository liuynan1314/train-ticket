import React, { memo } from "react";
import "./CityList.css";

const CityItem = memo(function CityItem(props) {
  const { name, onSelect } = props;
  return (
      <div className="city-li" onClick={() => onSelect(name)}>
          {name}
      </div>
  );
});

const CitySection = memo(function CitySection(props) {
  const { citys, title, onSelect } = props;
  return (
      <ul className="city-ul" data-cache={title}>
          <li className="city-li">{title}</li>
          {citys.map(city => {
        return (
            <CityItem key={city.name} name={city.name} onSelect={onSelect} />
        );
      })}
      </ul>
  );
});

const AlphaIndex = memo(function AlphaIndex(props) {
  const { clickToAlpha, alpha } = props;
  return (
      <i className="city-index-item" onClick={() => clickToAlpha(alpha)}>
          {alpha}
      </i>
  );
});

function CityList(props) {
  const { sections = [], onSelect, AlphaBate, clickToAlpha } = props;
  return (
      <div className="city-list">
          <div className="city-cate">
              {sections.map(({ citys = [], title }, index) => {
          return (
              <CitySection
              citys={citys}
              title={title}
              onSelect={onSelect}
              key={index}
            />
          );
        })}
          </div>
          <div className="city-index">
              {AlphaBate.map(char => {
          return (
              <AlphaIndex key={char} clickToAlpha={clickToAlpha} alpha={char} />
          );
        })}
          </div>
      </div>
  );
}

export default memo(CityList);
