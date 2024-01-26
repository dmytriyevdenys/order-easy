import React, { useEffect, useState, useRef } from 'react';
import errorSound from "../../assets/audio/error.mp3";

type Props = {
    message: string;
}

export const ErrorToast: React.FC<Props> = ({ message }) => {
    const [show, setShow] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
       audioRef.current.play();
        }
    }, [audioRef]);

    return (
        <div
            style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                backgroundColor: 'red',
                color: 'white',
                padding: '15px',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                opacity: show ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                zIndex: 999,
            }}
        >
            {message}
            <audio ref={audioRef}>
                <source src={errorSound} type="audio/mp3"  />
            </audio>
        </div>
    );
};

