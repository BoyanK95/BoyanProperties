import { useState, useCallback } from 'react';

// Custom hook for fetching data
const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const jsonData = await res.json();
      setIsLoading(false);
      if (jsonData.success === false) {
        setHasError(true);
      } else {
        setData(jsonData);
        setHasError(false);
      }
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  }, [url]);

  return { data, isLoading, hasError, fetchData };
};

export default useFetchData;
