import { useContext } from "react";
import { cn } from "../../utils/cn";
import { AppContext } from "../../model/AppContext";
import styles from "./ResultField.module.css";
interface IResultField extends React.HTMLAttributes<HTMLSpanElement> {}

export function ResultField({ className, ...props }: IResultField) {
  const { result, error } = useContext(AppContext);
  return (
    <span
      className={cn(styles.container, className, error && styles.error)}
      {...props}
    >
      {error || result}
    </span>
  );
}
