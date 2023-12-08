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
import { Link } from "react-router-dom";

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

  useEffect(() => {
    getVentas();

    getPorcentajeVentasComparadoMesAnterior();
    getPorcentajeProductosComparadoMesAnterior();
    // Cards de estadisticas
    getMontoTotalVentas();
    getMontoTotalVentasPorMes();

    getValorPromedioPedido();
    getValorPromedioPedidoPorMes();

    getUsuarioMayorVentas();
    getUsuarioMayorVentasPorMes();

    getUnidadesVendidas();
    getUnidadesVendidasPorMes();

    // Graficos de abajo
    getMontoVentasPorMes();

    getTopProductos();
    getTopProductosPorMes();
  }, []);

  const getVentas = async () => {
    try {
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/sales", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setVentas(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getMontoTotalVentas = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getMontoTotalVentas`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setMontoTotalVentas(data.monto_total_ventas);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getMontoTotalVentasPorMes = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getMontoTotalVentasPorMes?mes=${selectedMonth}&anno=${selectedYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setMontoTotalVentasPorMes(data.monto_total_ventas);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getValorPromedioPedido = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getValorPromedioPedido`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setValorPromedioPedido(data.valor_promedio_pedido);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getValorPromedioPedidoPorMes = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getValorPromedioPedidoPorMes?mes=${selectedMonth}&anno=${selectedYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setValorPromedioPedidoPorMes(data.valor_promedio_pedido);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getUsuarioMayorVentas = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getUsuarioMayorVentas`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setUsuarioMayorVentas(data[0]);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getUsuarioMayorVentasPorMes = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getUsuarioMayorVentasPorMes?mes=${selectedMonth}&anno=${selectedYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setUsuarioMayorVentasPorMes(data[0]);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getUnidadesVendidas = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getUnidadesVendidas`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setUnidadesVendidas(data[0]);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getUnidadesVendidasPorMes = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getUnidadesVendidasPorMes?mes=${selectedMonth}&anno=${selectedYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setUnidadesVendidasPorMes(data[0]);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getMontoVentasPorMes = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getMontoVentasPorMes?anno=${selectedYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setVentasPorMes(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getTopProductos = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getTopProductos`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setTopProductos(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getTopProductosPorMes = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getTopProductosPorMes?mes=${selectedMonth}&anno=${selectedYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setTopProductosPorMes(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  function tieneMasDeDosDecimales(numero) {
    const numeroComoCadena = numero.toString();

    if (numeroComoCadena.includes(".")) {
      const parteDecimal = numeroComoCadena.split(".")[1];

      return parteDecimal && parteDecimal.length > 2;
    }

    return false;
  }

  const getPorcentajeVentasComparadoMesAnterior = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getPorcentajeVentasComparadoMesAnterior?mes=${selectedMonth}&anno=${selectedYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!isNaN(data[0].procentaje_ventas)) {
        const verificar = tieneMasDeDosDecimales(data[0].procentaje_ventas);
        if (verificar) {
          data[0].procentaje_ventas = parseFloat(data[0].procentaje_ventas).toFixed(2);
        }
        setPorcentajeVentasMesAnterior(data[0].procentaje_ventas);
      } else {
        console.error("El porcentaje de ventas no es un número válido");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getPorcentajeProductosComparadoMesAnterior = async () => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getPorcentajeProductosComparadoMesAnterior?mes=${selectedMonth}&anno=${selectedYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!isNaN(data[0].procentaje_productos)) {
        const verificar = tieneMasDeDosDecimales(data[0].procentaje_productos);
        if (verificar) {
          data[0].procentaje_productos = parseFloat(data[0].procentaje_productos).toFixed(2);
        }
        setPorcentajeProductosMesAnterior(data[0].procentaje_productos);
      } else {
        console.error("El porcentaje de ventas no es un número válido");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const tareas = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Setiembre",
      "Octubre",
    ],
    datasets: [
      {
        data: [86, 67, 91, 45, 59, 100, 85, 67, 91, 45],
        backgroundColor: "transparent",
        borderColor: "#007bff",
        pointsBorderColor: "#007bff",
        pointBorderWidth: 4,
      },
    ],
  };

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

  const filtrarGraficos = () => {
    getMontoTotalVentas();
    getMontoTotalVentasPorMes();

    getValorPromedioPedido();
    getValorPromedioPedidoPorMes();

    getUsuarioMayorVentas();
    getUsuarioMayorVentasPorMes();

    getUnidadesVendidas();
    getUnidadesVendidasPorMes();

    // Graficos de abajo
    getMontoVentasPorMes();

    getTopProductos();
    getTopProductosPorMes();

    getPorcentajeVentasComparadoMesAnterior();
    getPorcentajeProductosComparadoMesAnterior();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {localStorage.getItem("factu") ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard color="dark" icon="weekend" title="Subir el certificado" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Creación de Clave para los XML de Factura Electrónica"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard color="success" icon="store" title="Cliente Estrella" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="Unidades Vendidas"
                />
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
