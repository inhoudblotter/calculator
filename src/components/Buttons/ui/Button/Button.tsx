import { cn } from "../../../../utils/cn";
import styles from "./Button.module.css";
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  styleType?: "primary" | "secondary";
}

export function Button({ className, styleType, children, ...props }: IButton) {
  return (
    <button
      className={cn(
        styles.btn,
        className,
        styleType ? styles[styleType] : styles.primary
      )}
      {...props}
    >
      {children}
    </button>
  );
}
