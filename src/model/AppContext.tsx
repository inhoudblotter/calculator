import { createContext } from "react";

interface IAppState {
  value: string;
  changeValue: (symbols: string, type?: "replace" | "add") => void;
  result: string;
  error: string;
}

export const AppContext = createContext<IAppState>({
  value: "",
  changeValue: () => {},
  result: "",
  error: "",
});
