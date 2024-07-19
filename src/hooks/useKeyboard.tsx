import { RefObject, useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../model/AppContext";
import { prepare } from "../utils/calculate/prepare";

export function useKeyboard(refDisable?: RefObject<HTMLElement>) {
  const { value, changeValue } = useContext(AppContext);
  const [action, setAction] = useState<string | null>(null);
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target === refDisable?.current) return;
      if (["Backspace"].includes(e.key) || prepare(e.key)) {
        const repeater = setInterval(() => {
          setAction(e.key);
        }, 300);
        window.addEventListener(
          "keyup",
          () => {
            clearInterval(repeater);
          },
          { once: true }
        );
      }
    },
    [setAction, refDisable]
  );
  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (["Enter", "Escape"].includes(e.key)) {
        setAction(e.key);
      }
      if (e.target === refDisable?.current) return;
      if (["=", "Backspace"].includes(e.key) || prepare(e.key)) {
        setAction(e.key);
      } else if ((e.ctrlKey || e.metaKey) && e.code === "86") {
        setAction("paste");
      }
    },
    [setAction, refDisable]
  );
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);
  useEffect(() => {
    if (action) {
      if (["Enter", "="].includes(action)) {
        changeValue("=", "add");
      } else if (action === "Backspace" && value.length) {
        changeValue(value.slice(0, value.length - 1));
      } else if (action === "Escape") {
        changeValue("");
      } else if (action === "paste") {
        navigator.clipboard.readText().then((text) => changeValue(text, "add"));
      } else if (prepare(action)) {
        changeValue(prepare(action), "add");
      }
      setAction(null);
    }
  }, [action, changeValue, value, setAction]);
}
