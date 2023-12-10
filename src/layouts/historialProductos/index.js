import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
};

const formatDate = (dateString) => {
  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleDateString("es-CR", options);

  // Extraer la parte de la fecha y ajustar la zona horaria
  const formattedDateString = formattedDate.split(" ")[0];
  return formattedDateString;
};

const Dashboard = () => {
  const [usuarioLogeado, setUsuarioLogeado] = useState([]);
  const [historialProductos, setHistorialProductos] = useState([]);

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem("users"));
    setUsuarioLogeado(userStored);
  }, []);

  useEffect(() => {
    if (usuarioLogeado && usuarioLogeado.id) {
      getHistorialProductos();
    }
  }, [usuarioLogeado]);

  const getHistorialProductos = async () => {
    if (!usuarioLogeado || !usuarioLogeado.id) {
      return;
    }
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/historialProductos?id_usuario=${usuarioLogeado.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setHistorialProductos(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "Producto", accessor: "image", align: "center" },
                      { Header: "Nombre", accessor: "name", align: "center" },
                      { Header: "Descripción", accessor: "description", align: "center" },
                      { Header: "Precio unitario", accessor: "price", align: "center" },
                      { Header: "Cantidad", accessor: "quantity", align: "center" },
                      { Header: "Fecha", accessor: "dateBuy", align: "center" },
                      { Header: "Total", accessor: "total", align: "center" },
                    ],
                    rows: historialProductos.map((item) => ({
                      function: item.id,
                      image: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          <img
                            src={"https://web-beauty-api-638331a8cfae.herokuapp.com/" + item.imagen}
                            alt={item.nombre}
                            style={{ width: "130px" }}
                          />
                        </MDTypography>
                      ),
                      name: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {item.nombre}
                        </MDTypography>
                      ),
                      description: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {item.descripcion}
                        </MDTypography>
                      ),
                      price: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {item.precio}
                        </MDTypography>
                      ),
                      quantity: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {item.cantidad}
                        </MDTypography>
                      ),
                      dateBuy: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {formatDate(item.fecha_venta).replace(",", " ")}
                        </MDTypography>
                      ),
                      total: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {formatCurrency(item.cantidad * item.precio)}
                        </MDTypography>
                      ),
                    })),
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;
