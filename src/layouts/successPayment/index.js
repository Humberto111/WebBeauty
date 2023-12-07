import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

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
          <a onClick={(e) => console.log("yeees")} style={styles.link}>
            Descargar Comprobante
          </a>
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;
