// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useEffect, useState } from "react";
import { doc } from "prettier";
import Swal from "sweetalert2";

/* prettier-ignore */
const ServicesDashboard = () => {
  const [services, setServices] = useState([]);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [operation, setOperation] = useState(0);
  const [title, setTitle] = useState('');
  const [categoria, setCategoria] = useState('');
  const [duracion, setDuracion] = useState('');
  const [disponibilidad, setDisponibilidad] = useState('');

  useEffect(() => {
    getServices();
  }, [services]);

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:3001/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const openModal = (op, id, nombre, descripcion, precio, categoria, duracion, disponibilidad) => {
    setId('');
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCategoria('');
    setDuracion('');
    setDisponibilidad('');
    if (op === 1) {
      setTitle('Nuevo Servicio');
      setOperation(1);
    } else if (op === 2) {
      setTitle('Editar Servicio');
      setId(id);
      setNombre(nombre);
      setDescripcion(descripcion);
      setPrecio(precio);
      setCategoria(categoria);
      setDuracion(duracion);
      setDisponibilidad(disponibilidad);
      setOperation(2);
    }
    window.setTimeout(() => {
      document.getElementById('nombre').focus();
    }, 500);
  }

  const validar = () => {
    var parametros;
    if (nombre.trim() === '') {
      alert('El nombre es obligatorio', 'warning');
      return false;
    }
    else if (descripcion.trim() === '') {
      alert('La descripcion es obligatorio', 'warning');
      return false;
    }
    else if (precio === '') {
      alert('El precio es obligatorio', 'warning');
      return false;
    }
    else if (categoria === '') {
      alert('La categoría en stock es obligatorio', 'warning');
      return false;
    }
    else if (duracion === '') {
        alert('La duración en stock es obligatorio', 'warning');
        return false;
    }
    else if (disponibilidad === '') {
        alert('La disponibilidad es obligatoria', 'warning');
        return false;
    } else {
      if (operation === 1) {
        parametros = { nombre: nombre.trim(), descripcion: descripcion.trim(), precio, categoria: categoria.trim(), duracion: duracion.trim(), disponibilidad: disponibilidad.trim()};
      } else if (operation === 2) {
        parametros = { id: id, nombre: nombre.trim(), descripcion: descripcion.trim(), precio, categoria: categoria.trim(), duracion: duracion.trim(), disponibilidad: disponibilidad.trim()}
      }
      else {
        return false;
      }
      enviarSolicitud(parametros);
    }
  }

  const enviarSolicitud = async (parametros) => {
    if (operation === 2) {
      try {
        const response = await fetch(
          "http://localhost:3000/editService",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "id": parametros.id,
              "nombre": parametros.nombre,
              "precio": parametros.precio,
              "descripcion": parametros.descripcion,
              "categoria": parametros.categoria,
              "duracion": parametros.duracion,
              "disponibilidad": parametros.disponibilidad,
            })
          }
        );

        if (response.ok) {
          Swal.fire({
            title: 'Edicion Exitosa!',
            text: 'Servicio editado exitosamente',
            icon: 'success',
            timer: 1500,
            position: 'top-end',
          }).then((result) => {
            document.getElementById('btnCerrar').click();
            getServices();
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal en el Editar. Intentalo nuevamente!',
          })
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else if (operation === 1) {
      try {
        const response = await fetch(
          "http://localhost:3001/addService",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "nombre": parametros.nombre,
              "precio": parametros.precio,
              "descripcion": parametros.descripcion,
              "categoria": parametros.categoria,
              "disponibilidad": parametros.disponibilidad,
              "duracion": parametros.duracion,
            })
          }
        );

        if (response.ok) {
          Swal.fire({
            title: 'Registro Exitoso!',
            text: 'Servicio agregado exitosamente',
            icon: 'success',
            timer: 1500,
            position: 'top-end',
          }).then((result) => {
            document.getElementById('btnCerrar').click();
            getServices();
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal en el Registro. Intentalo nuevamente!',
          })
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else {
      return false;
    }
  }

  const onDeleteService = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3001/deleteService",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "id": id
          })
        }
      );
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const deleteService = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteService(id);
        getServices();
      }
    })
  }

  // En el siguiente codigo se necesitan los grids si o si para que funcione ---->> Humberto
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="row mt-3">
        <div className="col-md-4 offset-md-4">
          <div className="d-grid mx-auto">
            <button onClick={() => openModal(1)} className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalServices">
              <i className="fa-solid fa-circle-plus">Agregar</i>
            </button>
          </div>
        </div>
      </div>
      <MDBox py={3} style={{ display: 'flex', width: '100%' }}>
        <div className="container-fluid d-flex justify-content-center">
          <div className="row">
            {services.map((service) => (
              <div key={service.id} className="card mb-3 mx-auto" style={{ maxWidth: '390px', minWidth: '270px', width: '270px' }}>
                <div className="card">
                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h4 className="card-title" style={{ textAlign: 'center' }}>{service.nombre}</h4>
                    <p className="card-text">{service.descripcion}</p>
                    <p className="card-text"><small className="text-body-secondary">Precio: {service.precio}</small></p>
                    <p className="card-text"><small className="text-body-secondary">Categoría: {service.categoria}</small></p>
                    <p className="card-text"><small className="text-body-secondary">Duración: {service.duracion}</small></p>
                    <p className="card-text"><small className="text-body-secondary">Disponibilidad: {service.disponibilidad}</small></p>
                  </div>
                </div>
                <div className="buttons" style={{ textAlign: 'center', padding: '10px' }}>
                  <button onClick={() => openModal(2, service.id, service.nombre, service.descripcion, service.precio, service.categoria, service.duracion, service.disponibilidad)}
                    className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalServices" style={{ marginRight: '20px' }}>
                    Editar
                  </button>
                  <button onClick={() => deleteService(service.id)} className="btn btn-danger" style={{ color: 'black' }}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div >
      </MDBox >
      <div id="modalServices" className="modal fade" aria-hidden="true" style={{ zIndex: '9999' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type="text" id="nombre" className="form-control" placeholder="Nombre" value={nombre}
                  onChange={(e) => setNombre(e.target.value)}></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type="text" id="descripcion" className="form-control" placeholder="Descripción" value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type="text" id="precio" className="form-control" placeholder="Precio" value={precio}
                  onChange={(e) => setPrecio(e.target.value)}></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type="text" id="categoria" className="form-control" placeholder="Categoría" value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type="text" id="duracion" className="form-control" placeholder="Duración" value={duracion}
                  onChange={(e) => setDuracion(e.target.value)}></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type="text" id="disponibilidad" className="form-control" placeholder="Disponibilidad" value={disponibilidad}
                  onChange={(e) => setDisponibilidad(e.target.value)}></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={() => validar()} className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk"></i> Gaurdar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button id="btnCerrar" type="button" className="btn btn-seconday" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </DashboardLayout >
  );
};

export default ServicesDashboard;
