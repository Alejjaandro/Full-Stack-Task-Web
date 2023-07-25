import { Link } from 'react-router-dom';
// We use "react-hook.form" to validate the form inputs.
import { useForm } from 'react-hook-form';
// "useAuth" to access context values.
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react';
// To redirections.
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigate = useNavigate();

    // We extract "register", "handleSubmit" & "formState : {errors}" from "useForm()".
    const { register, handleSubmit, formState: { errors } } = useForm();

    // We extrat from "/context/auth.context.jsx". 
    // "errors: registerErrors" to change name.
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();

    // This check if user is auth. and redirects to the path setted.
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/tasks");
        }
    }, [isAuthenticated]);

    // handleSubmit will execute function "singup" with the info of the form.
    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    })

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

                {
                    // Show the errors send by backend saved in "/context/auth.context.jsx".
                    registerErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white text-center' key={i}>
                            {error}
                        </div>
                    ))
                }

                <h1 className="text-2xl font-bold my-2">Register</h1>

                <form onSubmit={onSubmit} >

                    <input
                        type="text"
                        {...register("username", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Username'
                    />
                    {/* Errors info */}
                    {errors.username && (
                        <p className='text-red-500'> Username is required </p>
                    )}

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

                    <button
                        type='submit'
                        className="bg-indigo-500 px-4 py-1 rounded-sm my-2"
                    >Register</button>
                </form>

                <p className="flex gap-5">
                    Already have an account?
                    <Link to="/login" className="text-sky-400">Sign In</Link>
                </p>

            </div>
        </div>
    )
}
