import React, { useEffect, useState } from "react";
import { Grid, Card, Typography, Box, Alert, Button, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Notifications() {
  const [comentario, setComentario] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [responseText, setResponseText] = useState("");
  const [responseTexts, setResponseTexts] = useState({});
  const baseUrl = "https://web-beauty-api-638331a8cfae.herokuapp.com";

  const getComment = async () => {
    try {
      const response = await fetch(`${baseUrl}/coments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setComentario(data);
        console.log(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("users"));
      const response = await fetch(`${baseUrl}/addComent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto: newComment, usuario_id: user.id, estado: "activo" }),
      });

      if (response.ok) {
        // Refresh comments after successful submission
        getComment();
        setNewComment("");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResponseSubmit = async (commentId) => {
    try {
      const user = JSON.parse(localStorage.getItem("users"));
      const response = await fetch(`${baseUrl}/responseComent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texto: responseTexts[commentId],
          respuesta_a: commentId,
          estado: "activo",
          usuario_id: user.id,
        }),
      });

      if (response.ok) {
        // Refresh comments after successful submission
        getComment();
        setResponseText("");
        setResponseTexts((prevState) => ({
          ...prevState,
          [commentId]: "",
        }));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* Formulario para Comentarios */}
      <MDBox p={2}>
        <TextField
          label="Escribe tu comentario"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
            onClick={handleCommentSubmit}
          >
            Comentar
          </Button>
        </Box>
      </MDBox>
      {/* Visualización de Comentarios */}
      <MDBox pt={2} px={2}>
        {comentario.map((comment) => (
          <Box key={comment.comentario_id} mb={2}>
            <Alert color="primary" dismissible="true">
              <Typography variant="body2">{comment.texto}</Typography>
            </Alert>
            {/* Formulario para Responder a Comentario */}
            <Box mt={2} p={2}>
              <TextField
                label={"Responder al comentario " + comment.comentario_id}
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                value={responseTexts[comment.comentario_id] || ""}
                onChange={(e) =>
                  setResponseTexts((prevState) => ({
                    ...prevState,
                    [comment.comentario_id]: e.target.value,
                  }))
                }
              />
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => handleResponseSubmit(comment.comentario_id)}
                >
                  Responder
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
