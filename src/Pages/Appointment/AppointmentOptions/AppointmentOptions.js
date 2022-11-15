import React from "react";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const AppointmentOptions = ({ option, setBooking }) => {
  const { name, slots } = option;
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <h2 className="text-secondary text-2xl">{name}</h2>
          <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
          <p>{slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available</p>
          <div className="justify-end">
            <label 
            htmlFor="booking-modal" 
            className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white"
            onClick={() => setBooking(option) }
            >Book Appointment</label>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOptions;
