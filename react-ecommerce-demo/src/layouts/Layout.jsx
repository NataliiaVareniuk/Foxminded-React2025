import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
import style from "./Layout.module.scss";
import ProductProvider from "@/provider/ProductProvider";
import CartProvider from "@/provider/CartProvider";
import ProgressProvider from "@/provider/ProgressProvider";

function Layout() {
  return (
    <div className={style.container}>
      <ProductProvider>
        <CartProvider>
          <ProgressProvider>
            <Header />
            <main className={style.container}>
              <Outlet />
            </main>
          </ProgressProvider>
        </CartProvider>
      </ProductProvider>
    </div>
  );
}

export default Layout;
