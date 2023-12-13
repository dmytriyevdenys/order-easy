import { useState, useEffect, MutableRefObject } from 'react';

type ElementPositionProps = {
  targetRef: MutableRefObject<HTMLDivElement | null>;
};

export const useElementPosition = ({ targetRef }: ElementPositionProps) => {
  const [position, setPosition] = useState('above');

  useEffect(() => {
    const updatePosition = () => {
      if (targetRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementMidPoint = targetRect.top + targetRect.height / 2;

        if (elementMidPoint < windowHeight / 2) {
          setPosition('above');
        } else {
          setPosition('below');
        }
      }
    };

    window.addEventListener('resize', updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [targetRef]);

  return position;
};
