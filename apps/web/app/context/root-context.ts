import { createContext, useContext } from "react";

export const RootContext = createContext({
  backendUrl: "",
  stripePublishApiKey: "",
});

export const useRootContext = () => useContext(RootContext);
