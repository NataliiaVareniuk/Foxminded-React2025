import "./assets/styles/base/index.scss";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ProductProvider from "./provider/ProductProvider";

createRoot(document.getElementById("root")).render(
    <ProductProvider>
         <App />
    </ProductProvider>
    
);
