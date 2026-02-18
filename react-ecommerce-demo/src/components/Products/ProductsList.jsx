import ProductItem from "@/components/Products/ProductItem";
import style from "./Products.module.scss";

function ProductsList({ productsList }) {
  if (!productsList || productsList.length === 0) {
    return <h2>No products</h2>;
  }

  return (
    <div className={style.productsContainer}>
      <ul className={style.productList}>
        {productsList.map((prod) => (
          <li key={prod.id}>
            <ProductItem product={prod} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
