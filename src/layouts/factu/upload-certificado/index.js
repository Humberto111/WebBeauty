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
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

import { useState } from "react";

function Cover() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const factuUser = JSON.parse(localStorage.getItem("factu"));

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
      const formData = new FormData();
      formData.append("w", "fileUploader");
      formData.append("r", "subir_certif");
      formData.append("sessionKey", factuUser.resp.sessionKey);
      formData.append("fileToUpload", file);
      formData.append("iam", factuUser.resp.sessionKey.userName);

      const response = await fetch("https://web-beauty-factu-b5f1002b97bd.herokuapp.com/api.php", {
        method: "POST",
        headers: {
          // Utilizar 'multipart/form-data' para FormData
          // y 'Connection' en lugar de 'connection'
          "Content-Type": "multipart/form-data",
          Connection: "keep-alive",
        },
        body: formData,
      });

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        console.log(response);
        if (contentType && contentType.includes("application/json")) {
          // La respuesta es JSON
          const data = await response.json();
          console.log(data);
          openSuccessSB(true);
        } else {
          // La respuesta no es JSON, puede ser HTML u otro tipo
          const textoRespuesta = await response.text();
          console.log("Respuesta no JSON:", textoRespuesta);
          openSuccessSB(true);
        }
      } else {
        openErrorSB(true);
        console.log("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const selectHandler = (e) => {
    setFile(e.target.files[0]);
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
            Subir el Certificado o Llave Criptográfica
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Este es el archivo p12 es necesario que sea en .p12 con la p en minúscula
          </MDTypography>
        </MDBox>
        <MDBox pt={1} pb={1} px={1}>
          <MDBox component="form" role="form">
            <MDBox mb={1}>
              <Grid item xs={12}>
                <Box p={2}>
                  <Input id="fileInput" onChange={selectHandler} fullWidth type="file" />
                </Box>
              </Grid>
            </MDBox>
            <MDBox mt={1} mb={1}>
              <MDButton variant="gradient" color="info" onClick={onSubmitRegister}>
                Subir Certificado
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default Cover;
