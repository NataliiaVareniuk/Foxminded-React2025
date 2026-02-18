import { useContext } from "react";
import style from "./Products.module.scss";
import { CartContext } from "@/context/CartContext";
import { ACTION_TYPES } from "@/provider/ActionTypes";
import Button from "@/ui/Button/Button";
import AddIcon from "@/assets/images/add.svg"
import AddedIcon from "@/assets/images/check.svg"

function ProductItem({ product }) {
  const { cartState, dispatch } = useContext(CartContext);
  const isAdded = cartState[product.id] > 0;

  const addToCart = () => {
    if (!isAdded) {
      dispatch({
        type: ACTION_TYPES.ADD,
        payload: product.id,
      });
    }
  };


  return (
    <div className={style.cardContainer}>
      <img
        className={style.image}
        src={product.image || product.thumbnail || (product.images && product.images[0])}
        alt={product.description || product.title || "product"}
        loading="lazy"
      />
      <p className={style.cardDescription}>{product.description}</p>
      <p className={style.cardPrice}>${product.price}</p>
      <Button
        onClick={addToCart}
        iconSrc={isAdded ? AddedIcon : AddIcon}
        
      >
        {isAdded ? "Added" : "Add to cart"}
      </Button>
    </div>
  );
}

export default ProductItem;
