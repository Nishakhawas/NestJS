import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null,
        permissions: JSON.parse(localStorage.getItem('permissions')),
        user: JSON.parse(localStorage.getItem('user'))
    })

    const login = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', data);
            console.log("🚀 ~ login ~ response:", response.data)
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
            localStorage.setItem('permissions', JSON.stringify(user.permissions || []));
            localStorage.setItem('user', JSON.stringify(user));

            setUser({
                token,
                role: user.role,
                permissions: user.permissions || [],
                user,
            });

            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)