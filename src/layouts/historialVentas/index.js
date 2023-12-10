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
  const [historialVentas, setHistorialVentas] = useState([]);

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem("users"));
    setUsuarioLogeado(userStored);
  }, []);

  useEffect(() => {
    if (usuarioLogeado && usuarioLogeado.id) {
      getHistorialVentas();
    }
  }, [usuarioLogeado]);

  const getHistorialVentas = async () => {
    if (!usuarioLogeado || !usuarioLogeado.id) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/historialVentas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      setHistorialVentas(data);
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
                      { Header: "Nombre producto", accessor: "productName", align: "center" },
                      { Header: "Nombre usuario", accessor: "userName", align: "center" },
                      { Header: "Email", accessor: "email", align: "center" },
                      { Header: "Cantidad de productos", accessor: "quantity", align: "center" },
                      { Header: "Fecha de venta", accessor: "datesale", align: "center" },
                      { Header: "Precio Unitario", accessor: "unityPrice", align: "center" },
                    ],
                    rows: historialVentas.map((item) => ({
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
                      productName: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {item.nombre_producto}
                        </MDTypography>
                      ),
                      userName: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {item.nombre + " " + item.apellido}
                        </MDTypography>
                      ),
                      email: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {item.email}
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
                      datesale: (
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
                      unityPrice: (
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
