import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

//Llena el arreglo con datos random de numeros
var beneficios = [0, 56, 45, 50, 60, 70, 80, 90, 100, 110, 120, 130];
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

const Graficos = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h2" fontWeight="medium">
          Graficos
        </MDTypography>
      </MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" fontWeight="medium">
                Beneficios
              </MDTypography>
            </MDBox>
            <ReportsLineChart />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" fontWeight="medium">
                Ventas
              </MDTypography>
            </MDBox>
            <ReportsLineChart />
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
};

export default Graficos;
