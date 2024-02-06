import { useEffect, useRef, useState } from "react";

interface ResizableContainerProps {
  minWidth: number;
  maxWidth: number;
  side: 'left' | 'right';
}

export const useResizableContainer = ({
  minWidth,
  maxWidth,
  side,
}: ResizableContainerProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const container = containerRef.current;
      const resizeHandle = resizeHandleRef.current;
  
      if (container && resizeHandle) {
        let newWidth: number;
  
        if (side === 'left') {
          newWidth = container.getBoundingClientRect().right - e.clientX;
          const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
  
          container.style.width = `${clampedWidth}px`;
        } else {
          newWidth = e.clientX - container.getBoundingClientRect().left;
          const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
  
          container.style.width = `${clampedWidth}px`;
        }
      }
    }
  };
  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);


  return {
    containerRef,
    resizeHandleRef,
    handleMouseDown,
  };
};
