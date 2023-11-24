import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// ReportsLineChart configurations
import configs from "examples/Charts/LineCharts/ReportsLineChart/configs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

var beneficios = [0, 56, 45, 50, 60, 70, 80, 90, 100, 85, 120, 70];
var meses = [
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

var midata = {
  labels: meses,
  datasets: [
    {
      label: "Beneficios",
      data: beneficios,
      fill: false,
      backgroundColor: "#FF0000",
      borderColor: "#FF0000",
      pointRadius: 5,
      pointBorderColor: "#FF0000",
      pointBackgroundColor: "#FF0000",
    },
  ],
};

const misoptions = {};

export default function ReportsLineChart() {
  return <Line data={midata} options={misoptions} />;
}
