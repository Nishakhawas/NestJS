import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import GroupList from "./GroupList";

export default function Group({onSuccess}) {

    const moduleSchema = z.object({
        groupName: z.string().min(1, "Group Name is Required"),
        groupCode: z.string().min(1, " Group Code is Required"),
        location: z.string().min(1, " Location Required"),
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
            groupName: '',
            groupCode: '',
            location: '',
            remarks: '',
            isActive: false,



        }
    })
    console.log("🚀 ~ ManageModule ~ errors:", errors)

    const { id } = useParams();



    //fetch group with id for updating 
    const { data: group } = useQuery({
        queryKey: ['group', id],
        queryFn: async () => {
            if (!id) return null;
            const response = await axios.get(`http://localhost:3000/group/${id}`);
            return response.data;

        },
        enabled: !!id,
    });

    useEffect(() => {
        if (group) {
            reset({
                groupName: group.groupName || '',
                groupCode: group.groupCode || '',
                location: group.location || '',
                remarks: group.remarks || '',
                isActive: group.isActive ?? false,
            });
        }
    }, [group, reset])

    //form submission
    const mutation = useMutation({
        mutationFn: async (data) => {
            let response;
            try {
                if (id) {
                    response = await axios.put(`http://localhost:3000/group/${id}`, data);

                } else {
                    response = await axios.post(`http://localhost:3000/group`, data);
                    reset();
                }
                return response.data;
            } catch (error) {
                throw error;

            }
        },
        onSuccess: () => {
            if (onSuccess) onSuccess();

        },

        onError: (error) => {
            console.log(error)

        }
    })
    const onSubmit = (data) => {
        mutation.mutate(data)

    }


    return (
        <>
            <div className="flex ">
                <div className="max-w-4xl w-full mx-auto h-fit mt-10 p-6 bg-white border border-gray-300">
                    <h2 className="text-xl font-bold text-center mb-6 text-blue-900 border-b pb-2">Group Management</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Group Name*/}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Group Name<span className="text-red-500">*</span></label>
                                <input {...register('groupName')} type="text" placeholder="Group Name" className="w-full  outline-none border border-gray-300 rounded p-2" />
                                {errors.groupName && <p className="text-red-500 text-sm mt-1">{errors.groupName.message}</p>}

                            </div>

                            {/* Group Code */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700 ">Group Code </label>
                                <input type="text" {...register('groupCode')} placeholder="Group Code" className="w-full outline-none border border-gray-300 rounded p-2" />

                                {errors.groupCode && <p className="text-red-500 text-sm mt-1">{errors.groupCode.message}</p>}

                            </div>

                            {/* Location */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Location</label>
                                <input type="text" {...register('location')} placeholder="Location" className="w-full outline-none border border-gray-300 rounded p-2" />
                                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}

                            </div>

                            {/* Remarks */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Remarks</label>
                                <input type="text" {...register('remarks')} placeholder="Remarks" className="w-full outline-none border border-gray-300 rounded p-2" />
                                {errors.remarks && <p className="text-red-500 text-sm mt-1">{errors.remarks.message}</p>}

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
                              <span className="fas fa-save">Save</span> 
                            </button>
                        </div>
                    </form>
                </div>
                {/* <GroupList /> */}
            </div>


        </>
    );
}
