import React, { useState } from "react";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./Signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://web-beauty-api-638331a8cfae.herokuapp.com/agregar-usuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "nombre": email })
        }
      );

      if (response.ok) {
        // El servidor respondió con éxito, puedes realizar acciones adicionales si es necesario
        console.log("Inicio de sesión exitoso");
      } else {
        // Maneja los errores aquí, por ejemplo, muestra un mensaje de error al usuario
        console.error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                id="email"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="password"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <p className="small mb-3 pb-lg-2">
                <a class="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>
              <MDBBtn
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={handleSubmit}
              >
                Login
              </MDBBtn>
              <div className="d-flex flex-row mt-3 mb-5" />

              <div>
                <p className="mb-0">
                  Don't have an account?{" "}
                  <a href="#!" class="text-white-50 fw-bold">
                    Sign Up
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signin;
