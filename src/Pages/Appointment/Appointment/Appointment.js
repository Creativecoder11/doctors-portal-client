import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppointment from '../AvailableAppoitment/AvailableAppoitment';


const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate} ></AppointmentBanner>
            <AvailableAppointment selectedDate={selectedDate} ></AvailableAppointment>
        </div>
    );
};

export default Appointment;