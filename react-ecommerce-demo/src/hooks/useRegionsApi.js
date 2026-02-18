import { useState } from "react";
import apiCountry from "@/api/apiCountry"
import axios from "axios";

function useRegionsApi() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

    const fetchRegions = async (countryCode) => {
      if (!countryCode) return; 
        setLoading(true);
    setError(null);
      
      try {
        const res = await axios.get(apiCountry.getStates(countryCode), {
          headers: { "X-CSCAPI-KEY": API_KEY },
        });
       setRegions(
        res.data.map((s) => ({
          label: s.name,
          value: s.iso2,
        }))
      );
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error fetching states");
      setRegions([]);
      } finally {
        setLoading(false);
      }
    };
   


  return { regions, loading, error, fetchRegions };
}
export default useRegionsApi;