import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ServicesDashboard = () => {
  const [services, setServices] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [operation, setOperation] = useState(0);
  const [title, setTitle] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    getServices();
  }, [services]);

  const getServices = async () => {
    try {
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      setServices(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const openModal = (op, id, nombre, descripcion, precio, categoria) => {
    setId("");
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCategoria("");
    if (op === 1) {
      setTitle("Nuevo Servicio");
      setOperation(1);
    } else if (op === 2) {
      setTitle("Editar Servicio");
      setId(id);
      setNombre(nombre);
      setDescripcion(descripcion);
      setPrecio(precio);
      setCategoria(categoria);
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
    } else if (descripcion.trim() === "") {
      alert("La descripcion es obligatorio", "warning");
      return false;
    } else if (precio === "") {
      alert("El precio es obligatorio", "warning");
      return false;
    } else if (categoria === "") {
      alert("La categoría en stock es obligatorio", "warning");
      return false;
    } else {
      if (operation === 1) {
        parametros = {
          nombre: nombre.trim(),
          descripcion: descripcion.trim(),
          precio,
          categoria: categoria.trim(),
        };
      } else if (operation === 2) {
        parametros = {
          id: id,
          nombre: nombre.trim(),
          descripcion: descripcion.trim(),
          precio,
          categoria: categoria.trim(),
        };
      } else {
        return false;
      }
      enviarSolicitud(parametros);
    }
  };

  const enviarSolicitud = async (parametros) => {
    if (operation === 2) {
      try {
        const response = await fetch(
          "https://web-beauty-api-638331a8cfae.herokuapp.com/editService",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: parametros.id,
              nombre: parametros.nombre,
              precio: parametros.precio,
              descripcion: parametros.descripcion,
              categoria: parametros.categoria,
            }),
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "Edicion Exitosa!",
            text: "Servicio editado exitosamente",
            icon: "success",
            timer: 500,
            position: "top-end",
            toast: true,
          }).then((result) => {
            document.getElementById("btnCerrar").click();
            getServices();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal en el Editar. Intentalo nuevamente!",
          });
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else if (operation === 1) {
      try {
        const response = await fetch(
          "https://web-beauty-api-638331a8cfae.herokuapp.com/addService",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: parametros.nombre,
              precio: parametros.precio,
              descripcion: parametros.descripcion,
              categoria: parametros.categoria,
            }),
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "Registro Exitoso!",
            text: "Servicio agregado exitosamente",
            icon: "success",
            timer: 500,
            position: "top-end",
            toast: true,
          }).then((result) => {
            document.getElementById("btnCerrar").click();
            getServices();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal en el Registro. Intentalo nuevamente!",
          });
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else {
      return false;
    }
  };

  const onDeleteService = async (id) => {
    try {
      const response = await fetch(
        "https://web-beauty-api-638331a8cfae.herokuapp.com/deleteService",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      );
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const deleteService = async (id) => {
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
        onDeleteService(id);
        getServices();
      }
    });
  };

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
                  Tipo de productos
                  <button
                    style={{ marginLeft: "20px" }}
                    onClick={() => openModal(1)}
                    className="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#modalServices"
                  >
                    <i className="fa-solid fa-circle-plus">Agregar</i>
                  </button>
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "Nombre", accessor: "employed", align: "center" },
                      { Header: "Descripción", accessor: "description", align: "center" },
                      { Header: "Precio", accessor: "price", align: "center" },
                      { Header: "Categoría", accessor: "category", align: "center" },
                      { Header: "Acción", accessor: "action", align: "center" },
                    ],
                    rows: services.map((service) => ({
                      function: service.id,
                      employed: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {service.nombre}
                        </MDTypography>
                      ),
                      description: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {service.descripcion}
                        </MDTypography>
                      ),
                      price: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {service.precio}
                        </MDTypography>
                      ),
                      category: (
                        <MDTypography
                          component="a"
                          href="#"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        >
                          {service.categoria}
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
                              onClick={() => deleteService(service.id)}
                            >
                              <Icon>delete</Icon>&nbsp;Eliminar
                            </MDButton>
                          </MDBox>
                          <MDButton
                            variant="text"
                            color="dark"
                            onClick={() =>
                              openModal(
                                2,
                                service.id,
                                service.nombre,
                                service.descripcion,
                                service.precio,
                                service.categoria
                              )
                            }
                            data-bs-toggle="modal"
                            data-bs-target="#modalServices"
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
      <div id="modalServices" className="modal fade" aria-hidden="true">
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
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="descripcion"
                  className="form-control"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="precio"
                  className="form-control"
                  placeholder="Precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="categoria"
                  className="form-control"
                  placeholder="Categoría"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={() => validar()} className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk"></i> Gaurdar
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
};

export default ServicesDashboard;
