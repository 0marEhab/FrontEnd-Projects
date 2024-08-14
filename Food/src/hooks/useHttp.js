import { useState, useCallback, useEffect } from "react";

async function urlFetch(url, config) {
  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export default function useHttp(url, config, initVal = "") {
  const [data, setData] = useState(initVal);
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest() {
      isLoading(true);
      try {
        const meals = await urlFetch(url, config);
        setData(meals);
      } catch (error) {
        setError(error);
      }
      isLoading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if (config.method === "GET") {
      sendRequest();
    }
    
  }, [sendRequest, config]);

  return { data, loading, error, sendRequest };
}
