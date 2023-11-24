import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        openSuccessSB(true);
        const data = await response.json();
        const jsonData = JSON.stringify(data);
        localStorage.setItem("users", jsonData);
        handleVerify2FA();
      } else {
        openErrorSB(true);
        console.log("error");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleVerify2FA = async (e) => {
    try {
      // tiene que realizar un get para saber si el usuario tiene habilitado el 2FA
      const user = JSON.parse(localStorage.getItem("users"));
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getUserAuth?usuario=${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data[0] === undefined) {
        window.location.href = "/Dashboard";
      } else {
        if (data[0].activo) {
          window.location.href = "/authentication/verify2fa";
        } else {
          window.location.href = "/Dashboard";
        }
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Início de Sesión
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
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Registrate
                </MDTypography>
                {renderSuccessSB}
                {renderErrorSB}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
