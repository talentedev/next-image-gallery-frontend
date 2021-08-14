import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import getConfig from "next/config";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const { publicRuntimeConfig } = getConfig();

// setup your middlewares here
const middleware = [thunk];

if (
  publicRuntimeConfig.NODE_ENV === "production" &&
  typeof window !== "undefined"
) {
  // redux logger, available on browser console
  const { createLogger } = require("redux-logger");
  const loggerMiddleware = createLogger({});
  Middlewares = applyMiddleware(loggerMiddleware);
}

export function initializeStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
