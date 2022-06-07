import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import { store } from "./reducers";
import { Persistor } from "./reducers";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
