import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(
        () => {
          const timout = setTimeout(() => {
            setDebouncedValue(value);
          }, delay);
              return () => {
            clearTimeout(timout);
          };
        },
        [value, delay] 
      );
      return debouncedValue;
    }

