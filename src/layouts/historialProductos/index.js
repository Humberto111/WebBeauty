import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
      <div className="container mt-5">
        <table className="table" style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Precio unitario</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Fecha</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {historialProductos.map((product, index) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={"https://web-beauty-api-638331a8cfae.herokuapp.com/" + product.imagen}
                    alt={product.nombre}
                    style={{ width: "130px" }}
                  />
                </td>
                <td>{product.nombre}</td>
                <td>{product.descripcion}</td>
                <td>{formatCurrency(product.precio)}</td>
                <td>{product.cantidad}</td>
                <td>{formatDate(product.fecha_venta).replace(",", " ")}</td>
                <td>{formatCurrency(product.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;
