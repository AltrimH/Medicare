import { useEffect, useState } from "react";

import axios from "axios";
import { headers } from "../config";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(url, headers);
        
        if(response.status !== 200){
          setError(response.statusText)
        }

        setData(response.data)
        setLoading(false)
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    getData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
