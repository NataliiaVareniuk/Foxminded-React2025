import { useContext, useMemo, useEffect } from "react";
import { ProductContext } from "@/context/ProductsContext";
import { CartContext } from "@/context/CartContext";
import CartItem from "./CartItem";
import style from "./Cart.module.scss";
import { ACTION_TYPES } from "@/provider/ActionTypes";

import Button from "@/ui/Button/Button";
import { ProgressContext } from "@/context/ProgressContext";
import { useNavigate } from "react-router-dom";
import frontRoutes from "@/routes/frontRoutes";


function CartList() {
  const { cartState, dispatch: dispatchCartList } = useContext(CartContext);

  const productList = useContext(ProductContext);
  const productIdInCart = Object.keys(cartState);
  const { dispatch } = useContext(ProgressContext);
  

  const navigate = useNavigate();

  const productsInCart = useMemo(
  () =>
    productList
      .filter((prod) => productIdInCart.includes(String(prod.id)))
      .map((prod) => ({
        ...prod,
        amount: cartState[prod.id],
      })),
  [productList, cartState, productIdInCart]
);

  const totalSum = useMemo(
    () =>
      productsInCart.reduce(
        (prevSum, product) => prevSum + product.price * product.amount,
        0
      ),
    [productsInCart]
  );

  const totalProductsNumber = useMemo(
    () =>
      productsInCart.reduce((prevSum, product) => prevSum + product.amount, 0),
    [productsInCart]
  );

  useEffect(() => {
    if (productsInCart.length === 0) {
      dispatch({ type: ACTION_TYPES.CLEAR_FORM_DATA });

      dispatchCartList({
        type: ACTION_TYPES.CLEAR_CART,
      });
    }
    dispatch({
      type: ACTION_TYPES.SAVE_FORM_DATA,
      payload: {
        cartItems: productsInCart,
        total: totalSum,
      },
    });
  }, [cartState, totalSum]);

  const nextStepClick = (stepId) => {
    dispatch({
      type: ACTION_TYPES.SAVE_FORM_DATA,
      payload: {
        cartItems: productsInCart,
        total: totalSum,
      },
    });
    dispatch({ type: ACTION_TYPES.COMPLETED, payload: stepId });

    navigate(frontRoutes.pages.cart.contact);
  };

  if (productIdInCart.length === 0) return <div>Cart is empty</div>;

  return (
    <div className="page__container">
      <div className={style.listContainer}>
        <ul className={style.cardItems}>
          {productsInCart.map((prod) => (
            <li key={prod.id}>
              <CartItem product={prod} isOrderReview={false} />
            </li>
          ))}
        </ul>

        <div className={style.totalSum}>
          <span className={style.text}>Total:</span>
          <span className={style.count}>
            {totalProductsNumber}
            {totalProductsNumber > 1 ? " products. " : " product. "}{" "}
          </span>

          <span className={style.text}>Sum:</span>
          <span className={style.count}>$ {totalSum.toFixed(2)}</span>
        </div>
        <div className={style.nextButton}>
          <Button onClick={() => nextStepClick("contact")} wClass={style.wBig}>Next step</Button>
        </div>
      </div>
    </div>
  );
}

export default CartList;
