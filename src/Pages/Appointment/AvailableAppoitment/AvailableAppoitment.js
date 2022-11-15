import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOptions from '../AppointmentOptions/AppointmentOptions';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointment = ({selectedDate}) => {

    const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        fetch('Services.json')
        .then(res => res.json())
        .then(data => setAppointmentOptions(data))
    } , [])
    return (
        <div>
            <h2 className='text-center text-secondary text-xl'>Available Appointments on {format(selectedDate, 'PP')}</h2>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOptions.map(option => <AppointmentOptions
                        key={option._id}
                        option={option}
                        setBooking={setBooking}
                    ></AppointmentOptions> )
                }
            </div>
            {
                booking &&
                <BookingModal 
                selectedDate={selectedDate}
                booking={booking}
                setBooking={setBooking}
                ></BookingModal>
            }
        </div>
    );
};

export default AvailableAppointment;