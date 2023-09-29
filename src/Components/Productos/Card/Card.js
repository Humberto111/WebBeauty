import React from 'react';
import './Card.css'; // Estilo CSS para la tarjeta
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


function ProductCard(producto) {

  const onEditProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000//productById",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "id": producto.id
          })
        }
      );

      if (response.ok) {
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };



  const onDeleteProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/DeleteProduct",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "id": producto.id
          })
        }
      );

      if (response.ok) {
        // El servidor respondió con éxito, puedes realizar acciones adicionales si es necesario
        Swal.fire({
          title: 'Eliminacion Exitosa!',
          text: 'Producto eliminado exitosamente',
          icon: 'success',
          timer: 1500,
          position: 'top-end',
        }).then((result) => {
          window.location.href = "/test";
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal. Intentalo nuevamente!',
        })
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="product-card">
      <img src="" alt="" className="product-card-image" />
      <div className="product-card-details">
        <p className="product-card-id">{producto.id}</p>
        <h2 className="product-card-title">{producto.nombre}</h2>
        <p className="product-card-description">{producto.descripcion}</p>
        <p className="product-card-price">{producto.precio}</p>
        <p className="product-card-stock">{producto.cantidad_en_stock}</p>
        <div>
            <button onClick={console.log(producto)} product={producto} className="product-card-button">Editar</button>
          <button onClick={onDeleteProduct} className="product-card-button">Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
