import { createContext, useContext } from "react";

export const RootContext = createContext({
  backendUrl: "",
  backendApiKey: "",
  stripePublishApiKey: "",
});

export const useRootContext = () => useContext(RootContext);
