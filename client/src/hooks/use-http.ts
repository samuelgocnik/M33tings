import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (response.ok) {
        const data = await response.json();
        applyData(data);
      } else {
        const data = await response.json();
        const errorMessage =
          data && data.error && data.error.message
            ? data.error.message
            : 'Authentication failed!';
        throw new Error(errorMessage);
      }
    } catch (_err) {
      setError('Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
