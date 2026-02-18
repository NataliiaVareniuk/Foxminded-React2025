
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ContactForm from "@/components/Contact/ContactForm";
import Breadcrumbs from "@/layouts/Breadcrumbs";

function ContactPage() {
   const location = useLocation();
  const isRootCart = location.pathname === "/cart/contact";
  return (
    <>
    
      {isRootCart ? (
        <>
         <Breadcrumbs />
         <ContactForm />
        </>
       
      ) : (
        <Outlet />  
      )}
    </>
    
   
  )
}

export default ContactPage;