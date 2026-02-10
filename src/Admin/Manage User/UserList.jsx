import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AddUserForm from './createuser';
import { RxCross2 } from 'react-icons/rx';
import ExportButtons from '../../Component/ExportButtons';


export default function UserList() {

    const queryClient = useQueryClient();

    const fetchUser = async () => {
        const res = await axios.get('http://localhost:3000/user');
        return res.data; // Wrap in array if it's one object
    };
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
    });

    queryClient.refetchQueries(["user"]);

    //Delete module
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            console.log("🚀 ~ MenuTable ~ error:", error)
            return axios.delete(`http://localhost:3000/user/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        },
        onSuccess: () => {
            toast.success("User deleted Successfully", {
                position: "bottom-right",
                autoClose: 3000
            });
            queryClient.invalidateQueries(["data"]);
        },
        onError: () => {
            console.log(error)

        }
    })

    const deleteUser = (id) => {
        deleteMutation.mutate(id);


    }


    const fakeRow = {
        id: 'placeholder',
        userName: '',
        fullName: '',
        email: '',
        location: '',
        groupName: '',
        isActive: null,
        isPlaceholder: true

    };
    //Global Search
    const [searchText, setSearchText] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleUserCreated = () => {
        setShowCreateModal(false);
    };

    //column filters
    const [filters, setFilters] = useState({
        userName: '',
        fullName: '',
        email: '',
        location: '',
        groupName: '',


    });

    const isGlobalSearchActive = searchText.trim() !== '';
    const isColumnSearchActive = Object.values(filters).some(val => val.trim() !== '');
    const isAnySearchActive = isGlobalSearchActive || isColumnSearchActive;

    const { data: searchedData } = useQuery({
        queryKey: ['modules', { searchText, ...filters }],
        queryFn: async () => {
            if (isGlobalSearchActive && !isColumnSearchActive) {
                // Global Search only
                const res = await axios.get('http://localhost:3000/user/search', {
                    params: { search: searchText },
                });
                return res.data;
            } else if (isColumnSearchActive && !isGlobalSearchActive) {
                // Column filters only
                const res = await axios.get('http://localhost:3000/user/columnquery', {
                    params: filters,
                });
                return res.data;
            } else if (isGlobalSearchActive && isColumnSearchActive) {
                // Both active? You decide – merge? prioritize? return intersection?
                const [global, column] = await Promise.all([
                    axios.get('http://localhost:3000/user/search', { params: { search: searchText } }),
                    axios.get('http://localhost:3000/user/columnquery', { params: filters }),
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
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24  bg-white text-black p-1 rounded  mt-1 text-xs"
                        placeholder="User Name"
                        value={filters.userName}
                        onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.userName,
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
                return row.userName;
            },


        },

        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24  bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder=" Full Name"
                        value={filters.fullName}
                        onChange={(e) => setFilters({ ...filters, fullName: e.target.value })}
                    />
                </div>
            ),
            cell: row => row.isPlaceholder ? '' : row.fullName,
            selector: row => row.fullName,
            width: "170px",
            sortable: true

        },
        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder="Location"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    />
                </div>
            ),
            cell: row => row.isPlaceholder ? '' : row.location,
            selector: row => row.menuLink,
            sortable: true,
            width: "170px"
        },

        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400  w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder="User Group"
                        value={filters.groupName}
                        onChange={(e) => setFilters({ ...filters, groupName: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.group?.groupName ?? '',
            cell: row => row.isPlaceholder ? '' : (row.group?.groupName ?? ''),
            sortable: true
        },

        {
            name: 'Actions', sortable: true,
            width: '170px',
            cell: (row) => row.isPlaceholder ? '' : (
                <div className='flex gap-2 items-center justify-center'>
                    <button className='hover:bg-blue-300 rounded-md p-1'>View</button>
                    <Link to={`/adduser/${row.id}`}>
                        <button className='hover:bg-blue-300 rounded-md p-1'>Edit</button>
                    </Link>
                    <button
                        className='hover:bg-blue-300 rounded-md p-1'
                        onClick={() => deleteUser(row.id)}
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

    { isLoading && <p>Loading Menus</p> }
    { isError && <p>{error.message}</p> }

    return (
        <>
            < div className='p-4 max-w-6xl mt-10 mx-auto flex flex-col gap-2 shadow-md rounded-xl bg-gray-200'>
                <div className='bg-sky-300 flex justify-between items-center p-2'>
                    <div className='flex-1 text-center'>
                        <h2 className='font-medium text-gray-500'>User List</h2>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setShowCreateModal(true)} className='p-1 text-white font-semibold bg-sky-600 hover:bg-sky-700 hover:shadow-sky-100 justify-end'> + Create User</button>
                    </div>
                </div>
                <div className=''>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className=" bg-white px-4 py-1 outline-none border border-blue-200 max-w-xl"
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
                            {/* <ManageModule onSuccess={handleUserCreated} /> */}

                            <AddUserForm
                                onSuccess={() => {
                                    handleUserCreated();
                                    toast.success('User Created!');
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
