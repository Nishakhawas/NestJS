// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// export default function ManagePermission() {

//   const [selectedGroupId, setSelectedGroupId] = useState('');
//   const [editablePermissions, setEditablePermissions] = useState([]);


//   const handleChange = (e) => {
//     setSelectedGroupId(e.target.value);
//   };

// const {id}= useParams();

//   const fetchGroup = async () => {
//     const res = await axios.get('http://localhost:3000/group');
//     return res.data;
//   };
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['group'],
//     queryFn: fetchGroup,
//   });


//   const fetchGroupPermissionById = async () => {
//     const res = await axios.get(`http://localhost:3000/grouppermission/${selectedGroupId} `);
//     return res.data;
//   };
//   const { data: groupPermissionData, isLoading: isPermissionLoading } = useQuery({
//       queryKey: ['grouppermissiondatabyId', selectedGroupId],
//       queryFn: fetchGroupPermissionById,
//       enabled: !!selectedGroupId  // Only run when a group is selected
//     });


//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;


//  const handleCheckboxChange = (index, field) => {
//     const updated = [...editablePermissions];
//     updated[index][field] = !updated[index][field];
//     setEditablePermissions(updated);
//   };

//  const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:3000/permissions/${id}`, editablePermissions);
//       alert("Permissions updated successfully!");
//     } catch (err) {
//       console.error(err);
//     }
//   };


//   return (
//     <>
//       <div className="p-4 bg-[#e8f0fa] border border-t-0 border-gray-300 rounded-md shadow-sm">
//         <h2 className="text-center text-lg font-semibold mb-4 text-[#1c3e66]">
//           Permission Management
//         </h2>

//         <div className="flex items-center">
//           <label htmlFor="group" className="w-32 font-medium text-sm text-gray-800">
//             Group<span className="text-pink-600 ml-0.5">*</span>:
//           </label>

//           <select
//             id="group"
//             value={selectedGroupId}
//             onChange={handleChange}
//             className="w-72 border border-blue-500 rounded px-3 py-1 outline-none text-sm text-black shadow-sm"
//           >
//             <option value="">Select Group</option>
//             {data?.map((group) => (
//               <option key={group.id} value={group.id}>
//                 {group.groupName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Display Permissions */}
//         {Array.isArray(groupPermissionData?.permissions) && groupPermissionData.permissions.length > 0 ? (
//           <div className="mt-4 bg-white p-3 rounded border border-gray-300 shadow-inner">
//             <h3 className="font-medium text-md text-gray-700 mb-2">
//               Permissions for selected group:
//             </h3>
//             <table className="w-full text-sm text-left text-gray-700 border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="py-2 px-3 border">Permission Name</th>
//                   <th className="py-2 px-3 border text-center">Create</th>
//                   <th className="py-2 px-3 border text-center">Read</th>
//                   <th className="py-2 px-3 border text-center">Update</th>
//                   <th className="py-2 px-3 border text-center">Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {editablePermissions.map((perm, index) => (
//                   <tr key={index} className="border-t">
//                     <td className="py-2 px-3 border">{perm.name}</td>
//                     <td className="py-2 px-3 border text-center">
//                       <input
//                         type="checkbox"
//                         checked={perm.create_access}
//                          onChange={() => handleCheckboxChange(index, "create_access")}
//                         className=" text-blue-600"
//                       />
//                     </td>
//                     <td className="py-2 px-3 border text-center">
//                       <input
//                         type="checkbox"
//                         checked={perm.read_access}
//                          onChange={() => handleCheckboxChange(index, "read_access")}
//                         className=" text-blue-600"
//                       />
//                     </td>
//                     <td className="py-2 px-3 border text-center">
//                       <input
//                         type="checkbox"
//                         checked={perm.update_access}
//                          onChange={() => handleCheckboxChange(index, "update_access")}
//                         className=" text-blue-600"
//                       />
//                     </td>
//                     <td className="py-2 px-3 border text-center">
//                       <input
//                         type="checkbox"
//                         checked={perm.delete_access}
//                          onChange={() => handleCheckboxChange(index, "delete_access")}
//                         className=" text-blue-600"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : selectedGroupId && !isPermissionLoading ? (
//           <p className="text-sm text-gray-600">No permissions assigned to this group yet.</p>
//         ) : null}
//          {/* Save Button */}           
//          <div className="flex justify-end mt-4">
//             <button
//                onClick={handleSave}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Save Changes
//             </button>
//           </div>


//       </div>



//     </>



//   )
// }


{/* {isPermissionLoading && <p className="text-sm text-blue-700">Loading permissions...</p>}
        {isPermissionError && (
          <p className="text-sm text-red-600">Failed to load permissions. Try again.</p>
        )}
        {groupPermissionData?.length > 0 ? (
          <div className="mt-4 bg-white p-3 rounded border border-gray-300 shadow-inner">
            <h3 className="font-medium text-md text-gray-700 mb-2">Permissions for selected group:</h3>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
              {groupPermissionData.map((permission, index) => (
                <li key={index}>{permission.permissions.name}</li>
              ))}
            </ul>
          </div>
        ) : selectedGroupId && !isPermissionLoading ? (
          <p className="text-sm text-gray-600">No permissions assigned to this group yet.</p>
        ) : null} */}

// const fetchGroupPermission = async () => {
//   const res = await axios.get(`http://localhost:3000/grouppermission `);
//   return res.data;
// };
// const { data: groupPermissionData } = useQuery({
//   queryKey: ['grouppermissiondata'],
//   queryFn: fetchGroupPermission,
// });

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function ManagePermission() {
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [editablePermissions, setEditablePermissions] = useState([]);

  const { id } = useParams();

  const handleChange = (e) => {
    setSelectedGroupId(e.target.value);
  };

  const fetchGroup = async () => {
    const res = await axios.get('http://localhost:3000/group');
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['group'],
    queryFn: fetchGroup,
  });

  const fetchGroupPermissionById = async () => {
    const res = await axios.get(`http://localhost:3000/grouppermission/${selectedGroupId}`);
    return res.data;
  };

  const {
    data: groupPermissionData,
    isLoading: isPermissionLoading,
  } = useQuery({
    queryKey: ['grouppermissiondatabyId', selectedGroupId],
    queryFn: fetchGroupPermissionById,
    enabled: !!selectedGroupId
  });

  // Sync fetched data to editable state
  useEffect(() => {
    if (groupPermissionData?.permissions) {
      setEditablePermissions(groupPermissionData.permissions);
    }
  }, [groupPermissionData]);

  // Toggle checkbox handler
  const handleCheckboxChange = (index, field) => {
    const updated = [...editablePermissions];
    updated[index][field] = !updated[index][field];
    setEditablePermissions(updated);
  };


  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/permissions/${id}`,
        {
          create_access: true,
          read_access: false,
          update_access: true,
          delete_access: false
        });

      alert("Permissions updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 bg-[#e8f0fa] border border-t-0 border-gray-300 rounded-md shadow-sm">
      <h2 className="text-center text-lg font-semibold mb-4 text-[#1c3e66]">
        Permission Management
      </h2>

      <div className="flex items-center">
        <label htmlFor="group" className="w-32 font-medium text-sm text-gray-800">
          Group<span className="text-pink-600 ml-0.5">*</span>:
        </label>

        <select
          id="group"
          value={selectedGroupId}
          onChange={handleChange}
          className="w-72 border border-blue-500 rounded px-3 py-1 outline-none text-sm text-black shadow-sm"
        >
          <option value="">Select Group</option>
          {data?.map((group) => (
            <option key={group.id} value={group.id}>
              {group.groupName}
            </option>
          ))}
        </select>
      </div>

      {/* Editable Permission Table */}
      <div className="mt-5">Permissions for selected group:</div>
      {Array.isArray(editablePermissions) && editablePermissions.length > 0 ? (
        <div className="mt-4 bg-white p-3 rounded border border-gray-300 shadow-inner">
          <h3 className="font-medium text-md text-gray-700 mb-2">
            {/* Permissions for selected group: */}
          </h3>
          <table className="w-full text-sm text-left text-gray-700 border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 border">Permission Name</th>
                <th className="py-2 px-3 border text-center">Create</th>
                <th className="py-2 px-3 border text-center">Read</th>
                <th className="py-2 px-3 border text-center">Update</th>
                <th className="py-2 px-3 border text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {editablePermissions.map((perm, index) => (
                <tr key={index} className="">
                  <td className="py-2 px-3 border">{perm.name}</td>
                  <td className="py-2 px-3 border text-center">
                    <input
                      type="checkbox"
                      checked={perm.create_access}
                      onChange={() => handleCheckboxChange(index, "create_access")}
                      className="accent-blue-600"
                    />
                  </td>
                  <td className="py-2 px-3 border text-center">
                    <input
                      type="checkbox"
                      checked={perm.read_access}
                      onChange={() => handleCheckboxChange(index, "read_access")}
                      className="accent-blue-600"
                    />
                  </td>
                  <td className="py-2 px-3 border text-center">
                    <input
                      type="checkbox"
                      checked={perm.update_access}
                      onChange={() => handleCheckboxChange(index, "update_access")}
                      className="accent-blue-600"
                    />
                  </td>
                  <td className="py-2 px-3 border text-center">
                    <input
                      type="checkbox"
                      checked={perm.delete_access}
                      onChange={() => handleCheckboxChange(index, "delete_access")}
                      className="accent-blue-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Save Button */}
          <div className="flex justify-end mt-4">
            {/* <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button> */}
          </div>
        </div>
      ) : selectedGroupId && !isPermissionLoading ? (
        <p className="text-sm text-gray-600 mt-4">No permissions assigned to this group yet.</p>
      ) : null}
    </div>
  );
}
