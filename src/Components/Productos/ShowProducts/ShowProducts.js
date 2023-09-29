import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../../../functions";
import "./ShowProducts.css";
import Navigation from "../../Navigation/Navigation";   

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [operation, setOperation] = useState(0);
    const [title, setTitle] = useState('');
    const [cantidad_en_stock, setCantidad_en_stock] = useState(0);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch(
                "https://web-beauty-api-638331a8cfae.herokuapp.com/products",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                },
            )

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const openModal = (op, id, nombre, descripcion, precio, cantidad_en_stock) => {
        setId('');
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setCantidad_en_stock('');
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
            setOperation(2);
        }
        window.setTimeout(() => {
            document.getElementById('nombre').focus();
        }, 500);
    }

    const validar = () => {
        var parametros;
        if (nombre.trim() === '') {
            show_alert('El nombre es obligatorio', 'warning');
            return false;
        }
        else if (descripcion.trim() === '') {
            show_alert('La descripcion es obligatorio', 'warning');
            return false;
        }
        else if (precio === '') {
            show_alert('El precio es obligatorio', 'warning');
            return false;
        }
        else if (cantidad_en_stock === '') {
            show_alert('La cantidad en stock es obligatorio', 'warning');
            return false;
        } else {
            if (operation === 1) {
                parametros = { nombre: nombre.trim(), descripcion: descripcion.trim(), precio: precio, cantidad_en_stock: cantidad_en_stock };
            } else if (operation === 2) {
                parametros = { id: id, nombre: nombre.trim(), descripcion: descripcion.trim(), precio: precio, cantidad_en_stock: cantidad_en_stock }
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
                    "https://web-beauty-api-638331a8cfae.herokuapp.com/editProduct",
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
                            "cantidad_en_stock": parametros.cantidad_en_stock
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
                const response = await fetch(
                    "https://web-beauty-api-638331a8cfae.herokuapp.com/addProduct",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "nombre": parametros.nombre,
                            "precio": parametros.precio,
                            "descripcion": parametros.descripcion,
                            "cantidad_en_stock": parametros.cantidad_en_stock
                        })
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
                "https://web-beauty-api-638331a8cfae.herokuapp.com/deleteProduct",
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
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Seguro que desea eliminar este producto?',
            icon: 'question', text: "No podras revertir esta acción",
            showCancelButton: true, confirmButtonText: 'Si, eliminar!', cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                onDeleteProduct(id);
                getProducts();
            } else {
                show_alert("Eliminación cancelada", "info");
            }
        })
    }

    return (
        <div className="show-products">
            <Navigation />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <button onClick={() => openModal(1)} className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalProducts">
                                <i className="fa-solid fa-circle-plus">Anadir</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>producto</th>
                                        <th>descripcion</th>
                                        <th>precio</th>
                                        <th>cantidad_en_stock</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.nombre}</td>
                                            <td>{product.descripcion}</td>
                                            <td>{product.precio}</td>
                                            <td>{product.cantidad_en_stock}</td>
                                            <td>
                                                <button onClick={() => openModal(2, product.id, product.nombre, product.descripcion, product.precio, product.cantidad_en_stock)}
                                                    className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducts">
                                                    <i className="fa-solid fa-edit"></i>
                                                </button>
                                                <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modalProducts" className="modal fade" aria-hidden="true">
                <div className="modal-dialog">
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
        </div>
    )
}

export default ShowProducts;