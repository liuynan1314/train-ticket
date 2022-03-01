import React, { useMemo } from "react";
import Dayjs from "dayjs";
import "./DepartDate.css";

function startOfDay(timestamp = Date.now()) {
  const target = new Date(timestamp);
  target.setHours(0);
  target.setMinutes(0);
  target.setSeconds(0);
  target.setMilliseconds(0);
  return target;
}

export default function DepartDate(props) {
  const { time, showDataSelector } = props;
  const startOfDepartDate = startOfDay(time);
  const departDateFormat = useMemo(() => {
    return Dayjs(startOfDepartDate).format("YYYY-MM-DD");
  }, [startOfDepartDate]);
  const isToday = useMemo(() => {
    return startOfDepartDate.valueOf() === startOfDay().valueOf();
  }, [startOfDepartDate]);

  const weekDate = useMemo(() => {
    return `周${
      ["日", "一", "二", "三", "四", "五", "六"][startOfDepartDate.getDay()]
    }${isToday ? "(今天)" : ""}`;
  }, [startOfDepartDate]);

  return (
      <div className="depart-date" onClick={showDataSelector}>
          <input type="hidden" value={departDateFormat} />
          <div>
              {departDateFormat}
              <span className="depart-week">{weekDate}</span>
          </div>
      </div>
  );
}
