import { useMatches, useLocation } from "react-router-dom";
import { ProgressContext } from "@/context/ProgressContext";
import style from "./Layout.module.scss";
import { useContext } from "react";
import { routes } from "@/routes/router";
import frontRoutes from "@/routes/frontRoutes";

import { NavLink } from "react-router-dom";

export default function Breadcrumbs() {
  const matches = useMatches();
  const { state } = useContext(ProgressContext) || { state: { progress: [] } };

  const rootRoute = routes[0].children.find((r) => r.path === "cart");
  const breadcrumbs = [rootRoute, ...(rootRoute?.children || [])];

  const pageTitle =
    matches[matches.length - 1]?.handle?.title ?? "Office chair";

  return (
    <div className={style.crumbsContainer}>
      <nav className={style.crumbsNav}>
        <ul className={style.crumbsItems}>
          {breadcrumbs.map((child, i) => (
            <li key={i} className={style.crumbsItem}>
              {state?.progress?.includes(child?.id) ? (
                <NavLink
                  to={child.path === "cart" ? frontRoutes.pages.cart.index : `/cart/${child.path}`}
                  className={({ isActive }) =>
                    isActive ? style.crumbsLinkActive : style.crumbsLink
                  }
                  end
                >
                  {child.handle?.title}
                </NavLink>
              ) : (
                <span className={style.disabled}>{child.handle?.title} </span>
              )}

              {i < breadcrumbs.length - 1 && (
                <span className={style.crumbsSplit}></span>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <h1 className={style.pageTitle}>{pageTitle} </h1>
    </div>
  );
}
