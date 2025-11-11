import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import ProviderUi from "./provider.tsx";
import "@/styles/globals.css";

import { store } from "@/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ProviderUi>
          <App />
        </ProviderUi>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
