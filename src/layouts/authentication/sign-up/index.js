// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import brandWhite from "assets/images/Beauty-white-2.png";
import brandDark from "assets/images/Beauty.png";

import { useState } from "react";

function Cover() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

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

  const onSubmitRegister = async () => {
    try {
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        openSuccessSB(true);
        window.location.href = "/";
      } else {
        openErrorSB(true);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const validar = () => {
    if (nombre.trim() === "") {
      alert("El nombre es obligatorio", "warning");
      return false;
    } else if (apellido.trim() === "") {
      alert("El apellido es obligatorio", "warning");
      return false;
    } else if (email === "") {
      alert("El email es obligatorio", "warning");
      return false;
    } else if (password === "") {
      alert("La contraseña es obligatoria", "warning");
      return false;
    } else {
      onSubmitRegister();
    }
  };

  return (
    <CoverLayout image={brandDark}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Registro
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Introduzca los datos solicitados
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre"
                variant="standard"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Apellido"
                variant="standard"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Correo"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Contraseña"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Aceptar&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terminos y condiciones
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={validar} fullWidth>
                Registrar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Ya tienes cuenta?{" "}
                <MDTypography variant="button" color="info" fontWeight="medium" textGradient>
                  <Link to="/authentication/sign-in">Inicia Sesión</Link>
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
