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
import Calendar from "layouts/calendario";

// @mui icons
import Icon from "@mui/material/Icon";

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
    key: "Tipo_productos",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/tipo_productos",
    component: <TipoProductos />,
  },
  {
    type: "collapse",
    name: "Categoría de productos",
    key: "categoria_productos",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/categoria_productos",
    component: <CategoriaProductos />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    route: "/authentication/verify2fa",
    component: <Verify2fa />,
  },
  {
    type: "collapse",
    name: "Factor de Autenticación",
    key: "2fa",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/add2fa",
    component: <Add2fa />,
  },
  {
    type: "collapse",
    name: "Servicios",
    key: "services",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/servicesDashboard",
    component: <ServicesDashboard />,
  },
  {
    type: "collapse",
    name: "Galeria de estilos",
    key: "estilos",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/galeria",
    component: <Galeria />,
  },
  {
    type: "collapse",
    name: "Reserva de citas",
    key: "reserva",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/reserva",
    component: <Calendar />,
  },
];

export default routes;
