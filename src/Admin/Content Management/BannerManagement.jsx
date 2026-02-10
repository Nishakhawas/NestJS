// import { Editor } from '@tinymce/tinymce-react';
// import { useState } from 'react';
// export default function BannerManagement() {

//     const [content, setContent] = useState('');

//     const handleEditorChange = (newContent, editor) => {
//         console.log('Content was updated:', newContent);
//         setContent(newContent);
//     };
//     return (
//         <div className="App" style={{ padding: '2rem' }}>
//             <h1 style={{ marginBottom: '1rem' }}>📝 TinyMCE Rich Text Editor Demo</h1>

//             <Editor
//                 apiKey="no-api-key" // Use "no-api-key" for dev; for production get free key from TinyMCE site
//                 initialValue="<p>This is the initial content</p>"
//                 init={{
//                     height: 300,
//                     menubar: false,
//                     plugins: ['link', 'image', 'code', 'lists', 'table'],
//                     toolbar:
//                         'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image code',
//                 }}
//                 onEditorChange={handleEditorChange}
//             />

//         </div>
//     )
// }



import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import Content from '../../Component/Trumbowygeditor/content';

export default function BannerForm({ onSuccess }) {

    const moduleSchema = z.object({
        bannerHeading: z.string().min(1, "User Name is Required"),
        ImageUrl: z
            .string()
            .min(1, 'Banner image is required')
            .refine((val) => {
                // base64 starts with characters like iVBORw...
                return typeof val === 'string' && val.length > 50;
            }, {
                message: 'Invalid base64 image string',
            }),

        bannerContents: z.string().min(1, " Banner Content is Required"),
        buttonText1: z.string().min(1, "Required"),
        buttonUrl1: z.string().min(1, "Required"),
        buttonText2: z.string().optional(),
        buttonUrl2: z.string().optional(),
        order: z.string().optional(),
        isPublish: z
            .union([z.boolean(), z.string()])
            .transform(val => {
                if (val === "true" || val === true) return true;
                if (val === "false" || val === false) return false;
                return undefined;
            })
            .optional(),

        isUnlimited: z
            .union([z.boolean(), z.string()])
            .transform(val => {
                if (val === "true" || val === true) return true;
                if (val === "false" || val === false) return false;
                return undefined;
            })
            .optional(),
        startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: 'Invalid start date',
        }),
        endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: 'Invalid end date',
        }),

    })


    const { register, reset, setValue, handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(moduleSchema),
        defaultValues: {
            bannerHeading: '',
            ImageUrl: '',
            bannerContents: '',
            buttonText1: '',
            buttonUrl1: '',
            buttonText2: '',
            buttonUrl2: '',
            order: '',
            isPublish: false,
            isUnlimited: false,
            startDate: '',
            endDate: ''



        }
    })
    console.log("🚀 ~ BannerForm ~ errors:", errors)
    const { id } = useParams();

    const mutation = useMutation({
        mutationFn: async (data) => {
            let response;
            try {
                if (id) {
                    response = await axios.put(`http://localhost:3000/banners/${id}`, data);

                } else {
                    response = await axios.post(`http://localhost:3000/banners`, data);
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

            setBase64Image(base64String); // for preview
            setValue('ImageUrl', base64String);  // THIS injects it as a string
        };

        reader.readAsDataURL(file);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-2xl mx-auto mt-42  bg-white space-y-1">
            <h2 className="text-xl font-bold text-center border-b pb-2">Banner Form</h2>

            {/* Row 1: Heading + Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">Banner Heading<span className="text-red-500">*</span></label>
                    <input
                        name="bannerHeading"
                        {...register('bannerHeading')}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                        placeholder="Enter Heading"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Banner Image<span className="text-red-500">*</span></label>
                    <input
                        type="file"
                        accept='image/*'
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded bg-white file:mr-4 file:py-1.5 file:px-4
      file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700
      hover:file:bg-gray-300"
                    />

                    <input type="hidden" {...register('ImageUrl')} />
                    {/* {base64Image && (
                        <img src={base64Image} alt="Preview" className="h-20 mt-2" />
                    )} */}

                </div>
            </div>

            {/* Rich Text Area (just using textarea for now) */}
            {/* <Controller
                name="bannerContents"
                control={control}
                render={({ field }) => (
                    <div>
                        <label className="font-medium mb-1">Banner Contents<span className="text-red-500">*</span></label>
                        <Content {...field} />
                    </div>
                )}
            /> */}
            <Controller
                name="bannerContents"
                control={control}
                rules={{ required: "Banner Content is Required" }}
                render={({ field, fieldState }) => (
                    <div>
                        <label className="font-medium mb-1">
                            Banner Contents<span className="text-red-500">*</span>
                        </label>
                        <Content
                            value={field.value}
                            onChange={(val) => field.onChange(val)}
                        />
                        {fieldState.error && (
                            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                        )}
                    </div>
                )}
            />

            {/* Row: Button Texts and URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">Button 1 Text</label>
                    <input
                        name="buttonText1"
                        {...register('buttonText1')}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                        placeholder="Enter Content Here"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Button 1 URL</label>
                    <input
                        name="buttonUrl1"
                        {...register('buttonUrl1')}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                        placeholder="Enter URL_1 Here"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Button 2 Text</label>
                    <input
                        name="buttonText2"
                        {...register('buttonText2')}
                        className="w-full border  border-gray-300 rounded px-3 py-1"
                        placeholder="Enter Content Here"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Button 2 URL</label>
                    <input
                        name="buttonUrl2"
                        {...register('buttonUrl2')}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                        placeholder="Enter Meta Description"
                    />
                </div>
            </div>

            {/* Row: Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">Start Date<span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        name="startDate"
                        {...register('startDate')}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">End Date<span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        name="endDate"
                        {...register('endDate')}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                        required
                    />
                </div>
            </div>

            {/* Order + Checkboxes */}
            <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-4 items-center">
                <div>
                    <label className="font-medium mb-1">Order</label>
                    <input
                        name="order"
                        {...register('order')}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                        placeholder="Order"
                    />
                </div>

                <div className="flex gap-4 mt-4 md:mt-0">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="isPublish"
                            {...register('isPublish')}
                        />
                        <span>Is Publish</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="isUnlimited"
                            {...register('isUnlimited')} />
                        <span>Is Unlimited</span>
                    </label>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-end">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Save
                </button>

            </div>
        </form>
    );
}
