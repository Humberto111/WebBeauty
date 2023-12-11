import { useState } from "react";

// react-router-dom components
import { Link, json } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Button } from "@mui/material";
import axios from "axios";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const urlFactu = "https://web-beauty-factu-b5f1002b97bd.herokuapp.com/api.php";

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [logoutSB, setLogoutSB] = useState(false);
  const factuUser = JSON.parse(localStorage.getItem("factu"));

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const closeLogoutSB = () => setLogoutSB(false);
  const openLogoutSB = () => setLogoutSB(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Web Beauty"
      content="Bienvenido!"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      dateTime={new Date().toISOString().split("T")[0]}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Web Beauty"
      content="Verifique sus credenciales e intente nuevamente!"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      dateTime={new Date().toISOString().split("T")[0]}
      bgWhite
    />
  );

  const renderLogoutSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Web Beauty Facturación"
      content="Sesión cerrada correctamente!"
      open={logoutSB}
      onClose={closeLogoutSB}
      close={openLogoutSB}
      dateTime={new Date().toISOString().split("T")[0]}
      bgWhite
    />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        w: "users",
        r: "users_log_me_in",
        userName: email,
        pwd: password,
      };
      const body = JSON.stringify(data);

      const contentLength = body.length;

      const response = await fetch(urlFactu, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          connection: "keep-alive",
        },
        body,
      });
      if (response.ok) {
        const data = await response.json();
        if (data.resp !== "-301") {
          openSuccessSB(true);
          const jsonData = JSON.stringify(data);
          console.log(jsonData);
          localStorage.setItem("factu", jsonData);
        } else {
          openErrorSB(true);
        }
      } else {
        openErrorSB(true);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    console.log(factuUser.resp.sessionKey);
    try {
      const response = await fetch(urlFactu, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          connection: "keep-alive",
        },
        body: JSON.stringify({
          w: "users",
          r: "users_log_me_out",
          sessionKey: factuUser.resp.sessionKey,
          iam: factuUser.resp.userName,
        }),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
        openLogoutSB(true);
        localStorage.removeItem("factu");
      } else {
        openErrorSB(true);
        console.log("error");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {factuUser === null ? ( // Verifica si factuUser no es nulo
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={2}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Inicio de Sesión en Facturación
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Recordar contraseña
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
                  Iniciar Sesión
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  No tienes cuenta?{" "}
                  <MDTypography variant="button" color="info" fontWeight="medium" textGradient>
                    <Link to="/sing-up-factu">Regístrate en Facturación</Link>
                  </MDTypography>
                  {renderSuccessSB}
                  {renderErrorSB}
                  {renderLogoutSB}
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      ) : (
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={2}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Tienes una sesión activa en Facturación
            </MDTypography>
          </MDBox>
          {/* Has un boton para realizar un logout */}
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography variant="button" color="info" fontWeight="medium" textGradient>
                    <Link to="/facturacion">Ir a Facturación</Link>
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
          {/* Has un boton para realizar un logout */}
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography variant="button" color="info" fontWeight="medium">
                    <Button variant="contained" color="primary" onClick={logout}>
                      Cerrar Sesión
                    </Button>
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      )}
    </DashboardLayout>
  );
}

export default Basic;
