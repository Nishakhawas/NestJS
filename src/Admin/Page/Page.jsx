
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function Page({ onSuccess }) {
    const queryClient = useQueryClient();

    // Zod schema for form validation
    const pageFormSchema = z.object({
        pageMenu: z.string().min(1, 'Page Menu is required'),
        title: z.string().min(1, 'Title is required').min(3, 'Title must be at least 3 characters'),
        pageAlise: z.string().optional(),
        imageUrl: z
            .string()
            .min(1, ' Image is required')
            .refine((val) => {
                return typeof val === 'string' && val.length > 50;
            }, {
                message: 'Invalid base64 image string',
            }),
        shortContent: z.string().min(1, 'Short Content is required').min(10, 'Short Content must be at least 10 characters'),
        description: z.string().min(1, 'Description is required').min(10, 'Description must be at least 10 characters'),
        metaTitle: z.string().optional(),
        metaKeyword: z.string().optional(),
        metaDescription: z.string().optional(),
        isPublish: z
            .union([z.boolean(), z.string()])
            .transform(val => {
                if (val === "true" || val === true) return true;
                if (val === "false" || val === false) return false;
                return undefined;
            })
            .optional(),
    });
    const {
        register,
        handleSubmit, setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(pageFormSchema),
        defaultValues: {
            pageMenu: '',
            title: '',
            pageAlise: '',
            imageUrl: '',
            shortContent: '',
            description: '',
            metaTitle: '',
            metaKeyword: '',
            metaDescription: '',
            isPublish: false,
        }
    });

    console.log("🚀 ~ page ~ errors:", errors)
    const { id } = useParams();

    const mutation = useMutation({
        mutationFn: async (data) => {
            let response;
            try {
                if (id) {
                    response = await axios.put(`http://localhost:3000/team/${id}`, data);

                } else {
                    response = await axios.post(`http://localhost:3000/page`, data);
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

    //Convert image
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
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md space-y-2 overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-700">Page Form</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Menu:<span className="text-red-500">*</span></label>
                <select
                    {...register('pageMenu')}
                    className={`w-full border rounded px-3 py-1 ${errors.menu ? 'border-red-500' : 'border-gray-300'}`}
                >
                    <option value="">-- Select Menu --</option>
                    <option value="about">About</option>
                    <option value="services">Services</option>
                    <option value="contact">Contact</option>
                </select>
                {errors.menu && <p className="text-red-500 text-sm mt-1">{errors.menu.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title:<span className="text-red-500">*</span></label>
                <input
                    type="text"
                    {...register('title')}
                    placeholder="Enter Page Title"
                    className={`w-full border rounded px-3 py-1 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Alias:</label>
                <input
                    type="text"
                    {...register('pageAlise')}
                    placeholder="Enter Page Slug"
                    className="w-full border border-gray-300 rounded px-3 py-1"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image:<span className="text-red-500">*</span></label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    // className={`w-full border rounded px-3 py-2 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded bg-white file:mr-4 file:py-1 file:px-4
      file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700
      hover:file:bg-gray-300"
                />
                <input type="hidden" {...register('imageUrl')} />
                {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
            </div>


            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Content:<span className="text-red-500">*</span></label>
                <textarea
                    {...register('shortContent')}
                    placeholder="Short Content"
                    rows="3"
                    className={`w-full border rounded px-3 py-1 ${errors.shortContent ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.shortContent && <p className="text-red-500 text-sm mt-1">{errors.shortContent.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description:<span className="text-red-500">*</span></label>
                <input
                    type="text"
                    {...register('description')}
                    placeholder="Enter Description"
                    className={`w-full border rounded px-3 py-1 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title:</label>
                    <input
                        type="text"
                        {...register('metaTitle')}
                        placeholder="Enter Meta Title"
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keyword:</label>
                    <input
                        type="text"
                        {...register('metaKeyword')}
                        placeholder="Enter Meta Keyword"
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description:</label>
                <input
                    type="text"
                    {...register('metaDescription')}
                    placeholder="Enter Meta Description"
                    className="w-full border border-gray-300 rounded px-3 py-1"
                />
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    {...register('isPublish')}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">Is Publish</label>
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="submit"
                    disabled={isSubmitting || mutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-2 py-1 rounded shadow"
                >
                    {isSubmitting || mutation.isPending ? 'Saving...' : 'Save'}
                </button>
                <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded shadow"
                >
                    Reset
                </button>
            </div>
        </form>
    )
}
