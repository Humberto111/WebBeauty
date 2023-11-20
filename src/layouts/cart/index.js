import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
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

const Dashboard = () => {
  const [productsStored, setProductsStored] = useState([]);
  const [usuarioLogeado, setUsuarioLogeado] = useState([]);

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem("users"));
    setUsuarioLogeado(userStored);
  }, []);

  useEffect(() => {
    if (usuarioLogeado.id) {
      getProductsOnCart();
    }
  }, [usuarioLogeado]);

  const getProductsOnCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/shopping_cart?id_usuario=${usuarioLogeado.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setProductsStored(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const onDeleteProduct = async (idProducto) => {
    try {
      const response = await fetch("http://localhost:3001/deleteShopping_cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: usuarioLogeado.id,
          id_producto: idProducto,
        }),
      });
      getProductsOnCart();
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const deleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteProduct(id);
      }
    });
  };

  const sumar = (index) => {
    setProductsStored((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = updatedProducts[index];

      if (product && product.cantidad_en_stock > 1) {
        product.cantidad += 1;
        product.cantidad_en_stock -= 1;
      } else {
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: "Producto agotado!",
        });
      }

      return updatedProducts;
    });
  };

  const restar = (index) => {
    setProductsStored((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = updatedProducts[index];

      if (product && product.cantidad > 1) {
        product.cantidad -= 1;
        product.cantidad_en_stock += 1;
      } else {
        Swal.fire({
          icon: "info",
          title: "Cantidad minima",
          text: "La cantidad minima es 1, si deseas borrar el producto del carrito, por favor presiona el boton!",
        });
      }

      return updatedProducts;
    });
  };

  const createCheckoutSession = async () => {
    try {
      const response = await fetch("http://localhost:3001/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productos: productsStored,
        }),
      });
      const data = await response.json();
      console.log(data);
      window.location.href = data.url;
    } catch (error) {
      //si la respuesta es correcta, se redirecciona a la página de stripe
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
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Precio unitario</th>
              <th scope="col">Productos Restantes</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Acciones</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {productsStored.map((product, index) => (
              <tr key={product.id}>
                <td>{product.nombre}</td>
                <td>{product.descripcion}</td>
                <td>{formatCurrency(product.precio)}</td>
                <td>{product.cantidad_en_stock}</td>
                <td>
                  <div>
                    <input
                      type="number"
                      value={product.cantidad}
                      style={{ width: "7vh", textAlign: "center", border: "none" }}
                      disabled
                      id="cantidadProducto"
                      onChange={(e) => {}}
                    />
                    <br />
                    <button onClick={() => sumar(index)}>
                      <AddIcon />
                    </button>
                    <button onClick={() => restar(index)}>
                      <RemoveIcon />
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="btn btn-danger"
                    style={{ color: "black" }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
                <td>{formatCurrency(product.precio * product.cantidad)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5"></td>
              <td style={{ textAlign: "right" }}>Total productos</td>
              <td>
                {formatCurrency(
                  productsStored.reduce(
                    (total, product) => total + product.precio * product.cantidad,
                    0
                  )
                )}
              </td>
            </tr>
            <tr>
              <td colSpan="5"></td>
              <td style={{ textAlign: "right" }}>Descuento</td>
              <td>{formatCurrency(0)}</td>
            </tr>
            <tr>
              <td colSpan="5"></td>
              <td style={{ textAlign: "right" }}>Total</td>
              <td>
                {formatCurrency(
                  productsStored.reduce(
                    (total, product) => total + product.precio * product.cantidad,
                    0
                  )
                )}
              </td>
            </tr>
            <tr>
              <td colSpan="6"></td>
              <td>
                <button
                  style={{
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    padding: "10px 20px",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
                  onClick={(e) => createCheckoutSession()}
                >
                  FNALIZAR PEDIDO
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;
