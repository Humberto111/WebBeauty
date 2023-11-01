import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const events = [{ title: " Cita ", start: new Date(2023, 9, 31, 15, 0, 0) }];
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function Calendario() {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (event) => {
    setSelectedDay(event.date);
  };

  return (
    <DashboardLayout>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        onDayClick={handleDayClick}
      />
      <button onClick={() => setSelectedDay(new Date(2023, 9, 20))}>
        Seleccionar 20 de octubre
      </button>
    </DashboardLayout>
  );
}

export default Calendario;
