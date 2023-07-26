import { useState } from 'react';

interface eventType {
    date: Date,
    notes: string;
}

const WeekCalendar = ({ weekStartDate }: any) => {
  const [selectedEvent, setSelectedEvent] = useState<eventType | null>(null);

  // Sample event data
  const events = [
    {
      date: new Date(2023, 5, 6), // June 6th, 2023
      notes: 'Event 1',
    },
    {
      date: new Date(2023, 5, 7), // June 7th, 2023
      notes: 'Event 2',
    },
    // Add more events as needed
  ];

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  const eventPopup = () => {
    return (
        selectedEvent && (
            <div className="fixed text-black top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4">
                <div>Date: {selectedEvent.date.toDateString()}</div>
                <div>Notes: {selectedEvent.notes}</div>
                <button className="mt-4" onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          ))
  }

  const renderEvents = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStartDate);
      currentDate.setDate(currentDate.getDate() + i);
      const event = events.find(
        (event) => event.date.toDateString() === currentDate.toDateString()
      );

      days.push(
        <div key={i} className="flex-1 border p-4 text-center">
          <div className="font-bold">{currentDate.getDate()}</div>
          {event && (
            <div
              className="mt-2 cursor-pointer bg-gray-200 p-2"
              onClick={() => handleEventClick(event)}
            >
              {event.notes}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="week-calendar">
      <div className="flex">{renderEvents()}</div>
      <div className="flex">{eventPopup()}</div>
    </div>
  );
};

export default WeekCalendar;