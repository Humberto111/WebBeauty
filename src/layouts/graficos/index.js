import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

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
      const response = await fetch("http://localhost:3001/sales", {
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
      const response = await fetch(`http://localhost:3001/getMontoTotalVentas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setMontoTotalVentas(data.monto_total_ventas);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getMontoTotalVentasPorMes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/getMontoTotalVentasPorMes?mes=${selectedMonth}&anno=${selectedYear}`,
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
      const response = await fetch(`http://localhost:3001/getValorPromedioPedido`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setValorPromedioPedido(data.valor_promedio_pedido);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getValorPromedioPedidoPorMes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/getValorPromedioPedidoPorMes?mes=${selectedMonth}&anno=${selectedYear}`,
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
      const response = await fetch(`http://localhost:3001/getUsuarioMayorVentas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setUsuarioMayorVentas(data[0]);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getUsuarioMayorVentasPorMes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/getUsuarioMayorVentasPorMes?mes=${selectedMonth}&anno=${selectedYear}`,
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
      const response = await fetch(`http://localhost:3001/getUnidadesVendidas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setUnidadesVendidas(data[0]);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getUnidadesVendidasPorMes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/getUnidadesVendidasPorMes?mes=${selectedMonth}&anno=${selectedYear}`,
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
        `http://localhost:3001/getMontoVentasPorMes?anno=${selectedYear}`,
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
      const response = await fetch(`http://localhost:3001/getTopProductos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setTopProductos(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getTopProductosPorMes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/getTopProductosPorMes?mes=${selectedMonth}&anno=${selectedYear}`,
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
        `http://localhost:3001/getPorcentajeVentasComparadoMesAnterior?mes=${selectedMonth}&anno=${selectedYear}`,
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
        `http://localhost:3001/getPorcentajeProductosComparadoMesAnterior?mes=${selectedMonth}&anno=${selectedYear}`,
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
      <MDBox mb={1.5}>
        <div style={{ maxWidth: "1000px", display: "flex" }}>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-gift"></i>
            </span>
            <select
              id="servicios"
              className="form-select"
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value={-1}>Selecciona el mes</option>
              {meses.map((mes, index) => (
                <option key={index} value={index + 1}>
                  {mes}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa-solid fa-gift"></i>
            </span>
            <select
              id="servicios"
              className="form-select"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value={0}>Selecciona el año</option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={filtrarGraficos}
            style={{ margin: "0px 0px 15px 15px" }}
            className="btn btn-dark"
          >
            Filtrar
          </button>
        </div>
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Monto total de Ventas"
                count={
                  selectedMonth === -1 && selectedYear === 0
                    ? formatCurrency(montoTotalVentas)
                    : formatCurrency(montoTotalVentasPorMes)
                }
                percentage={{
                  color: porcentajeVentasMesAnterior >= 0 ? "success" : "error",
                  amount:
                    porcentajeVentasMesAnterior > 0
                      ? "+" + porcentajeVentasMesAnterior + "%"
                      : porcentajeVentasMesAnterior + "%",
                  label: "en comparación al mes pasado",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Valor promedio de los pedidos"
                count={
                  selectedMonth === -1 && selectedYear === 0
                    ? formatCurrency(valorPromedioPedido)
                    : formatCurrency(valorPromedioPedidoPorMes)
                }
                percentage={{
                  color: porcentajeVentasMesAnterior >= 0 ? "success" : "error",
                  amount:
                    porcentajeVentasMesAnterior > 0
                      ? "+" + porcentajeVentasMesAnterior + "%"
                      : porcentajeVentasMesAnterior + "%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Cliente Estrella"
                count={
                  selectedMonth === -1 && selectedYear === 0
                    ? usuarioMayorVentas
                      ? usuarioMayorVentas.nombre_usuario
                      : ""
                    : usuarioMayorVentasPorMes
                    ? usuarioMayorVentasPorMes.nombre_usuario
                    : ""
                }
                percentage={{
                  color: "success",
                  amount: `${formatCurrency(
                    selectedMonth === -1 && selectedYear === 0
                      ? usuarioMayorVentas
                        ? usuarioMayorVentas.total_ventas
                        : ""
                      : usuarioMayorVentasPorMes
                      ? usuarioMayorVentasPorMes.total_ventas
                      : ""
                  )}`,
                  label: "colones en total",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Unidades Vendidas"
                count={
                  selectedMonth === -1 && selectedYear === 0
                    ? unidadesVendidas.unidades_vendidas_por_mes
                    : unidadesVendidasPorMes.unidades_vendidas_por_mes
                }
                percentage={{
                  color: porcentajeProductosMesAnterior >= 0 ? "success" : "error",
                  amount:
                    porcentajeProductosMesAnterior > 0
                      ? "+" + porcentajeProductosMesAnterior + "%"
                      : porcentajeProductosMesAnterior + "%",
                  label: "en comparación al mes pasado",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Monto Total de Ventas por Mes"
                  description="Comparacion entre meses"
                  date="Actual"
                  chart={{
                    labels: ventasPorMes.map((venta) => venta.mes),
                    datasets: {
                      label: "Monto de Ventas",
                      data: ventasPorMes.map((venta) => venta.total_ventas),
                    },
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Pie
                  data={{
                    labels:
                      selectedMonth === -1 && selectedYear === 0
                        ? topProductos.map((producto) => producto.nombre_producto)
                        : topProductosPorMes.map((producto) => producto.nombre_producto),
                    datasets: [
                      {
                        label: "Uniades Vendidas: ",
                        data:
                          selectedMonth === -1 && selectedYear === 0
                            ? topProductos.map((producto) => producto.cantidad_vendida)
                            : topProductosPorMes.map((producto) => producto.cantidad_vendida),
                        backgroundColor: [
                          "#8884d8",
                          "#82ca9d",
                          "#ffc658",
                          "#d8a34a",
                          "#d84a4a",
                          "#4a4ad8",
                          "#4ad8d8",
                          "#d84ad8",
                        ],
                        borderColor: "black",
                        borderWidth: 2,
                      },
                    ],
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Line
                  data={{
                    labels:
                      selectedMonth === -1 && selectedYear === 0
                        ? topProductos.map((producto) => producto.nombre_producto)
                        : topProductosPorMes.map((producto) => producto.nombre_producto),
                    datasets: [
                      {
                        label: "Uniades Vendidas: ",
                        data:
                          selectedMonth === -1 && selectedYear === 0
                            ? topProductos.map((producto) => producto.cantidad_vendida)
                            : topProductosPorMes.map((producto) => producto.cantidad_vendida),
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        pointBackgroundColor: "black",
                        tension: 0.1,
                      },
                    ],
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
