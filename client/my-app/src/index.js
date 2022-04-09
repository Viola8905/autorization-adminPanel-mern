import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import { store } from "./reducers";
import { Provider } from "react-redux";
import { Persistor } from "./reducers";
import { PersistGate } from "redux-persist/integration/react";

console.log()

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

