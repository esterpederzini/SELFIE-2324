import React from 'react'
import '../CSS/calendar.css'
import { useState, useRef } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';

import { TextField, Button } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'react-clock/dist/Clock.css';

import gennaioImg from '../Img/gennaio.jpg';
import febbraioImg from '../Img/febbraio.jpg';
import marzoImg from '../Img/marzo.jpg';
import aprileImg from '../Img/aprile.jpg';
import maggioImg from '../Img/maggio.jpg';
import giugnoImg from '../Img/giugno.jpg';
import luglioImg from '../Img/luglio.jpg';
import agostoImg from '../Img/agosto.jpg';
import settembreImg from '../Img/settembre.jpg';
import ottobreImg from '../Img/ottobre.jpg';
import novembreImg from '../Img/novembre.jpg';
import dicembreImg from '../Img/dicembre.jpg';

const Calendar = () => {
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]
  const monthsOfYear=[
    "Gennaio", 
    "Febbraio", 
    "Marzo", 
    "Aprile", 
    "Maggio", 
    "Giugno", 
    "Luglio", 
    "Agosto", 
    "Settembre", 
    "Ottobre", 
    "Novembre", 
    "Dicembre"]

  const monthImg = [ 
    gennaioImg, febbraioImg, marzoImg, aprileImg, maggioImg, giugnoImg,
    luglioImg, agostoImg, settembreImg, ottobreImg, novembreImg, dicembreImg]

  const monthColors = [
    '#87bfff', '#bcf4f5', '#b8f2e6', '#f0e6ef', '#f4f4f9', '#efcfe3',  
    '#f5e6e8', '#eee4e1', '#fcf5c7', '#e6b89c', '#d5c6e0', '#caf0f8'   
  ];

  const currentDayColors = [
    '#8dc6ff', '#8ef6e4','#cbf078', '#ffc6ff', '#fdffb6', '#ffcad4',  
    '#e5989b', '#d1495b', '#f5cb5c', '#ce8964', '#b8b8ff', '#a3c4f3' 
  ]

  const eventPopupColors = [
    '#00a3ff', '#00f5d4', '#0ead69', '#c200fb', '#ffd500', '#e87ea1', 
    '#ffcad4', '#e63946', '#fe5d26', '#d98e73', '#6930c3', '#48bfe3'
  ]

  const currentDate=new Date()
    
  const [startDate, setStartDate] = useState(null);  
  const [endDate, setEndDate] = useState(null); 

  const [startTime, setStartTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  )
  const [endTime, setEndTime] = useState(
    new Date(new Date().getTime() + 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  )
  const [showTimePicker, setShowTimePicker] = useState(false);

  const[currentMonth, setCurrentMonth]= useState(currentDate.getMonth())
  const[currentYear, setCurrentYear]= useState(currentDate.getFullYear())
  const[selectedDate, setSelectedDate]=useState(currentDate)
  const[showEventPopup, setShowEventPopup] = useState(false)
  const[events, setEvents] = useState([])
  const[eventTitle, setEventTitle] = useState('')
  const[eventTime, setEventTime] = useState({hours: '00', minutes: '00'})
  const[eventText, setEventText] = useState('')
  const[editingEvent, setEditingEvent] = useState(null)

  const daysInMonth = new Date(currentYear, currentMonth+1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const[allDayDuration, setAllDayDuration] = useState(false)
    
  const prevMonth=()=>{
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth-1))
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear-1 : prevYear))
    if(showEventPopup===true){
      setShowEventPopup(false);
    }
  }

  const nextMonth=()=>{
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth+1))
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear+1 : prevYear))
      if(showEventPopup===true){
        setShowEventPopup(false);
      }
  }

  const handleDayClick = (day) =>{
    const clickedDate = new Date(currentYear, currentMonth, day)
    const today = new Date()

    if(clickedDate >= today || isSameDay(clickedDate, today)){
      setSelectedDate(clickedDate)
      setShowEventPopup(true)
      setEventTitle("")
      setEventTime({hours: '00', minutes: '00'})
      setEventText('')
      setEditingEvent(null)
    }
  }

  const isSameDay = (date1, date2) => {
    return(
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const handleEventSubmit = () =>{
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      title: eventTitle.trim() === "" ? "(Senza Titolo)" : eventTitle,
      time: `${eventTime.hours.padStart(2, '0')}:${eventTime.minutes.padStart(2, '0')}`,
      text: eventText,
      startDate,
      endDate,
  }

    let updatedEvents = [...events]

    if(editingEvent){
      updatedEvents = updatedEvents.map((event) => 
        event.id === editingEvent.id ? newEvent : event)
    }else{
      updatedEvents.push(newEvent)
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date))

    setEvents(updatedEvents)
    setEventTitle("")
    setEventTime({hours: '00', minutes: '00'})
    setEventText("")
    setShowEventPopup(false)
    setEditingEvent(null)
    setStartDate(null)
    setEndDate(null)
  }

  const handleEditEvents = (event) =>{
    setSelectedDate(new Date(event.date))

    if(event.title !== "(Senza Titolo)"){
      setEventTitle(event.title)
    }else{
      setEventTitle("")
    }
      
    setEventTime({
      hours: event.time.split(':')[0],
      minutes: event.time.split(':')[1],
    })
    setEventText(event.text)
    setEditingEvent(event)
    setShowEventPopup(true)
  }

  const handleDeleteEvent = (eventId) =>{
    const updatedEvents = events.filter((event) => event.id !== eventId)
    setEvents(updatedEvents)
  }

  const isCurrentDay = (day) => {
    if(day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()){
      return true;
    }
      return false;
  }

  const hasEvent = (day) => {
    return events.some(event => 
      isSameDay(new Date(event.date), new Date(currentYear, currentMonth, day))
    );
  };

  const handleToggle = () => {
    setAllDayDuration(prevState => !prevState);
  };


  return (
    <div className='calendar-app'
      style={{ backgroundImage: `url(${monthImg[currentMonth]})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
    }}
    >
      <div className='calendar'>
        <h1 className="heading">Calendario</h1>
        <div className="navigate-date">
          <h2 className="month">{monthsOfYear[currentMonth]},</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {daysOfWeek.map((day)=><span key={day}>{day}</span>)}
        </div>
        <div className='days'>
          {[...Array(firstDayOfMonth).keys()].map((_, index)=><span key={`empty-${index}`} className="empty-day"></span>)}
          {[...Array(daysInMonth).keys()].map((day)=>(
            <span key={day+1} className={isCurrentDay(day) ? 'current-day' : 'other-day'} 
            style={{
              transition: "0.3s",
              backgroundColor: (isCurrentDay(day)) ? currentDayColors[currentMonth] : 'transparent',
              position: "relative",
            }}
            onMouseEnter={e => {
              if (isCurrentDay(day)) {
                e.target.style.backgroundColor = "#fff";
              }else{
                e.target.style.backgroundColor = monthColors[currentMonth];
              }
            }}
            onMouseLeave={e => {
              if (!(isCurrentDay(day))) {
                e.target.style.backgroundColor = "transparent";
              }else{
                e.target.style.backgroundColor = currentDayColors[currentMonth];
              }
            }
          }
          onClick = {() => handleDayClick(day+1)}
          >{day+1}
          {hasEvent(day+1) && (
          <span 
            style={{
              width: "7px",
              height: "7px",
              backgroundColor: "#fff", 
              borderRadius: "50%",
              position: "absolute",
              bottom: "1px", 
              left: "50%",
              transform: "translateX(-50%)",
            }}></span>)}
          </span>))}
        </div>
      </div>
      <div className="events">
        {showEventPopup && (
          <div className="event-popup">
          <div className="title-input">
            <input type='text' placeholder='Aggiungi titolo...' value={eventTitle}
            onChange={(e)=>{
              setEventTitle(e.target.value)
            }}></input>
          </div>
          <div className="event-duration">
            <i className='bx bx-time-five'></i>
            <div>Tutto il giorno</div>
            <i className={`bx ${allDayDuration ? 'bxs-toggle-right' : 'bxs-toggle-left'}`} onClick={handleToggle}
              style={{
                transition: '0.3s', 
                color: allDayDuration ? eventPopupColors[currentMonth] : '#fff', 
              }}></i>
          </div>
          {!allDayDuration &&(
          <>
        <div className='event-duration-wrapper'>
            <div className="start-wrap">
              <div 
                className="event-start-date"
                onClick={() => document.getElementById("datepicker-start").focus()}
              >
                {/* MUI DatePicker */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={startDate || currentDate}
                          onChange={(date) => setStartDate(date)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="event-start-time">
                      {/* MUI TimePicker */}
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          value={startTime}
                          onChange={(time) => setStartTime(time)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
            <div className="end-wrap">
              <div 
                className="event-end-date"
                onClick={() => document.getElementById("datepicker-end").focus()}
              >

    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={endDate || currentDate}
                          onChange={(date) => setEndDate(date)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="event-end-time">
                      {/* MUI TimePicker */}
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          value={endTime}
                          onChange={(time) => setEndTime(time)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
              </div>
            </div>
          </div>
          </>
          )}
          <textarea placeholder='Scrivi.. (Max 60 caratteri)'
            value={eventText} onChange={(e) => {
            if(e.target.value.length <= 60){
              setEventText(e.target.value)
            }
          }}
          ></textarea>
          <button className="event-popup-btn" onClick={handleEventSubmit}
            style={{
             backgroundColor: eventPopupColors[currentMonth],
          }}
          >{editingEvent ? "Modifica Evento" : "Aggiungi Evento"}</button>
          <button className="close-event-popup" onClick={()=> setShowEventPopup(false)}>
            <i className="bx bx-x"></i>
          </button>
        </div>
        )}
        {events
        .filter(event => 
          event.date.getMonth() === currentMonth && 
          event.date.getFullYear() === currentYear
          )
        .map((event, index) => (
          <div className="event" key={index}
          style={{
            backgroundColor: currentDayColors[currentMonth],
          }}
          >
          <div className="event-date-wrapper">
            <div className="event-date">
              {`${monthsOfYear[event.date.getMonth()]}
                ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
            <div className="event-time">{event.time}</div>
          </div>
          <div className='event-context'>
            <div className='event-title'>{event.title}</div>
            <div className="event-text">{event.text}</div>
            <div className="event-buttons">
              <i className="bx bxs-edit-alt" onClick={() => handleEditEvents(event)}></i>
              <i className="bx bxs-message-alt-x" onClick={()=> handleDeleteEvent(event.id)}></i>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar