import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { ConfirmProvider } from "material-ui-confirm";
import { PersistGate } from "redux-persist/integration/react";

import theme from "./theme/Theme.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfirmProvider>
            <App />
          </ConfirmProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
