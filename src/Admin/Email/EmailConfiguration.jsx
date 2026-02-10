import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SiMinutemailer } from "react-icons/si";
import { z } from "zod";
import axiosInstance from "../../Api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function EmailConfiguration() {


    const moduleSchema = z.object({
        mailFrom: z.string().min(1, "MailFrom Name is Required"),
        mailAddress: z.string().min(1, "MailAddress Code is Required"),
        username: z.string().min(1, " Username Required"),
        password: z.string().min(1, " Passsword Required"),
        host: z.string().min(1, " Host Required"),
        port: z
            .string()
            .min(1, 'port is required')
            .transform((val) => Number(val))
            .refine((val) => !isNaN(val), {
                message: 'Invalid group ID',
            }),
        protocol: z.string().min(1, " Protocol Required").optional(),
        encryption: z.string().min(1, " Encryption Required").optional(),
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
            mailFrom: '',
            mailAddress: '',
            username: '',
            password: '',
            host: '',
            port: 0,
            protocol: '',
            encryption: '',
            isActive: false,
        }
    })
    console.log("🚀 ~ email ~ errors:", errors)

    const { id } = useParams();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (data) => {
            try {
                let response;
                if (id) {
                    response = await axiosInstance.put(`/email-config/${id}`, data);
                } else {
                    response = await axiosInstance.post(`/email-config`, data);
                }
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Email Created Successfully", {
                position: "bottom-right",
                autoClose: 3000,
            });
            navigate('/modulelist');
            reset();
            // onSuccess?.();
        },
        onError: (error) => {
            console.error(error);
            toast.error(error?.response?.data?.message || "Something went wrong", {
                position: "bottom-right",
                autoClose: 3000,
            });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
        console.log("🚀 ~ onSubmit ~ onSubmit:", data)

    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md border mt-6">
            <h2 className="text-xl font-semibold text-center  text-gray-700 border-b pb-2 mb-6">
                Email Configuration
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mail From</label>
                        <input
                            type="text"
                            name="mailFrom"
                            {...register('mailFrom')}
                            className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mail Address</label>
                        <input
                            type="email"
                            name="mailAddress"
                            {...register('mailAddress')}
                            className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email Address"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Host</label>
                        <input
                            type="text"
                            name="host"
                            {...register('host')}

                            className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            {...register('username')}
                            className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="text"
                            name="password"
                            {...register('password')}
                            className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Port</label>
                        <input
                            type="number"
                            name="port"
                            {...register('port')}
                            className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Protocol</label>
                        <select
                            name="protocol"
                            {...register('protocol')}
                            className="mt-1 w-full border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Protocol</option>
                            <option value="SMTP">SMTP</option>
                            <option value="IMAP">IMAP</option>
                            <option value="POP3">POP3</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Encryption</label>
                        <select
                            name="encryption"
                            {...register('encryption')}
                            className="mt-1 w-full border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Encryption</option>
                            <option value="SSL">SSL</option>
                            <option value="TLS">TLS</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isActive"
                        {...register('isActive')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-sm text-gray-700">Is Active</label>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                    >
                        <SiMinutemailer />
                        Send Test Mail
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
