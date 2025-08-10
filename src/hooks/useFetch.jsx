import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      // No need to get or pass Firebase token explicitly 
      // Just call the callback with options and other arguments
      const response = await cb(options, ...args);
      setData(response);
      setError(null);
    } catch (err) {
      console.error("Error in useFetch:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
