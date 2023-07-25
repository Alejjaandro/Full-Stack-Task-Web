import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">

            <Link to={isAuthenticated ? "/tasks" : "/login"}>
                <h1 className="text-2xl font-bold">Task Manager</h1>
            </Link>

            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    // Authenticated
                    <>
                        <li>Welcome {user.username}</li>

                        <li><Link
                            to="/add-task"
                            className="bg-indigo-500 px-4 py-1 rounded-sm">Add Task</Link>
                        </li>

                        <li><Link
                            to="/login"
                            onClick={() => { logout() }}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                            >Logout</Link>
                        </li>

                    </>
                ) : (
                    // Not Authenticated
                    <>
                        <li><Link
                            to="/login"
                            className="bg-sky-500 px-4 py-1 rounded-sm">Login</Link>
                        </li>

                        <li><Link
                            to="/register"
                            className="bg-sky-500 px-4 py-1 rounded-sm">Register</Link>
                        </li>
                    </>
                )}

            </ul>
        </nav>
    )
}
