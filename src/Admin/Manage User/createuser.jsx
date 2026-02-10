import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

export default function AddUserForm({onSuccess}) {

    const moduleSchema = z.object({
        userName: z.string().min(1, "User Name is Required"),
        userEmail: z.string().min(1, "Email is Required"),
        password: z.string().min(1, " Password is Required"),
        confirmPassword: z.string().min(1, "Required"),
        fullName: z.string().min(1, "Required"),
        contact: z
            .string()
            .min(1, 'Contact is required')
            .transform((val) => Number(val))
            .refine((val) => /^\d{10}$/.test(val), {
                message: 'Contact must be a number',
            }),
        location: z.string().min(1, " Location Required"),
        department: z.string().optional(),
        employee: z.string().optional(),
        groupId: z
            .string()
            .min(1, 'Group is required')
            .transform((val) => Number(val))
            .refine((val) => !isNaN(val), {
                message: 'Invalid group ID',
            }),
        isActive: z
            .union([z.boolean(), z.string()])
            .transform(val => {
                if (val === "true" || val === true) return true;
                if (val === "false" || val === false) return false;
                return undefined;
            })
            .optional()

    })

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(moduleSchema),
        defaultValues: {
            userName: '',
            userEmail: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            contact: '',
            location: '',
            department: '',
            employee: '',
            groupId: 0,
            isActive: false,



        }
    })
    console.log("🚀 ~ ManageModule ~ errors:", errors)

    const { id } = useParams();
    //form submission
    const mutation = useMutation({
        mutationFn: async (data) => {
            let response;
            try {
                if (id) {
                    response = await axios.put(`http://localhost:3000/user/${id}`, data);
                    reset();
                    toast.success("User Updated Successfully", {
                        position: "bottom-right",
                        autoClose: 3000
                    });

                } else {
                    response = await axios.post(`http://localhost:3000/user`, data);
                    // reset();
                    // toast.success("User added Successfully", {
                    //     position: "bottom-right",
                    //     autoClose: 3000
                    // });

                }
                return response.data;
            } catch (error) {
                throw error;

            }
        },
        onSuccess: () => {
            // navigate('/modulelist');
            if (onSuccess) onSuccess();


        },

        onError: (error) => {
            console.log(error)

        }
    })
    const onSubmit = (data) => {
        mutation.mutate(data)

    }


    //Fetch Group
    const fetchGroup = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/group`);
            console.log("API Response:", response.data);
            return response.data;
        }
        catch (error) {
            // Handle any network or API-related errors
            throw new Error(error.response ? error.response.data.message : 'Something went wrong. Please try again later.');

        }
    };

    const { data: group } = useQuery({
        queryKey: ["group"],
        queryFn: fetchGroup,
        staleTime: 5000,
    });


    //Fetch user with Id

    const { data: user } = useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            if (!id) return null;
            const response = await axios.get(`http://localhost:3000/user/${id}`);
            return response.data;

        },
        enabled: !!id,
    });

    useEffect(() => {
        if (user) {
            reset({
                userName: user.userName || '',
                userEmail: user.userEmail || '',
                password: user.password || '',
                confirmPassword: user.confirmPassword || '',
                fullName: user.fullName || '',
                contact: user.contact || '',
                location: user.location || '',
                department: user.department || '',
                employee: user.employee || '',
                groupId: user.groupId || '',
                isActive: user.isActive ?? false,
            });
        }
    }, [user, reset])

    return (
        <div className="p-6 h-fit max-w-7xl mx-auto bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Add User</h2>
            <form onSubmit={handleSubmit(onSubmit)} className=" p-4 rounded-md grid grid-cols-4 gap-4 text-sm">
                {/* Username */}
                <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                        Username:<span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('userName')}
                        type="text"
                        placeholder="Username"
                        className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                        User Email:<span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('userEmail')}
                        type="email"
                        placeholder="User Email"
                        className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                        Password:<span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                        className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                        Confirm Password:<span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        placeholder="Confirm Password"
                        className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Full Name */}
                <div className="flex flex-col col-span-1">
                    <label className="font-semibold text-gray-700 mb-1">
                        Full Name:<span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('fullName')}
                        type="text"
                        placeholder="Full Name"
                        className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Contact */}
                <div className="flex flex-col col-span-1">
                    <label className="font-semibold text-gray-700 mb-1">Contact:</label>
                    <input
                        {...register('contact')}
                        type="number"
                        placeholder="Contact Number"
                        className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Location */}
                <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                        Location:<span className="text-red-500">*</span>
                    </label>
                    <select {...register('location')} className="px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">--Select Location--</option>
                        <option value="kathmandu">Kathmandu</option>
                    </select>
                </div>

                {/* User Group */}
                <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">
                        User Group:<span className="text-red-500">*</span>
                    </label>
                    <select {...register('groupId')} className="px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">--Select Usergroup--</option>
                        {
                            group?.map((item) => (
                                <option key={item.id} value={item.id}>{item.groupName}</option>

                            ))
                        }
                    </select>
                </div>

                {/* Employee */}
                <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">Employee:</label>
                    <select {...register('employee')} className="px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">--Select Employee--</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>

                {/* Department */}
                <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1">Department:</label>
                    <select  {...register('department')} className="px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">--Select Department--</option>
                        <option value="Department">Department</option>
                    </select>
                </div>

                {/* Is Active Checkbox */}
                <div className="flex items-center gap-2 col-span-1 mt-6">
                    <input type="checkbox" id="isActive" className="accent-blue-500" />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                        Is Active
                    </label>
                </div>

                {/* Access Other Department */}
                {/* <div className="flex items-center gap-2 col-span-1 mt-6">
                    <input
                        type="checkbox"
                        id="accessOther"
                        className="accent-blue-500"
                    />
                    <label htmlFor="accessOther" className="text-sm font-medium text-gray-700">
                        Access Other Department
                    </label>
                </div> */}


                <div className="flex justify-end mt-4">
                    <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
