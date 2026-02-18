import style from "./OrderReview.module.scss";
import OrderContainer from "../ui/OrderContainer/OrderContainer";
import { formatDate } from "@/utils/formatData";
import Button from "@/ui/Button/Button";

import { useNavigate } from "react-router";
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";
import frontRoutes from "@/routes/frontRoutes";

function OrderReview() {
 
  const navigate = useNavigate();

  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("lastOrder") ?? "null");
    setLastOrder(storedOrder);
  }, []);

  if (!lastOrder) {
    return <div className={style.confirmation}>No order found</div>;
  }
  if (!lastOrder.cartItems || lastOrder.cartItems.length === 0) {
    return <div className={style.confirmation}>No product ordered</div>;
  }

  const onClickContinueShopping = () => {
    localStorage.clear();
    navigate(frontRoutes.pages.home);
  };

  return (
    <div className="page__container">
      <div className={style.header}>
        <div className={style.img}></div>
        <h1 className={style.thanks}>Thank you for your order!</h1>
        <p className={style.confirmation}>
          The order confirmation email with details of your order and a link to
          track its progress has been sent to your email address.
        </p>
        <p className={style.order}>
          Your order # is {lastOrder.orderNumber} - PENDING
        </p>
        <p className={style.orderDate}>
          {" "}
          Order Date: {formatDate(lastOrder.orderDate)}{" "}
        </p>
      </div>
      <div className={style.information}>
        <OrderContainer>
          <h2 className={style.titleContact}>Contact information</h2>

          <p>
            {lastOrder.firstName} {lastOrder.lastName}
          </p>
          <p>{lastOrder.email}</p>
          <p>{lastOrder.phone}</p>
        </OrderContainer>
        <OrderContainer>
          <h2 className={style.titleShipment}>Shipment information</h2>
          <p>
            {lastOrder.address}, {lastOrder.extraAddress}
          </p>
          <p>
            {lastOrder.city}, {lastOrder.regionName}, {lastOrder.zipCode}
          </p>
          <p>{lastOrder.countryName}</p>
        </OrderContainer>
        <OrderContainer width="100%">
          <h2 className={style.titleSummary}>Order summary</h2>
          <ul className={style.cardItems}>
            {lastOrder.cartItems.map((prod) => (
              <li key={prod.id}>
                <OrderItem product={prod} />
                <hr className={style.divider} />
              </li>
            ))}
          </ul>
          <div className={style.totalPrice}>
            <span> Subtotal: </span>
            <span> ${lastOrder.total.toFixed(2)} </span>
            <span> Shipping & Handling: </span>
            <span> ${lastOrder.shipping.toFixed(2)} </span>

            <span> Tax: </span>
            <span> ${lastOrder.tax.toFixed(2)} </span>
            <span className={style["totalPrice--mod"]}> Grand Total: </span>
            <span className={style["totalPrice--mod"]}>
              {" "}
              ${lastOrder.total.toFixed(2)}{" "}
            </span>
          </div>
        </OrderContainer>
      </div>
      <div className={style.buttonWrapper}>
        <Button onClick={() => onClickContinueShopping()} wClass={style.wBig}>
          Continue shopping
        </Button>
      </div>
    </div>
  );
}

export default OrderReview;
