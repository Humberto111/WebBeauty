import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocate from "@fullcalendar/core/locales/es";

function Calendario() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [events, setEvents] = useState([
    { title: "Cita", start: "2023-11-05T08:00:00", end: "2023-11-05T09:00:00" },
    { title: "Prueba", start: "2023-11-06T08:00:00", end: "2023-11-06T09:00:00" },
  ]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [operation, setOperation] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const fullCalendarRef = useRef(null);

  const handleDayClick = (event) => {
    setSelectedDay(event.date);
  };

  useEffect(() => {
    getReservas();
  }, [events]);

  const getReservas = async () => {
    try {
      const response = await fetch("http://localhost:3001/reservas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      //tengo que meter el data en el setEvents pero el formato del data es id, evento, fecha
      //y el formato del setEvents es title, start, end
      //setEvents(data);
      var eventos = [];
      data.map((item) => {
        eventos.push({
          title: item.evento,
          start: item.fecha_hora_reserva,
          end: item.fecha_hora_reserva,
        });
      });
      setEvents(eventos);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const openModal = (op, id, nombre) => {
    setId("");
    setNombre("");
    if (op === 1) {
      setTitle("Nueva Cita");
      setOperation(1);
    } else if (op === 2) {
      setTitle("Editar Cita");
      setId(id);
      setNombre(nombre);
      setOperation(2);
    }
    window.setTimeout(() => {
      document.getElementById("nombre").focus();
    }, 500);
  };

  /*  const validar = () => {
    setEvents([
      ...events,
      { title: nombre, start: fecha + "T" + hora + ":00", end: fecha + "T" + hora + ":00" },
    ]);
  };*/
  const validar = () => {
    var parametros;
    if (nombre.trim() === "") {
      alert("El nombre es obligatorio", "warning");
      return false;
    } else {
      if (operation === 1) {
        parametros = { nombre: nombre.trim(), fecha: fecha, hora: hora };
      } else if (operation === 2) {
        parametros = { id: id, nombre: nombre.trim(), fecha: fecha, hora: hora };
      } else {
        return false;
      }
      enviarSolicitud(parametros);
    }
  };

  const enviarSolicitud = async (parametros) => {
    if (operation === 2) {
      try {
        const response = await fetch("http://localhost:3001/editarCategoriaProducto", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: parametros.id,
            nombre: parametros.nombre,
          }),
        });

        if (response.ok) {
          document.getElementById("btnCerrar").click();
          getProducts();
        } else {
          console.log("Error al editar");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else if (operation === 1) {
      try {
        const response = await fetch("http://localhost:3001/addreserva", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: parametros.nombre,
            fecha: parametros.fecha + " " + parametros.hora + ":00",
          }),
        });

        if (response.ok) {
          document.getElementById("btnCerrar").click();
          getProducts();
        } else {
          console.log("Error al agregar");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    } else {
      return false;
    }
  };

  const handleEventClick = (info) => {
    // Abre la ventana modal al hacer clic en un día en el calendario
    setShowModal(true);
    // Puedes utilizar info.date para establecer la fecha en el formulario
  };

  return (
    <DashboardLayout>
      <div className="row">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locales={[esLocate]}
          locale="es"
          selectable={true}
          droppable={true}
          weekends={true}
          events={events}
          eventContent={(eventInfo) => (
            <div>
              <b>{eventInfo.timeText}</b>
              <i>{eventInfo.event.title}</i>
            </div>
          )}
          onDayClick={handleDayClick}
          ref={fullCalendarRef}
          dateClick={(e) => {
            const modalButton = document.querySelector(
              '[data-bs-toggle="modal"][data-bs-target="#modalProducts"]'
            );
            if (modalButton) {
              modalButton.click();
              openModal(e);
              setFecha(e.dateStr);
            }
          }}
          height={"90vh"}
          eventDidMount={(e) => {
            return new bootstrap.Popover(e.el, {
              title: e.event.title,
              placement: "auto",
              trigger: "hover",
              content: "Fecha: " + e.event.start.toLocaleDateString(),
              html: true,
            });
          }}
          eventClick={handleEventClick}
          style={{
            "@media (max-width: 768px)": {
              width: "95%",
              margin: "auto",
            },
          }}
        />
      </div>
      <button
        onClick={() => openModal(1)}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalProducts"
        style={{ display: "none" }}
      >
        <i className="fa-solid fa-plus"></i> Nueva categoría
      </button>
      <div id="modalProducts" className="modal fade" aria-hidden="true" style={{ zIndex: "9999" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                id="btnAgregar"
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
                  placeholder="Nombre del evento"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <select
                  id="categoria"
                  className="form-select"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                >
                  <option value="">Seleccione el servicio</option>
                  <option value="1">Corte de cabello</option>
                  <option value="2">Planchado de cabello</option>
                  <option value="3">Manicure y pedicure</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <select
                  id="categoria"
                  className="form-select"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                >
                  <option value="">Seleccione el estilista</option>
                  <option value="1">Humberto</option>
                  <option value="2">Geberth</option>
                  <option value="3">Marian</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="date"
                  id="fecha"
                  className="form-control"
                  placeholder="Fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  disabled={true}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="time"
                  id="hora"
                  className="form-control"
                  placeholder="Hora"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
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
              ></button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Calendario;
