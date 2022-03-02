import React, { useMemo } from "react";
import classnames from "classnames";
import moment from "moment";
import Header from "../Header/Header";
import "./DateSelector.css";

function Month(props) {
  const { timeStartOfMonth, onSelect, departDate } = props;
  const title = useMemo(() => {
    return moment(timeStartOfMonth).format("YYYY年MM月");
  }, [timeStartOfMonth]);

  const timeEndOfMonth = moment(timeStartOfMonth).endOf("month"); // 一月中最后一天
  const startWeekOfMonth = moment(timeStartOfMonth).isoWeek();
  const endWeekOfMonth = timeEndOfMonth.isoWeek();
  const singleWeekData = new Array(7).fill(1);

  const weekDataInThisMonth = useMemo(() => {
    const weekData = [];
    const startDayOfMonth = moment(timeStartOfMonth).isoWeekday();
    const endDayOfMonth = timeEndOfMonth.isoWeekday();
    for (let i = startWeekOfMonth; i <= endWeekOfMonth; i++) {
      const curData = singleWeekData.slice();
      if (i === startWeekOfMonth) {
        weekData.push(
          curData.map((day, index) => {
            if (index < startDayOfMonth - 1) {
              return 0;
            }
            return day;
          })
        );
      } else if (i === endWeekOfMonth) {
        weekData.push(
          curData.map((day, index) => {
            if (index > endDayOfMonth - 1) {
              return 0;
            }
            return day;
          })
        );
      } else {
        weekData.push(curData);
      }
    }
    let days = 0;
    return weekData.map(week => {
      return week.map(day => {
        const currentDay = day
          ? moment(timeStartOfMonth)
              .add(days, "days")
              .valueOf()
          : 0;
        days += day;
        return currentDay;
      });
    });
  }, [timeStartOfMonth]);

  return (
      <table className="date-table">
          <thead>
              <tr>
                  <td colSpan={7}>
                      <h5>{title}</h5>
                  </td>
              </tr>
          </thead>
          <tbody>
              <tr className="date-table-weeks">
                  <td>周一</td>
                  <td>周二</td>
                  <td>周三</td>
                  <td>周四</td>
                  <td>周五</td>
                  <td className="weekend">周六</td>
                  <td className="weekend">周日</td>
              </tr>
              {weekDataInThisMonth.map((week, index) => {
          return (
              <WeekItem
              week={week}
              key={`week${index}`}
              onSelect={onSelect}
              departDate={departDate}
            />
          );
        })}
          </tbody>
      </table>
  );
}

function WeekItem(props) {
  const { week, onSelect, departDate } = props;

  return (
      <tr className="date-table-days">
          {week.map((day, idx) => {
        return (
            <DayItem
            day={day}
            key={idx}
            onSelect={onSelect}
            departDate={departDate}
          />
        );
      })}
      </tr>
  );
}

function DayItem(props) {
  const { day, onSelect, departDate } = props;
  if (!day) {
    return <td className="null"></td>;
  }
  const classes = [];

  const now = moment()
    .startOf("day")
    .valueOf();

  if (day < now) {
    classes.push("disabled");
  }

  if (day === departDate) {
    classes.push("selected");
  }

  if ([6, 7].includes(moment(day).isoWeekday())) {
    classes.push("weekend");
  }
  const currentDay = useMemo(() => {
    return day === now ? "今天" : moment(day).date();
  }, [now, day]);

  return (
      <td className={classnames(classes)} onClick={() => onSelect(day)}>
          {currentDay}
      </td>
  );
}

export default function DateSelector(props) {
  const { visible, onBack, onSelect, departDate } = props;
  const mouthQueue = [];
  mouthQueue.push(
    moment()
      .startOf("month")
      .valueOf()
  );
  mouthQueue.push(
    moment()
      .startOf("month")
      .add(1, "months")
      .valueOf()
  );
  mouthQueue.push(
    moment()
      .startOf("month")
      .add(2, "months")
      .valueOf()
  );
  return (
      <div className={classnames("date-selector", { hidden: !visible })}>
          <Header title="日期选择" onBack={onBack} />
          <div className="date-selector-tables">
              {mouthQueue.map(item => {
          return (
              <Month
              key={item}
              timeStartOfMonth={item}
              onSelect={onSelect}
              departDate={departDate}
            />
          );
        })}
          </div>
      </div>
  );
}
