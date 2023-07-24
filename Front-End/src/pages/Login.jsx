// ----- TO SEE COMPLETE EXPLAINATIONS SEE "./Register.jsx" ----- //

// Imports.
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {

  // Constants.
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors} } = useForm();
  const {signin, isAuthenticated, errors: signinErrors} = useAuth();

  const onSubmit = handleSubmit(data => {
    signin(data);
  });

  //redirects to task page.
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);
  
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

        {
          signinErrors.map((error, i) => (
              <div className='bg-red-500 p-2 text-white text-center' key={i}>
                  {error}
              </div>
          ))
        }

        <h1 className="text-2xl font-bold my-2">Login</h1>

        <form onSubmit={onSubmit} >

          <input
            type="email"
            {...register("email", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Email'
          />
          {/* Errors info */}
          {errors.email && (
            <p className='text-red-500'> Email is required </p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Password'
          />
          {/* Errors info */}
          {errors.password && (
            <p className='text-red-500'> Password is required </p>
          )}

          <button type='submit' className='mt-2 my-2'>Login</button>

        </form>
        
        <p className="flex gap-5">
          Don't have an account? 
          <Link to="/register" className="text-sky-400">Register</Link>
        </p>

      </div>
    </div>
  )
}
