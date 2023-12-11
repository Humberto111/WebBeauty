import Dashboard from "layouts/dashboard";
import ServicesDashboard from "layouts/servicesDashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Verify2fa from "layouts/authentication/verify2fa";
import Add2fa from "layouts/authentication/add2fa";
import TipoProductos from "layouts/productos/tipo_productos";
import CategoriaProductos from "layouts/productos/categoria_productos";
import Galeria from "layouts/galeria";
import Calendario from "layouts/calendar";
import Comentarios from "layouts/comentarios";
import CarritoCompras from "layouts/cart";
import Estilistas from "layouts/estilistas";
import Graficos from "layouts/graficos";
import HistorialProductos from "layouts/historialProductos";
import HistorialVentas from "layouts/historialVentas";
import SuccessPage from "layouts/successPayment";
import DashboardFactu from "layouts/factu/dashboardFactu";
import LoginFactu from "layouts/factu/sign-in-factu";
import RegisterFactu from "layouts/factu/sign-up-factu";
import UploadCertificado from "layouts/factu/upload-certificado";

import GridViewIcon from "@mui/icons-material/GridView";
import FilterBAndWIcon from "@mui/icons-material/FilterBAndW";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";

// @mui icons
import Icon from "@mui/material/Icon";

//Cargar el usuario de localStorage
const userStored = JSON.parse(localStorage.getItem("users"));

const routes = [
  {
    type: "collapse",
    name: "Productos",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tipo de productos",
    key: "tipo_productos",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/tipo_productos",
    component: <TipoProductos />,
  },
  {
    type: "collapse",
    name: "Categoría de productos",
    key: "categoria_productos",
    icon: <FormatAlignJustifyIcon />,
    route: "/categoria_productos",
    component: <CategoriaProductos />,
  },
  {
    type: "collapse",
    name: "Perfil",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    key: "authentication-add-2fa",
    route: "/authentication/verify2fa",
    component: <Verify2fa />,
  },
  {
    type: "collapse",
    name: "Servicios",
    key: "services",
    icon: <GridViewIcon />,
    route: "/servicesDashboard",
    component: <ServicesDashboard />,
  },
  {
    type: "collapse",
    name: "Galeria de estilos",
    key: "estilos",
    icon: <FilterBAndWIcon />,
    route: "/galeria",
    component: <Galeria />,
  },
  {
    type: "collapse",
    name: "Estilistas",
    key: "estilista",
    icon: <ContentCutIcon />,
    route: "/estilistas",
    component: <Estilistas />,
  },
  {
    type: "collapse",
    name: "Calendario",
    key: "calendario",
    icon: <CalendarMonthIcon />,
    route: "/calendario",
    component: <Calendario />,
  },
  {
    type: "collapse",
    name: "Comentarios y reseñas",
    key: "comentarios",
    icon: <Icon fontSize="small">comments</Icon>,
    route: "/comentarios",
    component: <Comentarios />,
  },
  {
    type: "collapse",
    name: "Cart",
    key: "cart",
    icon: <ShoppingCart />,
    route: "/cart",
    component: <CarritoCompras />,
  },
  {
    type: "collapse",
    name: "Graficos",
    key: "graficos",
    icon: <LeaderboardIcon />,
    route: "/graficos",
    component: <Graficos />,
  },
  {
    type: "collapse",
    name: "Historial de Compras",
    key: "historialProductos",
    icon: <LeaderboardIcon />,
    route: "/historialProductos",
    component: <HistorialProductos />,
  },
  {
    type: "collapse",
    name: "Historial de Ventas",
    key: "historialVentas",
    icon: <AssuredWorkloadIcon />,
    route: "/historialVentas",
    component: <HistorialVentas />,
  },
  {
    name: "successPage",
    key: "successPage",
    icon: <LeaderboardIcon />,
    route: "/successPage",
    component: <SuccessPage />,
  },
  {
    type: "collapse",
    name: "Inicio de Sesión Factu",
    key: "sing-in-factu",
    icon: <LeaderboardIcon />,
    route: "/sing-in-factu",
    component: <LoginFactu />,
  },
  {
    key: "sing-up-factu",
    icon: <LeaderboardIcon />,
    route: "/sing-up-factu",
    component: <RegisterFactu />,
  },
  {
    type: "collapse",
    name: "Facturación",
    key: "facturacion",
    icon: <LeaderboardIcon />,
    route: "/facturacion",
    component: <DashboardFactu />,
  },
  {
    name: "Subir Certificado",
    key: "subir-certificado",
    icon: <LeaderboardIcon />,
    route: "/upload-certificado",
    component: <UploadCertificado />,
  },
];

export default routes;
