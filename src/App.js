import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation, redirect } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
//import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandWhite from "assets/images/Beauty-white-2.png";
import brandDark from "assets/images/Beauty.png";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();

  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  /*useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);*/

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      try {
        const isAuthenticated =
          window.localStorage.getItem("users") !== null &&
          window.localStorage.getItem("users") !== "";
        const usersString = window.localStorage.getItem("users", {});
        const user = JSON.parse(usersString);
        if (route.collapse) {
          return getRoutes(route.collapse);
        }
        if (route.route) {
          if (isAuthenticated) {
            if (user.tipo === "C") {
              if (
                route.key !== "categoria_productos" &&
                route.key !== "tipo_productos" &&
                route.key !== "graficos" &&
                route.key !== "historialVentas" &&
                route.key !== "sing-in-factu" &&
                route.key !== "sing-up-factu" &&
                route.key !== "facturacion"
              ) {
                return <Route exact path={route.route} element={route.component} key={route.key} />;
              }
            } else {
              return <Route exact path={route.route} element={route.component} key={route.key} />;
            }
          } else {
            if (route.key === "sign-in" || route.key === "sign-up") {
              return <Route exact path={route.route} element={route.component} key={route.key} />;
            }
          }
        }
        return (
          <Route
            exact
            path="*"
            element={<Navigate to="/authentication/sign-in" />}
            key="rutaPodefecto"
          />
        );
      } catch (error) {
        console.log(error);
      }
    });

  const rendePorTipo = (allRoute) => {
    try {
      const usersString = window.localStorage.getItem("users", {});
      const user = JSON.parse(usersString);
      if (!user) {
        return allRoute.filter((route) => route.key === "sign-in" || route.key === "sign-up");
      }
      if (user.tipo === "C") {
        const allowedRoutes = [
          "categoria_productos",
          "tipo_productos",
          "graficos",
          "historialVentas",
          "sing-in-factu",
          "sing-up-factu",
          "facturacion",
        ];
        return allRoute.filter((route) => !allowedRoutes.includes(route.key));
      }
      if (user.tipo === "A") {
        const allowedRoutesAdmin = ["historialProductos"];
        return allRoute.filter((route) => !allowedRoutesAdmin.includes(route.key));
      }
      return allRoute;
    } catch (error) {
      console.log(error);
    }
  };

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Web Beauty"
            routes={rendePorTipo(routes)}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
      </Routes>
    </ThemeProvider>
  );
}
