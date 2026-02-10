import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import BannerForm from './BannerManagement';



export default function BannerList() {

    const queryClient = useQueryClient();

    const fetchBannerList = async () => {
        const res = await axios.get('http://localhost:3000/banners');
        return res.data;
    };
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['banner'],
        queryFn: fetchBannerList,
    });

    queryClient.refetchQueries(["banner"]);

    //Delete module
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            console.log("🚀 ~ MenuTable ~ error:", error)
            return axios.delete(`http://localhost:3000/banners/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        },
        onSuccess: () => {
            toast.success("Banner deleted Successfully", {
                position: "bottom-right",
                autoClose: 3000
            });
            queryClient.invalidateQueries(["data"]);
        },
        onError: () => {
            console.log(error)

        }
    })

    const deleteBanner = (id) => {
        deleteMutation.mutate(id);


    }


    const fakeRow = {
        id: 'placeholder',
        bannerHeading: '',
        ImageUrl: '',
        startDate: '',
        endDate: '',
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
        bannerHeading: '',
        ImageUrl: '',
        startDate: '',
        endDate: ''

    });

    const isGlobalSearchActive = searchText.trim() !== '';
    const isColumnSearchActive = Object.values(filters).some(val => val.trim() !== '');
    const isAnySearchActive = isGlobalSearchActive || isColumnSearchActive;

    const { data: searchedData } = useQuery({
        queryKey: ['modules', { searchText, ...filters }],
        queryFn: async () => {
            if (isGlobalSearchActive && !isColumnSearchActive) {
                // Global Search only
                const res = await axios.get('http://localhost:3000/banners/search', {
                    params: { search: searchText },
                });
                return res.data;
            } else if (isColumnSearchActive && !isGlobalSearchActive) {
                // Column filters only
                const res = await axios.get('http://localhost:3000/banners/columnquery', {
                    params: filters,
                });
                return res.data;
            } else if (isGlobalSearchActive && isColumnSearchActive) {
                // Both active? You decide – merge? prioritize? return intersection?
                const parsedFilters = {
                    ...filters,
                    startDate: filters.startDate ? new Date(filters.startDate).toISOString() : undefined,
                    endDate: filters.endDate ? new Date(filters.endDate).toISOString() : undefined,
                };
                const [global, column] = await Promise.all([
                    axios.get('http://localhost:3000/banners/search', { params: { search: searchText } }),

                    axios.get('http://localhost:3000/banners/columnquery', { params: parsedFilters }),
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
                        placeholder="Banner Heading"
                        value={filters.bannerHeading}
                        onChange={(e) => setFilters({ ...filters, bannerHeading: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.bannerHeading,
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
                return row.bannerHeading;
            },


        },

        {
            name: "Banner",
            selector: row => row.ImageUrl,
            sortable: true,
            width: "170px",
            cell: (row) => (
                console.log("🚀 ~ BannerList ~ row.ImageUrl:", row.ImageUrl),
                row.isPlaceholder ? '' :
                    <div className='flex flex-col'>
                        <img
                            src={`http://localhost:3000/uploads/${row.ImageUrl}`}

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
                        className="border border-gray-300  focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder="Start Date"
                        value={filters.startDate}
                        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                    />

                </div>
            ),
            cell: row => row.isPlaceholder ? '' : row.startDate,
            selector: row => row.startDate,
            sortable: true,
            width: "170px"
        },
        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder="End Date"
                        value={filters.endDate}

                        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                    />

                </div>
            ),
            selector: row => row.endDate,
            cell: row => row.isPlaceholder ? '' : row.endDate,
            sortable: true

        },
        {
            name: 'Actions', sortable: true,
            width: '170px',
            cell: (row) => row.isPlaceholder ? '' : (
                <div className='flex gap-2 items-center justify-center'>
                    <button className='hover:bg-blue-300 rounded-md p-1'>View</button>
                    <Link to={`/managemodule/${row.id}`}>
                        <button className='hover:bg-blue-300 rounded-md p-1'>Edit</button>
                    </Link>
                    <button
                        className='hover:bg-blue-300 rounded-md p-1'
                        onClick={() => deleteBanner(row.id)}
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
            < div className=' max-w-6xl mt-10 mx-auto flex flex-col gap-2 bg-white '>
                <div className='bg-sky-300 flex justify-between items-center p-2'>
                    <div className='flex-1 text-center'>
                        <h2 className='font-medium text-gray-500'>Banner List</h2>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setShowCreateModal(true)} className='p-1 text-white font-semibold bg-sky-600 hover:bg-sky-700 hover:shadow-sky-100 justify-end'> + Create Banner</button>
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

            <div className="relative p-4">
                {showCreateModal && (
                    <div
                        className="fixed inset-0 bg-opacity-50 flex items-center  justify-center z-50 overflow-y-auto"
                        onClick={() => setShowCreateModal(false)} //close on outside click
                    >
                        {/* Stop click propagation to prevent closing when clicking inside modal */}
                        <div
                            className=" p-2 rounded-lg w-[600px] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/*  Close button */}
                            <button
                                className="absolute top-46 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
                                onClick={() => setShowCreateModal(false)}
                            >
                                <RxCross2 />
                            </button>


                            <BannerForm
                                onSuccess={() => {
                                    handleUserCreated();
                                    toast.success('Banner Created!');
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
