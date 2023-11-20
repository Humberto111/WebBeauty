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
import { useState } from "react";

function Cover() {
  const [code, setCode] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      content={validationMessage}
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Web Beauty"
      content={errorMessage}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleValidation = async () => {
    if (code === "") {
      openErrorSB(true);
      setValidationMessage("");
      setErrorMessage("Por favor, introduce un código.");
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem("users"));
      const response = await fetch(
        "https://web-beauty-api-638331a8cfae.herokuapp.com/validateTOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.email,
            code,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          // Manejo específico para el error 401 (Unauthorized)
          setValidationMessage("");
          setErrorMessage(
            "No tienes autorización para realizar esta acción. Por favor, inicia sesión o verifica tus credenciales."
          );
          openErrorSB(true);
        } else {
          // Manejo de otros errores
          setValidationMessage("");
          setErrorMessage("Código no válido. Por favor, inténtalo de nuevo.");
          openErrorSB(true);
        }
      } else {
        const data = await response.json();
        if (data.message === "Código TOTP no válido") {
          setValidationMessage("");
          setErrorMessage(data.message);
          openErrorSB(true);
        } else {
          setValidationMessage(data.message);
          setErrorMessage("");
          openSuccessSB(true);
          window.location.href = "/Dashboard";
        }
      }
    } catch (error) {
      console.error("Error al validar el código:", error);
      setValidationMessage("");
      setErrorMessage("Código no válido. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <CoverLayout image={bgImage}>
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
            Bienvenido
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Introduzca el código TOTP
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Código"
                variant="standard"
                fullWidth
                value={code}
                onChange={handleCodeChange}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleValidation}>
                Verificar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Reiniciar factor de autenticación?
                </MDTypography>
                {renderSuccessSB}
                {renderErrorSB}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
