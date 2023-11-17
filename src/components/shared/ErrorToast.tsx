import React, { useEffect, useState } from 'react';

type Props = {
    message: string;
}

const ErrorToast: React.FC<Props> = ({message}) => {
    const [show, setShow] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setShow(false);
        }, 3000);    
        return () => {
            clearTimeout(timer);
        };
    }, []);

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
        </div>
    );
};

export default ErrorToast;
