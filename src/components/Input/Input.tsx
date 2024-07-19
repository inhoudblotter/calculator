import { useContext, useRef } from "react";
import { cn } from "../../utils/cn";
import styles from "./Input.module.css";
import { AppContext } from "../../model/AppContext";
import { useKeyboard } from "../../hooks/useKeyboard";

interface IInput extends React.HTMLAttributes<HTMLTextAreaElement> {}

export function Input({ className, ...props }: IInput) {
  const { value, changeValue } = useContext(AppContext);
  const ref = useRef<HTMLTextAreaElement>(null);
  useKeyboard(ref);
  return (
    <textarea
      className={cn(styles.input, className)}
      rows={3}
      value={value}
      onChange={(e) => {
        console.log(e.target.value);
        changeValue(e.target.value);
      }}
      ref={ref}
      {...props}
    />
  );
}
