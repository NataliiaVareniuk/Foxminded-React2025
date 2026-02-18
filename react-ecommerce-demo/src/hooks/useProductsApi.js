import { useCallback, useState } from "react"
import apiRoutes from "@/api/apiRoutes"

import axios from "axios"

const useProductsApi = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null) 

    const fetchProduct = useCallback (async () =>{
        setLoading(true)
        setError(null)
        try{
            const res = await axios.get(apiRoutes.getAllProducts)
            setData(res.data.products)

        }catch(error){
            setError(error)
        }
        finally{
            setLoading(false)
        }

    }, [])
    

   return {
        data,
        loading,
        error,
        fetchProduct,
   }
}
export default useProductsApi