import style from "./OrderReview.module.scss";

function OrderItem({ product }) {
  return (
    <div className={style.cardItem}>
      <img
        className={style.image}
        src={product.image || product.thumbnail || (product.images && product.images[0])}
        alt={product.description || product.title || "product"}
        loading="lazy"
      />
      <div className={style.cardInfo}>
        <p className={style.cardDescription}>{product.description}</p>
        <span className={style.cartPrice}>
          ${product.price * product.amount}, {product.amount}{" "}
          {product.amount > 1 ? "products " : "product "}{" "}
        </span>
      </div>
    </div>
  );
}

export default OrderItem;
