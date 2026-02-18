import ProductsList from "@/components/Products/ProductsList";
import { useContext } from "react";
import { ProductContext } from "@/context/ProductsContext";

function ProductsPage() {
  const productsList = useContext(ProductContext);
  return (
    <div>
      <ProductsList productsList={productsList} />
    </div>
  );
}

export default ProductsPage;
