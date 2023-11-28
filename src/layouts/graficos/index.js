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
  const [montoTotalVentas, setMontoTotalVentas] = useState(0);
  const [valorPromedioPedido, setValorPromedioPedido] = useState(0);
  const [usuarioMayorVentas, setUsuarioMayorVentas] = useState([]);
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [unidadesVendidasPorMes, setUnidadesVendidasPorMes] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(11);
  const [selectedYear, setSelectedYear] = useState(2023);

  useEffect(() => {
    getVentas();
    getMontoTotalVentasPorMes();
    getValorPromedioPedidoPorMes();
    getUsuarioMayorVentasPorMes();
    getUnidadesVendidasPorMes();
    getMontoVentasPorMes();
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
      console.log(data);
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
      setMontoTotalVentas(data.monto_total_ventas);
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
      setValorPromedioPedido(data.valor_promedio_pedido);
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
      console.log(data[0]);
      setUsuarioMayorVentas(data[0]);
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
      console.log(data[0]);
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
      console.log("juejue ", data);
      setVentasPorMes(data);
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
    getUnidadesVendidasPorMes(selectedMonth, selectedYear);
    getUsuarioMayorVentasPorMes(selectedMonth, selectedYear);
    getValorPromedioPedidoPorMes(selectedMonth, selectedYear);
    getMontoTotalVentasPorMes(selectedMonth, selectedYear);
    getMontoVentasPorMes(selectedYear);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={1.5}>
        {
          //Necesito que en el siguiente div, se desplieguen todos los elementos dentro de el, de forma horizontal
        }
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
              <option>Selecciona el mes</option>
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
              <option>Selecciona el año</option>
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
                count={formatCurrency(montoTotalVentas)}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Valor promedio de los pedidos"
                count={formatCurrency(valorPromedioPedido)}
                percentage={{
                  color: "success",
                  amount: "+3%",
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
                count={usuarioMayorVentas ? usuarioMayorVentas.nombre_usuario : ""}
                percentage={{
                  color: "success",
                  amount: `${formatCurrency(
                    usuarioMayorVentas ? usuarioMayorVentas.total_ventas : ""
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
                count={unidadesVendidasPorMes.unidades_vendidas_por_mes}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
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
                <ReportsLineChart />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart />
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
