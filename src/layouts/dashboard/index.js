// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { doc } from "prettier";

/* prettier-ignore */
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [operation, setOperation] = useState(0);
  const [title, setTitle] = useState('');
  const [cantidad_en_stock, setCantidad_en_stock] = useState(0);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getProducts();
  }, [products]);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products", {
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

  const openModal = (op, id, nombre, descripcion, precio, cantidad_en_stock, file) => {
    setId('');
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCantidad_en_stock('');
    setFile(null);
    if (op === 1) {
      setTitle('Nuevo producto');
      setOperation(1);
    } else if (op === 2) {
      setTitle('Editar producto');
      setId(id);
      setNombre(nombre);
      setDescripcion(descripcion);
      setPrecio(precio);
      setCantidad_en_stock(cantidad_en_stock);
      setFile(file);
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
    else if (cantidad_en_stock === '') {
      alert('La cantidad en stock es obligatorio', 'warning');
      return false;
    } else {
      if (operation === 1) {
        parametros = { nombre: nombre.trim(), descripcion: descripcion.trim(), precio: precio, cantidad_en_stock: cantidad_en_stock, imagen: file };
      } else if (operation === 2) {
        parametros = { id: id, nombre: nombre.trim(), descripcion: descripcion.trim(), precio: precio, cantidad_en_stock: cantidad_en_stock, imagen: file }
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
          "http://localhost:3000/editProduct",
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
              "cantidad_en_stock": parametros.cantidad_en_stock,
              "imagen": parametros.file
            })
          }
        );

        if (response.ok) {
          Swal.fire({
            title: 'Edicion Exitosa!',
            text: 'Producto editado exitosamente',
            icon: 'success',
            timer: 1500,
            position: 'top-end',
          }).then((result) => {
            document.getElementById('btnCerrar').click();
            getProducts();
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

        const formData = new FormData();
        formData.append('imagen', file);
        formData.append('nombre', parametros.nombre);
        formData.append('descripcion', parametros.descripcion);
        formData.append('precio', parametros.precio);
        formData.append('cantidad_en_stock', parametros.cantidad_en_stock);


        const response = await fetch(
          "http://localhost:3000/addProduct",
          {
            method: "POST",
            body: formData
          }
        );

        if (response.ok) {
          Swal.fire({
            title: 'Registro Exitoso!',
            text: 'Producto agregado exitosamente',
            icon: 'success',
            timer: 1500,
            position: 'top-end',
          }).then((result) => {
            document.getElementById('btnCerrar').click();
            getProducts();
            document.getElementById('imagenProducto').value = null;
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

  const onDeleteProduct = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3000/deleteProduct",
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

  const deleteProduct = async (id) => {
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
        onDeleteProduct(id);
        getProducts();
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
            <button onClick={() => openModal(1)} className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalProducts">
              <i className="fa-solid fa-circle-plus">Agregar</i>
            </button>
          </div>
        </div>
      </div>
      <MDBox py={3} style={{ display: 'flex', width: '100%' }}>
        <div className="container-fluid d-flex justify-content-center">
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="card mb-3 mx-auto" style={{ maxWidth: '390px', minWidth: '270px', width: '270px' }}>
                <div className="card">
                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h4 className="card-title" style={{ textAlign: 'center' }}>{product.nombre}</h4>
                    <p className="card-text">{product.descripcion}</p>
                    <p className="card-text"><small className="text-body-secondary">Precio: {product.precio}</small></p>
                    <p className="card-text"><small className="text-body-secondary">Productos restantes: {product.cantidad_en_stock}</small></p>
                  </div>
                </div>
                <div className="buttons" style={{ textAlign: 'center', padding: '10px' }}>
                  <button onClick={() => openModal(2, product.id, product.nombre, product.descripcion, product.precio, product.cantidad_en_stock)}
                    className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducts" style={{ marginRight: '20px' }}>
                    Editar
                  </button>
                  <button onClick={() => deleteProduct(product.id)} className="btn btn-danger" style={{ color: 'black' }}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div >
      </MDBox >
      <div id="modalProducts" className="modal fade" aria-hidden="true" style={{ zIndex: '9999' }}>
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
                <input type="text" id="cantidad_en_stock" className="form-control" placeholder="Cantidad en Stock" value={cantidad_en_stock}
                  onChange={(e) => setCantidad_en_stock(e.target.value)}></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type="file" id="imagenProducto" name="file" className="form-control" onChange={(e) => setFile(e.target.files[0])}></input>
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

export default Dashboard;
