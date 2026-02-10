import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import Team from './Team';



export default function TeamList() {

    const queryClient = useQueryClient();

    const fetchTeamList = async () => {
        const res = await axios.get('http://localhost:3000/team');
        return res.data;
    };
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['team'],
        queryFn: fetchTeamList,
    });

    queryClient.refetchQueries(["team"]);

    //Delete module
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            console.log("🚀 ~ MenuTable ~ error:", error)
            return axios.delete(`http://localhost:3000/team/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        },
        onSuccess: () => {
            toast.success("Page deleted Successfully", {
                position: "bottom-right",
                autoClose: 3000
            });
            queryClient.invalidateQueries(["data"]);
        },
        onError: () => {
            console.log(error)

        }
    })

    const deleteTeam = (id) => {
        deleteMutation.mutate(id);


    }


    const fakeRow = {
        id: 'placeholder',
        name: '',
        designation: '',
        type: '',
        imageUrl: '',
        phone: '',
        email: '',
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
        name: '',
        designation: '',
        type: '',
        imageUrl: '',
        phone: '',
        email: '',



    });

    const isGlobalSearchActive = searchText.trim() !== '';
    const isColumnSearchActive = Object.values(filters).some(val => val.trim() !== '');
    const isAnySearchActive = isGlobalSearchActive || isColumnSearchActive;

    const { data: searchedData } = useQuery({
        queryKey: ['modules', { searchText, ...filters }],
        queryFn: async () => {
            if (isGlobalSearchActive && !isColumnSearchActive) {
                // Global Search only
                const res = await axios.get('http://localhost:3000/team/search', {
                    params: { search: searchText },
                });
                return res.data;
            } else if (isColumnSearchActive && !isGlobalSearchActive) {
                // Column filters only
                const res = await axios.get('http://localhost:3000/team/columnquery', {
                    params: filters,
                });
                return res.data;
            } else if (isGlobalSearchActive && isColumnSearchActive) {
                // Both Global Search and Column filters
                const [global, column] = await Promise.all([
                    axios.get('http://localhost:3000/team/search', { params: { search: searchText } }),

                    axios.get('http://localhost:3000/team/columnquery', { params: filters }),
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
                        placeholder="Name"
                        value={filters.name}
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.name,
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
                return row.name;
            },


        },

        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300  focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder="Designaton"
                        value={filters.designation}
                        onChange={(e) => setFilters({ ...filters, designation: e.target.value })}
                    />
                </div>
            ),
            cell: row => row.isPlaceholder ? '' : row.designation,
            selector: row => row.designation,
            sortable: true,
            width: "170px"
        },
        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder="Type"
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.type,
            cell: row => row.isPlaceholder ? '' : row.type,
            sortable: true

        },
        {
            name: "Image",
            selector: row => row.imageUrl,
            sortable: true,
            width: "170px",
            cell: (row) => (
                console.log("🚀 ~ BannerList ~ row.imageUrl:", row.imageUrl),
                row.isPlaceholder ? '' :
                    <div className='flex flex-col'>
                        <img
                            src={`http://localhost:3000/uploads/${row.imageUrl}`}
                            className="border border-gray-300 w-24 h-auto bg-white text-black p-1 rounded mt-1 text-xs"
                        />
                    </div>

            ),

        },

        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder="Contact"
                        value={filters.phone}
                        onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.phone,
            cell: row => row.isPlaceholder ? '' : row.phone,
            sortable: true

        },
        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder="Email"
                        value={filters.email}
                        onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.email,
            cell: row => row.isPlaceholder ? '' : row.email,
            sortable: true

        },
        {
            name: 'Actions', sortable: true,
            width: '170px',
            cell: (row) => row.isPlaceholder ? '' : (
                <div className='flex gap-2 items-center justify-center'>
                    <button className='hover:bg-blue-300 rounded-md p-1'>View</button>
                    <Link to={`/teamlist/${row.id}`}>
                        <button className='hover:bg-blue-300 rounded-md p-1'>Edit</button>
                    </Link>
                    <button
                        className='hover:bg-blue-300 rounded-md p-1'
                        onClick={() => deleteTeam(row.id)}
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
            < div className='max-w-6xl mt-10 mx-auto flex flex-col gap-2 bg-white '>
                <div className='bg-sky-300 flex justify-between items-center p-2'>
                    <div className='flex-1 text-center'>
                        <h2 className='font-medium text-gray-500'>Team List</h2>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setShowCreateModal(true)} className='p-1 text-white font-semibold bg-sky-600 hover:bg-sky-700 hover:shadow-sky-100 justify-end'> + Create Team</button>
                    </div>
                </div>
                <div className='text-end'>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className=" bg-white px-4 py-1 outline-none border border-blue-100 max-w-xl"
                    />
                </div>
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

            <div className="relative ">
                {showCreateModal && (
                    <div
                        className="fixed inset-0 bg-opacity-50 flex items-center mt-10 justify-center z-50 overflow-y-auto"
                        onClick={() => setShowCreateModal(false)} //close on outside click
                    >
                        {/* Stop click propagation to prevent closing when clicking inside modal */}
                        <div
                            className="p-4 rounded-lg w-[600px] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/*  Close button */}
                            <button
                                className="absolute top-52 right-6 text-gray-500 hover:text-red-500 text-xl font-bold"
                                onClick={() => setShowCreateModal(false)}
                            >
                                <RxCross2 />
                            </button>
                            <Team
                                onSuccess={() => {
                                    handleUserCreated();
                                    toast.success('Team Created!');
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
