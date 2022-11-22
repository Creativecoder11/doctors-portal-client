import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    console.log(imageHostKey)

    const navigate = useNavigate();
    
    const {data: specialties , isLoading} =useQuery({
      queryKey: ['specialty'],
      queryFn: async () => {  
        const res = await fetch('https://doctors-portal-server-olive.vercel.app/appointmentDoctor');
        const data = await res.json()
        return data
      }
    })

    const handleAddDoctor = data => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image' , image)
        const url =`https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(imageData => {
          if(imageData.success){
            console.log(imageData.data.url);
            const doctor = {
              name: data.name,
              email: data.email,
              specialty: data.specialty,
              image: imageData.data.url
            }
            fetch('https://doctors-portal-server-olive.vercel.app/doctors', {
              method: "POST",
              headers: {
                'content-type' : 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
              },
              body: JSON.stringify(doctor)
            })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              toast.success(`${doctor.name} is added successfully.`)
              navigate('/dashboard/managedoctors')
            })
          }
        })

    }

    if(isLoading){
      return <Loading></Loading>
    }
    return (
        <div className="w-96 flex justify-center items-center">
      <form onSubmit={handleSubmit(handleAddDoctor)}>
        <div>
          <h2 className="text-center text-xl font-bold">Add Doctor</h2>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>{" "}
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>{" "}
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Specialty</span>{" "}
            </label>
            <div>
                <select 
                {...register("specialty")}
                className="select input-bordered w-full max-w-xs">                    
                      {
                        specialties.map(specialty => <option
                          key={specialty._id}
                          value={specialty.name}
                        >{specialty.name}</option> )
                      }
                  
                </select>
            </div>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Photo</span>{" "}
            </label>
            <input
              type="file"
              {...register("img", {
                required: "Photo is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.img && (
              <p className="text-red-600">{errors.img?.message}</p>
            )}
          </div>
        </div>
        <input
          className="btn btn-accent w-full mt-5"
          type="submit"
          value="Sign Up"
        />
      </form>
    </div>
    );
};

export default AddDoctor;