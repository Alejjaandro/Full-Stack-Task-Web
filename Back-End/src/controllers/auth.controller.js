// Importing User model
import User from '../models/userModel.js';

// Creating the functions that will handle the info of the routes:

export const register = async (req, res) => {

    // Extractinf the info from the body.
    const {email, password, username} = req.body;

    try {
        // Creating a new user with the info.
        const newUser = new User({
            username,
            email,
            password
        });

        // Registering the new user in the database.
        await newUser.save();


        res.send('Registered');

    } catch (error) {
        console.log(error);
    }
};

export const login = (req, res) => {
    res.send("Logged");
};