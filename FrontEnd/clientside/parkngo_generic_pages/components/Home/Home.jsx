import React, { useState } from 'react';
import './home.css';

const Home = () => {
  const parkingSlots = [
    { id: 1, name: "Slot A", location: "Sector 12, New Delhi", price: "₹50/hr" },
    { id: 2, name: "Slot B", location: "Connaught Place, New Delhi", price: "₹70/hr" },
    { id: 3, name: "Slot C", location: "Saket, New Delhi", price: "₹60/hr" },
    { id: 4, name: "Slot D", location: "Noida Sector 18, UP", price: "₹80/hr" }
  ];

  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <section className='home'>
      <div className='overlay'></div>
      <div className='container'>
        <h2>Available Parking Slots</h2>
        <ul className="parkingList">
          {parkingSlots.map((slot) => (
            <li key={slot.id} className="parkingItem">
              <div>
                <h3>{slot.name}</h3>
                <p>{slot.location}</p>
                <p>{slot.price}</p>
              </div>
              <button onClick={() => handleSelectSlot(slot)} className="selectBtn">
                {selectedSlot?.id === slot.id ? "Selected" : "Select"}
              </button>
            </li>
          ))}
        </ul>

        {selectedSlot && (
          <div className="bookingSection">
            <h3>You selected: {selectedSlot.name}</h3>
            <p>Location: {selectedSlot.location}</p>
            <p>Price: {selectedSlot.price}</p>
            <button className="bookBtn">Book Now</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
