import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [estilistas, setEstilistas] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [title, setTitle] = useState("");
  const [operation, setOperation] = useState(0);

  useEffect(() => {
    getEstilistas();
  }, [estilistas]);

  const getEstilistas = async () => {
    try {
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/estilistas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setEstilistas(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const openModal = (op, id, nombre, apellido, telefono, direccion, email, descripcion) => {
    setId("");
    setNombre("");
    setApellido("");
    setTelefono("");
    setDireccion("");
    setEmail("");
    setDescripcion("");
    if (op === 1) {
      setTitle("Nuevo Estilista");
      setOperation(1);
    } else if (op === 2) {
      setTitle("Editar Estilista");
      setId(id);
      setNombre(nombre);
      setApellido(apellido);
      setTelefono(telefono);
      setDireccion(direccion);
      setEmail(email);
      setDescripcion(descripcion);
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
    } else if (apellido.trim() === "") {
      alert("El apellido es obligatorio", "warning");
      return false;
    } else if (telefono.trim() === "") {
      alert("El telefono es obligatorio", "warning");
      return false;
    } else if (direccion.trim() === "") {
      alert("La direccion es obligatorio", "warning");
      return false;
    } else if (email.trim() === "") {
      alert("El email es obligatorio", "warning");
      return false;
    } else if (descripcion.trim() === "") {
      alert("La descripcion es obligatorio", "warning");
      return false;
    } else {
      if (operation === 1) {
        parametros = {
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          telefono: telefono.trim(),
          direccion: direccion.trim(),
          email: email.trim(),
          descripcion: descripcion.trim(),
        };
      } else if (operation === 2) {
        parametros = {
          id: id,
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          telefono: telefono.trim(),
          direccion: direccion.trim(),
          email: email.trim(),
          descripcion: descripcion.trim(),
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
          "https://web-beauty-api-638331a8cfae.herokuapp.com/editEstilista",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: parametros.id,
              nombre: parametros.nombre,
              apellido: parametros.apellido,
              telefono: parametros.telefono,
              direccion: parametros.direccion,
              email: parametros.email,
              descripcion: parametros.descripcion,
            }),
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "Edicion Exitosa!",
            text: "Estilista editado exitosamente",
            icon: "success",
            timer: 1500,
            position: "top-end",
          }).then((result) => {
            document.getElementById("btnCerrar").click();
            getEstilistas();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal en el Editar. Inténtalo nuevamente!",
          });
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else if (operation === 1) {
      try {
        const response = await fetch(
          "https://web-beauty-api-638331a8cfae.herokuapp.com/addEstilista",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: parametros.nombre,
              apellido: parametros.apellido,
              telefono: parametros.telefono,
              direccion: parametros.direccion,
              email: parametros.email,
              descripcion: parametros.descripcion,
            }),
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "Registro Exitoso!",
            text: "Estilista agregado exitosamente",
            icon: "success",
            timer: 1500,
            position: "top-end",
          }).then((result) => {
            document.getElementById("btnCerrar").click();
            getEstilistas();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal en el Registro. Inténtalo nuevamente!",
          });
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else {
      return false;
    }
  };

  const onDeleteEstilista = async (id) => {
    try {
      const response = await fetch(
        "https://web-beauty-api-638331a8cfae.herokuapp.com/deleteEstilista",
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

  const deleteEstilista = async (id) => {
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
        onDeleteEstilista(id);
        getEstilistas();
      }
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={2}
          p={2}
          mb={1}
          textAlign="center"
        >
          <button
            onClick={() => openModal(1)}
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#modalEstilistas"
          >
            <i className="fa-solid fa-circle-plus">Agregar</i>
          </button>
        </MDBox>
      </Card>
      <Grid container spacing={6}>
        <Grid item xs={12} style={{ overflowY: "auto" }}>
          <MDBox pt={3}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Email</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estilistas.map((estilista) => (
                  <tr key={estilista.id}>
                    <td>{estilista.nombre}</td>
                    <td>{estilista.apellido}</td>
                    <td>{estilista.telefono}</td>
                    <td>{estilista.direccion}</td>
                    <td>{estilista.email}</td>
                    <td>{estilista.descripcion}</td>
                    <td>
                      <button
                        onClick={() =>
                          openModal(
                            2,
                            estilista.id,
                            estilista.nombre,
                            estilista.apellido,
                            estilista.telefono,
                            estilista.direccion,
                            estilista.email,
                            estilista.descripcion
                          )
                        }
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEstilistas"
                        style={{ marginRight: "20px" }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteEstilista(estilista.id)}
                        className="btn btn-danger"
                        style={{ color: "black" }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MDBox>
        </Grid>
      </Grid>
      <div
        id="modalEstilistas"
        className="modal fade"
        aria-hidden="true"
        style={{ zIndex: "9999" }}
      >
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
                  id="apellido"
                  className="form-control"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="telefono"
                  className="form-control"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="direccion"
                  className="form-control"
                  placeholder="Dirección"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
};

export default Dashboard;
