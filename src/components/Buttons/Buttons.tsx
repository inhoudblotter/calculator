import { useContext } from "react";
import { cn } from "../../utils/cn";
import styles from "./Buttons.module.css";
import { Button } from "./ui/Button/Button";
import { AppContext } from "../../model/AppContext";

interface IButtons extends React.HTMLAttributes<HTMLDivElement> {}

export function Buttons({ className, ...props }: IButtons) {
  const { changeValue } = useContext(AppContext);
  return (
    <div className={cn(styles.container, className)} {...props}>
      <Button onClick={() => changeValue("")}>C</Button>
      {[
        "√",
        "%",
        "/",
        "7",
        "8",
        "9",
        "×",
        "4",
        "5",
        "6",
        "-",
        "1",
        "2",
        "3",
        "+",
        "00",
        "0",
        ",",
      ].map((s) => (
        <Button key={s} onClick={() => changeValue(s, "add")}>
          {s}
        </Button>
      ))}
      <Button styleType="secondary" onClick={() => changeValue("=", "add")}>
        =
      </Button>
    </div>
  );
}
