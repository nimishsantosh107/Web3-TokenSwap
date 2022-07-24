import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import App from "./App";
import reducers from "./reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))}>
            <App />
        </Provider>
    </React.StrictMode>
);
