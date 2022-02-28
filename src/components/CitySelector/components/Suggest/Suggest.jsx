import React, { memo, useState, useEffect, useMemo } from "react";
import "./Suggest.css";

const SuggestItem = memo(function SuggestItem(props) {
  const { name, onSelect } = props;
  return (
      <div className="city-suggest-li" onClick={() => onSelect(name)}>
          {name}
      </div>
  );
});

export default function Suggest(props) {
  const { searchKey, onSelect } = props;
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch("/rest/search?key=" + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { searchKey: sKey, result: res } = data;
        if (sKey === searchKey) {
          setResult(res);
        }
      })
      .catch(() => {});
  }, [searchKey]);

  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [{ key: searchKey, display: searchKey }];
    } else {
      return result;
    }
  }, [result, searchKey]);

  return (
      <div className="city-suggest">
          <ul className="city-suggest-ul">
              {fallBackResult.map(({ key, display }) => {
          return <SuggestItem key={key} name={display} onSelect={onSelect} />;
        })}
          </ul>
      </div>
  );
}
