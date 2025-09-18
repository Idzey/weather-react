import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import type { ReactNode } from "react";
import { persistor, store } from "../store/store";

function AppProviders(props: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
}

export { AppProviders };
