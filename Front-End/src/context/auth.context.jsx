// Create a context to save the authentication info of the user.
import { createContext, useContext, useState } from "react";
// We import the request manager.
import { registerRequest } from '../api/auth.js';

export const AuthContext = createContext();

// useAuth returns all context values.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// Provider is a component that embraces other.
export const AuthProvider  = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // To check errors.
    const [registerErrors, setRegisterErrors] = useState([]);

    // Use the info sent by the form in "/pages/Register.jsx" to make the post request.
    const signup = async (user) => {
        try {
            // Save the response sent after the post request.
            const res = await registerRequest(user);
            console.log(res.data);

            setUser(res.data);
            setIsAuthenticated(true);    
        } catch (error) {
            // Save the error response send by backend in "/Back-End/middlewares/validator.js".
            setRegisterErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    // All the components inside AuthContext will be able to access it values.
    return (
        <AuthContext.Provider value={{signup, isAuthenticated, registerErrors}}>
            {children}
        </AuthContext.Provider>
    )
}