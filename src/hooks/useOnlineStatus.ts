
import { useEffect, useState } from 'react';

export const useOnlineStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);

  const handleOnlineStatus = () => {
    setOnline(navigator.onLine);
  };

  useEffect(() => {
    handleOnlineStatus();

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []); 

  return online;
};

export default useOnlineStatus;
