// Importing User model.
import User from '../models/userModel.js';
// Importing bcrpt for crypting.
import bcrypt from 'bcryptjs';
// Importing function to create a token.
import {createAccessToken} from '../libs/jwt.js';
// Importing jwt to validate Token & TOKEN_SECRET.
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

// Creating the functions that will handle the info:

// ----- REGISTER ----- //
export const register = async (req, res) => {

    // Extract the info from the body.
    const {email, password, username} = req.body;

    try {
        // Check if the email is already registered.
        const userFound = await User.findOne({email})
        if(userFound) {
            return res.status(400).json(['This email already exists']);
        }

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

// ----- LOGIN ----- //
export const login = async (req, res) => {

    // Extract the info from the body.
    const {email, password} = req.body;

    try {
        // We use the email from the body to find the user.
        const userFound = await User.findOne({email});

        if(!userFound) {
            return res.status(400).json({message: "This email doesn't exist"})
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

// ----- LOGOUT ----- //
export const logout = async (req, res) => {

    // We clear the token to logout
    res.cookie('token', "", {
        expires: new Date(0)
    });

    return res.sendStatus(200);
};


export const profile = async (req, res) => {
    // We find the user by the id that we decodified and save on "/middleware/validateToken".
    const userFound = await User.findById(req.user.id);

    if(!userFound) {
        return res.status(400).json({message: 'User not found'})
    }

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}

// Function to verify Token
export const verifyToken = async (req, res) => {
    // Extract the cookie "token".
    const {token} = req.cookies;

    if (!token) {res.status(401).json({message: "Unauthorized"})}

    // Verify cookie token.
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) {res.status(401).json({message: "Unauthorized"})}

        const userFound = await User.findById(user.id);

        if (!userFound) {res.status(401).json({message: "Unauthorized"})}
    
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    });
}