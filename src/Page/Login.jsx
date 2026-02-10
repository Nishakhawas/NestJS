import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../Api/axiosInstance';
import { useEffect } from 'react';



export default function Login() {

    const navigate = useNavigate();
    // Define the validation schema using Zod
    const loginSchema = z.object({
        userEmail: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userEmail: '',
            password: '',
        }
    });

    // setTimeout(() => navigate(''), 2000);
    const mutation = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance.post(`/auth/login`, data);
            console.log("🚀 ~ mutationFn: ~ response:", response)
            return response;

        },
        onSuccess: (data) => {
            console.log("Login successful", data);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 5000,
            });
            navigate('/modulelist');


            //store the token in localStorage or context
            localStorage.setItem('token', data.data?.token);
            localStorage.setItem('email', data.data?.user?.email);
            localStorage.setItem('role', data.data?.user?.role || 'no-role');


        },
        onError: (errors) => {
            console.error("Mutation Error", errors)
        }
    });
    const onSubmit = (data) => {
        mutation.mutate(data);
    };


    useEffect(() => {
        const now = Date.now();
        const expiresAt = now + 24 * 60 * 1000; // 1 day in ms
        localStorage.setItem('expires_at', expiresAt.toString());
        if (expiresAt && now > expiresAt) {
            // Clear out expired stuff
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('role');
            localStorage.removeItem('expires_at');
            navigate('/');
        }
    }, [navigate]);

    // return null; // Just for logic



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        {...register('userEmail')}
                        className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                            }`}
                        placeholder="you@gmail.com"
                        autoComplete="off"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                            }`}

                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}
