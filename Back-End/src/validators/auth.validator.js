// Import zod as library to validate data
import { z } from 'zod';

export const registerValidator = z.object({

    username: z.string({required_error: 'Username is required'}),

    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email'
    }),

    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    })

});

export const loginValidator = z.object({
    
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email'
    }),

    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Wrong Password'
    })

});