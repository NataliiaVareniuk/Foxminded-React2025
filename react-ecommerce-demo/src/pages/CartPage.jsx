
import CartList from "@/components/Cart/CartList"
import { Outlet } from "react-router"
import { useLocation } from "react-router";
import Breadcrumbs from "@/layouts/Breadcrumbs";
import frontRoutes from "@/routes/frontRoutes";

function CartPage() {
 const location = useLocation();
  const isRootCart = location.pathname === frontRoutes.pages.cart.index;

  return (
    <>
      {isRootCart ? (
        <>
         <Breadcrumbs />
        <CartList />
        </>
      ) : (
        <Outlet />  
      )}
    </>
  );
}

export default CartPage
