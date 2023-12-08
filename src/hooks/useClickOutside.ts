import { MutableRefObject, useEffect } from 'react';

type OnClickOutsideProps = {
  ref: MutableRefObject<HTMLElement | null>,
  handler: () => void
};

export const useOnClickOutside = ({ref, handler}: OnClickOutsideProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
        handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
