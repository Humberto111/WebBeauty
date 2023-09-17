import React, { useState } from "react";
import Swal from 'sweetalert2';

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "password": password
          })
        }
      );

      if (response.ok) {
        Swal.fire({
          title: 'Registro Exitoso!',
          text: 'Bienvenido a Beauty App',
          icon: 'success',
          timer: 1500,
          position: 'top-end',
        }).then((result) => {
          window.location.href = "/";
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal. Inténtalo nuevamente!',
        })
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="max-w-md w-full mx-auto p-5 rounded-lg bg-dark text-white">
        <h2 className="font-bold mb-2 text-uppercase text-xl text-center">Register</h2>
        <p className="text-white-50 mb-5 text-center">Please enter your information!</p>
        <input
          className="mb-4 w-full bg-gray-900 border border-white py-2 px-3 text-white focus:outline-none"
          placeholder="Nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="mb-4 w-full bg-gray-900 border border-white py-2 px-3 text-white focus:outline-none"
          placeholder="Apellido"
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          className="mb-4 w-full bg-gray-900 border border-white py-2 px-3 text-white focus:outline-none"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-4 w-full bg-gray-900 border border-white py-2 px-3 text-white focus:outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          className="mx-2 px-5 border border-white text-white py-2 rounded-lg"
          onClick={onSubmitRegister}
        >
          Register
        </button>
        <div className="d-flex flex-row mt-3 mb-5" />
      </div>
    </div>
  );
}

export default Register;
