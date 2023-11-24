import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import { useEffect, useState } from "react";

// Overview page components
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import AppBar from "@mui/material/AppBar";

// Material Dashboard 2 React components
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import backgroundImage from "assets/images/bg-profile.jpeg";

// Data
import Card from "@mui/material/Card";
import Swal from "sweetalert2";

function Overview() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [code, setCode] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState({});
  const [apellido, setApellido] = useState("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [password, setPassword] = useState("");
  const [profile_picture, setProfile_picture] = useState("");
  const [tipo, setTipo] = useState("");

  const apiUrl = "https://web-beauty-api-638331a8cfae.herokuapp.com";

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  /*setId(data[0].id);
      setEmail(data[0].email);
      setNombre(data[0].nombre);
      setApellido(data[0].apellido);
      setFecha_nacimiento(data[0].fecha_nacimiento);
      setGenero(data[0].genero);
      setPassword(data[0].password);
      setProfile_picture(data[0].profile_picture);
      setTipo(data[0].tipo);*/
  const getUsuario = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("users"));
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getUserById?id=${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setUsuario(data[0]);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    getUsuario();
  }, []);

  const generateQRAuth = async () => {
    try {
      //es post
      const user = JSON.parse(localStorage.getItem("users"));
      console.log(user.email);
      const response = await fetch(
        "https://web-beauty-api-638331a8cfae.herokuapp.com/generateSecretAndQR",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.email,
          }),
        }
      );
      const data = await response.json();
      setQrCodeUrl(data.qrCodeDataURL);
      console.log(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    generateQRAuth();
  }, []);

  const handleDateClick = () => {
    alert("Editando");
    $("#modalPerfil").modal("show");
  };

  const openModal = (usuario) => {
    setId("");
    setNombre("");
    setApellido("");
    setEmail("");
    setPassword("");
    setTipo("");
    setFecha_nacimiento("");
    setGenero("");
    if (usuario) {
      setId(usuario.id);
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setEmail(usuario.email);
      setPassword(usuario.password);
      setTipo(usuario.tipo);
      const fechaParte = usuario.fecha_nacimiento.split("T")[0];
      setFecha_nacimiento(fechaParte);
      setGenero(usuario.genero);
    }
    window.setTimeout(() => {
      document.getElementById("nombre").focus();
    }, 500);
  };

  const validar = () => {
    var parametros;
    if (nombre.trim() === "") {
      alert("El nombre es obligatorio", "warning");
      return false;
    } else if (apellido.trim() === "") {
      alert("La apellido es obligatorio", "warning");
      return false;
    } else if (email === "") {
      alert("El correo es obligatorio", "warning");
      return false;
    } else if (fecha_nacimiento === "") {
      alert("La fecha de nacimiento es obligatorio", "warning");
      return false;
    } else if (genero === "") {
      alert("La el genero obligatorio", "warning");
      return false;
    } else {
      parametros = { id, nombre, apellido, email, fecha_nacimiento, genero, password, tipo };
      enviarSolicitud(parametros);
    }
  };

  const enviarSolicitud = async (parametros) => {
    try {
      const response = await fetch(
        "https://web-beauty-api-638331a8cfae.herokuapp.com/editUsuario",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: parametros.id,
            nombre: parametros.nombre,
            apellido: parametros.apellido,
            email: parametros.email,
            fecha_nacimiento: parametros.fecha_nacimiento,
            genero: parametros.genero,
            password: parametros.password,
            tipo: parametros.tipo,
          }),
        }
      );
      if (response.ok) {
        Swal.fire({
          title: "Edicion Exitosa!",
          text: "Perfil editado exitosamente",
          icon: "success",
          timer: 1500,
          position: "top-end",
        }).then((result) => {
          document.getElementById("btnCerrar").click();
          getUsuario();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal en el Editar. Intentalo nuevamente!",
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleValidation = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("users"));
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/saveSecret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.email,
          code,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Manejo específico para el error 401 (Unauthorized)
          setValidationMessage("");
          setErrorMessage(
            "No tienes autorización para realizar esta acción. Por favor, inicia sesión o verifica tus credenciales."
          );
        } else {
          // Manejo de otros errores
          setValidationMessage("");
          setErrorMessage("Código no válido. Por favor, inténtalo de nuevo.");
        }
      } else {
        const data = await response.json();
        setValidationMessage(data.message);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error al validar el código:", error);
      setValidationMessage("");
      setErrorMessage("Código no válido. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox position="relative" mb={5}>
        <MDBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="18.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.info.main, 0.6),
                rgba(gradients.info.state, 0.6)
              )}, url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            overflow: "hidden",
          }}
        />
        <Card
          sx={{
            position: "relative",
            mt: -8,
            mx: 3,
            py: 2,
            px: 2,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <MDAvatar src={profile_picture} alt="profile-image" size="xl" shadow="sm" />
            </Grid>
            <Grid item>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  {usuario.nombre + " " + usuario.apellido}
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  {usuario.email}
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={1} lg={4} sx={{ ml: "auto" }}>
              <AppBar position="static">
                <button
                  onClick={() => openModal(usuario)}
                  className="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPerfil"
                >
                  <i className="fa-solid fa-circle-plus">Editar Perfil</i>
                </button>
              </AppBar>
            </Grid>
          </Grid>
        </Card>
      </MDBox>
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            <PlatformSettings />
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
            <ProfileInfoCard
              title={"Informacion Personal"}
              description=""
              info={{
                nombre: usuario.nombre + " " + usuario.apellido,
                Correo: usuario.email,
                Fecha: usuario.fecha_nacimiento,
                Genero: usuario.genero == 1 ? "Masculino" : "Femenino",
              }}
              social={[
                {
                  link: "#",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "#",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "#",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{
                onclick: handleDateClick,
                tooltip: "Edit Profile",
              }}
              shadow={false}
            />
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <div>
              <img src={qrCodeUrl} alt="QR Code" />
              <div>
                <input
                  type="text"
                  placeholder="Código de autenticación"
                  value={code}
                  onChange={handleCodeChange}
                />
                <button onClick={handleValidation} className="btn btn-dark">
                  <i className="fa-solid fa-circle-plus">Validar</i>
                </button>
              </div>
              {errorMessage && <p className="error">{errorMessage}</p>}
              {validationMessage && <p>{validationMessage}</p>}
            </div>
          </Grid>
        </Grid>
      </MDBox>
      <div id="modalPerfil" className="modal fade" aria-hidden="true" style={{ zIndex: "9999" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">Editando</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="apellido"
                  className="form-control"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="date"
                  id="fecha_nacimiento"
                  className="form-control"
                  placeholder="Fecha de Nacimiento"
                  value={fecha_nacimiento}
                  onChange={(e) => setFecha_nacimiento(e.target.value)}
                ></input>
              </div>
              {/*crear una radio buton para elegir el sexo*/}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <select
                  className="form-select"
                  id="genero"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="0">Seleccione un Genero</option>
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={() => validar()} className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk"></i> Guardar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="btnCerrar"
                type="button"
                className="btn btn-seconday"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
