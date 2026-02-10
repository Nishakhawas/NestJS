import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

export default function FrontendMenu({ onSuccess }) {
  const FrontendFormSchema = z.object({
    title: z.string().min(1, "Name is required"),
    icon: z.string().min(1, "Icon is required"),
    imageUrl: z
      .string()
      .min(1, 'Image is required')
      .refine((val) => {
        return typeof val === 'string' && val.length > 50;
      }, {
        message: 'Invalid base64 image string',
      }),
    content: z.string().min(1, "Content is required "),
    order: z.coerce.number().min(1, "Order must be a number"),
    isPublish: z.boolean().optional()
  })


  const {
    register,
    handleSubmit, setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(FrontendFormSchema),
    defaultValues: {
      title: '',
      icon: '',
      imageUrl: '',
      content: '',
      order: 0,
      isPublish: false,
    }
  });
  console.log("🚀 ~ Tile ~ errors:", errors)

  const { id } = useParams();

  const mutation = useMutation({
    mutationFn: async (data) => {
      let response;
      try {
        if (id) {
          response = await axios.put(`http://localhost:3000/tiles/${id}`, data);

        } else {
          response = await axios.post(`http://localhost:3000/tiles `, data);
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
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-center border-b pb-2">Tiles Setup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-sm mb-1">Title<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="title"
              {...register("title")}
              className="w-full border border-gray-300 outline-none rounded px-3 py-1"
              placeholder="Enter Title"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-sm mb-1">Icon<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="icon"
              {...register("icon")}
              className="w-full border border-gray-300 outline-none rounded px-3 py-1"
              placeholder="Enter Icon Name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image:<span className="text-red-500">*</span></label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded bg-white file:mr-4 file:py-1 file:px-4
      file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700
      hover:file:bg-gray-300"
          />
          <input type="hidden" {...register('imageUrl')} />
          {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">Content<span className="text-red-500">*</span></label>
          <textarea
            name="content"
            {...register("content")}
            className="w-full border border-gray-300 outline-none  rounded px-3 py-1"
            rows={4}
            placeholder="Enter Content Here"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">Order</label>
          <input
            type="number"
            name="order"
            {...register("order", { valueAsNumber: true })}
            className="w-full border border-gray-300 outline-none  rounded px-3 py-1"
            placeholder="Order"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublish"
              {...register("isPublish")}
              className="h-4 w-4"
            />
            Is Publish
          </label>
          {/* <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="header"
            />
            Header
          </label> */}
          {/* <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="body"
            />
            Body
          </label> */}
          {/* <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="footer"
            />
            Footer
          </label> */}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-1 rounded shadow"
          >
            Save
          </button>
          {/* <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-1 rounded shadow"
          >
             Reset
          </button> */}
        </div>
      </form>
    </div>
  )
}
