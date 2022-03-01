import React from "react";
import classnames from "classnames";
import Header from "../Header/Header";
import "./DateSelector.css";

export default function DateSelector(props) {
  const { visible, onBack } = props;
  return (
      <div className={classnames("date-selector", { hidden: !visible })}>
          <Header title="日期选择" onBack={onBack} />
      </div>
  );
}
