import { Buttons } from "./components/Buttons/Buttons";
import { Input } from "./components/Input";
import { ResultField } from "./components/ResultField";
import { AppProvider } from "./model/AppProvider";
import styles from "./App.module.css";

function App() {
  return (
    <AppProvider>
      <main className={styles.main}>
        <div className={styles.shadow}>
          <div className={styles.container}>
            <Input className={styles.input} />
            <ResultField className={styles.result} />
            <div className={styles.sep} />
            <Buttons className={styles.buttons} />
          </div>
        </div>
      </main>
    </AppProvider>
  );
}

export default App;
