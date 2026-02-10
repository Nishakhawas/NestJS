import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { z } from "zod";

export default function RegisterPage() {
  const navigate = useNavigate();

  const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    roleId: z.string().min(1, "Role is required")
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      roleId: ''
    }
  });


  // fetch role 
  const fetchRole = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/role`);
      console.log("API Response:", response.data);
      return response.data;
    }
    catch (error) {
      // Handle any network or API-related errors
      throw new Error(error.response ? error.response.data.message : 'Something went wrong. Please try again later.');

    }
  };

  const { data: role } = useQuery({
    queryKey: ["role"],
    queryFn: fetchRole,
    staleTime: 5000,
  });


  // Register User

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`http://localhost:3000/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("🚀 ~ mutationFn: ~ response:", response)
      return response.data;
    },
    onSuccess: (data) => {
      navigate('/login');
      console.log("Register successful", data);
    },
    onError: (errors) => {
      console.error("Mutation Error", errors)
    }
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            {...register('roleId')}
            className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select role</option>
            {
              role?.map((roles) => (
                <option key={roles.id}>{roles.name}</option>
              ))
            }
          </select>
          {errors.roleId && <p className="text-red-500 text-sm mt-1">{errors.roleId.message}</p>}
        </div>

        <button
          type="submit"
          // disabled={!isValid}
          className={`w-full p-2 bg-blue-400 rounded-lg text-white font-semibold 
         `}
        >
          Register
        </button>
      </form>
    </div>
  )
}
