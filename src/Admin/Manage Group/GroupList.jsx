// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import DataTable from 'react-data-table-component';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';



// export default function GroupList() {


//     const queryClient = useQueryClient();

//     const fetchGroupData = async () => {
//         const res = await axios.get('http://localhost:3000/group');
//         return res.data;
//     };
//     const { data, isLoading, isError, error } = useQuery({
//         queryKey: ['group'],
//         queryFn: fetchGroupData,
//     });

//     useEffect(() => {
//         queryClient.refetchQueries(['group']);
//     }, []);



//     //Delete module
//     const deleteMutation = useMutation({
//         mutationFn: async (id) => {
//             console.log("🚀 ~ MenuTable ~ error:", error)
//             return axios.delete(`http://localhost:3000/group/${id}`, {
//                 withCredentials: true,
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//         },
//         onSuccess: () => {
//             alert("Group deleted Successfully")
//             queryClient.invalidateQueries(["data"]);
//         },
//         onError: () => {
//             console.log(error)

//         }
//     })

//     const deleteGroup = (id) => {
//         deleteMutation.mutate(id);
//     }

//     const columns = [
//         {
//             name: 'S.N',
//             // cell: (row, index) => index + 1,
//             cell: (row, index) => row.isPlaceholder ? '' : index + 1,
//             sortable: true,
//         },
//         {
//             name: 'Group Name',
//             selector: row => row.groupName,
//             // cell: row => row.isPlaceholder ? '' : row.groupName,
//             cell: row => {
//                 if (row.isPlaceholder) {
//                     return (
//                         <div className="text-gray-500 italic w-full py-4 whitespace-nowrap col-span-full flex justify-center text-center">
//                             No matching groups found.
//                         </div>
//                     );
//                 }
//                 return row.groupName;
//             },
//             width: '170px',
//             sortable: true,
//         },
//         {
//             name: 'Group Code',
//             selector: row => row.groupCode,
//             // cell: row => row.groupCode || '',
//             cell: row => row.isPlaceholder ? '' : row.groupCode,
//             width: '170px',
//         },
//         {
//             name: 'Location',
//             selector: row => row.location,
//             // cell: row => row.location || '',
//             cell: row => row.isPlaceholder ? '' : row.location,
//             width: '170px',
//         },
//         {
//             name: 'Status',
//             selector: row => row.isActive,
//             cell: row => row.isPlaceholder ? '' : (row.isActive ? '✅' : '❌'),
//         },
//         {
//             name: 'Actions',
//             cell: (row) => row.isPlaceholder ? '' : (
//                 <div className='flex gap-2 items-center justify-center'>
//                     <button className='hover:bg-blue-300 rounded-md p-1'>View</button>
//                     <Link to={`/group/${row.id}`}>
//                         <button className='hover:bg-blue-300 rounded-md p-1'>Edit</button>
//                     </Link>
//                     <button
//                         className='hover:bg-blue-300 rounded-md p-1'
//                         onClick={() => deleteGroup(row.id)}
//                         style={{ color: 'red' }}
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ),
//             width: '170px',

//         },
//     ];

//     const [searchText, setSearchText] = useState("");

//     const { data: module } = useQuery({
//         queryKey: ['modules', searchText],
//         queryFn: async () => {
//             const res = await axios.get('http://localhost:3000/group/search', {
//                 params: { search: searchText },
//             });
//             return res.data;
//         },
//         enabled: searchText.trim() !== '',



//     });

//     if (isLoading) return <div className='flex justify-center items-center'>Loading menus...</div>;
//     if (isError) return <div>Error: {error.message}</div>;



//     //customstyles for header
//     const customStyles = {
//         headCells: {
//             style: {
//                 backgroundColor: 'skyblue',
//                 color: 'white',
//                 fontSize: '14px',
//                 fontWeight: 'bold',
//             },
//         },
//         rows: {
//             style: {
//                 fontSize: '13px',
//                 minHeight: '48px',
//             },
//         },
//     };







//     const fakeRow = {
//         id: 'placeholder',
//         groupName: '',
//         groupCode: '',
//         location: '',
//         isActive: null,
//         isPlaceholder: true

//     };


//     const tableData = searchText.trim() !== '' ? module ?? [] : data ?? [];
//     const fixedTableData = tableData.length > 0 ? tableData : [fakeRow];



//     return (
//         <>
//             <div className='p-6 max-w-6xl mx-auto bg-white mt-10 flex flex-col gap-2 shadow-md rounded-xl '>
//                 <h2>Group List</h2>
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchText}
//                     onChange={(e) => setSearchText(e.target.value)}
//                     className="input px-4 py-2 outline-none border border-blue-100 "
//                 />



//                 <DataTable
//                     columns={columns}
//                     data={fixedTableData}
//                     pagination={tableData.length > 0}
//                     striped
//                     customStyles={customStyles}
//                     // conditionalRowStyles={conditionalRowStyles}
//                     noHeader={false}
//                     noDataComponent={
//                         tableData.length === 0 ? (
//                             <div className="text-gray-500 italic py-4 text-center w-full">
//                                 No matching groups found.
//                             </div>
//                         ) : null
//                     }

//                 />

//             </div>

//         </>
//     );
// }




import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Group from './Group';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import ExportButtons from '../../Component/ExportButtons';



export default function GroupList() {

    const queryClient = useQueryClient();

    const fetchGroup = async () => {
        const res = await axios.get('http://localhost:3000/group'); // or `/menus` for list
        return res.data; // Wrap in array if it's one object
    };
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['group'],
        queryFn: fetchGroup,
    });

    queryClient.refetchQueries(["group"]);

    //Delete module
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            console.log("🚀 ~ MenuTable ~ error:", error)
            return axios.delete(`http://localhost:3000/group/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        },
        onSuccess: () => {
            alert("Module deleted Successfully")
            queryClient.invalidateQueries(["data"]);
        },
        onError: () => {
            console.log(error)

        }
    })

    const deleteGroup = (id) => {
        deleteMutation.mutate(id);

    }


    const fakeRow = {
        id: 'placeholder',
        groupName: '',
        groupCode: '',
        location: '',
        isActive: null,
        isPlaceholder: true

    };
    //Global Search
    const [searchText, setSearchText] = useState('');
    //popupmodal
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleUserCreated = () => {
        setShowCreateModal(false);
    };

    //column filters
    const [filters, setFilters] = useState({
        groupName: '',
        groupCode: '',
        location: '',
        remarks: ''
    });

    const isGlobalSearchActive = searchText.trim() !== '';
    const isColumnSearchActive = Object.values(filters).some(val => val.trim() !== '');
    const isAnySearchActive = isGlobalSearchActive || isColumnSearchActive;

    const { data: searchedData } = useQuery({
        queryKey: ['modules', { searchText, ...filters }],
        queryFn: async () => {
            if (isGlobalSearchActive && !isColumnSearchActive) {
                // Global Search only
                const res = await axios.get('http://localhost:3000/group/search', {
                    params: { search: searchText },
                });
                return res.data;
            } else if (isColumnSearchActive && !isGlobalSearchActive) {
                // Column filters only
                const res = await axios.get('http://localhost:3000/group/columnquery', {
                    params: filters,
                });
                return res.data;
            } else if (isGlobalSearchActive && isColumnSearchActive) {
                // Both active? You decide – merge? prioritize? return intersection?
                const [global, column] = await Promise.all([
                    axios.get('http://localhost:3000/modules/search', { params: { search: searchText } }),
                    axios.get('http://localhost:3000/modules/query', { params: filters }),
                ]);

                const globalIds = new Set(global.data.map((g) => g.id));
                const intersected = column.data.filter((item) => globalIds.has(item.id));
                return intersected;
            }


            return [];
        },
        enabled: isAnySearchActive,
    });

    const finalData = isAnySearchActive ? searchedData ?? [] : data ?? [];
    const finalTableData = finalData.length > 0 ? finalData : [fakeRow];

    //Data Table
    const columns = [
        {
            name: 'S.N', cell: (row, index) => row.isPlaceholder ? '' : index + 1, sortable: true, width: "80px"
        },

        {
            // name: 'Parent Menu', width: '170px', selector: row => row.menu,
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24  bg-white text-black p-1 rounded  mt-1 text-xs"
                        placeholder="Group Name"
                        value={filters.groupName}
                        onChange={(e) => setFilters({ ...filters, groupName: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.groupName,
            sortable: true,
            width: '170px',
            cell: row => {
                if (row.isPlaceholder) {
                    return (
                        <div className="text-gray-500 italic w-full py-4 whitespace-nowrap col-span-full flex justify-center text-center">
                            No matching groups found.
                        </div>
                    );
                }
                return row.groupName;
            },
            // cell: row => row.isPlaceholder ? '' : row.parentMenu,


        },

        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300  focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24  bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder="Group Code"
                        value={filters.groupCode}
                        onChange={(e) => setFilters({ ...filters, groupCode: e.target.value })}
                    />
                </div>
            ),
            cell: row => row.isPlaceholder ? '' : row.groupCode,
            selector: row => row.groupCode,
            width: "170px",
            sortable: true

        },
        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder="Location"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    />
                </div>
            ),
            cell: row => row.isPlaceholder ? '' : row.location,
            selector: row => row.location,
            sortable: true,
            width: "170px"
        },
        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder="Remarks"
                        value={filters.remarks}
                        onChange={(e) => setFilters({ ...filters, remarks: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.remarks,
            // cell: row => row.isPlaceholder ? '' : (row.isActive ? '✅' : '❌'),
            cell: row => row.isPlaceholder ? '' : row.remarks,
            sortable: true

        },
        {
            name: 'Actions', sortable: true,
            width: '170px',
            cell: (row) => row.isPlaceholder ? '' : (
                <div className='flex gap-2 items-center justify-center'>
                    <button className='hover:bg-blue-300 rounded-md p-1'>View</button>
                    <Link to={`/group/${row.id}`}>
                        <button className='hover:bg-blue-300 rounded-md p-1'>Edit</button>
                    </Link>
                    <button
                        className='hover:bg-blue-300 rounded-md p-1'
                        onClick={() => deleteGroup(row.id)}
                        style={{ color: 'red' }}
                    >
                        Delete
                    </button>
                </div>
            ),

        },
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: 'skyblue',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                fontSize: '13px',
                minHeight: '38px',
            },
        },
    };



    return (
        <>
            < div className='max-w-6xl mt-10 mx-auto flex flex-col gap-2 bg-white'>
                <div className='bg-sky-300 flex justify-between items-center p-2 '>
                    <div className='flex-1 text-center'>
                        <h2 className='font-medium text-gray-500'>Group List</h2>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setShowCreateModal(true)} className='p-1 text-white font-semibold bg-sky-600 hover:bg-sky-700 hover:shadow-sky-100 justify-end'> + Create Group</button>
                    </div>
                </div>
                <div className='text-end'>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className=" bg-white px-4 py-2 outline-none border border-blue-100 max-w-xl"
                    />
                </div>
                <ExportButtons data={finalTableData} />

                <div className="border border-gray-300 rounded">
                    <DataTable
                        columns={columns}
                        data={finalTableData}
                        pagination={finalData.length > 0}
                        noHeader={false}
                        fixedHeader
                        // highlightOnHover
                        striped

                        customStyles={customStyles}
                        noDataComponent={
                            finalData.length === 0 ? (
                                <div className="text-gray-500 italic py-4 text-center w-full">
                                    No matching groups found.
                                </div>
                            ) : null
                        }

                    />

                </div>
            </div >

            <div className="relative p-4">
                {showCreateModal && (
                    <div
                        className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setShowCreateModal(false)} //close on outside click
                    >
                        {/* Stop click propagation to prevent closing when clicking inside modal */}
                        <div
                            className="bg-white p-6 rounded-lg w-[800px] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/*  Close button */}
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
                                onClick={() => setShowCreateModal(false)}
                            >
                                <RxCross2 />
                            </button>
                            {/* Form model */}
                            <Group
                                onSuccess={() => {
                                    // handleUserCreated();
                                    toast.success('Group Created!');
                                    setShowCreateModal(false);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
