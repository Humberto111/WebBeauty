import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import "./style.css";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [usuarioLogeado, setUsuarioLogeado] = useState([]);

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem("users"));
    setUsuarioLogeado(userStored);
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/images");
      const data = await response.json();
      console.log(data);
      setImageList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const enviarSolicitud = async () => {
    if (!file) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Debe seleccionar una imagen",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://web-beauty-api-638331a8cfae.herokuapp.com/images/post",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      getImages();
      // Realizar acciones adicionales según sea necesario
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      // Restablecer el estado y limpiar el campo de entrada de archivos
      setFile(null);
      document.getElementById("fileInput").value = null;
    }
  };

  const onDeleteImagen = async (id) => {
    try {
      const response = await fetch(
        "https://web-beauty-api-638331a8cfae.herokuapp.com/deleteImagen",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      );

      if (response.ok) {
        getImages();
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const deleteImagen = async (id) => {
    Swal.fire({
      title: "Deseas eliminar la imagen?",
      text: "No podras reverir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteImagen(id);
      }
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={2}>
        {usuarioLogeado.tipo === "A" ? (
          <>
            <Grid item xs={12}>
              <Box p={2}>
                <Input id="fileInput" onChange={selectHandler} fullWidth type="file" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box p={2}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ color: "white" }}
                  fullWidth
                  onClick={enviarSolicitud}
                >
                  Guardar
                </Button>
              </Box>
            </Grid>
          </>
        ) : null}
        {imageList.map((image) => (
          <Grid key={image.id} item xs={12}>
            <Box p={2}>
              <Card className="image-card-container">
                <CardMedia
                  onClick={(e) => {
                    deleteImagen(Number(image.split("-")[0]));
                  }}
                  className="image-card-container"
                  component="img"
                  alt="..."
                  src={"https://web-beauty-api-638331a8cfae.herokuapp.com/" + image}
                  style={{
                    height: "auto",
                    width: "auto",
                    maxWidth: "300px",
                    maxHeight: "300px",
                  }}
                />
                <Typography variant="caption" align="center" mt={1}>
                  {image.nombre}
                </Typography>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;
