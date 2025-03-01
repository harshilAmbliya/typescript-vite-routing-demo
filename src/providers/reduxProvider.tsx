import { persister, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

type ReduxProviderPropsType = {
  children: React.ReactNode;
};
export default function Providers({ children }: ReduxProviderPropsType) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {children}
      </PersistGate>
    </Provider>
  );
}
