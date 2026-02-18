import { createBrowserRouter, NavLink } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Loader from "@/components/Loader/Loader";

import Pag404 from "@/pages/Page404";
import ErrorPage from "@/pages/ErrorPage";
import ContactPage from "@/pages/ContactPage";
import ShipmentPage from "@/pages/ShipmentPage";
import { lazy, Suspense } from "react";
import CartPage from "@/pages/CartPage";

const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const OrderPage = lazy(() => import("@/pages/OrderPage"));

export const routes = [
  {
    element: <Layout />,
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <ProductsPage />
          </Suspense>
        ),
        id: "products",
      },
      {
        path: 'cart',
        element: (
          
         <CartPage />
          
        ),
        id: 'cart',
        handle: {
          crumb: () => <NavLink to="/cart">Cart crumb </NavLink>,
          title: "Cart",
        },
        children: [
          {
            path: 'contact',
            element: <ContactPage />,
            id: "contact",

            handle: {
              crumb: () => (
                <NavLink to="/cart/contact">Contact information crumb</NavLink>
              ),
              title: "Contact information",
            },
          },
          {
            path: 'shipment',
            element: <ShipmentPage />,
            id: "shipment",
            handle: {
              crumb: () => (
                <NavLink to="/cart/shipment">
                  Shipment information crumb
                </NavLink>
              ),
              title: "Shipment information",
            },
          },
           
        ],
      },
      {  path: "order",
            element: (
              <Suspense fallback={<Loader />}>
                <OrderPage />
              </Suspense>
            ),
            id: "order",
            
          },
     

      {
        path: "*",
        element: <Pag404 />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
