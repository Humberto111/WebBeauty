import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { redirect } from "react-router-dom";

function Tables() {
  //const { columns, rows } = authorsTableData();
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [nombre, setNombre] = useState("");
  const [operation, setOperation] = useState(0);

  useEffect(() => {
    getProducts();
  }, [products]);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/obtenerCategoriasProductos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const openModal = (op, id, nombre) => {
    setId("");
    setNombre("");
    if (op === 1) {
      setTitle("Nueva categoría");
      setOperation(1);
    } else if (op === 2) {
      setTitle("Editar categoría");
      setId(id);
      setNombre(nombre);
      setOperation(2);
    }
    window.setTimeout(() => {
      document.getElementById("nombre").focus();
    }, 500);
  };

  const validar = () => {
    var parametros;
    if (nombre.trim() === "") {
      alert("El nombre es obligatorio", "warning");
      return false;
    } else {
      if (operation === 1) {
        parametros = { nombre: nombre.trim() };
      } else if (operation === 2) {
        parametros = { id: id, nombre: nombre.trim() };
      } else {
        return false;
      }
      enviarSolicitud(parametros);
    }
  };

  const enviarSolicitud = async (parametros) => {
    if (operation === 2) {
      try {
        const response = await fetch("http://localhost:3001/editarCategoriaProducto", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: parametros.id,
            nombre: parametros.nombre,
          }),
        });

        if (response.ok) {
          document.getElementById("btnCerrar").click();
          getProducts();
        } else {
          console.log("Error al editar");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else if (operation === 1) {
      try {
        const response = await fetch("http://localhost:3001/agregarCategoriaProducto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: parametros.nombre,
          }),
        });

        if (response.ok) {
          document.getElementById("btnCerrar").click();
          getProducts();
        } else {
          console.log("Error al agregar");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else {
      return false;
    }
  };

  const onDeleteProduct = async (id) => {
    try {
      const response = await fetch("http://localhost:3001/eliminarCategoriaProducto", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const deleteProduct = async (id) => {
    onDeleteProduct(id);
    getProducts();
  };

  const createCheckoutSession = async (id) => {
    try {
      debugger;
      const response = await fetch("http://localhost:3001/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "id",
        }),
      });
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      //si la respuesta es correcta, se redirecciona a la página de stripe
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user === null) {
      //quiero redireccionar a la página de login
      window.location.href = "/sign-in";
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Categoría de productos
                  <button
                    onClick={() => openModal(1)}
                    className="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#modalProducts"
                  >
                    <i className="fa-solid fa-circle-plus">Agregar</i>
                  </button>
                  <button onClick={() => createCheckoutSession(1)} className="btn btn-dark">
                    <i className="fa-solid fa-circle-plus">Pasarela de pago</i>
                  </button>
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "ID", accessor: "function", align: "left" },
                      { Header: "Nombre", accessor: "employed", align: "center" },
                      { Header: "Acción", accessor: "action", align: "center" },
                    ],
                    rows: products.map((product) => ({
                      function: product.id,
                      employed: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {product.nombre}
                        </MDTypography>
                      ),
                      action: (
                        <MDBox
                          display="flex"
                          alignItems="center"
                          mt={{ xs: 2, sm: 0 }}
                          ml={{ xs: -1.5, sm: 0 }}
                        >
                          <MDBox mr={1}>
                            <MDButton
                              variant="text"
                              color="error"
                              onClick={() => deleteProduct(product.id)}
                            >
                              <Icon>delete</Icon>&nbsp;Eliminar
                            </MDButton>
                          </MDBox>
                          <MDButton
                            variant="text"
                            color="dark"
                            onClick={() => openModal(2, product.id, product.nombre)}
                            data-bs-toggle="modal"
                            data-bs-target="#modalProducts"
                          >
                            <Icon>edit</Icon>&nbsp;Editar
                          </MDButton>
                        </MDBox>
                      ),
                    })),
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <div id="modalProducts" className="modal fade" aria-hidden="true" style={{ zIndex: "9999" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={() => validar()} className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk"></i> Guardar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="btnCerrar"
                type="button"
                className="btn btn-seconday"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;