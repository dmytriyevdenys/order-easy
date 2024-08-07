import { useCallback, useState } from "react";

type Position = {
    top: number;
    left: number;
  };
export const useCalculatePosition = (ref: React.RefObject<HTMLDivElement>, position: Position) => {
    const [positionState, setPositionState] = useState<Position>({ top: 0, left: 0 });
    const calculatePosition = useCallback(() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          setPositionState({
            top: rect.bottom + window.scrollY + position.top,
            left: rect.left + window.scrollX - position.left,
          });
        }
      }, [ref, position.top, position.left]);
    
      return { positionState, calculatePosition };
}