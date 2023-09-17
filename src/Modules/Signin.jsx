import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            "email": email,
            "password": password
          })
        }
      );

      if (response.ok) {
        Swal.fire({
          title: 'Web Beauty!',
          text: 'Iniciando Sesión ...',
          icon: 'success',
          timer: 1500,
          position: 'top-end',
        }).then((result) => {
          window.location.href = "/Dashboard";
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal. Inténtalo nuevamente!',
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="max-w-md w-full p-6 rounded-lg bg-white text-black">
        <h2 className="text-3xl mb-2 uppercase font-bold text-center">Login</h2>
        <p className="text-gray-800 mb-5 text-center">Please enter your login and password!</p>
        <input
          className="mb-4 w-full bg-gray-100 border border-gray-400 py-2 px-3 focus:outline-none"
          placeholder="Email address"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-4 w-full bg-gray-100 border border-gray-400 py-2 px-3 focus:outline-none"
          placeholder="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-gray-800 mb-3 text-center">
          <a className="text-blue-500" href="#!">
            Forgot password?
          </a>
        </p>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={handleSubmit}
        >
          Login
        </button>

        <div className="mt-3 mb-5" />

        <div className="text-white text-center">
          <p className="text-black mb-0">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 font-bold text-center">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;