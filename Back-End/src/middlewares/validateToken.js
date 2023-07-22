import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

// Function to validate Token.
export const authRequired = (req, res, next) => {
    // We extract the token saved on a cookie in "/routes/auth.controller.js".
    const { token } = req.cookies;

    if(!token) {
        return res.status(400).json({ messsage: 'No token. Denied Access.' });
    }

    // We verify the token
    jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if(error) {
            return res.status(400).json({ messsage: 'Invalid Token.' });
        }

        // We save the decodified user in req.
        req.user = user;
        
        next();
    });

}