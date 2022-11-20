import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import AppointmentOptions from '../AppointmentOptions/AppointmentOptions';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointment = ({selectedDate}) => {
    const [booking, setBooking] = useState(null);
    const date = format(selectedDate, "PP")
    const {data: appointmentOptions = [] , refetch, isLoading} = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/appointments?date=${date}`)
            const data = await res.json();
            return data;
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }

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
                refetch={refetch}
                ></BookingModal>
            }
        </div>
    );
};

export default AvailableAppointment;