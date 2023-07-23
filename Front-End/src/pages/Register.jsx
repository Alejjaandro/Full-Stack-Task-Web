// We use "react-hook.form" to validate the form inputs.
import { useForm } from 'react-hook-form';
// "useAuth" to access context values.
import { useAuth } from '../context/auth.context.jsx';
import { useEffect } from 'react';
// To redirections.
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigate = useNavigate();

    // We extract "register", "handleSubmit" & "formState : {errors}" from "useForm()".
    const { register, handleSubmit, formState: { errors } } = useForm();

    // We extrat from "/context/auth.context.jsx".
    const { signup, isAuthenticated, registerErrors } = useAuth();

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
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {
                // Show the errors send by backend saved in "/context/auth.context.jsx".
                registerErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 text-white' key={i}>
                        {error}
                    </div>
                ))
            }

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

                <button type='submit' className='mt-2'>Register</button>

            </form>

        </div>
    )
}
