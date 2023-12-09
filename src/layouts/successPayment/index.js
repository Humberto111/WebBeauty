import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "auto",
  },
  icon: {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#666",
    marginBottom: "20px",
  },
  thankYou: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "400px",
    margin: "auto",
  },
  link: {
    display: "inline-block",
    padding: "8px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
};

const Dashboard = () => {
  const [usuarioLogeado, setUsuarioLogeado] = useState([]);
  const [comprobante, setComprobante] = useState([]);

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem("users"));
    setUsuarioLogeado(userStored);
  }, []);

  useEffect(() => {
    getComprobante();
  }, [usuarioLogeado]);

  const getComprobante = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/comprobante?id_usuario=${usuarioLogeado.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setComprobante(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const imprimirComprobante = () => {
    const doc = new jsPDF();

    const fechaActual = new Date();

    const dia = String(fechaActual.getDate()).padStart(2, "0");
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const año = fechaActual.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${año}`;

    doc.autoTable({
      head: [["Gracias por su compra", `${fechaFormateada}`]],
    });

    doc.autoTable({
      head: [["Cliente", "Correo electrónico"]],
      body: [
        [
          `${comprobante[0].id_usuario} - ${comprobante[0].nombre_usuario} ${comprobante[0].apellido_usuario}`,
          comprobante[0].email_usuario,
        ],
      ],
    });

    doc.autoTable({
      head: [["Artículo", "Nombre", "Descripción", "Precio", "Cantidad"]],
      body: comprobante.map((item) => [
        item.id_producto,
        item.nombre_producto,
        item.descripcion_producto,
        item.precio_producto,
        item.cantidad_producto,
      ]),
    });

    doc.autoTable({
      head: [["Subtotal", "Descuento", "Total"]],
      body: [[comprobante[0].subtotal, comprobante[0].descuento, comprobante[0].total]],
    });

    doc.save("comprobante.pdf");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={styles.container}>
        <img src="https://via.placeholder.com/150" alt="Checkmark Icon" style={styles.icon} />
        <h1 style={styles.heading}>¡Gracias por tu compra!</h1>
        <p style={styles.text}>
          ¡Tu pedido ha sido procesado con éxito! Estamos emocionados de tenerte como nuestro
          cliente. Recibirás una confirmación por correo electrónico en breve.
        </p>
        <p style={styles.thankYou}>¡Gracias por elegirnos!</p>
        <div style={styles.buttonContainer}>
          <a href="/dashboard" style={styles.link}>
            Seguir Comprando
          </a>
          <a onClick={imprimirComprobante} style={styles.link}>
            Descargar Comprobante
          </a>
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;
