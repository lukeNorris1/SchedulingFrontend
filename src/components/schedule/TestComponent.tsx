import React, { useState } from "react";

const CalendarComponent: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleEventClick = (startTime: string) => {
    const eventName = prompt("Enter Event Name:");
    const endTime = prompt("Enter Event End Time:");

    if (eventName && endTime) {
      const newEvent = {
        name: eventName,
        startTime,
        endTime,
        color: getRandomColor(),
      };

      setEvents([...events, newEvent]);
    }
  };

  function eventsInTimeZone(start: any, end: any) {}

  return (
    <div className="flex">
      <div className="w-24 border-r border-gray-400">
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className="h-12 flex items-center justify-center border-b border-gray-400"
          >
            {i}:00
          </div>
        ))}
      </div>
      <div className="flex-grow">
        {Array.from({ length: 24 }, (_, i) => {
          const eventsInSlot = events.filter((event) => {
            event.startTime === `${i}:00`;
          });

          const eventInTimeSlot = events.filter((event) => {
            event.startTime <= `${i}:00` && event.endTime
          });

          return (
            <div
              key={i}
              className="h-12 flex items-center border-b border-gray-400 relative"
              onClick={() => handleEventClick(`${i}:00`)}
            >
              {eventsInSlot.map((event, index) => {
                const startHour = parseInt(event.startTime.split(":")[0]);
                const endHour = parseInt(event.endTime.split(":")[0]);
                const startMinute = parseInt(event.startTime.split(":")[1]);
                const endMinute = parseInt(event.endTime.split(":")[1]);
                const eventDuration =
                  (endHour - startHour) * 60 + (endMinute - startMinute);
                const slotHeight = (eventDuration / 60) * 57.5;

                const eventWidth = 100 / eventInTimeSlot.length;
                const eventLeft = index * eventWidth;

                const eventStyle = {
                  height: `${slotHeight}px`,
                  width: `${eventWidth}%`,
                  left: `${eventLeft}%`,
                  top: `${0}px`,
                  backgroundColor: event.color,
                };

                return (
                  <div
                    key={index}
                    className="absolute text-white px-2 py-1 rounded"
                    style={eventStyle}
                  >
                    <div>{event.name}</div>
                    <div>{`${event.startTime} - ${event.endTime}`}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
