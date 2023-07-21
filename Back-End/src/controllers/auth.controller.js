// Importing User model.
import User from '../models/userModel.js';
// Importing bcrpt for crypting.
import bcrypt from 'bcryptjs';
// Importing function to create a token.
import {createAccessToken} from '../libs/jwt.js';

// Creating the functions that will handle the info of the routes:

export const register = async (req, res) => {

    // Extract the info from the body.
    const {email, password, username} = req.body;

    try {
        // Crypting password.
        const hashPassword = await bcrypt.hash(password, 10);
        // Creating a new user with the info.
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        // Registering the new user in the database.
        const userSaved = await newUser.save();

        // Create Token (created in libs/jwt.js).
        const token = await createAccessToken( {id: userSaved._id} );
            
        // We save the token in a cookie and send a success message.
        res.cookie('token', token);

        // Send a response with the new User to the client.
        res.json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const login = (req, res) => {
    res.send("Logged");
};