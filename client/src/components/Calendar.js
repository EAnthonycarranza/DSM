// Calendar.js
import React, { useEffect, useState } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import axios from 'axios';
import NavBar from './NavBar';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/events', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const validatedEvents = data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        })).filter(event => !isNaN(event.start) && !isNaN(event.end));
        setEvents(validatedEvents);
        console.log('Fetched events:', validatedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventConfirm = async (event, action) => {
    console.log(`Confirming event ${action}:`, event);
    try {
      let response;
      const formattedEvent = {
        title: event.title,
        start: new Date(event.start).toISOString(),
        end: new Date(event.end).toISOString(),
        description: event.description,
        reminder: event.reminder,
        allDay: event.allDay || false,
        status: event.status || '',
        backgroundColor: event.backgroundColor || '',
      };

      if (action === 'create') {
        console.log('Formatted event create:', formattedEvent);
        response = await axios.post('http://localhost:3000/api/events', formattedEvent, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Event created response:', response.data);
        setEvents((prevEvents) => [...prevEvents, {
          ...response.data,
          start: new Date(response.data.start),
          end: new Date(response.data.end)
        }]);
      } else if (action === 'edit') {
        formattedEvent.event_id = event.event_id;
        console.log('Formatted event edit:', formattedEvent);
        response = await axios.put(`http://localhost:3000/api/events/${event.event_id}`, formattedEvent, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Event updated response:', response.data);
        setEvents((prevEvents) =>
          prevEvents.map((evt) => (evt.event_id === response.data.event_id ? {
            ...response.data,
            start: new Date(response.data.start),
            end: new Date(response.data.end)
          } : evt))
        );
      }

      // Create a notification for the new event
      const notification = {
        user: localStorage.getItem('userId'), // Ensure this is properly set
        message: `New event created: ${event.title}`,
        event_id: response.data._id, // Attach event ID to the notification
        timestamp: new Date().toISOString(), // Use current time as timestamp
      };

      try {
        await axios.post('http://localhost:3000/api/notifications', notification, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Notification created');
      } catch (notificationError) {
        console.error('Error creating notification:', notificationError);
      }

      return response.data;
    } catch (error) {
      console.error(`Error ${action}ing event:`, error);
    }
  };

  const handleEventDelete = async (deletedEvent) => {
    console.log('Deleting event:', deletedEvent);
    try {
      await axios.delete(`http://localhost:3000/api/events/${deletedEvent.event_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.event_id !== deletedEvent.event_id)
      );
      console.log('Event deleted:', deletedEvent);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <Scheduler
        view="month"
        events={events}
        onEventClick={(event) => console.log('Clicked event', event)}
        onEventCreate={handleEventConfirm}
        onEventUpdate={handleEventConfirm}
        onEventDelete={handleEventDelete}
        onConfirm={handleEventConfirm}
        fields={[
          {
            name: "description",
            type: "input",
            config: { label: "Description", multiline: true, rows: 4 }
          },
          {
            name: "reminder",
            type: "select",
            options: [
              { id: 5, text: "5 minutes before", value: 5 },
              { id: 10, text: "10 minutes before", value: 10 },
              { id: 15, text: "15 minutes before", value: 15 },
              { id: 30, text: "30 minutes before", value: 30 },
              { id: 60, text: "1 hour before", value: 60 },
            ],
            config: { label: "Reminder", required: true, errMsg: "Please select a reminder time" }
          }
        ]}
      />
    </div>
  );
};

export default Calendar;
