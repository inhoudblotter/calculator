import { ReactNode, useCallback, useState } from "react";
import { AppContext } from "./AppContext";
import { prepare } from "../utils/calculate/prepare";
import { calculate } from "../utils/calculate/calculate";

interface IAppProvider {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const changeValue = useCallback(
    (symbols: string, type?: "replace" | "add") => {
      if (error) setError("");
      if (result) {
        setResult("");
        type = "replace";
      }
      if (symbols.length && symbols[symbols.length - 1] === "=") {
        try {
          symbols = symbols.slice(0, symbols.length - 1);
          setResult(
            calculate(
              prepare(type === "add" ? value + symbols : symbols)
            ).toString()
          );
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else throw error;
        }
      }
      setValue(prepare(type === "add" ? value + symbols : symbols));
    },
    [value, setValue, error, result, setResult]
  );
  return (
    <AppContext.Provider
      value={{
        value,
        changeValue,
        result,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
