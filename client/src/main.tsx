import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";


import App from "./App.tsx";
import ProviderUi from "./provider.tsx";

import "@/styles/globals.css";
import { store } from "@/store";

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
