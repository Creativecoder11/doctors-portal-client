import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

const MyAppointments = () => {
    const {user} = useContext(AuthContext)
    
    const url = `https://doctors-portal-server-olive.vercel.app/bookings?email=${user?.email}`

    const {data: bookings = []} = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url , {
              headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
              }
            })
            const data = await res.json();
            console.log(data);
            return data
        }
    })
  return (
    <div>
      <h1>My Appointment</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
                bookings?.map((booking, i) => 
                    <tr key={booking._id}>
                        <th>{i+1}</th>
                        <td>{booking?.patient}</td>
                        <td>{booking?.treatmentName}</td>
                        <td>{booking?.appointmentData}</td>
                        <td>{booking?.slot}</td>                        
                        <td>
                          {
                            booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                            <button
                            className="btn btn-primary btn-sm"
                            >Pay</button></Link>
                          }
                          {
                            booking.price && booking.paid && <span className="text-danger">Paid</span>
                          }
                        </td>                        
                    </tr>
                )
              }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
