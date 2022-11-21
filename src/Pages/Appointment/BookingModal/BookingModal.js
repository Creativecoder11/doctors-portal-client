import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthProvider";

const BookingModal = ({booking, selectedDate, refetch, setBooking}) => {
    const {name, slots, price} = booking;
    const date = format(selectedDate, 'PP')
    const {user} = useContext(AuthContext)

    const handleModal = e => {
        e.preventDefault()
        const form = e.target;
        const patientName = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const slot = form.slot.value;

        console.log(date, name, email, phone, slot);

        const bookings = { 
            appointmentData : date,
            treatmentName : name, 
            patient : patientName,
            slot,
            email,
            phone,
            price
        }
        console.log(bookings);

        fetch('http://localhost:5000/bookings', {
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
          },
          body: JSON.stringify(bookings)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.acknowledged){
            setBooking(null)
            toast.success('Booking Successfully Submitted')
            refetch()
          }else{
            toast.error(data.message)
          }
        })
    } 


  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 name='booking' className="text-lg font-bold">
            {name}
          </h3>
          <form onSubmit={handleModal} className="grid grid-cols-1 gap-5 mt-8">
            <input name='date' type="text" disabled value={date} placeholder="Type here" className="input w-full" />
            <select name='slot' className="select select-bordered w-full">
                {
                    slots.map((slot, i) => <option 
                        key={i}
                    >{slot}</option> )
                }
            </select>
            
            <input name='name' type="text" placeholder="Full Name" defaultValue={user?.displayName} className="input w-full" />
            <input name='email' type="text" placeholder="Email" defaultValue={user?.email} disabled className="input w-full" />
            <input name='phone' type="text" placeholder="Phone Number"  className="input w-full" />
            <button className="btn btn-accent w-full mt-5">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
