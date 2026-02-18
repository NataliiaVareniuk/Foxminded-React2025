import { ProductContext } from "@/context/ProductsContext"
import { useEffect } from "react";
import useProductsApi from "@/hooks/useProductsApi";

function ProductProvider({children}) {

 const { data: productsList, fetchProduct } = useProductsApi();

  useEffect(() => {
    fetchProduct();
   
   }, []);

   return (
    <ProductContext.Provider value={productsList}>
      {children}
    </ProductContext.Provider>
   );

    
}
export default ProductProvider