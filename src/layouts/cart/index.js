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

const Dashboard = () => {
  const [productsStored, setProductsStored] = useState([]);
  const [usuarioLogeado, setUsuarioLogeado] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [total, setTotal] = useState(0);
  const [retrieveProducts, setRetrieveProducts] = useState([]);

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem("users"));
    setUsuarioLogeado(userStored);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (usuarioLogeado.id) {
        await getProductsOnCart();
      }
    };

    fetchData();
  }, [usuarioLogeado]);

  useEffect(() => {
    verificarCompra();
  }, [productsStored]);

  const verificarCompra = async () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const compraRealizada = params.get("compra_realizada");

    if (compraRealizada === "1") {
      const fechaActual = new Date();
      const anno = fechaActual.getFullYear();
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
      const dia = fechaActual.getDate().toString().padStart(2, "0");
      const fechaFormateada = `${anno}-${mes}-${dia}`;

      if (productsStored.length > 0) {
        console.log(productsStored);
        try {
          const response = await fetch("http://localhost:3001/addSale", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productos: productsStored,
              id_usuario: usuarioLogeado.id,
              fecha_venta: fechaFormateada,
              descuento: descuento,
              subtotal: subtotal,
              total: total,
            }),
          });
          const data = await response.json();
        } catch (error) {
          console.error("Error de red:", error);
        }

        const productsRetrieved = JSON.parse(localStorage.getItem("products"));
        for (const product of productsRetrieved) {
          console.log("aqui edita la cantidad en stock");
          console.log(product);
          try {
            const response = await fetch("http://localhost:3001/editProduct", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: product.id,
                cantidad_en_stock: product.cantidad_en_stock.toString(),
              }),
            });
            onDeleteProduct(product.id);
          } catch (error) {
            console.error("Error de red:", error);
          }
        }

        window.location.href = "/dashboard";
      } else {
        return false;
      }
    }
  };

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

      // Verificar si hay datos antes de actualizar el estado
      if (Array.isArray(data) && data.length > 0) {
        data.map((item) => {
          if (item.cantidad_en_stock > 0) {
            item.cantidad_en_stock -= 1;
          }
          return false;
        });

        setProductsStored(data);
        updateTotals(data);
      } else {
        // Puedes manejar el caso donde los datos están vacíos
        console.log("No hay datos disponibles");
      }
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

  const deleteProduct = (id) => {
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

      if (product && product.cantidad_en_stock > 0) {
        product.cantidad += 1;
        product.cantidad_en_stock -= 1;
        console.log(product.cantidad_en_stock);
      } else {
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: "Producto agotado!",
        });
      }

      updateTotals(updatedProducts);
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
        console.log(product.cantidad_en_stock);
      } else {
        Swal.fire({
          icon: "info",
          title: "Cantidad minima",
          text: "La cantidad minima es 1, si deseas borrar el producto del carrito, por favor presiona el boton!",
        });
      }

      updateTotals(updatedProducts);
      return updatedProducts;
    });
  };

  const updateTotals = (updatedProducts) => {
    const newSubtotal = updatedProducts.reduce(
      (acc, product) => acc + product.precio * product.cantidad,
      0
    );

    setSubtotal(newSubtotal);
    setTotal(newSubtotal - descuento);
  };

  const finalizarPedido = async () => {
    localStorage.setItem("products", JSON.stringify(productsStored));
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
              <td id="montoSubtotal">
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
              <td id="montoDescueto">{formatCurrency(0)}</td>
            </tr>
            <tr>
              <td colSpan="5"></td>
              <td style={{ textAlign: "right" }}>Total</td>
              <td id="montoTotal">
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
                  onClick={(e) => finalizarPedido()}
                >
                  FINALIZAR PEDIDO
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
