import React from 'react'
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";

const Calendar = () => {
  return (
    <div className='container'>
    <div className='calendar-app'>
      <div className='calendar'>
        <h1 className='heading'>Calendar</h1>
        <div className='navigate-date'>
            <h2 className='month'>August,</h2>
            <h2 className='year'> 2024</h2>
            <div className='button'>
                <FaCaretLeft className='icon'/>
                <FaCaretRight className='icon' />
            </div>
            
        </div>
        <div className='weekdays'>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
        </div>
        <div className='days'>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
            <span>17</span>
            <span className='curr-date'>18</span>
            <span>19</span>
            <span>20</span>
            <span>21</span>
            <span>22</span>
            <span>23</span>
            <span>24</span>
            <span>25</span>
            <span>26</span>
            <span>27</span>
            <span>28</span>
            <span>29</span>
            <span>30</span>
            <span>31</span>
            
         </div>
      </div>
      <div className='events'>
          <div className='event-popup'>
            <div className='time-input'>
              <div className='event-popup-time'>Time</div>
                <input type='number' name='hours' min={0} max={24} className='hours'/>
                <input type='number' name='minutes' min={0} max={60} className='mins'/>
              </div>
              <textarea placeholder='Write about your event'></textarea>
              <button className='event-popup-btn'>Add an event</button>
              <button className='close-event-popup'>
                <IoMdCloseCircleOutline />
              </button>
            </div>

            <div className='event'>
                <div className='event-date-wrapper'>
                    <div className='event-date'>Aug, 17, 2024</div>
                    <div className='event-time'>10:00</div>
                </div>
                <div className='event-text'>Meeting with John</div>
                <div className='event-btn'>
                  <MdModeEditOutline className='ic'/>
                  <RiMessage2Fill className='ic'/> 
                </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Calendar
 