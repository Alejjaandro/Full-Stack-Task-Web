// Create a context to save the authentication info of the user.
import { createContext, useContext, useEffect, useState } from "react";
// We import the request manager.
import { registerRequest, loginRequest } from '../api/auth.js';

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
    const [errors, setErrors] = useState([]);

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
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data);

            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]);
            console.log(error.response.data);
        }

    }

    // Timeout so the errors don't stay on screen undefinetly. 5000 ms = 5 sec.
    useEffect( () => {
        if (errors.length > 0) {
            const timer = setTimeout( () => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors])

    // All the components inside AuthContext will be able to access it values.
    return (
        <AuthContext.Provider value={{signup, signin , isAuthenticated, errors}}>
            {children}
        </AuthContext.Provider>
    )
}