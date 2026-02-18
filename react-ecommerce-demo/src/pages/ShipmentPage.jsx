import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ShipmentForm from "@/components/Shipment/ShipmentForm";
import Breadcrumbs from "@/layouts/Breadcrumbs";
import frontRoutes from "@/routes/frontRoutes";

function ShipmentPage() {
  

    const location = useLocation();
     const isRootCart = location.pathname === frontRoutes.pages.cart.shipment;
     return (
       <>
       
         {isRootCart ? (
          <>
         <Breadcrumbs />
         <ShipmentForm />
        </>
           
         ) : (
           <Outlet />  
         )}
       </>
       
      
     )
  
}

export default ShipmentPage;