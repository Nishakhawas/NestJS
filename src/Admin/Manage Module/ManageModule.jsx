import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import ModuleList from "./ModuleList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../Api/axiosInstance";


export default function ManageModule({ onSuccess }) {

    const moduleSchema = z.object({
        parentMenu: z.string().min(1, "Parent Menu is Required"),
        menu: z.string().min(1, " Menu is Required"),
        displayText1: z.string().min(1, "Required"),
        displayText2: z.string().optional(),
        menuLink: z.string().min(1, "Required"),
        menuIconClass: z.string().optional(),
        // menuOrder: z.number().optional(),
        menuOrder: z
            .union([z.string(), z.number()])
            .optional()
            .transform((val) => (val ? Number(val) : undefined)),

        remarks: z.string().optional(),
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
            parentMenu: '',
            menu: '',
            displayText1: '',
            displayText2: '',
            menuLink: '',
            menuIconClass: '',
            menuOrder: 0,
            remarks: '',
            isActive: false,

        }
    })
    console.log("🚀 ~ ManageModule ~ errors:", errors)

    const { id } = useParams();

    const navigate = useNavigate();
    //fetch parent menu
    const fetchparentmenu = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/permissions`);
            console.log("API Response:", response.data);
            return response.data;
        }
        catch (error) {
            // Handle any network or API-related errors
            throw new Error(error.response ? error.response.data.message : 'Something went wrong. Please try again later.');

        }
    };

    const { data: parentmenu } = useQuery({
        queryKey: ["parentmenu"],
        queryFn: fetchparentmenu,
        staleTime: 5000,
    });

    //fetch module with id for updating 
    const { data: module } = useQuery({
        queryKey: ['module', id],
        queryFn: async () => {
            if (!id) return null;
            const response = await axios.get(`http://localhost:3000/modules/${id}`);
            return response.data;

        },
        enabled: !!id,
    });


    useEffect(() => {
        if (module) {
            reset({
                parentMenu: module.parentMenu || '',
                menu: module.menu || '',
                displayText1: module.displayText1 || '',
                displayText2: module.displayText2 || '',
                menuLink: module.menuLink || '',
                menuIconClass: module.menuIconClass || '',
                menuOrder: module.menuOrder || 0,
                remarks: module.remarks || '',
                isActive: module.isActive ?? false,

            });
        }
    }, [module, reset])

    //  const id = useParams();

    //form submission
    // const mutation = useMutation({
    //     mutationFn: async (data) => {
    //         let response;
    //         try {
    //             if (id) {
    //                 response = await axiosInstance.put(`/modules/${id}`, data);
    //                 toast.success("Module Updated Successfully", {
    //                     position: "bottom-right",
    //                     autoClose: 3000
    //                 });
    //                 navigate('/modulelist');
    //                 reset();


    //             } else {
    //                 response = await axiosInstance.post(`/modules`, data);
    //                 reset();
    //             }
    //             return response.data;
    //         } catch (error) {
    //             throw error;

    //         }
    //     },
    //     onSuccess: () => {
    //         // if (onSuccess) onSuccess();
    //         onSuccess?.();

    //     },

    //     onError: (error) => {
    //         console.log(error)

    //     }
    // })

    // const onSubmit = (data) => {
    //     mutation.mutate(data)
    // }

    const mutation = useMutation({
        mutationFn: async (data) => {
            try {
                let response;
                if (id) {
                    response = await axiosInstance.put(`/modules/${id}`, data);
                } else {
                    response = await axiosInstance.post(`/modules`, data);
                }
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            toast.success(id ? "Module Updated Successfully" : "Module Created Successfully", {
                position: "bottom-right",
                autoClose: 3000,
            });
            navigate('/modulelist');
            reset();
            onSuccess?.();
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
    };

    return (
        <>
            <div className="flex flex-1">
                <div className="max-w-4xl w-full mx-auto h-fit mt-10 p-6 bg-white ml-20 border border-gray-300 shadow-md rounded-md">
                    <h2 className="text-xl font-bold text-center mb-6 text-blue-900 border-b pb-2">Module Management</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Parent Menu */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Parent Menu:</label>
                                <select {...register('parentMenu')} className="w-full border border-gray-300 rounded p-2">
                                    <option value="">--Select--</option>
                                    {parentmenu?.map((item) => (
                                        <option key={item.id}> {item.name}</option>

                                    ))}
                                </select>
                                {errors.parentMenu && <p className="text-red-500 text-sm mt-1">{errors.parentMenu.message}</p>}

                            </div>

                            {/* Menu Name */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Menu(Unique)<span className="text-red-500">*</span></label>
                                <input {...register('menu', { required: true })} type="text" placeholder="Menu Name" className="w-full border border-gray-300 rounded p-2" />
                                {errors.menu && <p className="text-red-500 text-sm mt-1">{errors.menu.message}</p>}
                            </div>

                            {/* Display Text 1 */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Display Text <span className="text-red-500">*</span></label>
                                <input type="text" {...register('displayText1', { required: true })} placeholder="Display Text" className="w-full border border-gray-300 rounded p-2" />

                                {errors.displayText1 && <p className="text-red-500 text-sm mt-1">{errors.displayText1.message}</p>}
                            </div>

                            {/* Display Text 2 */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Display Text</label>
                                <input type="text" {...register('displayText2')} placeholder="Display Text" className="w-full border border-gray-300 rounded p-2" />
                            </div>

                            {/* Menu Link */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Menu Link<span className="text-red-500">*</span></label>
                                <input type="text" {...register('menuLink', { required: true })} placeholder="Menu Link" className="w-full border border-gray-300 rounded p-2" />
                                {errors.menuLink && <p className="text-red-500 text-sm mt-1">{errors.menuLink.message}</p>}

                            </div>

                            {/* Menu Icon Class */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Menu Icon Class</label>
                                <input type="text" {...register('menuIconClass')} placeholder="Menu Icon Class" className="w-full border border-gray-300 rounded p-2" />
                            </div>

                            {/* Menu Order */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Menu Order</label>
                                <input type="number" {...register('menuOrder')} placeholder="Menu Order" className="w-full border border-gray-300 rounded p-2" />
                            </div>

                            {/* Remarks */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Remarks</label>
                                <input type="text" {...register('remarks')} placeholder="Remarks" className="w-full border border-gray-300 rounded p-2" />
                            </div>
                        </div>

                        {/* Is Active */}
                        <div className="mt-4">
                            <label className="inline-flex items-center">
                                <input type="checkbox" {...register('isActive')} className="form-checkbox h-4 w-4 text-blue-600" />
                                <span className="ml-2 text-gray-700">Is Active</span>
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded flex items-center gap-2"
                            >
                                {id ? <><i className="fas fa-edit"></i> Update</> : <> <i className="fas fa-save"></i> Save</>}
                            </button>

                        </div>
                    </form>
                </div>
            </div>


        </>
    );
}
