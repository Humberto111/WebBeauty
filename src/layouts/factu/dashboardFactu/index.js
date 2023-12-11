import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Link, redirect } from "react-router-dom";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

import { useEffect, useState } from "react";
import PieChart from "examples/Charts/PieChart";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { PolarArea } from "react-chartjs-2";

const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
};

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [ventas, setVentas] = useState([]);

  const [montoTotalVentas, setMontoTotalVentas] = useState([]);
  const [montoTotalVentasPorMes, setMontoTotalVentasPorMes] = useState(0);

  const [valorPromedioPedido, setValorPromedioPedido] = useState(0);
  const [valorPromedioPedidoPorMes, setValorPromedioPedidoPorMes] = useState(0);

  const [usuarioMayorVentas, setUsuarioMayorVentas] = useState([]);
  const [usuarioMayorVentasPorMes, setUsuarioMayorVentasPorMes] = useState([]);

  const [unidadesVendidas, setUnidadesVendidas] = useState([]);
  const [unidadesVendidasPorMes, setUnidadesVendidasPorMes] = useState(0);

  const [ventasPorMes, setVentasPorMes] = useState([]);

  const [topProductos, setTopProductos] = useState([]);
  const [topProductosPorMes, setTopProductosPorMes] = useState([]);

  const [porcentajeVentasMesAnterior, setPorcentajeVentasMesAnterior] = useState(0);
  const [porcentajeProductosMesAnterior, setPorcentajeProductosMesAnterior] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState(-1);
  const [selectedYear, setSelectedYear] = useState(0);

  const handleCardClick = () => {
    // Puedes personalizar la ruta según tus necesidades
    const targetRoute = "/upload-certificado";
    history.push(targetRoute);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {localStorage.getItem("factu") ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
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
                    <MDTypography variant="h7" fontWeight="medium" mt={1}>
                      <Link to="/upload-certificado" style={{ color: "white" }}>
                        Subir certificado o llave criptográfica
                      </Link>
                    </MDTypography>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
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
                    <MDTypography variant="h7" fontWeight="medium" mt={1}>
                      <Link to="/upload-certificado" style={{ color: "white" }}>
                        Creación de Clave para los XML de Factura Electrónica
                      </Link>
                    </MDTypography>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
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
                    <MDTypography variant="h7" fontWeight="medium" mt={1}>
                      <Link to="/upload-certificado" style={{ color: "white" }}>
                        Creación de Clave para los XML de Factura Electrónica
                      </Link>
                    </MDTypography>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
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
                Tienes que iniciar sesión en Facturación para poder ver esta página
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    <MDTypography variant="button" color="info" fontWeight="medium" textGradient>
                      <Link to="/sing-in-factu">Ir al inicio de sesión de facturación</Link>
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
