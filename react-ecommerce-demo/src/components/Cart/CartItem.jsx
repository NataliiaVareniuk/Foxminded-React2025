import { useContext, useState } from "react";
import style from "./Cart.module.scss";
import { CartContext } from "@/context/CartContext";
import { ACTION_TYPES } from "@/provider/ActionTypes";
import Button from "@/ui/Button/Button";
import DeleteIcon from "@/assets/images/delete.svg";
import PlusIcon from "@/assets/images/add.svg";
import MinusIcon from "@/assets/images/minus.svg";

function CartItem({ product }) {
  const { dispatch } = useContext(CartContext);

  const addProduct = () => {
    dispatch({
      type: ACTION_TYPES.ADD,
      payload: product.id,
    });
  };

  const removeProduct = () => {
    dispatch({
      type: ACTION_TYPES.REMOVE,
      payload: product.id,
    });
  };

  const deleteFromCart = () => {
    dispatch({
      type: ACTION_TYPES.DELETE,
      payload: product.id,
    });
  };

  return (
    <div className={style.cardItem}>
      <img
        className={style.image}
        src={product.image || product.thumbnail || (product.images && product.images[0])}
        alt={product.description || product.title || "product"}
        loading="lazy"
      />
      <div className={style.cardInfo}>
        <div className={style.cardDetails}>
          <p className={style.cardDescription}>{product.description}</p>

          <div className={style.cardSummary}>
            <div className={style.editCount}>
              <Button
                iconSrc={MinusIcon}
                disabled={product.amount === 1 }
                onClick={removeProduct}
              />
              <span className={style.count}>{product.amount}</span>
              <Button iconSrc={PlusIcon} onClick={addProduct} />
            </div>
            <span className={style.priceText}>Price: </span>
          </div>
        </div>

        <div className={style.showPrice}>
          <Button
            onClick={deleteFromCart}
            iconSize={"small"}
            iconSrc={DeleteIcon}
            wClass={style.w81}
          >
            Delete
          </Button>

          <div className={style.cartPrice}>
            ${(product.price * product.amount).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
