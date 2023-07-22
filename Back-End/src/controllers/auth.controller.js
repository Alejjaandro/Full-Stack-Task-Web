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

export const login = async (req, res) => {

    // Extract the info from the body.
    const {email, password} = req.body;

    try {
        // We use the email from the body to find the user.
        const userFound = await User.findOne({email});

        if(!userFound) {
            return res.status(400).json({message: 'User not found'})
        }

        // We comapre the password of the body with the one in the database.
        const passwordMatch = await bcrypt.compare(password, userFound.password);

        if(!passwordMatch) {
            return res.status(400).json({message: 'Wrong password'})
        }

        // Create Token (created in libs/jwt.js).
        const token = await createAccessToken( {id: userFound._id} );
  
        res.cookie('token', token);
        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const logout = async (req, res) => {

    // We clear the token to logout
    res.cookie('token', "", {
        expires: new Date(0)
    });

    return res.sendStatus(200);
};
