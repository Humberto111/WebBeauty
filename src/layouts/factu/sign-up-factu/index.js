// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useState } from "react";

function Cover() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
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

  const onSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://web-beauty-factu-b5f1002b97bd.herokuapp.com/api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          w: "users",
          r: "users_register",
          fullName: nombre + " " + apellido,
          userName: userName,
          email: email,
          about: about,
          country: country,
          pwd: password,
        }),
      });

      if (response.ok) {
        openSuccessSB(true);
        window.location.href = "/sing-in-factu";
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
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={2}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Registro en Facturación
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Introduzca los datos solicitados
          </MDTypography>
        </MDBox>
        <MDBox pt={1} pb={1} px={1}>
          <MDBox component="form" role="form">
            <MDBox mb={1}>
              <MDInput
                type="text"
                label="Nombre"
                variant="standard"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type="text"
                label="Apellido"
                variant="standard"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type="text"
                label="Nombre de Usuario"
                variant="standard"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type="email"
                label="Correo"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type="text"
                label="Otros datos"
                variant="standard"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type="text"
                label="País"
                variant="standard"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={1}>
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
                &nbsp;&nbsp;Acepto&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                los términos y condiciones
              </MDTypography>
            </MDBox>
            <MDBox mt={1} mb={1}>
              <MDButton variant="gradient" color="info" onClick={onSubmitRegister} fullWidth>
                Registrar
              </MDButton>
            </MDBox>
            <MDBox mt={1} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Ya tienes cuenta?{" "}
                <MDTypography variant="button" color="info" fontWeight="medium" textGradient>
                  <Link to="/sing-in-factu">Inicia Sesión en Facturación</Link>
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default Cover;
