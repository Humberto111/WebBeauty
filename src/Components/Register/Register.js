import React from "react";
import Swal from 'sweetalert2'


import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function Register() {
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  const onSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://web-beauty-api-638331a8cfae.herokuapp.com/register",
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
        // El servidor respondió con éxito, puedes realizar acciones adicionales si es necesario
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
          text: 'Algo salió mal. Intentalo nuevamente!',
        })
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
              <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
              <p className="text-white-50 mb-5">
                Please enter your information!
              </p>
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Nombre"
                id="nombre"
                type="nombre"
                size="lg"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Apellido"
                id="apellido"
                type="apellido"
                size="lg"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
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
              <br />
              <MDBBtn
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={onSubmitRegister}
              >
                Register
              </MDBBtn>
              <div className="d-flex flex-row mt-3 mb-5" />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;