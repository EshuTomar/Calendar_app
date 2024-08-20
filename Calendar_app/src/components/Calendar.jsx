import React, { useState } from 'react'
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";

const Calendar = () => {
  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const currDate = new Date();
  const [currMonth, setCurrMonth] = useState(currDate.getMonth());
  const [currYear, setCurrYear] = useState(currDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: '00', min: '00' });
  const [eventText, setEventText] = useState('');
  const [editEvent, setEditEvent] = useState(null);

  const daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();

  const prevMonth = () => {
    setCurrMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrYear((prevYear) => (currMonth === 0 ? prevYear - 1 : prevYear));
  };

  const nextMonth = () => {
    setCurrMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrYear((prevYear) => (currMonth === 11 ? prevYear + 1 : prevYear));
  };

  const handleDayClick = (day) => {
    const clickDate = new Date(currYear, currMonth, day);
    const today = new Date();

    if (clickDate >= today || isSameDay(clickDate, today)) {
      setSelectedDate(clickDate);
      setShowEventPopup(true);
      setEventTime({ hours: '00', min: '00' });
      setEventText('');
      setEditEvent(null);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: editEvent ? editEvent.id : Date.now(),
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, '0')} : ${eventTime.min.padStart(2, '0')}`,
      text: eventText,
    };

    let updatedEvents = [...events];
    if (editEvent) {
      updatedEvents = updatedEvents.map((event) => (event.id === editEvent.id ? newEvent : event));
    } else {
      updatedEvents.push(newEvent);
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(updatedEvents);
    setEventTime({ hours: '00', min: '00' });
    setEventText('');
    setShowEventPopup(false);
    setEditEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventTime({
      hours: event.time.split(":")[0],
      min: event.time.split(":")[1],
    });
    setEventText(event.text);
    setEditEvent(event);
    setShowEventPopup(true);
  };

  return (
    <div className='container'>
      <div className='calendar-app'>
        <div className='calendar'>
          <h1 className='heading'>Calendar</h1>
          <div className='navigate-date'>
            <h2 className='month'>{months[currMonth]}</h2>
            <h2 className='year'>{currYear}</h2>
            <div className='button'>
              <FaCaretLeft className='icon' onClick={prevMonth} />
              <FaCaretRight className='icon' onClick={nextMonth} />
            </div>
          </div>

          <div className='weekdays'>
            {daysInWeek.map((day) =>
              <span key={day}>{day}</span>)}
          </div>

          <div className='days'>
            {[...Array(firstDayOfMonth).keys()].map((_, index) =>
              <span key={`empty-${index}`} />
            )}
            {[...Array(daysInMonth).keys()].map((day) => {
              const dayWithEvent = events.some(
                (event) =>
                  new Date(event.date).getFullYear() === currYear &&
                  new Date(event.date).getMonth() === currMonth &&
                  new Date(event.date).getDate() === day + 1
              );
              return (
                <span
                  key={day + 1}
                  className={`
                    ${day + 1 === currDate.getDate() && currMonth === currDate.getMonth() && currYear === currDate.getFullYear() ? 'curr-date' : ''}
                    ${dayWithEvent ? 'event-day' : ''}
                  `}
                  onClick={() => handleDayClick(day + 1)}
                >
                  {day + 1}
                </span>
              );
            })}
          </div>
        </div>
        <div className='events'>
          {showEventPopup &&
            <div className='event-popup'>
              <div className='time-input'>
                <div className='event-popup-time'>Time: </div>
                <input
                  type='number'
                  name='hours'
                  min={0}
                  max={23}
                  className='hours'
                  value={eventTime.hours}
                  onChange={(e) => setEventTime({ ...eventTime, hours: e.target.value })}
                />
                <input
                  type='number'
                  name='minutes'
                  min={0}
                  max={59}
                  className='mins'
                  value={eventTime.min}
                  onChange={(e) => setEventTime({ ...eventTime, min: e.target.value })}
                />
              </div>
              <textarea
                placeholder='Write about your event(max 60 chars)'
                value={eventText}
                onChange={(e) => {
                  if (e.target.value.length <= 60) {
                    setEventText(e.target.value);
                  }
                }}
              ></textarea>
              <button className='event-popup-btn' onClick={handleEventSubmit}>Add an event</button>
              <button className='close-event-popup' onClick={() => setShowEventPopup(false)}>
                <IoMdCloseCircleOutline />
              </button>
            </div>
          }
          {events.map((event, index) => (
            <div className='event' key={index}>
              <div className='event-date-wrapper'>
                <div className='event-date'>{`${months[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
                <div className='event-time'>{event.time}</div>
              </div>
              <div className='event-text'>{event.text}</div>
              <div className='event-btn'>
                <MdModeEditOutline className='ic' onClick={() => handleEditEvent(event)} />
                <RiMessage2Fill className='ic' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
