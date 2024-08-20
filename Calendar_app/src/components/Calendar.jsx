import React, { useState } from 'react'
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";

const Calendar = () => {

  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const currDate = new Date()
  const [currMonth, setCurrMonth] = useState(currDate.getMonth());
  const [currYear, setCurrYear] = useState(currDate.getFullYear());

  const [selectedDate, setSelectedDate] = useState(currDate)
  const [showeventPopup, setShowEventPopup] = useState(false);

  const daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();

  const prevMonth = () => {
    setCurrMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
    setCurrYear((prevYear) => (currMonth === 0 ? prevYear - 1 : prevYear))
  }

  const nextMonth = () => {
    setCurrMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
    setCurrYear((prevYear) => (currMonth === 11 ? prevYear + 1 : prevYear))
  }

  const handleDayClick = (day) => {
    const clickDate = new Date(currYear, currMonth, day);
    const today = new Date()

    if (clickDate >= today || isSameDay(clickDate, today)) {
      setSelectedDate(clickDate)
      setShowEventPopup(true);
    }
  }
  const isSameDay = (date1, date2) =>{
    return(
    date1.getFullYear() === date2.getFullYear() && 
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() 
    )

  }

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
            {[...Array(daysInMonth).keys()].map((day) =>
              <span
                key={day + 1} className={day + 1 === currDate.getDate() && currMonth === currDate.getMonth() && currYear === currDate.getFullYear() ? 'curr-date' : ""} onClick={() => handleDayClick(day + 1)}>

                {day + 1}
              </span>)}
          </div>
        </div>
        <div className='events'>
          {showeventPopup &&
            <div className='event-popup'>
              <div className='time-input'>
                <div className='event-popup-time'>Time: </div>
                <input type='number' name='hours' min={0} max={24} className='hours' />
                <input type='number' name='minutes' min={0} max={60} className='mins' />
              </div>
              <textarea placeholder='Write about your event'></textarea>
              <button className='event-popup-btn'>Add an event</button>
              <button className='close-event-popup' onClick={() => setShowEventPopup(false)}>
                <IoMdCloseCircleOutline />
              </button>
            </div>
          }
          <div className='event'>
            <div className='event-date-wrapper'>
              <div className='event-date'>Aug, 17, 2024</div>
              <div className='event-time'>10:00</div>
            </div>
            <div className='event-text'>Meeting with John</div>
            <div className='event-btn'>
              <MdModeEditOutline className='ic' />
              <RiMessage2Fill className='ic' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
