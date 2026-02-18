import style from "./NavBar.module.scss";
import { NavLink } from "react-router";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { useLocation } from "react-router";
import Button from "@/ui/Button/Button";
import { ProgressContext } from "@/context/ProgressContext";
import CartIcon from "@/assets/images/basket.svg";
import { ACTION_TYPES } from "@/provider/ActionTypes";
import frontRoutes from "@/routes/frontRoutes";


function NavBar() {
  const { cartState } = useContext(CartContext);

  const { dispatch } = useContext(ProgressContext);

  const nextStepClick = (stepId) => {
    dispatch({ type: ACTION_TYPES.COMPLETED, payload: stepId });
  };

  const location = useLocation();
  const totalProductsNumber = Object.values(cartState).reduce(
    (prevSum, num) => prevSum + num,
    0
  );

  return (
    
      <nav className={style.nav}>
        <ul className={style.navItems}>
          <li>
            <NavLink to={frontRoutes.pages.home} className={style.buttonLogo}>
              OfficeChair
            </NavLink>
          </li>
          <li>
            <NavLink to={frontRoutes.pages.cart.index}>
              <Button
                onClick={() => nextStepClick("cart")}
                iconSrc={CartIcon}
                disabled={totalProductsNumber === 0 }
                wClass={style.w100}
              >
                Cart
              </Button>
            </NavLink>

            {location.pathname === frontRoutes.pages.home && totalProductsNumber > 0 && (
              <div className={style.count}>{totalProductsNumber}</div>
            )}
          </li>
        </ul>
      </nav>
    
  );
}

export default NavBar;
