import { combineReducers } from "redux";

// available reducers
import ConfigReducer from "./modules/posts/reducer";

export default combineReducers({
  Gallery: ConfigReducer,
});
