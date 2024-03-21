import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface MyCalendarProps {
  allTimeLogs: any;
  handleAddTime: any;
  handleEditTime: any;
}

const MyCalendar: React.FC<MyCalendarProps> = (props) => {
  const { allTimeLogs, handleAddTime, handleEditTime } = props;
  const calendarRef = useRef<HTMLDivElement>(null);
  const updatedTimeLog = allTimeLogs?.map((item: any) => ({
    ...item,
  }));

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current!, {
      plugins: [timeGridPlugin, interactionPlugin],
      initialView: "timeGridWeek",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      },
      aspectRatio: 1,
      selectMirror: true,
      selectable: true, // Enable selection on the calendar
      events: updatedTimeLog,
      select: handleAddTime, // Add the select callback function here
      editable: true,
      eventClick: function (info) {
        // Handle event click here to open edit modal/form
        const event = info.event;
        handleEditTime(event);
      },
      eventContent: function (info) {
        const project = info?.event?.extendedProps?.project || null;
        const task = info?.event?.extendedProps?.task || "(project name)";
        const duration = info.timeText;

        const eventTitleElement = document.createElement("div");
        const eventSubTitleElement = document.createElement("div");
        const eventTimeElement = document.createElement("div");
        eventTitleElement.classList.add("event-title");
        eventSubTitleElement.classList.add("event-subTitle");
        eventTimeElement.classList.add("event-duration");
        eventTitleElement.innerText = project;
        eventSubTitleElement.innerText = task;
        eventTimeElement.innerText = duration;
        const eventDetails = document.createElement("div");
        eventDetails.appendChild(eventTitleElement);
        eventDetails.appendChild(eventSubTitleElement);

        const eventContent = document.createElement("div");
        eventContent.classList.add("allocated-slot");
        eventContent.appendChild(eventDetails);
        eventContent.appendChild(eventTimeElement);

        return { domNodes: [eventContent] };
      },
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [handleAddTime, handleEditTime, updatedTimeLog]);

  return <div ref={calendarRef} />;
};

export default MyCalendar;
