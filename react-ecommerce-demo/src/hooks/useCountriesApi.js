import { useEffect, useState,useCallback } from "react";
import apiCountry from "@/api/apiCountry";
import axios from "axios";


function useCountriesApi() {
 const API_KEY = import.meta.env.VITE_API_KEY;
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchCountries = useCallback(async () =>  {
    setLoading(true);
    try {
      const res = await axios.get(apiCountry.getCountries, {
        headers: { "X-CSCAPI-KEY": API_KEY },
      });

      setCountries(res.data);
      setError(null);
      
    } catch (err) {
      setError(err.message || "Error fetching countries");
    } finally {
      setLoading(false);
    }
  },[API_KEY]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return { countries, loading, error, fetchCountries };
}
export default useCountriesApi;
