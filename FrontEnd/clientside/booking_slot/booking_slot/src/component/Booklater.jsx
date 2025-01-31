import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Booknow.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker';

function Booklater() {
  const [date, setDate] = useState(new Date());
  const searchRef = useRef(null);
  const timeRef = useRef(null);
  const vehicleRef = useRef(null);

  const handleKeyDown = (e, nextField) => {
    if (e.key === 'Enter') {
      nextField.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    // You can access the values from the state and refs here
  };

  return (
    <section className="container-fluid">
      <section className="row mt-5 ps-5 pt-5">
        <section className="col">
          <form className="booking-form" onSubmit={handleSubmit} autoComplete="off" >
            <Calendar value={date} onChange={setDate} minDate={new Date()} className="mb-3"/>
            <div className='container row m-4'>
                          <div className='col'>
                            <h2> Start Time</h2><TimePicker/>
                          </div>
                          <div className='col'>
                            <h2>End Time</h2><TimePicker/>
                          </div>
                          <div className='col'>
                            <h2>Vehicle Type</h2>
                            <select type="option" className="input-control mb-3 text-center">
                                <option value="">bike</option>
                                <option value="">car</option>
                            </select>
                          </div>
            </div>
            <button className="btn btn-primary w-100"type="submit"> Book Now </button>
          </form>
        </section>
      </section>

      <section className="row mt-3 ps-5 pt-5">
        <div className="bg-info p-4 rounded">
          <h3 className="text-center mb-4">Near By Locations?</h3>

          <div className="text-center mb-3">
            <button className="btn btn-light rounded-pill me-3 mb-2">Location-1</button>
            <button className="btn btn-light rounded-pill me-3 mb-2">Location-2</button>
            <button className="btn btn-light rounded-pill mb-2">Location-3</button>
          </div>

          <div className="text-center">
            <button className="btn btn-light rounded-pill me-3 mb-2">Location-4</button>
            <button className="btn btn-light rounded-pill me-3 mb-2">Location-5</button>
            <button className="btn btn-light rounded-pill mb-2">Location-6</button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Booklater;
