import { SupportedKeys } from "interfaces/supported-keys";
import { MouseEventHandler, useCallback, useEffect } from "react";

type KeyHandler = (event: KeyboardEvent | MouseEventHandler) => void;

export const useKeyPress = (targetKey: SupportedKeys, handler: KeyHandler) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey || event.code === targetKey) {
        if (
          event.code === "Space" &&
          !(event.target instanceof HTMLInputElement) &&
          !(event.target instanceof HTMLTextAreaElement)
        ) {
          handler(event);
        }
        if (event.code !== "Space") handler(event);
      }
    },
    [targetKey, handler]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};
