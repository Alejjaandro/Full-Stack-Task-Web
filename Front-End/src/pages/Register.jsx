// We use "react-hook.form" to validate the form inputs.
import { useForm } from 'react-hook-form';

// We import the request manager.
import { registerRequest } from '../api/auth.js';

export default function Register() {
    // We extract the function "register" and "handleSubmit" from "useForm()".
    const { register, handleSubmit } = useForm();

    // handleSubmit will receive the form data if form validation is successful.
    const onSubmit = handleSubmit( async (values) => {
        const res = await registerRequest(values);
        console.log(res);
    })

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            <form onSubmit={onSubmit} >

                <input
                    type="text"
                    {...register("username", { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Username'
                />

                <input
                    type="email"
                    {...register("email", { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Email'
                />

                <input
                    type="password"
                    {...register("password", { required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Password'
                />

                <button type='submit'  className='mt-2'>Register</button>

            </form>

        </div>
    )
}
