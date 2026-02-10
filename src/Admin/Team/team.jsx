import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod"
import axiosInstance from "../../Api/axiosInstance";

export default function Team({ onSuccess }) {

    const teamFormSchema = z.object({
        name: z.string().min(1, "Name is required").max(100),
        designation: z.string().min(1, "Designation is required ").max(100),
        type: z.string().min(1, "Please select a type"),
        address: z.string().min(2).max(200),
        imageUrl: z
            .string()
            .min(1, 'Banner image is required')
            .refine((val) => {
                return typeof val === 'string' && val.length > 50;
            }, {
                message: 'Invalid base64 image string',
            }),
        phone: z.string().min(10),
        email: z.string().email("Invalid email"),
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        linkedin: z.string().optional(),
        instagram: z.string().optional(),
        youtube: z.string().optional(),
        order: z.coerce.number().min(0, "Order must be a number"),
        isPublish: z.boolean().optional()
    })

    const {
        register,
        handleSubmit, setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(teamFormSchema),
        defaultValues: {
            name: '',
            designation: '',
            type: '',
            address: '',
            imageUrl: '',
            phone: '',
            email: '',
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: '',
            youtube: '',
            order: 0,
            isPublish: false,
        }
    });
    console.log("🚀 ~ Team ~ errors:", errors)

    const { id } = useParams();

    //fetch team with id for updating 
    const { data: team } = useQuery({
        queryKey: ['team', id],
        queryFn: async () => {
            if (!id) return null;
            const response = await axiosInstance.get(`/team/${id}`);
            return response.data;

        },
        enabled: !!id,
    });


    useEffect(() => {
        if (team) {
            reset({
                parentMenu: module.parentMenu || '',
                menu: module.menu || '',
                displayText1: module.displayText1 || '',
                displayText2: module.displayText2 || '',
                menuLink: module.menuLink || '',
                menuIconClass: module.menuIconClass || '',
                menuOrder: module.menuOrder || '',
                remarks: module.remarks || '',
                isActive: module.isActive ?? false,

            });
        }
    }, [team, reset])



    const mutation = useMutation({
        mutationFn: async (data) => {
            let response;
            try {
                if (id) {
                    response = await axiosInstance.put(`/team/${id}`, data);

                } else {
                    response = await axiosInstance.post(`/team`, data);
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
        console.log("🚀 ~ onSubmit ~ onSubmit:", data)


    }

    const [base64Image, setBase64Image] = useState('');
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.toString();
            setBase64Image(base64String);
            setValue('imageUrl', base64String);
        };
        reader.readAsDataURL(file);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-42 space-y-2 ">
            <h2 className="text-xl font-semibold text-center">Team/Testimonial Form</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <input {...register("name")} className="input px-4 py-1 flex items-center border border-gray-300 outline-none" name="name" placeholder="Enter Name" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                <input {...register("designation")} className="input px-4 py-1 flex items-center border border-gray-300 outline-none" name="designation" placeholder="Enter Designation" />
                {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>}
                {/* <label htmlFor="type">Type</label> */}
                <select {...register("type")} className="input px-4 py-1 flex items-center border border-gray-300 outline-none" name="type">
                    <option value="" disabled>---Type---</option>
                    <option value="Team">Team</option>
                    <option value="Testimonial">Testimonial</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                {/* <label htmlFor="address">Address</label> */}
                <input {...register("address")} className="input px-4 py-1 flex items-center border border-gray-300 outline-none" name="address" placeholder="Enter Address" />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                <input type="file" accept="image/*" onChange={handleFileChange} className="block col-span-2 w-full text-sm text-gray-900 border border-gray-300 rounded bg-white file:mr-4 file:py-1 file:px-4
      file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700
      hover:file:bg-gray-300" />
                <input type="hidden" {...register('imageUrl')} />
                {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
            </div>

            <div className="grid md:grid-cols-1 gap-2">
                <label htmlFor="testimonial">Testimonial</label>
                <textarea {...register("testimonial")} className="textarea px-4 py-1 flex items-center border border-gray-300 outline-none" name="testimonial" placeholder="Enter Testimonial" />
                {errors.testimonial && <p className="text-red-500 text-sm mt-1">{errors.testimonial.message}</p>}
                <label htmlFor="skills">Skills</label>
                <textarea {...register("skills")} className="textarea px-4 py-1 flex items-center border border-gray-300 outline-none" name="skills" placeholder="Enter Skills" />
                {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>}
                <label htmlFor="whatIDo">What I Do</label>
                <textarea {...register("whatIDo")} className="textarea px-4 py-1 flex items-center border border-gray-300 outline-none" name="whatIDo" placeholder="Enter What I do" />
                {errors.whatIDo && <p className="text-red-500 text-sm mt-1">{errors.whatIDo.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-3">
                {/* Phone Number */}
                <div className="flex flex-col">
                    <label htmlFor="phone">Phone</label>
                    <input {...register("phone")} className="input px-4 py-1  border border-gray-300 outline-none" name="phone" placeholder="Phone" />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input {...register("email")} className="input px-4 py-1 border border-gray-300 outline-none" name="email" placeholder="Email" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                {/* Social Media Links */}
                <div className="flex flex-col">
                    <label htmlFor="facebook">Facebook</label>
                    <input {...register("facebook")} className="input px-4 py-1 border border-gray-300 outline-none" name="facebook" placeholder="Facebook Link" />
                    {errors.facebook && <p className="text-red-500 text-sm mt-1">{errors.facebook.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="twitter">Twitter</label>
                    <input {...register("twitter")} className="input px-4 py-1 border border-gray-300 outline-none" name="twitter" placeholder="Twitter Link" />
                    {errors.twitter && <p className="text-red-500 text-sm mt-1">{errors.twitter.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input {...register("linkedin")} className="input px-4 py-1 border border-gray-300 outline-none" name="linkedin" placeholder="LinkedIn Link" />
                    {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="instagram">Instagram</label>
                    <input {...register("instagram")} className="input px-4 py-1 border border-gray-300 outline-none" name="instagram" placeholder="Instagram Link" />
                    {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram.message}</p>}
                </div>
                <div className=" flex flex-col">
                    <label htmlFor="youtube">Youtube</label>
                    <input {...register("youtube")} className="input px-4 py-1 border border-gray-300 outline-none" name="youtube" placeholder="Youtube Link" />
                    {errors.youtube && <p className="text-red-500 text-sm mt-1">{errors.youtube.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="order">Order</label>
                    <input {...register("order")} className="input px-4 py-1 border border-gray-300 outline-none" name="order" placeholder="Order" type="number" />
                    {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>}
                </div>

            </div>

            <label className="flex items-center space-x-2">
                <input type="checkbox" {...register("isPublish")} />
                <span>Is Publish</span>
            </label>

            <div className="flex justify-end space-x-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
                {/* <button type="reset" className="bg-red-500 text-white px-4 py-1 rounded">Reset</button> */}
            </div>
        </form>
    )
}
