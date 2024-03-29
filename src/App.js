import Header from "./layout/Header";
import Left from "./layout/Left";
import Center from "./layout/Center";
import Right from "./layout/Right";
import styles from "./App.less";
import { useCanvas } from "./store/hooks";
import { CanvasContext } from "./Context";
import { useEffect, useReducer } from "react";

export default function App(props) {
  const canvas = useCanvas();
  // 强制更新
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = canvas.subscribe(() => {
      forceUpdate();
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className={styles.main}>
      <CanvasContext.Provider value={canvas}>
        <Header />
        <div className={styles.content}>
          <Left />
          <Center />
          <Right />
        </div>
      </CanvasContext.Provider>
    </div>
  );
}