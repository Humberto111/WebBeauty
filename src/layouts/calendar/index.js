import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import isLocate from "@fullcalendar/core/locales/es";
import Swal from "sweetalert2";

const DemoApp = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [horaInicial, setHoraInicial] = useState("");
  const [horaFinal, setHoraFinal] = useState("");
  const [ubicacion, setUbicacion] = useState("San Martín");
  const [observaciones, setObservaciones] = useState("");
  const [estado, setEstado] = useState("P");
  const [services, setServices] = useState([]);
  const [estilistas, setEstilistas] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(0);
  const [estilistaSeleccionado, setEstilistaSeleccionado] = useState(0);
  const [citas, setCitas] = useState([]);
  const [usuarioLogeado, setUsuarioLogeado] = useState([]);
  const [estilistaToolTip, setEstilistaToolTip] = useState("");
  const [servicioToolTip, setServicioToolTip] = useState({});

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem("users"));
    setNombre(userStored.nombre);
    setEmail(userStored.email);
    setUsuarioLogeado(userStored);
    getServices();
    getEstilistas();
    getCitas();
  }, []);

  useEffect(() => {
    getCitas();
  }, [usuarioLogeado]);

  const getCitas = async () => {
    try {
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/citas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const events = data.map((item) => ({
        id: item.id,
        extendedProps: item,
        title:
          usuarioLogeado.id === item.id_usuario || usuarioLogeado.tipo === "A" ? "Tu Evento" : "",
        start: item.fecha_hora_inicio,
        end: item.fecha_hora_fin,
        backgroundColor:
          usuarioLogeado.id === item.id_usuario || usuarioLogeado.tipo === "A" ? "" : "red",
      }));
      setCitas(events);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/services", {
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

  const getUserCita = async (id) => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/getUserById?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getEstilistas = async () => {
    try {
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/estilistas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setEstilistas(data);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getEstilistaById = async (id) => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/estilistaById?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      setEstilistaToolTip(data[0].nombre + " " + data[0].apellido);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const getServicioById = async (id) => {
    try {
      const response = await fetch(
        `https://web-beauty-api-638331a8cfae.herokuapp.com/serviceById?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      setServicioToolTip(data[0].nombre);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const limpiarModal = () => {
    setHoraInicial("");
    setHoraFinal("");
    setObservaciones("");
    setServicioSeleccionado(0);
    setEstilistaSeleccionado(0);
  };

  const enviarSolicitud = async () => {
    const userStored = JSON.parse(localStorage.getItem("users"));
    try {
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/addCita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha_hora_inicio: horaInicial,
          fecha_hora_fin: horaFinal,
          estado: estado,
          observaciones: observaciones,
          ubicacion: ubicacion,
          id_servicio: servicioSeleccionado,
          id_estilista: estilistaSeleccionado,
          id_usuario: userStored.id,
        }),
      });

      if (response.ok) {
        document.getElementById("btnModalCerrar").click();
        Swal.fire({
          title: "Registro Exitoso!",
          text: "Cita agregada exitosamente",
          icon: "success",
          timer: 500,
          position: "top-end",
          toast: true,
        }).then((result) => {
          getCitas();
          limpiarModal();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal en el Registro. Intentalo nuevamente!",
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    setHoraInicial(selectInfo.startStr);
    setHoraFinal(selectInfo.endStr);
    $("#modalCitas").modal("show");
  };

  const onDeleteCita = async (id) => {
    try {
      const response = await fetch("https://web-beauty-api-638331a8cfae.herokuapp.com/deleteCita", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      limpiarModal();
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleEventClick = async (clickInfo) => {
    if (
      clickInfo.event.extendedProps.id_usuario === usuarioLogeado.id ||
      usuarioLogeado.tipo === "A"
    ) {
      const user = await getUserCita(clickInfo.event.extendedProps.id_usuario);
      setNombre(user[0].nombre + " " + user[0].apellido);
      setEmail(user[0].email);
      getServicioById(clickInfo.event.extendedProps.id_servicio);
      getEstilistaById(clickInfo.event.extendedProps.id_estilista);
      setHoraInicial(clickInfo.event.extendedProps.fecha_hora_inicio);
      setHoraFinal(clickInfo.event.extendedProps.fecha_hora_fin);
      setObservaciones(clickInfo.event.extendedProps.observaciones);
      setServicioSeleccionado(servicioToolTip);
      setEstilistaSeleccionado(estilistaToolTip);
      setId(clickInfo.event.extendedProps.id);
      $("#modalMostrarCitas").modal("show");
    }
  };

  const eliminarCita = async (id) => {
    const result = await Swal.fire({
      title: "Deseas borrar esta cita?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
    });

    if (result.isConfirmed) {
      try {
        await onDeleteCita(id);
        await getCitas();
        document.getElementById("btnModalMostrarCerrar").click();
        Swal.fire({
          icon: "success",
          title: "Cita Eliminada",
          text: "Tu cita ha sido eliminada!",
        });
      } catch (error) {
        console.error("Error deleting or fetching data:", error);
      }
    }
  };

  const validar = () => {
    if (servicioSeleccionado === 0) {
      alert("Debe seleccionar el servicio", "warning");
      return false;
    }
    if (estilistaSeleccionado === 0) {
      alert("Debe seleccionar el estilista", "warning");
      return false;
    }
    enviarSolicitud();
  };

  const handleDateClick = (info) => {
    setHoraInicial(info.dateStr);

    const dFechaInicial = info.dateStr.substring(0, 11);
    const horaOriginal = Number(info.dateStr.substring(11, 13));
    const minutosOriginal = Number(info.dateStr.substring(14, 16));

    const minutosSumados = minutosOriginal + 30;

    let horaFinal = `${horaOriginal}:${minutosSumados}:${"00"}`;

    if (minutosSumados === 60) {
      horaFinal = `${dFechaInicial}${horaOriginal + 1}:${"00"}:${"00"}`;
    } else {
      horaFinal = `${dFechaInicial}${horaOriginal}:${minutosSumados}:${"00Z"}`;
    }

    setHoraFinal(horaFinal);
    $("#modalCitas").modal("show");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="demo-app">
        <div className="demo-app-main">
          <FullCalendar
            eventMouseEnter={(info) => {
              document.body.style.cursor = "pointer";
            }}
            eventMouseLeave={(info) => {
              document.body.style.cursor = "";
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridDay"
            selectable={true}
            selectMirror={false}
            dayMaxEvents={true}
            droppable={true}
            weekends={weekendsVisible}
            select={handleDateSelect}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height={"90vh"}
            locales={[isLocate]}
            timeZone="es-CR"
            locale="es"
            events={citas}
            slotMinTime="09:00"
            slotMaxTime="18:00"
            eventDidMount={(e) => {
              if (
                e.event.extendedProps.id_usuario === usuarioLogeado.id ||
                usuarioLogeado.tipo === "A"
              ) {
                return new bootstrap.Popover(e.el, {
                  title: "Cita Registrada",
                  placement: "auto",
                  trigger: "hover",
                  content: "Haz click para ver los detalles de la cita!",
                  html: true,
                });
              } else {
                return new bootstrap.Popover(e.el, {
                  title: "Cita Registrada",
                  placement: "auto",
                  trigger: "hover",
                  content: "Esta cita pertenece a otro cliente!",
                  html: true,
                });
              }
            }}
          />
        </div>
        <div id="modalCitas" className="modal fade" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <label className="h5">Reservar Cita</label>
                <button
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
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    disabled
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-gift"></i>
                  </span>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-gift"></i>
                  </span>
                  <input
                    type="text"
                    id="horaInicial"
                    className="form-control"
                    placeholder="Hora Inicial"
                    value={horaInicial}
                    onChange={(e) => setHoraInicial(e.target.value)}
                    disabled
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-gift"></i>
                  </span>
                  <input
                    type="text"
                    id="horaFinal"
                    className="form-control"
                    placeholder="Hora Final"
                    value={horaFinal}
                    onChange={(e) => setHoraFinal(e.target.value)}
                    disabled
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-gift"></i>
                  </span>
                  <input
                    type="text"
                    id="observaciones"
                    className="form-control"
                    placeholder="Observaciones"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-gift"></i>
                  </span>
                  <select
                    id="servicios"
                    className="form-select"
                    value={servicioSeleccionado}
                    onChange={(e) => setServicioSeleccionado(e.target.value)}
                  >
                    <option>Selecciona el servicio deseado</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-gift"></i>
                  </span>
                  <select
                    id="estilistas"
                    className="form-select"
                    value={estilistaSeleccionado}
                    onChange={(e) => setEstilistaSeleccionado(e.target.value)}
                  >
                    <option>Selecciona el estilista deseado</option>
                    {estilistas.map((estilista) => (
                      <option key={estilista.id} value={estilista.id}>
                        {estilista.nombre + " " + estilista.apellido}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="d-grid col-6 mx-auto">
                  <button onClick={() => validar()} className="btn btn-success">
                    <i className="fa-solid fa-floppy-disk"></i> Guardar
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  id="btnModalCerrar"
                  type="button"
                  className="btn btn-seconday"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="modalMostrarCitas" className="modal fade" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">Informacion de la Cita</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <label>Nombre</label>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  value={nombre}
                  type="text"
                  id="nombre"
                  className="form-control"
                  disabled
                ></input>
              </div>
              <label>Email</label>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  value={email}
                  type="text"
                  id="email"
                  className="form-control"
                  disabled
                ></input>
              </div>
              <label>Hora de inicio</label>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  value={horaFinal}
                  type="text"
                  id="horaInicial"
                  className="form-control"
                  disabled
                ></input>
              </div>
              <label>Hora de finalización</label>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  value={horaFinal}
                  type="text"
                  id="horaFinal"
                  className="form-control"
                  disabled
                ></input>
              </div>
              <label>Observaciones</label>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  value={observaciones}
                  type="text"
                  id="observaciones"
                  className="form-control"
                  disabled
                ></input>
              </div>
              <label>Servicio</label>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  value={servicioToolTip}
                  type="text"
                  id="servicio"
                  className="form-control"
                  disabled
                ></input>
              </div>
              <label>Estilista</label>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  value={estilistaToolTip}
                  type="text"
                  id="estilista"
                  className="form-control"
                  disabled
                ></input>
              </div>

              <div className="d-grid col-6 mx-auto">
                <button onClick={() => eliminarCita(id)} className="btn btn-danger">
                  <i className="fa-solid fa-floppy-disk"></i> Elminar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="btnModalMostrarCerrar"
                type="button"
                className="btn btn-seconday"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText + " "}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: "numeric", month: "short", day: "numeric" })}</b>
      <i>{event.title}</i>
    </li>
  );
}

export default DemoApp;
