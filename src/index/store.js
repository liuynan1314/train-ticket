import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

export default createStore(
  combineReducers(reducers),
  {
    from: "北京", // 始发站
    to: "上海", // 终到站
    isCitySelectorVisible: false, // 是否展示城市选择浮层
    currentSelectingLeftCity: false, // 当前选择始发站(true)/终到站(false)城市
    cityData: null, // 城市数据
    isLoadingCityData: false, // 是否正在载入城市数据
    isDateSelectorVisible: false, // 是否展示日期选择浮层
    highSpeed: false // 是否只显示高铁
  },
  applyMiddleware(thunk)
);
